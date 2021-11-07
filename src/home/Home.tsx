import { Button } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { I18nKeys } from 'shared/i18n-keys';
import { RoutePath } from 'shared/models';
import HomeResultNotification from './HomeResultNotification';

function Home() {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <div className="width-container">
      <header>
        <h1 className="app-title">{t(I18nKeys.CalorieCalculator)}</h1>
      </header>
      <HomeResultNotification />
      <div className="intro">
        <p className="intro__lead">{t(I18nKeys.HomeFirstParagraph)}</p>
        <p>{t(I18nKeys.HomeSecondParagraph)}</p>
        <p>{t(I18nKeys.HomeThirdParagraph)}</p>
      </div>
      <Button
        size="large"
        type="primary"
        htmlType="button"
        onClick={() => history.push(RoutePath.PersonalDetails)}
        block
      >
        {t(I18nKeys.StartNow)}
      </Button>
    </div>
  );
}

export default Home;
