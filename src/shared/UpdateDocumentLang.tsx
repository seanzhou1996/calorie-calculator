import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function UpdateDocumentLang(): null {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage;
  }, [i18n.resolvedLanguage]);

  return null;
}

export default UpdateDocumentLang;
