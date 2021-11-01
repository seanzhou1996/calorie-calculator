import i18n, { ResourceLanguage } from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from 'locales/en.json';
import zh from 'locales/zh-hk.json';
import zhYue from 'locales/zh-yue.json';
import personalDetailsEn from 'locales/personal-details/en.json';
import personalDetailsZh from 'locales/personal-details/zh-hk.json';
import personalDetailsZhYue from 'locales/personal-details/zh-yue.json';
import resultSectionHowCalculationWorksEn from 'locales/result-section-how-calculation-works/result-section-how-calculation-works-en.json';
import resultSectionHowCalculationWorksZh from 'locales/result-section-how-calculation-works/result-section-how-calculation-works-zh-hk.json';
import resultSectionHowCalculationWorksZhYue from 'locales/result-section-how-calculation-works/result-section-how-calculation-works-zh-yue.json';
import resultSectionPlanningDietEn from 'locales/result-section-planning-your-diet/result-section-planning-your-diet-en.json';
import resultSectionPlanningDietZh from 'locales/result-section-planning-your-diet/result-section-planning-your-diet-zh.json';
import resultSectionChoosingFoodsEn from 'locales/result-section-choosing-foods/result-section-choosing-foods-en.json';
import resultSectionChoosingFoodsZh from 'locales/result-section-choosing-foods/result-section-choosing-foods-zh-hk.json';
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
    [I18nNamespace.HowCalculationWorks]: resultSectionHowCalculationWorksEn,
    [I18nNamespace.ChoosingFoods]: resultSectionChoosingFoodsEn,
    [I18nNamespace.PlanningDiet]: resultSectionPlanningDietEn,
    [I18nNamespace.ResultSectionHowToLoseWeight]: resultSectionHowToLoseWeightEn,
    [I18nNamespace.ResultSectionHowToGainWeight]: resultSectionHowToGainWeightEn,
    [I18nNamespace.ResultSectionHowToEatWell]: resultSectionHowToEatWellEn,
  },
  [Language.ZhHk]: {
    [I18nNamespace.General]: zh,
    [I18nNamespace.PersonalDetails]: personalDetailsZh,
    [I18nNamespace.HowCalculationWorks]: resultSectionHowCalculationWorksZh,
    [I18nNamespace.ChoosingFoods]: resultSectionChoosingFoodsZh,
    [I18nNamespace.PlanningDiet]: resultSectionPlanningDietZh,
    [I18nNamespace.ResultSectionHowToLoseWeight]: resultSectionHowToLoseWeightZh,
    [I18nNamespace.ResultSectionHowToGainWeight]: resultSectionHowToGainWeightZh,
    [I18nNamespace.ResultSectionHowToEatWell]: resultSectionHowToEatWellZh,
  },
  [Language.ZhYue]: {
    [I18nNamespace.General]: zhYue,
    [I18nNamespace.PersonalDetails]: personalDetailsZhYue,
    [I18nNamespace.HowCalculationWorks]: resultSectionHowCalculationWorksZhYue,
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
