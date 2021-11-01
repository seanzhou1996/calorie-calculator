import React from 'react';
import { useTranslation } from 'react-i18next';
import { PlanningDietI18nKeys as I18nKeys } from 'result/i18n-keys';
import { I18nNamespace } from 'shared/models';

interface ResultSectionDietPlanProps {
  target: number;
}

export default function ResultSectionDietPlan({ target }: ResultSectionDietPlanProps) {
  const { t } = useTranslation([I18nNamespace.PlanningDiet]);
  return (
    <section className="page-section">
      <p>{t(I18nKeys.FirstParagraph)}</p>
      <p>{t(I18nKeys.SecondParagraph)}</p>
      <ul>
        <li>
          {t(I18nKeys.mealCaloriesAndPercent_meal_calorie_percent, {
            meal: t(I18nKeys.Breakfast),
            calorie: (target * 0.2).toFixed(0),
            percent: 20,
          })}
        </li>
        <li>
          {t(I18nKeys.mealCaloriesAndPercent_meal_calorie_percent, {
            meal: t(I18nKeys.Lunch),
            calorie: (target * 0.3).toFixed(0),
            percent: 30,
          })}
        </li>
        <li>
          {t(I18nKeys.mealCaloriesAndPercent_meal_calorie_percent, {
            meal: t(I18nKeys.Dinner),
            calorie: (target * 0.3).toFixed(0),
            percent: 30,
          })}
        </li>
        <li>
          {t(I18nKeys.mealCaloriesAndPercent_meal_calorie_percent, {
            meal: t(I18nKeys.Snacks),
            calorie: (target * 0.2).toFixed(0),
            percent: 20,
          })}
        </li>
      </ul>
      <p>{t(I18nKeys.ThirdParagraph)}</p>
      <p>{t(I18nKeys.FourthParagraph)}</p>
      <p>{t(I18nKeys.FifthParagraph)}</p>
    </section>
  );
}
