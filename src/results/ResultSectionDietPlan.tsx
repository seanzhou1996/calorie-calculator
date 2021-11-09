import React from 'react';
import { useTranslation } from 'react-i18next';
import { ResultSectionPlanningDietI18nKeys as I18nKeys } from 'shared/i18n-keys';
import { I18nNamespace, mealLabelI18nKeys, mealPortions, MealType } from 'shared/models';

interface ResultSectionDietPlanProps {
  target: number;
}

export default function ResultSectionDietPlan({ target }: ResultSectionDietPlanProps) {
  const { t } = useTranslation([I18nNamespace.PlanningDiet]);
  const listItems = Object.values(MealType).map((mealType) => (
    <li key={mealType}>
      {t(I18nKeys.mealCaloriesAndPercent_meal_calorie_percent, {
        meal: t(mealLabelI18nKeys[mealType]).toLowerCase(),
        calorie: Math.round(target * mealPortions[mealType]),
        percent: Math.round(100 * mealPortions[mealType]),
      })}
    </li>
  ));
  return (
    <section className="page-section">
      <p>{t(I18nKeys.FirstParagraph)}</p>
      <p>{t(I18nKeys.SecondParagraph)}</p>
      <ul>{listItems}</ul>
      <p>{t(I18nKeys.ThirdParagraph)}</p>
      <p>{t(I18nKeys.FourthParagraph)}</p>
      <p>{t(I18nKeys.FifthParagraph)}</p>
    </section>
  );
}
