import React from 'react';
import { useTranslation } from 'react-i18next';
import BaseBackToTopButton from 'shared/BaseBackToTopButton';
import BaseGoBackButton from 'shared/BaseGoBackButton';
import BaseMarkdownConverter from 'shared/BaseMarkdownConverter';
import { I18nKeys } from 'shared/i18n-keys';
import { RoutePath } from 'shared/models';

export default function WeightLossGuide() {
  const { t, i18n } = useTranslation();
  const url = `${process.env.PUBLIC_URL}/docs/how-to-lose-weight-${i18n.resolvedLanguage}.md`;

  return (
    <div className="width-container">
      <BaseGoBackButton to={RoutePath.Results} titleOverride={t(I18nKeys.GoBackToResults)} />
      <BaseMarkdownConverter url={url} />
      <BaseBackToTopButton />
    </div>
  );
}
