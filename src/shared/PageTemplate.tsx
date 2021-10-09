import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { I18nKeys } from 'result/i18n-keys';
import AppSettings from './AppSettings';

function PageTemplate({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { t } = useTranslation();
  const [showSettings, setShowSettings] = useState(false);
  const toggleSettings = () => setShowSettings(!showSettings);

  useEffect(() => {
    if (showSettings) {
      setShowSettings(false);
    }
  }, [location]);

  return (
    <div className="page">
      <header className="page-header">
        <div className="width-container">
          <div className="page-header__inner">
            <Link to="/" className="page-header__link">
              <div className="app-logo">{t(I18nKeys.CalorieCalculator)}</div>
            </Link>
            <button
              className={classNames('toggle-settings-button', showSettings ? 'open' : null)}
              onClick={toggleSettings}
            >
              {t(I18nKeys.Settings)}
            </button>
          </div>
        </div>
        {!showSettings ? null : <AppSettings onClose={() => setShowSettings(false)} />}
      </header>
      <main className="page-body">{children}</main>
    </div>
  );
}

export default PageTemplate;
