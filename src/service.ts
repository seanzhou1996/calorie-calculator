/* eslint-disable @typescript-eslint/no-shadow */
import * as Yup from 'yup';
import {
  ActivityLevel,
  FullFormModel,
  Gender,
  GoalType,
} from './model';

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

export const computeBMR = (
  age: number,
  gender: Gender,
  height: number,
  weight: number,
) => {
  if (!age || !gender || !height) {
    return 0;
  }
  return 10 * weight + 6.25 * height - 5 * age + (gender === 'male' ? 5 : -161);
};

export const computeTDEE = (
  bmr: number,
  activityLevel: ActivityLevel,
) => bmr * activityRates[activityLevel];

export const computeTarget = (
  bmr: number,
  actvityLevel: ActivityLevel,
  goalType: GoalType,
) => bmr * activityRates[actvityLevel] * goalRates[goalType];

enum StorageKey {
  FormModel = 'formModel',
}

const emptyFormModel: FullFormModel = {
  age: null,
  gender: null,
  height: null,
  weight: null,
  activityLevel: null,
  goal: null,
};

export function storeFormModel(value: FullFormModel): void {
  localStorage.setItem(StorageKey.FormModel, JSON.stringify(value));
}

export function getFormModelFromStore(): FullFormModel {
  const item = localStorage.getItem(StorageKey.FormModel);
  return !item ? emptyFormModel : JSON.parse(item);
}

export function isFormValid(values: FullFormModel, schema: Yup.AnySchema): boolean {
  return schema.isValidSync(values);
}
