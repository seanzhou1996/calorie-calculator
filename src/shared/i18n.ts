import i18n, { ResourceLanguage } from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from 'locales/en.json';
import zh from 'locales/zh-hk.json';
import zhYue from 'locales/zh-yue.json';
import { Language, allLanguages, StorageKey } from './models';

enum Format {
  Lowercase = 'lowercase',
}

const resources: Record<Language, ResourceLanguage> = {
  [Language.En]: { translation: en },
  [Language.ZhHK]: { translation: zh },
  [Language.ZhYue]: { translation: zhYue },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: allLanguages,
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
