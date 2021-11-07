import { I18nKeys, CalorieCheckerI18nKeys } from 'shared/i18n-keys';
import * as Yup from 'yup';

export enum RoutePath {
  Home = '/',
  PersonalDetails = '/personal-details',
  ActivityLevel = '/activity-level',
  FitnessGoal = '/fitness-goal',
  Results = '/results',
  CalorieChecker = '/calorie-checker',
  HowCalculationWorks = '/how-calculation-works',
  WeightLossGuide = '/weight-loss-guide',
  WeightGainGuide = '/weight-gain-guide',
  EatWellGuide = '/eat-well-guide',
  AboutThisApp = '/about-this-app',
}

export enum Language {
  En = 'en',
  ZhHk = 'zh',
  // ZhYue = 'zh-yue-HK',
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
  CalorieChecker = 'calorie-checker',
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
  Sedentary = 'sedentary',
  Light = 'light',
  Moderate = 'moderate',
  Active = 'active',
  ExtraActive = 'extraActive',
}

export const activityRates: Record<ActivityLevel, number> = {
  [ActivityLevel.Sedentary]: 1.2,
  [ActivityLevel.Light]: 1.375,
  [ActivityLevel.Moderate]: 1.55,
  [ActivityLevel.Active]: 1.725,
  [ActivityLevel.ExtraActive]: 1.9,
};

export const activityLabelI18nKeys: Record<ActivityLevel, I18nKeys> = {
  [ActivityLevel.Sedentary]: I18nKeys.SedentaryHours,
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
  [GoalType.Cut]: I18nKeys.LoseWeight,
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
  action?: SummaryListAction;
}

export interface SummaryListProps {
  data: SummaryListRow[];
}

export enum FoodType {
  Grains = 'grains',
  MeatFishEggAlternatives = 'meat_fish_egg_alternatives',
  Vegetables = 'vegetables',
  Fruits = 'fruits',
  ReadyToEatDishes = 'ready_to_eat_dishes',
  BreadCakesPastries = 'bread_cakes_pastries',
  ChineseDimSum = 'chinese_dim_sum',
  Snacks = 'snacks',
  OtherReadyToEatFoods = 'other_ready_to_eat_foods',
  Drinks = 'drinks',
  FatsAndOils = 'fat_and_oils',
  Others = 'others',
}

export const allFoodTypes = Object.values(FoodType);

export const foodTypeI18nKeys: Record<FoodType, CalorieCheckerI18nKeys> = {
  [FoodType.Grains]: CalorieCheckerI18nKeys.Grains,
  [FoodType.MeatFishEggAlternatives]: CalorieCheckerI18nKeys.MeatFishEggAlternatives,
  [FoodType.Vegetables]: CalorieCheckerI18nKeys.Vegetables,
  [FoodType.Fruits]: CalorieCheckerI18nKeys.Fruits,
  [FoodType.ReadyToEatDishes]: CalorieCheckerI18nKeys.ReadyToEatDishes,
  [FoodType.BreadCakesPastries]: CalorieCheckerI18nKeys.BreadCakesPastries,
  [FoodType.ChineseDimSum]: CalorieCheckerI18nKeys.ChineseDimSum,
  [FoodType.Snacks]: CalorieCheckerI18nKeys.Snacks,
  [FoodType.OtherReadyToEatFoods]: CalorieCheckerI18nKeys.OtherReadyToEatFoods,
  [FoodType.Drinks]: CalorieCheckerI18nKeys.Drinks,
  [FoodType.FatsAndOils]: CalorieCheckerI18nKeys.FatsAndOils,
  [FoodType.Others]: CalorieCheckerI18nKeys.Others,
};

export interface Food {
  type: FoodType;
  name: string;
  nameZh: string;
  portion: string | null;
  unit: FoodUnit | null;
  weight: number;
  calorie: number;
}

export interface FoodWithPortionAndUnit extends Food {
  portion: string;
  unit: FoodUnit;
}

export enum FoodUnit {
  BowlAlt = 'bowl-alt',
  Bowl = 'bowl',
  Slice = 'slice',
  Link = 'link',
  Chop = 'chop',
  Thigh = 'thigh',
  Wing = 'wing',
  Duck = 'duck',
  Goose = 'goose',
  Fillet = 'fillet',
  PieceAlt = 'piece-alt',
  PieceAlt_2 = 'piece-alt-2',
  Piece = 'piece',
  Large = 'large',
  Block = 'block',
  Tablespoon = 'tablespoon',
  Stalk = 'stalk',
  Ear = 'ear',
  Mushroom = 'mushroom',
  Medium = 'medium',
  Plate = 'plate',
  Kernel = 'kernel',
  Candy = 'candy',
  Bar = 'bar',
  Scoop = 'scoop',
  Ball = 'ball',
  Bag = 'bag',
  Portion = 'portion',
  Cup = 'cup',
  Can = 'can',
}

export const foodUnitI18nKeys: Record<FoodUnit, CalorieCheckerI18nKeys> = {
  [FoodUnit.BowlAlt]: CalorieCheckerI18nKeys.BowlAlt,
  [FoodUnit.Bowl]: CalorieCheckerI18nKeys.Bowl,
  [FoodUnit.Slice]: CalorieCheckerI18nKeys.Slice,
  [FoodUnit.Link]: CalorieCheckerI18nKeys.Link,
  [FoodUnit.Chop]: CalorieCheckerI18nKeys.Chop,
  [FoodUnit.Thigh]: CalorieCheckerI18nKeys.Thigh,
  [FoodUnit.Wing]: CalorieCheckerI18nKeys.Wing,
  [FoodUnit.Duck]: CalorieCheckerI18nKeys.Duck,
  [FoodUnit.Goose]: CalorieCheckerI18nKeys.Goose,
  [FoodUnit.Fillet]: CalorieCheckerI18nKeys.Fillet,
  [FoodUnit.PieceAlt]: CalorieCheckerI18nKeys.PieceAlt,
  [FoodUnit.PieceAlt_2]: CalorieCheckerI18nKeys.PieceAlt_2,
  [FoodUnit.Piece]: CalorieCheckerI18nKeys.Piece,
  [FoodUnit.Large]: CalorieCheckerI18nKeys.Large,
  [FoodUnit.Block]: CalorieCheckerI18nKeys.Block,
  [FoodUnit.Tablespoon]: CalorieCheckerI18nKeys.Tablespoon,
  [FoodUnit.Stalk]: CalorieCheckerI18nKeys.Stalk,
  [FoodUnit.Ear]: CalorieCheckerI18nKeys.Ear,
  [FoodUnit.Mushroom]: CalorieCheckerI18nKeys.Mushroom,
  [FoodUnit.Medium]: CalorieCheckerI18nKeys.Medium,
  [FoodUnit.Plate]: CalorieCheckerI18nKeys.Plate,
  [FoodUnit.Kernel]: CalorieCheckerI18nKeys.Kernel,
  [FoodUnit.Candy]: CalorieCheckerI18nKeys.Candy,
  [FoodUnit.Bar]: CalorieCheckerI18nKeys.Bar,
  [FoodUnit.Scoop]: CalorieCheckerI18nKeys.Scoop,
  [FoodUnit.Ball]: CalorieCheckerI18nKeys.Ball,
  [FoodUnit.Bag]: CalorieCheckerI18nKeys.Bag,
  [FoodUnit.Portion]: CalorieCheckerI18nKeys.Portion,
  [FoodUnit.Cup]: CalorieCheckerI18nKeys.Cup,
  [FoodUnit.Can]: CalorieCheckerI18nKeys.Can,
};
