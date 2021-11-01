import React from 'react';
import { useTranslation } from 'react-i18next';
import { ResultSectionHowToGainWeightI18nKeys as I18nKeys } from 'shared/i18n-keys';
import { I18nNamespace, RoutePath } from 'shared/models';
import BaseActionLink from 'shared/BaseActionLink';

export default function ResultSectionHowToGainWeight() {
  const { t } = useTranslation([I18nNamespace.ResultSectionHowToGainWeight]);
  return (
    <section className="page-section">
      <header>{t(I18nKeys.Title)}</header>
      <p>{t(I18nKeys.FirstParagraph)}</p>
      <p>{t(I18nKeys.SecondParagraph)}</p>
      <p>{t(I18nKeys.ThirdParagraph)}</p>
      <div className="action">
        <BaseActionLink to={RoutePath.WeightGainGuide} title={t(I18nKeys.OpenWeightGainGuide)} />
      </div>
    </section>
  );
}
