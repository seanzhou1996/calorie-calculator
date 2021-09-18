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
  ActivityLevel = 'activityLevel'
}

export interface FormModel {
  [FormField.Age]: number;
  [FormField.Gender]: 'male' | 'female';
  [FormField.Height]: number; // cm
  [FormField.ActivityLevel]: ActivityType;
}
