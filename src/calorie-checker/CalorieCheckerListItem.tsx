import React from 'react';
import { Food } from 'shared/models';
import CalorieCheckerListItemWithNoControl from './CalorieCheckerListItemWithNoControl';
import CalorieCheckerListItemWithSwitch from './CalorieCheckerListItemWithSwitch';

interface CalorieCheckerListItemProps {
  food: Food;
}

export default function CalorieCheckerListItem({ food }: CalorieCheckerListItemProps) {
  if (!food.portion || !food.unit) {
    return <CalorieCheckerListItemWithNoControl food={food} />;
  }
  return <CalorieCheckerListItemWithSwitch food={food} />;
}
