import { I18nKeys } from 'result/i18n-keys';
import * as Yup from 'yup';

export enum Language {
  En = 'en',
  Zh = 'zh',
  ZhYue = 'zh-yue',
}

export const allLanguages = Object.values(Language);

export type Gender = 'male' | 'female';

export const genderI18nKeys: Record<Gender, I18nKeys> = {
  male: I18nKeys.Male,
  female: I18nKeys.Female,
};

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
  [ActivityLevel.Light]: '1 to 2 hours',
  [ActivityLevel.Moderate]: '3 to 5 hours',
  [ActivityLevel.Active]: '6 to 7 hours',
  [ActivityLevel.ExtraActive]: 'More than 7 hours',
};

export enum ActivityFormField {
  Level = 'activityLevel',
}

export interface ActivityFormModel {
  [ActivityFormField.Level]: ActivityLevel;
}

export enum GoalType {
  Bulk = 'bulk',
  Cut = 'cut',
  Balance = 'balance',
}

export const goalLabels: Record<GoalType, string> = {
  [GoalType.Balance]: 'Maintain current weight',
  [GoalType.Bulk]: 'Gain muscle',
  [GoalType.Cut]: 'Lose fat',
};

export enum GoalFormField {
  Goal = 'goal',
}

export interface GoalFormModel {
  [GoalFormField.Goal]: GoalType;
}

export interface FullFormModel extends PersonalInfoFormModel, ActivityFormModel, GoalFormModel {}

export const emptyFormModel: FullFormModel = {
  age: null,
  gender: null,
  height: null,
  weight: null,
  activityLevel: null,
  goal: null,
};

export type PersonInfo = FullFormModel;

export enum MealType {
  Breakfast = 'breakfast',
  Lunch = 'lunch',
  Dinner = 'dinner',
  DrinksAndSnacks = 'drinksAndSnacks',
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
  [MealType.DrinksAndSnacks]: 'Snacks',
};

const ageSchema = Yup.number()
  .nullable()
  .required('Age is required')
  .integer('Age must be an integer')
  .min(18, 'This calculator is intended for over 18 year olds')
  .max(120, 'The maximum age input is 120');
const heightSchema = Yup.number()
  .nullable()
  .required('Height is required')
  .min(100, 'The minimum height input is 100 cm')
  .max(272, 'The maximum height input is 272 cm');
const weightSchema = Yup.number()
  .nullable()
  .required('Weight is required')
  .min(30, 'The minimum weight input is 30 kg')
  .max(130, 'The maximum weight input is 130 kg');
const genderSchema = Yup.string().nullable().required('Select a gender');
const activityLevelSchema = Yup.string().nullable().required('Select an option');
const goalSchema = Yup.string().nullable().required('Select a goal');

export const PersonalInfoFormSchema = Yup.object().shape({
  [PersonalInfoFormField.Age]: ageSchema,
  [PersonalInfoFormField.Height]: heightSchema,
  [PersonalInfoFormField.Weight]: weightSchema,
  [PersonalInfoFormField.Gender]: genderSchema,
});

export const ActivityFormSchema = Yup.object().shape({
  [ActivityFormField.Level]: activityLevelSchema,
});

export const GoalFormSchema = Yup.object().shape({
  [GoalFormField.Goal]: goalSchema,
});

export const FullFormSchema = Yup.object().shape({
  [PersonalInfoFormField.Age]: ageSchema,
  [PersonalInfoFormField.Height]: heightSchema,
  [PersonalInfoFormField.Weight]: weightSchema,
  [PersonalInfoFormField.Gender]: genderSchema,
  [ActivityFormField.Level]: activityLevelSchema,
  [GoalFormField.Goal]: goalSchema,
});

export enum StorageKey {
  FormData = 'formData',
  Submission = 'submission',
  SubmissionBannerAckTime = 'SubmissionBannerAckTime',
  Lang = 'lang',
  StoreSubmissionFlag = 'storeSubmissionFlag',
}

export interface Submission {
  data: FullFormModel;
  submissionTime: number;
}

export interface SummaryListAction {
  name: string;
  callback: () => void;
}

export interface SummaryListRow {
  key: string;
  value: React.ReactNode;
  action: SummaryListAction;
}

export interface SummaryListProps {
  data: SummaryListRow[];
}
