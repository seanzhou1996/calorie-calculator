import React from 'react';
import { useTranslation } from 'react-i18next';
import BaseGoBackButton from 'shared/BaseGoBackButton';
import BaseMarkdownConverter from 'shared/BaseMarkdownConverter';
import { I18nKeys } from 'shared/i18n-keys';
import { RoutePath } from 'shared/models';

export default function AboutThisApp() {
  const { t, i18n } = useTranslation();
  const url = `${process.env.PUBLIC_URL}/docs/about-${i18n.resolvedLanguage}.md`;

  return (
    <div className="width-container">
      <BaseGoBackButton to={RoutePath.Home} titleOverride={t(I18nKeys.GoBackHome)} />
      <BaseMarkdownConverter url={url} />
    </div>
  );
}
