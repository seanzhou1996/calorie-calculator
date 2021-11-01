import React from 'react';
import { useTranslation } from 'react-i18next';
import { I18nNamespace, RoutePath } from 'shared/models';
import { ResultSectionHowToEatWellI18nKeys as I18nKeys } from 'result/i18n-keys';
import BaseActionLink from 'shared/BaseActionLink';

export default function ResultSectionHowToEatWell() {
  const { t } = useTranslation([I18nNamespace.ResultSectionHowToEatWell]);
  return (
    <section className="page-section">
      <header>{t(I18nKeys.Title)}</header>
      <p>{t(I18nKeys.FirstParagraph)}</p>
      <p>{t(I18nKeys.SecondParagraph)}</p>
      <p>{t(I18nKeys.ThirdParagraph)}</p>
      <div className="action">
        <BaseActionLink to={RoutePath.EatWellGuide} title={t(I18nKeys.OpenEatWellGuide)} />
      </div>
    </section>
  );
}
