export type Gender = 'male' | 'female';

export enum ActivityType {
  Sendentary = 'sendentary',
  Light = 'light',
  Moderate = 'moderate',
  Active = 'active',
  ExtraActive = 'extraActive',
}

export interface ActivityLevel {
  rate: number;
  name: string,
}

export enum FormField {
  Age = 'age',
  Gender = 'gender',
  Height = 'height',
  Weight = 'weight',
  ActivityLevel = 'activityLevel',
  Goal = 'goal'
}

export interface FormModel {
  [FormField.Age]: number;
  [FormField.Gender]: 'male' | 'female';
  [FormField.Height]: number; // cm
  [FormField.Weight]: number; // kg
  [FormField.ActivityLevel]: ActivityType;
  [FormField.Goal]: Goal;
}

export type PersonInfo = FormModel;

export enum Goal {
  Balance = 'balance',
  Bulk = 'bulk',
  Cut = 'cut'
}

export const goalLabels: Record<Goal, string> = {
  [Goal.Balance]: 'Maintain weight',
  [Goal.Bulk]: 'Gain muscle',
  [Goal.Cut]: 'Lose fat',
};

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
