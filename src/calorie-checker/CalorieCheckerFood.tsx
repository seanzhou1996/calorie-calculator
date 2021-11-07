import React from 'react';
import { Food } from 'shared/models';
import CalorieCheckerFoodWithNoControl from './CalorieCheckerFoodWithNoControl';
import CalorieCheckerFoodWithSwitch from './CalorieCheckerFoodWithSwitch';

interface CalorieCheckerFoodProps {
  food: Food;
}

export default function CalorieCheckerFood({ food }: CalorieCheckerFoodProps) {
  if (!food.portion || !food.unit) {
    return <CalorieCheckerFoodWithNoControl food={food} />;
  }
  return <CalorieCheckerFoodWithSwitch food={food} />;
}
