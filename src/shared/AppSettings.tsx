import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RadioChangeEvent, Radio, Switch } from 'antd';
import { I18nKeys } from 'result/i18n-keys';
import { ReactComponent as CloseIcon } from 'assets/icon-close.svg';
import { allLanguages, Language } from './models';
import { SaveSubmissionFlagContext } from './saveSubmissionFlagContext';

interface AppSettingsProps {
  onClose: () => void;
}

const languageLabels: Record<Language, string> = {
  [Language.En]: 'English',
  [Language.ZhHk]: '繁體中文',
  [Language.ZhYue]: '粵語（香港）',
};

function AppSettings({ onClose }: AppSettingsProps) {
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
        <div className="setting">
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
        <div className="setting">
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

        <div className="links">
          {/** TODO update links **/}
          <Link to="/" className="links__item">
            {t(I18nKeys.Acknowledgements)}
          </Link>
          <Link to="/" className="links__item">
            {t(I18nKeys.ReportProblem)}
          </Link>
        </div>

        <footer>2021 Sean Zhou</footer>
      </div>
    </div>
  );
}

export default AppSettings;
