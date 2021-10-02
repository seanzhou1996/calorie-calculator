import React from 'react';
import { useTranslation } from 'react-i18next';
import { I18nKeys } from 'result/i18n-keys';
import PersonalInfoForm from './personal-info-form/PersonalInfoForm';

function Home() {
  const { t } = useTranslation();
  return (
    <div className="width-container">
      <header>
        <h1>{t(I18nKeys.CalorieCalculator)}</h1>
      </header>
      <div>
        <p>{t(I18nKeys.HomeFirstParagraph)}</p>
        <ul>
          <li>{t(I18nKeys.GainMuscle)}</li>
          <li>{t(I18nKeys.LoseFat)}</li>
          <li>{t(I18nKeys.MaintainWeight)}</li>
        </ul>
        <p>{t(I18nKeys.HomeSecondParagraph)}</p>
      </div>
      <PersonalInfoForm />
    </div>
  );
}

export default Home;
