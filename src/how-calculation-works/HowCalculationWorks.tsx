import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  I18nKeys as CommonI18nKeys,
  HowCalculationWorksI18nKeys as I18nKeys,
} from 'shared/i18n-keys';
import ActivityRateTable from 'how-calculation-works/HowCalculationWorksActivityRateTable';
import { I18nNamespace, RoutePath } from 'shared/models';
import BaseGoBackButton from 'shared/BaseGoBackButton';

export default function HowCalculationWorks() {
  const { t } = useTranslation(I18nNamespace.HowCalculationWorks);
  return (
    <div className="width-container">
      <BaseGoBackButton to={RoutePath.Results} titleOverride={t(CommonI18nKeys.GoBackToResults)} />
      <div className="how-it-works">
        <h1>{t(I18nKeys.Title)}</h1>
        <p>{t(I18nKeys.Intro)}</p>
        <ol className="summary">
          <li>{t(I18nKeys.CalculateBMR)}</li>
          <li>{t(I18nKeys.CalculateTDEE)}</li>
          <li>{t(I18nKeys.CaterToFitnessGoal)}</li>
        </ol>
        <section>
          <h2>1. {t(I18nKeys.CalculateBMR)}</h2>
          <p>{t(I18nKeys.StepOneFirstPara)}</p>
          <strong>{t(I18nKeys.HowTo)}</strong>
          <p>{t(I18nKeys.StepOneSecondPara)}</p>
          <strong>{t(I18nKeys.BMREquationName)}</strong>
          <ul>
            <li>
              <div>{t(I18nKeys.ForMen)}</div>
              <span>
                10 × {t(CommonI18nKeys.Weight).toLowerCase()} + 6.25 ×{' '}
                {t(CommonI18nKeys.Height).toLowerCase()} - 5 × {t(CommonI18nKeys.Age).toLowerCase()}{' '}
                + 5
              </span>
            </li>
            <li>
              <div>{t(I18nKeys.FOrWomen)}</div>
              <span>
                10 × {t(CommonI18nKeys.Weight).toLowerCase()} + 6.25 ×{' '}
                {t(CommonI18nKeys.Height).toLowerCase()} - 5 × {t(CommonI18nKeys.Age).toLowerCase()}{' '}
                - 161
              </span>
            </li>
          </ul>
          <p>{t(I18nKeys.StepOneThirdPara)}</p>
        </section>
        <section>
          <h2>2. {t(I18nKeys.CalculateTDEE)}</h2>
          <p>{t(I18nKeys.StepTwoFirstPara)}</p>
          <ul>
            <li>{t(I18nKeys.TheBMR)}</li>
            <li>{t(I18nKeys.FoodThermicEffect)}</li>
            <li>{t(I18nKeys.ActivityThermicEffect)}</li>
          </ul>
          <p>{t(I18nKeys.StepTwoSecondPara)}</p>
          <strong>{t(I18nKeys.HowTo)}</strong>
          <p>{t(I18nKeys.StepTwoThirdPara)}</p>
          <p>{t(I18nKeys.StepTwoFourthPara)}</p>
          <strong>{t(I18nKeys.ActivityLevelFactorTableName)}</strong>
          <ActivityRateTable pagination={false} className="activity-rate-table" />
        </section>
        <section>
          <h2>3. {t(I18nKeys.CaterToFitnessGoal)}</h2>
          <p>{t(I18nKeys.StepThreeFirstPara)}</p>
          <p>{t(I18nKeys.StepThreeSecondPara)}</p>
          <ul>
            <li>{t(I18nKeys.WeightGainingExplanation)}</li>
            <li>{t(I18nKeys.WeightLossExplanation)}</li>
          </ul>
          <strong>{t(I18nKeys.HowTo)}</strong>
          <p>{t(I18nKeys.StepThreeThirdPara)}</p>
          <p>{t(I18nKeys.StepThreeFourthPara)}</p>
          <p>{t(I18nKeys.StepThreeFifthPara)}</p>
        </section>
      </div>
      <BaseGoBackButton to={RoutePath.Results} titleOverride={t(CommonI18nKeys.GoBackToResults)} />
    </div>
  );
}
