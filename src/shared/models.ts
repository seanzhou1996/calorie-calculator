import { I18nKeys } from 'result/i18n-keys';
import * as Yup from 'yup';

export enum RoutePath {
  Home = '/',
  PersonalDetails = '/personal-details',
  ActivityLevel = '/activity-level',
  Goal = '/goal',
  Results = '/results',
  How = '/how',
  WeightLossGuide = '/weight-loss-guide',
  WeightGainGuide = '/weight-gain-guide',
  EatWellGuide = '/eat-well-guide',
}

export enum Language {
  En = 'en',
  ZhHk = 'zh',
  ZhYue = 'zh-yue-HK',
}

export enum I18nNamespace {
  General = 'general',
  PersonalDetails = 'personal-details',
  HowCalculationWorks = 'how-calculation-works',
  ChoosingFoods = 'choosing-foods',
  PlanningDiet = 'planning-diet',
  ResultSectionHowToLoseWeight = 'result-section-how-to-lose-weight',
  ResultSectionHowToGainWeight = 'result-section-how-to-gain-weight',
  ResultSectionHowToEatWell = 'result-section-how-to-eat-well',
}

export const allLanguages = Object.values(Language);

export type Sex = 'male' | 'female';

export const sexI18nKeys: Record<Sex, I18nKeys> = {
  male: I18nKeys.Male,
  female: I18nKeys.Female,
};

export enum PersonalInfoFormField {
  Age = 'age',
  Sex = 'sex',
  Height = 'height',
  Weight = 'weight',
}

export interface PersonalInfoFormModel {
  [PersonalInfoFormField.Age]: number;
  [PersonalInfoFormField.Sex]: Sex;
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

export const activityLabelI18nKeys: Record<ActivityLevel, I18nKeys> = {
  [ActivityLevel.Sendentary]: I18nKeys.SendentaryHours,
  [ActivityLevel.Light]: I18nKeys.LightHours,
  [ActivityLevel.Moderate]: I18nKeys.ModerateHours,
  [ActivityLevel.Active]: I18nKeys.ActiveHours,
  [ActivityLevel.ExtraActive]: I18nKeys.ExtraActiveHours,
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

export const goalLabelI18nKeys: Record<GoalType, I18nKeys> = {
  [GoalType.Balance]: I18nKeys.MaintainWeight,
  [GoalType.Bulk]: I18nKeys.GainMuscle,
  [GoalType.Cut]: I18nKeys.LoseFat,
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
  sex: null,
  height: null,
  weight: null,
  activityLevel: null,
  goal: null,
};

export interface FormState {
  formData: FullFormModel;
  updatedAt: number;
}

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

export const mealLabelI18nKeys: Record<MealType, I18nKeys> = {
  [MealType.Breakfast]: I18nKeys.Breakfast,
  [MealType.Lunch]: I18nKeys.Lunch,
  [MealType.Dinner]: I18nKeys.Dinner,
  [MealType.DrinksAndSnacks]: I18nKeys.Snacks,
};

const ageSchema = Yup.number()
  .nullable()
  .required(I18nKeys.FieldIsRequired_field)
  .integer(I18nKeys.FieldMustBeInteger_field)
  .min(18, I18nKeys.FieldCannotBeLowerThan_field_min)
  .max(120, I18nKeys.FieldCannotBeHigherThan_field_max);
const heightSchema = Yup.number()
  .nullable()
  .required(I18nKeys.FieldIsRequired_field)
  .min(100, I18nKeys.FieldCannotBeLowerThan_field_min)
  .max(272, I18nKeys.FieldCannotBeHigherThan_field_max);
const weightSchema = Yup.number()
  .nullable()
  .required(I18nKeys.FieldIsRequired_field)
  .min(30, I18nKeys.FieldCannotBeLowerThan_field_min)
  .max(130, I18nKeys.FieldCannotBeHigherThan_field_max);
const sexSchema = Yup.string().nullable().required(I18nKeys.ChooseAnOption_field);
const activityLevelSchema = Yup.string().nullable().required(I18nKeys.ChooseAnOption);
const goalSchema = Yup.string().nullable().required(I18nKeys.ChooseAnOption_field);

export const PersonalInfoFormSchema = Yup.object().shape({
  [PersonalInfoFormField.Age]: ageSchema,
  [PersonalInfoFormField.Height]: heightSchema,
  [PersonalInfoFormField.Weight]: weightSchema,
  [PersonalInfoFormField.Sex]: sexSchema,
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
  [PersonalInfoFormField.Sex]: sexSchema,
  [ActivityFormField.Level]: activityLevelSchema,
  [GoalFormField.Goal]: goalSchema,
});

export enum StorageKey {
  FormState = 'formState',
  Submission = 'submission',
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
