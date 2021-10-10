import i18n, { ResourceLanguage } from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from 'locales/en.json';
import zh from 'locales/zh-hk.json';
import zhYue from 'locales/zh-yue.json';
import howItWorksEn from 'locales/how-it-works/en.json';
import howItWorksZh from 'locales/how-it-works/zh-hk.json';
import howItWorksZhYue from 'locales/how-it-works/zh-yue.json';
import { Language, StorageKey } from './models';

enum Format {
  Lowercase = 'lowercase',
}

const resources: Record<Language, ResourceLanguage> = {
  [Language.En]: { general: en, 'how-it-works': howItWorksEn },
  [Language.ZhHk]: { general: zh, 'how-it-works': howItWorksZh },
  [Language.ZhYue]: { general: zhYue, 'how-it-works': howItWorksZhYue },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    ns: ['general', 'how-it-works'],
    defaultNS: 'general',
    fallbackNS: ['how-it-works'],
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
