import i18n, { ResourceLanguage } from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from 'locales/en.json';
import zh from 'locales/zh-hk.json';
import { Language, allLanguages, StorageKey } from './models';

enum Format {
  Lowercase = 'lowercase',
}

const resources: Record<Language, ResourceLanguage> = {
  en: { translation: en },
  zh: { translation: zh },
  'zh-yue': { translation: {} },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: allLanguages,
    nonExplicitSupportedLngs: true,
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
