import React from 'react';
import { useTranslation } from 'react-i18next';
import { I18nKeys as CommonI18nKeys } from 'shared/i18n-keys';
import { Food, FoodType, I18nNamespace } from 'shared/models';

interface CalorieCheckerListItemWithNoControlProps {
  food: Food;
}

export default function CalorieCheckerListItemWithNoControl({
  food: { type, name, nameZh, weight, calorie },
}: CalorieCheckerListItemWithNoControlProps) {
  const { t, i18n } = useTranslation(I18nNamespace.CalorieChecker);
  const weightWithUnit =
    type === FoodType.Drinks
      ? t(CommonI18nKeys.Milliliter_amount, { amount: weight })
      : t(CommonI18nKeys.Grams_amount, { amount: weight });

  return (
    <div className="food">
      <header className="food__header">{i18n.resolvedLanguage === 'en' ? name : nameZh}</header>
      <div className="food__grid">
        <span className="food__property">{t(CommonI18nKeys.Amount)}</span>
        <div>{weightWithUnit}</div>
        <span className="food__property">{t(CommonI18nKeys.Calories)}</span>
        <span>{t(CommonI18nKeys.Kilocalorie_amount, { amount: calorie })}</span>
      </div>
    </div>
  );
}
