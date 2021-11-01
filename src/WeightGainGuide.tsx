import React from 'react';
import { useTranslation } from 'react-i18next';
import BaseMarkdownConverter from 'shared/BaseMarkdownConverter';

export default function WeightGainGuide() {
  const { i18n } = useTranslation();
  const url = `${process.env.PUBLIC_URL}/docs/how-to-gain-weight-${i18n.resolvedLanguage}.md`;

  return (
    <div className="width-container">
      <BaseMarkdownConverter url={url} />
    </div>
  );
}
