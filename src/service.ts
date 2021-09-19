import { ActivityType, Gender, Goal } from './model';

const activityRates: Record<ActivityType, number> = {
  [ActivityType.Sendentary]: 1.2,
  [ActivityType.Light]: 1.375,
  [ActivityType.Moderate]: 1.55,
  [ActivityType.Active]: 1.725,
  [ActivityType.ExtraActive]: 1.9,
};

const goalRates: Record<Goal, number> = {
  [Goal.Balance]: 1,
  [Goal.Bulk]: 1.1,
  [Goal.Cut]: 0.9,
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
  activityLevel: ActivityType,
) => bmr * activityRates[activityLevel];

export const computeTarget = (
  bmr: number,
  actvityLevel: ActivityType,
  goalType: Goal,
) => bmr * activityRates[actvityLevel] * goalRates[goalType];
