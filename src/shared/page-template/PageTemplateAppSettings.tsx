import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RadioChangeEvent, Radio, Switch } from 'antd';
import { I18nKeys } from 'shared/i18n-keys';
import { ReactComponent as CloseIcon } from 'assets/icon-close.svg';
import { allLanguages, Language, RoutePath } from 'shared/models';
import { SaveSubmissionFlagContext } from 'shared/saveSubmissionFlagContext';

interface PageTemplateAppSettingsProps {
  onClose: () => void;
}

const languageLabels: Partial<Record<Language, string>> = {
  [Language.En]: 'English',
  [Language.ZhHk]: '繁體中文',
  // [Language.ZhYue]: '粵語（香港）',
};

export default function PageTemplateAppSettings({ onClose }: PageTemplateAppSettingsProps) {
  const { t, i18n } = useTranslation();
  const { saveSubmissionFlag, setSaveSubmissionFlag } = useContext(SaveSubmissionFlagContext);
  const handleChangeLanguage = (event: RadioChangeEvent) => {
    const lang = event.target.value;
    i18n.changeLanguage(lang);
  };

  return (
    <div className="app-settings">
      <div className="width-container">
        <header className="app-settings__header">
          <span>{t(I18nKeys.Settings)}</span>
          <button className="app-settings__close-button" onClick={() => onClose()}>
            <CloseIcon />
          </button>
        </header>
      </div>
      <div className="setting">
        <div className="width-container">
          <div className="setting__name">語言/Language</div>
          <div className="setting__content">
            <Radio.Group
              value={i18n.resolvedLanguage}
              onChange={handleChangeLanguage}
              className="select-language-control"
            >
              {allLanguages.map((lang) => (
                <Radio key={lang} value={lang} className="select-language-control__radio">
                  {languageLabels[lang]}
                </Radio>
              ))}
            </Radio.Group>
          </div>
        </div>
      </div>
      <div className="setting">
        <div className="width-container">
          <div className="setting__name">{t(I18nKeys.SaveSubmissions)}</div>
          <div className="setting__content">
            <Switch
              checked={saveSubmissionFlag !== false}
              onChange={setSaveSubmissionFlag}
              className="toggle-keep-submission"
            />
            <span>
              {t(
                saveSubmissionFlag !== false
                  ? I18nKeys.SaveResultsParagraph
                  : I18nKeys.DoNotSaveResultsParagraph
              )}
            </span>
          </div>
        </div>
      </div>

      <div className="width-container">
        <div className="links">
          <Link to={RoutePath.AboutThisApp} className="links__item">
            {t(I18nKeys.AboutThisApp)}
          </Link>
          <Link to="/" className="links__item">
            {t(I18nKeys.Disclaimer)}
          </Link>
        </div>

        <footer>2021 · Sean Zhou</footer>
      </div>
    </div>
  );
}
