import i18n, { ResourceLanguage } from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from 'locales/en.json';
import zh from 'locales/zh-hk.json';
import zhYue from 'locales/zh-yue.json';
import personalDetailsEn from 'locales/personal-details/en.json';
import personalDetailsZh from 'locales/personal-details/zh-hk.json';
import personalDetailsZhYue from 'locales/personal-details/zh-yue.json';
import howItWorksEn from 'locales/how-it-works/en.json';
import howItWorksZh from 'locales/how-it-works/zh-hk.json';
import howItWorksZhYue from 'locales/how-it-works/zh-yue.json';
import choosingFoodsEn from 'locales/choosing-foods/choosing-foods-en.json';
import choosingFoodsZh from 'locales/choosing-foods/choosing-foods-zh-hk.json';
import planningDietEn from 'locales/planning-your-diet/planning-your-diet-en.json';
import planningDietZh from 'locales/planning-your-diet/planning-your-diet-zh.json';
import resultSectionHowToLoseWeightEn from 'locales/result-section-how-to-lose-weight/result-section-how-to-lose-weight-en.json';
import resultSectionHowToLoseWeightZh from 'locales/result-section-how-to-lose-weight/result-section-how-to-lose-weight-zh.json';
import resultSectionHowToGainWeightEn from 'locales/result-section-how-to-gain-weight/result-section-how-to-gain-weight-en.json';
import resultSectionHowToGainWeightZh from 'locales/result-section-how-to-gain-weight/result-section-how-to-gain-weight-zh.json';
import resultSectionHowToEatWellEn from 'locales/result-section-how-to-eat-well/result-section-how-to-eat-well-en.json';
import resultSectionHowToEatWellZh from 'locales/result-section-how-to-eat-well/result-section-how-to-eat-well-zh.json';
import { I18nNamespace, Language, StorageKey } from './models';

enum Format {
  Lowercase = 'lowercase',
}

const allI18nNamespaces = Object.values(I18nNamespace);

const resources: Record<Language, ResourceLanguage> = {
  [Language.En]: {
    [I18nNamespace.General]: en,
    [I18nNamespace.PersonalDetails]: personalDetailsEn,
    [I18nNamespace.HowCalculationWorks]: howItWorksEn,
    [I18nNamespace.ChoosingFoods]: choosingFoodsEn,
    [I18nNamespace.PlanningDiet]: planningDietEn,
    [I18nNamespace.ResultSectionHowToLoseWeight]: resultSectionHowToLoseWeightEn,
    [I18nNamespace.ResultSectionHowToGainWeight]: resultSectionHowToGainWeightEn,
    [I18nNamespace.ResultSectionHowToEatWell]: resultSectionHowToEatWellEn,
  },
  [Language.ZhHk]: {
    [I18nNamespace.General]: zh,
    [I18nNamespace.PersonalDetails]: personalDetailsZh,
    [I18nNamespace.HowCalculationWorks]: howItWorksZh,
    [I18nNamespace.ChoosingFoods]: choosingFoodsZh,
    [I18nNamespace.PlanningDiet]: planningDietZh,
    [I18nNamespace.ResultSectionHowToLoseWeight]: resultSectionHowToLoseWeightZh,
    [I18nNamespace.ResultSectionHowToGainWeight]: resultSectionHowToGainWeightZh,
    [I18nNamespace.ResultSectionHowToEatWell]: resultSectionHowToEatWellZh,
  },
  [Language.ZhYue]: {
    [I18nNamespace.General]: zhYue,
    [I18nNamespace.PersonalDetails]: personalDetailsZhYue,
    [I18nNamespace.HowCalculationWorks]: howItWorksZhYue,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    ns: allI18nNamespaces,
    defaultNS: I18nNamespace.General,
    fallbackNS: [I18nNamespace.PersonalDetails, I18nNamespace.HowCalculationWorks],
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: StorageKey.Lang,
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
      format: function (value: string, format?: string) {
        switch (format) {
          case Format.Lowercase:
            return value.toLowerCase();
        }
        return value;
      },
    },
  });
