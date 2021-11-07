import React from 'react';
import { useTranslation } from 'react-i18next';
import BaseMarkdownConverter from 'shared/BaseMarkdownConverter';

export default function AboutThisApp() {
  const { i18n } = useTranslation();
  const url = `${process.env.PUBLIC_URL}/docs/about-${i18n.resolvedLanguage}.md`;

  return (
    <div className="width-container">
      <BaseMarkdownConverter url={url} />
    </div>
  );
}
