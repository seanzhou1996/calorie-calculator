/* eslint-disable @typescript-eslint/no-shadow */
import {
  ActivityLevel, Gender, GoalType, PersonalInfoFormModel, Validity,
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
  Validity = 'validity',
  PersonalInfo = 'personalInfo',
  ActivityLevel = 'activityLevel',
  Goal = 'goal',
}

export function storeValidity(value: Validity): void {
  localStorage.setItem(StorageKey.Validity, JSON.stringify(value));
}

export function storePersonalInfo(value: PersonalInfoFormModel): void {
  localStorage.setItem(StorageKey.PersonalInfo, JSON.stringify(value));
}

export function storeActivityLevel(value: ActivityLevel): void {
  localStorage.setItem(StorageKey.ActivityLevel, value);
}

export function storeGoal(value: GoalType): void {
  localStorage.setItem(StorageKey.Goal, value);
}

export function getValidityFromStore(): Validity {
  const item = localStorage.getItem(StorageKey.Validity);
  return !item ? null : JSON.parse(item);
}

export function getPersonalInfoFromStore(): PersonalInfoFormModel {
  const item = localStorage.getItem(StorageKey.PersonalInfo);
  return !item ? ({
    age: null,
    gender: null,
    height: null,
    weight: null,
  }) : JSON.parse(item);
}

export function getActivityLevelFromStore(): ActivityLevel {
  const item = localStorage.getItem(StorageKey.ActivityLevel);

  return !item ? null : item as ActivityLevel;
}

export function getGoalFromStore(): GoalType {
  const item = localStorage.getItem(StorageKey.Goal);

  return !item ? null : item as GoalType;
}
