import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { I18nKeys } from './i18n-keys';

function UpdateDocumentLang(): null {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage;
    document.title = t(I18nKeys.CalorieCalculator);
  }, [i18n.resolvedLanguage]);

  return null;
}

export default UpdateDocumentLang;
