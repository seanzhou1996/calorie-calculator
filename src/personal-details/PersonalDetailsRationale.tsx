import React from 'react';
import { useTranslation } from 'react-i18next';
import { I18nNamespace } from 'shared/models';
import { PersonalDetailsI18nKeys as I18nKeys } from 'shared/i18n-keys';

export default function PersonalDetailsRationale() {
  const { t } = useTranslation(I18nNamespace.PersonalDetails);
  return (
    <>
      <p>{t(I18nKeys.RationaleFirstParagraph)}</p>
      <p>{t(I18nKeys.RationaleSecondParagraph)}</p>
      <p>{t(I18nKeys.RationaleThirdParagraph)}</p>
      <ul>
        <li>{t(I18nKeys.FactorFirstParagraph)}</li>
        <li>{t(I18nKeys.FactorSecondParagraph)}</li>
        <li>{t(I18nKeys.FactorThirdParagraph)}</li>
      </ul>
    </>
  );
}
