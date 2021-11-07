import React from 'react';
import { SummaryListProps } from './models';

export default function BaseSummaryList({ data }: SummaryListProps) {
  const rows = data.map(({ key, value, action }, index) => (
    <div key={index} className="summary-list__row">
      <dt className="summary-list__key">{key}</dt>
      <dd className="summary-list__value">{value}</dd>
      {!action ? null : (
        <dd className="summary-list__action">
          <button onClick={action.callback} className="summary-list__button">
            <span>{action.name}</span>
          </button>
        </dd>
      )}
    </div>
  ));
  return <dl className="summary-list">{rows}</dl>;
}
