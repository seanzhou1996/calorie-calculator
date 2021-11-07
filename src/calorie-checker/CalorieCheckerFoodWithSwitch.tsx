import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Radio } from 'antd';
import { I18nKeys as CommonI18nKeys, CalorieCheckerI18nKeys as I18nKeys } from 'shared/i18n-keys';
import { FoodType, foodUnitI18nKeys, FoodWithPortionAndUnit, I18nNamespace } from 'shared/models';
import { isFraction } from 'shared/utils';

interface CalorieCheckerFoodWithSwitchProps {
  food: FoodWithPortionAndUnit;
}

type CalorieCheckerFoodSelectedAmount = 'original' | '100-grams-or-milliliters';

export default function CalorieCheckerFoodWithSwitch({
  food: { type, name, nameZh, portion, unit, weight, calorie },
}: CalorieCheckerFoodWithSwitchProps) {
  const { t, i18n } = useTranslation(I18nNamespace.CalorieChecker);
  const [selectedAmount, setSelectedAmount] =
    useState<CalorieCheckerFoodSelectedAmount>('original');
  const portionWithUnit =
    portion === '1/2'
      ? t(I18nKeys.HalfPortionWithUnit_unit, {
          unit: t(foodUnitI18nKeys[unit]).toLowerCase(),
        })
      : t(I18nKeys.PortionWithUnit_portion_unit, {
          portion,
          unit: t(foodUnitI18nKeys[unit], {
            count: isFraction(portion) ? 1 : Number(portion),
          }).toLowerCase(),
        });
  const weightWithUnit =
    type === FoodType.Drinks
      ? t(CommonI18nKeys.Milliliter_amount, { amount: weight })
      : t(CommonI18nKeys.Grams_amount, { amount: weight });

  const portionAndWeight = t(I18nKeys.PortionAndWeightInBrackets_portion_weight, {
    portion: portionWithUnit,
    weight: weightWithUnit,
  });

  const options: { value: CalorieCheckerFoodSelectedAmount; label: string }[] = [
    {
      value: 'original',
      label: portionAndWeight,
    },
    {
      value: '100-grams-or-milliliters',
      label:
        type === FoodType.Drinks
          ? t(CommonI18nKeys.Milliliter_amount, { amount: 100 })
          : t(CommonI18nKeys.Grams_amount, { amount: 100 }),
    },
  ];

  const caloriesPerOneHundredGramsOrMilliliters = Math.round((calorie / weight) * 100);

  return (
    <div className="food">
      <header className="food__header">{i18n.resolvedLanguage === 'en' ? name : nameZh}</header>
      <div className="food__grid">
        <span className="food__property">{t(CommonI18nKeys.Amount)}</span>
        <Radio.Group
          options={options}
          optionType="button"
          value={selectedAmount}
          onChange={(v) => setSelectedAmount(v.target.value)}
          size="small"
        />
        <span className="food__property">{t(CommonI18nKeys.Calories)}</span>
        <span>
          {t(CommonI18nKeys.Kilocalorie_amount, {
            amount:
              selectedAmount === 'original' ? calorie : caloriesPerOneHundredGramsOrMilliliters,
          })}
        </span>
      </div>
    </div>
  );
}
