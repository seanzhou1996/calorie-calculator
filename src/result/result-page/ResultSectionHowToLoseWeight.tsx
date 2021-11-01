import React from 'react';
import BaseActionLink from 'shared/BaseActionLink';
import { ResultSectionHowToLoseWeightI18nKeys as I18nKeys } from 'result/i18n-keys';
import { useTranslation } from 'react-i18next';
import { I18nNamespace, RoutePath } from 'shared/models';

export default function ResultSectionHowToLoseWeight() {
  const { t } = useTranslation([I18nNamespace.ResultSectionHowToLoseWeight]);
  return (
    <section className="page-section">
      <header>{t(I18nKeys.Title)}</header>
      <p>{t(I18nKeys.FirstParagraph)}</p>
      <p>{t(I18nKeys.SecondParagraph)}</p>
      <p>{t(I18nKeys.ThirdParagraph)}</p>
      <div className="action">
        <BaseActionLink to={RoutePath.WeightGainGuide} title={t(I18nKeys.OpenWeightLossGuide)} />
      </div>
    </section>
  );
}
