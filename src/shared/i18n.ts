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
import { I18nNamespace, Language, StorageKey } from './models';

enum Format {
  Lowercase = 'lowercase',
}

const allI18nNamespaces = Object.values(I18nNamespace);

const resources: Record<Language, ResourceLanguage> = {
  [Language.En]: {
    [I18nNamespace.General]: en,
    [I18nNamespace.PersonalDetails]: personalDetailsEn,
    [I18nNamespace.HowItWorks]: howItWorksEn,
  },
  [Language.ZhHk]: {
    [I18nNamespace.General]: zh,
    [I18nNamespace.PersonalDetails]: personalDetailsZh,
    [I18nNamespace.HowItWorks]: howItWorksZh,
  },
  [Language.ZhYue]: {
    [I18nNamespace.General]: zhYue,
    [I18nNamespace.PersonalDetails]: personalDetailsZhYue,
    [I18nNamespace.HowItWorks]: howItWorksZhYue,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    ns: allI18nNamespaces,
    defaultNS: I18nNamespace.General,
    fallbackNS: [I18nNamespace.PersonalDetails, I18nNamespace.HowItWorks],
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
