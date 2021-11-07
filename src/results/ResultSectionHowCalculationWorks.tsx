import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import { HowCalculationWorksI18nKeys as I18nKeys } from 'shared/i18n-keys';
import { I18nNamespace, RoutePath } from 'shared/models';

export default function ResultSectionHowCalculationWorks() {
  const { t } = useTranslation([I18nNamespace.HowCalculationWorks]);
  return (
    <section className="page-section">
      <header>{t(I18nKeys.Title)}</header>
      <p>{t(I18nKeys.IntroActiveVoice)}</p>
      <ul>
        <li>{t(I18nKeys.CalculateBMR)}</li>
        <li>{t(I18nKeys.CalculateTDEE)}</li>
        <li>{t(I18nKeys.CaterToFitnessGoal)}</li>
      </ul>
      <p></p>
      <p>
        <Trans
          t={t}
          i18nKey={I18nKeys.LearnMoreAboutHowCalculationWorks_Link}
          components={{ Link: <Link to={RoutePath.HowCalculationWorks} /> }}
        />
      </p>
    </section>
  );
}
