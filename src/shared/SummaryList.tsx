import React from 'react';
import { SummaryListProps } from './models';

function SummaryList({ data }: SummaryListProps) {
  const rowElems = data.map(({ key, value, action }, index) => (
    <div key={index} className="summary-list__row">
      <dt className="summary-list__key">{key}</dt>
      <dd className="summary-list__value">{value}</dd>
      <dd className="summary-list__action">
        <button onClick={action.callback} className="summary-list__button">
          <span>{action.name}</span>
        </button>
      </dd>
    </div>
  ));
  return <dl className="summary-list">{rowElems}</dl>;
}

export default SummaryList;
