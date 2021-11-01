import React from 'react';
import { PersonInfo } from 'shared/models';
import { computeBMR, computeTarget } from 'shared/utils';
import { useTranslation } from 'react-i18next';
import { I18nKeys } from 'shared/i18n-keys';
import ResultSectionChoosingFood from './ResultSectionChoosingFood';
import ResultSectionYourAnswers from './ResultSectionYourAnswers';
import ResultSectionHowCalculationWorks from './ResultSectionHowCalculationWorks';
import ResultSectionDietPlan from './ResultSectionDietPlan';
import ResultSectionAdvice from './ResultSectionAdvice';
import ResultSectionHowToEatWell from './ResultSectionHowToEatWell';

interface CalorieResultProps {
  personInfo: PersonInfo;
}

function ResultPage({ personInfo }: CalorieResultProps) {
  const { t } = useTranslation();
  const { age, sex, height, weight, activityLevel, goal } = personInfo;
  const bmr = computeBMR(age, sex, height, weight);
  const target = computeTarget(bmr, activityLevel, goal);

  return (
    <div>
      <div className="result-panel">
        <h1 className="title">{t(I18nKeys.ResultsTitle)}</h1>
        <span className="number">{Math.round(target)}</span>
        <span className="label">{t(I18nKeys.CaloriesPerDay)}</span>
      </div>

      <ResultSectionDietPlan target={target} />
      <ResultSectionChoosingFood />
      <ResultSectionAdvice goal={goal} />
      <ResultSectionHowToEatWell />
      <ResultSectionHowCalculationWorks />
      <ResultSectionYourAnswers personInfo={personInfo} />
    </div>
  );
}

export default ResultPage;
