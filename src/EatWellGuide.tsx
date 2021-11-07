import React from 'react';
import { useTranslation } from 'react-i18next';
import BaseGoBackButton from 'shared/BaseGoBackButton';
import BaseMarkdownConverter from 'shared/BaseMarkdownConverter';
import { RoutePath } from 'shared/models';
import { I18nKeys } from 'shared/i18n-keys';

export default function EatWellGuide() {
  const { t, i18n } = useTranslation();
  const url = `${process.env.PUBLIC_URL}/docs/how-to-eat-well-${i18n.resolvedLanguage}.md`;

  return (
    <div className="width-container">
      <BaseGoBackButton to={RoutePath.Results} titleOverride={t(I18nKeys.GoBackToResults)} />
      <BaseMarkdownConverter url={url} />
    </div>
  );
}
