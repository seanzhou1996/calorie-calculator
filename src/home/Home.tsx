import React from 'react';
import { useTranslation } from 'react-i18next';
import { I18nKeys } from 'result/i18n-keys';
import PersonalInfoForm from './personal-info-form/PersonalInfoForm';
import ResultNotification from './ResultNotification';

function Home() {
  const { t } = useTranslation();

  return (
    <div className="width-container">
      <ResultNotification />
      <header>
        <h1>{t(I18nKeys.CalorieCalculator)}</h1>
      </header>
      <div className="home__intro">
        <p>{t(I18nKeys.HomeFirstParagraph)}</p>
        <ul>
          <li>{t(I18nKeys.GainMuscle).toLowerCase()}</li>
          <li>{t(I18nKeys.LoseFat).toLowerCase()}</li>
        </ul>
        <p>{t(I18nKeys.HomeSecondParagraph)}</p>
        <p>{t(I18nKeys.HomeThirdParagraph)}</p>
      </div>
      <PersonalInfoForm />
    </div>
  );
}

export default Home;
