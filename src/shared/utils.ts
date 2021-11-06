/* eslint-disable @typescript-eslint/no-shadow */
import * as Yup from 'yup';
import { ActivityLevel, FullFormModel, Sex, GoalType } from './models';

const activityRates: Record<ActivityLevel, number> = {
  [ActivityLevel.Sendentary]: 1.2,
  [ActivityLevel.Light]: 1.375,
  [ActivityLevel.Moderate]: 1.55,
  [ActivityLevel.Active]: 1.725,
  [ActivityLevel.ExtraActive]: 1.9,
};

const goalRates: Record<GoalType, number> = {
  [GoalType.Balance]: 1,
  [GoalType.Bulk]: 1.1,
  [GoalType.Cut]: 0.9,
};

export const computeBMR: (age: number, sex: Sex, height: number, weight: number) => number = (
  age,
  sex,
  height,
  weight
) => {
  if (!age || !sex || !height) {
    return 0;
  }
  return 10 * weight + 6.25 * height - 5 * age + (sex === 'male' ? 5 : -161);
};

export const computeTDEE: (bmr: number, activityLevel: ActivityLevel) => number = (
  bmr,
  activityLevel
) => bmr * activityRates[activityLevel];

export const computeTarget: (
  bmr: number,
  actvityLevel: ActivityLevel,
  goalType: GoalType
) => number = (bmr, actvityLevel, goalType) =>
  bmr * activityRates[actvityLevel] * goalRates[goalType];

export function isFormValid(values: FullFormModel, schema: Yup.AnySchema): boolean {
  return schema.isValidSync(values);
}

export function formatDate(date: number | Date): string {
  return new Intl.DateTimeFormat().format(date);
}

export function getLocaleTime(date: number | Date): string {
  return new Intl.DateTimeFormat([], { timeStyle: 'short' }).format(date);
}

export function isFraction(string: string): boolean {
  return string.includes('/');
}
