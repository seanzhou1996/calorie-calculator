import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChoosingFoodsI18nKeys as I18nKeys } from 'shared/i18n-keys';
import BaseActionLink from 'shared/BaseActionLink';
import { I18nNamespace, RoutePath } from 'shared/models';

export default function ResultSectionChoosingFood() {
  const { t } = useTranslation([I18nNamespace.ChoosingFoods]);

  return (
    <section className="page-section">
      <header>{t(I18nKeys.Title)}</header>
      <p>{t(I18nKeys.FirstParagraph)}</p>
      <p>{t(I18nKeys.SecondParagraph)}</p>
      <p>{t(I18nKeys.FourthParagraph)}</p>
      <div className="action">
        <BaseActionLink to={RoutePath.Home} title={t(I18nKeys.OpenFoodCalorieChecker)} />
      </div>
    </section>
  );
}
