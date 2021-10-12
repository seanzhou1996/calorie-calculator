import React from 'react';
import { LeftOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { I18nKeys, HowItWorksI18nKeys } from 'result/i18n-keys';
import ActivityRateTable from 'result/result-page/activity-rate-table/ActivityRateTable';
import { useHistory } from 'react-router';
import { RoutePath } from 'shared/models';

function HowItWorks() {
  const { t } = useTranslation();
  const history = useHistory();
  return (
    <div className="width-container">
      <button onClick={() => history.push(RoutePath.Results)} className="go-back-button">
        <LeftOutlined className="icon" />
        <span>{t(HowItWorksI18nKeys.GoBackToResults)}</span>
      </button>
      <div className="how-it-works">
        <h1>{t(HowItWorksI18nKeys.Title)}</h1>
        <p>{t(HowItWorksI18nKeys.Intro)}</p>
        <ol className="summary">
          <li>{t(HowItWorksI18nKeys.CalculateBMR)}</li>
          <li>{t(HowItWorksI18nKeys.CalculateTDEE)}</li>
          <li>{t(HowItWorksI18nKeys.CaterToFitnessGoal)}</li>
        </ol>
        <section>
          <h2>1. {t(HowItWorksI18nKeys.CalculateBMR)}</h2>
          <p>{t(HowItWorksI18nKeys.StepOneFirstPara)}</p>
          <strong>{t(HowItWorksI18nKeys.HowTo)}</strong>
          <p>{t(HowItWorksI18nKeys.StepOneSecondPara)}</p>
          <strong>{t(HowItWorksI18nKeys.BMREquationName)}</strong>
          <ul>
            <li>
              <div>{t(HowItWorksI18nKeys.ForMen)}</div>
              <span>
                10 × {t(I18nKeys.Weight).toLowerCase()} + 6.25 × {t(I18nKeys.Height).toLowerCase()}{' '}
                - 5 × {t(I18nKeys.Age).toLowerCase()} + 5
              </span>
            </li>
            <li>
              <div>{t(HowItWorksI18nKeys.FOrWomen)}</div>
              <span>
                10 × {t(I18nKeys.Weight).toLowerCase()} + 6.25 × {t(I18nKeys.Height).toLowerCase()}{' '}
                - 5 × {t(I18nKeys.Age).toLowerCase()} - 161
              </span>
            </li>
          </ul>
          <p>{t(HowItWorksI18nKeys.StepOneThirdPara)}</p>
        </section>
        <section>
          <h2>2. {t(HowItWorksI18nKeys.CalculateTDEE)}</h2>
          <p>{t(HowItWorksI18nKeys.StepTwoFirstPara)}</p>
          <ul>
            <li>{t(HowItWorksI18nKeys.TheBMR)}</li>
            <li>{t(HowItWorksI18nKeys.FoodThermicEffect)}</li>
            <li>{t(HowItWorksI18nKeys.ActivityThermicEffect)}</li>
          </ul>
          <p>{t(HowItWorksI18nKeys.StepTwoSecondPara)}</p>
          <strong>{t(HowItWorksI18nKeys.HowTo)}</strong>
          <p>{t(HowItWorksI18nKeys.StepTwoThirdPara)}</p>
          <p>{t(HowItWorksI18nKeys.StepTwoFourthPara)}</p>
          <strong>{t(HowItWorksI18nKeys.ActivityLevelFactorTableName)}</strong>
          <ActivityRateTable pagination={false} className="activity-rate-table" />
        </section>
        <section>
          <h2>3. {t(HowItWorksI18nKeys.CaterToFitnessGoal)}</h2>
          <p>{t(HowItWorksI18nKeys.StepThreeFirstPara)}</p>
          <p>{t(HowItWorksI18nKeys.StepThreeSecondPara)}</p>
          <ul>
            <li>{t(HowItWorksI18nKeys.WeightGainingExplanation)}</li>
            <li>{t(HowItWorksI18nKeys.WeightLossExplanation)}</li>
          </ul>
          <strong>{t(HowItWorksI18nKeys.HowTo)}</strong>
          <p>{t(HowItWorksI18nKeys.StepThreeThirdPara)}</p>
          <p>{t(HowItWorksI18nKeys.StepThreeFourthPara)}</p>
          <p>{t(HowItWorksI18nKeys.StepThreeFifthPara)}</p>
        </section>
      </div>
      <button onClick={() => history.push(RoutePath.Results)} className="go-back-button">
        <LeftOutlined className="icon" />
        <span>{t(HowItWorksI18nKeys.GoBackToResults)}</span>
      </button>
    </div>
  );
}

export default HowItWorks;
