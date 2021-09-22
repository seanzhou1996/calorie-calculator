export type Gender = 'male' | 'female';

export enum PersonalInfoFormField {
  Age = 'age',
  Gender = 'gender',
  Height = 'height',
  Weight = 'weight',
}

export interface PersonalInfoFormModel {
  [PersonalInfoFormField.Age]: number;
  [PersonalInfoFormField.Gender]: Gender;
  [PersonalInfoFormField.Height]: number; // cm
  [PersonalInfoFormField.Weight]: number; // kg
}

export enum ActivityLevel {
  Sendentary = 'sendentary',
  Light = 'light',
  Moderate = 'moderate',
  Active = 'active',
  ExtraActive = 'extraActive',
}

export const activityRates: Record<ActivityLevel, number> = {
  [ActivityLevel.Sendentary]: 1.2,
  [ActivityLevel.Light]: 1.375,
  [ActivityLevel.Moderate]: 1.55,
  [ActivityLevel.Active]: 1.725,
  [ActivityLevel.ExtraActive]: 1.9,
};

export const activityLabels: Record<ActivityLevel, string> = {
  [ActivityLevel.Sendentary]: 'Less than 1 hour',
  [ActivityLevel.Light]: '1-2 hours',
  [ActivityLevel.Moderate]: '3-5 hours',
  [ActivityLevel.Active]: '6-7 hours',
  [ActivityLevel.ExtraActive]: 'More than 7 hours',
};

export enum ActivityFormField {
  Level = 'activityLevel',
}

export interface ActivityFormModel {
  [ActivityFormField.Level]: ActivityLevel;
}

export enum GoalType {
  Balance = 'balance',
  Bulk = 'bulk',
  Cut = 'cut'
}

export const goalLabels: Record<GoalType, string> = {
  [GoalType.Balance]: 'Maintain weight',
  [GoalType.Bulk]: 'Gain muscle',
  [GoalType.Cut]: 'Lose fat',
};

export enum GoalFormField {
  Goal = 'goal',
}

export interface GoalFormModel {
  [GoalFormField.Goal]: GoalType;
}

export interface PersonInfo extends PersonalInfoFormModel, ActivityFormModel, GoalFormModel {
}

export enum MealType {
  Breakfast = 'breakfast',
  Lunch = 'lunch',
  Dinner = 'dinner',
  DrinksAndSnacks = 'drinksAndSnacks'
}

export const mealPortions: Record<MealType, number> = {
  [MealType.Breakfast]: 0.2,
  [MealType.Lunch]: 0.3,
  [MealType.Dinner]: 0.3,
  [MealType.DrinksAndSnacks]: 0.2,
};

export const mealLabels: Record<MealType, string> = {
  [MealType.Breakfast]: 'Breakfast',
  [MealType.Lunch]: 'Lunch',
  [MealType.Dinner]: 'Dinner',
  [MealType.DrinksAndSnacks]: 'Drinks and snacks',
};
