import React from 'react';
import { Collapse } from 'antd';
import {
  activityLabelI18nKeys,
  genderI18nKeys,
  goalLabelI18nKeys,
  PersonInfo,
  SummaryListRow,
} from 'shared/models';
import { computeBMR, computeTarget } from 'shared/utils';
import { ActivityRateTable } from './activity-rate-table/ActivityRateTable';
import { MealTable } from './meal-table/MealTable';
import { useHistory } from 'react-router';
import SummaryList from 'shared/SummaryList';
import { Link } from 'react-router-dom';
import { ReactComponent as ArrowRightCircle } from 'assets/icon-arrow-right-circle.svg';
import { useTranslation } from 'react-i18next';
import { I18nKeys } from 'result/i18n-keys';

const { Panel } = Collapse;

const targetToFood = (target: number, calorie: number) => (target / calorie).toFixed(1);

interface CalorieResultProps {
  personInfo: PersonInfo;
}

function ResultPage({ personInfo }: CalorieResultProps) {
  const { t } = useTranslation();
  const history = useHistory();
  const { age, gender, height, weight, activityLevel, goal } = personInfo;
  const bmr = computeBMR(age, gender, height, weight);

  // const tdee = computeTDEE(bmr, activityLevel);
  const target = computeTarget(bmr, activityLevel, goal);
  const food = [
    {
      name: t(I18nKeys.BigMac),
      icon: '🍔',
      calorie: 1080,
    },
    {
      name: t(I18nKeys.ChickenRice),
      icon: '🍚',
      calorie: 607,
    },
  ];
  const summaryListData: SummaryListRow[] = [
    {
      key: `1. ${t(I18nKeys.PersonalDetails)}`,
      value: (
        <ul className="personal-info-list">
          <li>
            {t(I18nKeys.Age)}: {age}
          </li>
          <li>
            {t(I18nKeys.Gender)}: {t(genderI18nKeys[gender])}
          </li>
          <li>
            {t(I18nKeys.Height)}: {height} cm
          </li>
          <li>
            {t(I18nKeys.Weight)}: {weight} kg
          </li>
        </ul>
      ),
      action: {
        name: t(I18nKeys.Change),
        callback: () => history.push('/'),
      },
    },
    {
      key: `2. ${t(I18nKeys.ActivityPageTitle)}`,
      value: t(activityLabelI18nKeys[activityLevel]),
      action: {
        name: t(I18nKeys.Change),
        callback: () => history.push('/activity'),
      },
    },
    {
      key: `3. ${t(I18nKeys.GoalPageTitle)}`,
      value: t(I18nKeys.ToAchieveGoal_goal, { goal: t(goalLabelI18nKeys[goal]) }),
      action: {
        name: t(I18nKeys.Change),
        callback: () => history.push('/goal'),
      },
    },
  ];

  return (
    <div>
      <div className="result-panel">
        <h1 className="title">{t(I18nKeys.ResultsTitle)}</h1>
        <span className="number">{Math.round(target)}</span>
        <span className="label">{t(I18nKeys.CaloriesPerDay)}</span>
      </div>

      <section className="page-section">
        {/* <p>The UK National Health Service suggests spreading daily energy input as follows:</p>
          <ul>
            <li>breakfast: 20%</li>
            <li>lunch: 30%</li>
            <li>dinner: 30%</li>
            <li>drinks and snacks: 20%</li>
          </ul> */}
        <header>{t(I18nKeys.DietTitle)}</header>
        <p>{t(I18nKeys.DietFirstParagraph)}</p>
        <MealTable calorieTarget={target} pagination={false} className="meal-table" />
        <p>{t(I18nKeys.DietSecondParagraph)}</p>
        <p>{t(I18nKeys.DietThirdParagraph)}</p>
      </section>

      <section className="page-section">
        <header>{t(I18nKeys.CompareTitle)}</header>
        <p>{t(I18nKeys.YourTargetIsEquivalentTo)}</p>
        <div className="food-list">
          {food.map(({ name, icon, calorie }, index) => (
            <div key={index} className="food">
              <div className="food__header">
                <span className="food__quantity">{targetToFood(target, calorie)} </span>
                <span>{t(I18nKeys.Servings).toLowerCase()}</span>
              </div>
              <div className="food__name">
                <span className="food__icon">{icon}</span>
                <span>{name}</span>
              </div>
              <div className="food__calorie">
                {t(I18nKeys.CaloriesPerServing_amount, { amount: calorie })}
              </div>
            </div>
          ))}
        </div>
        <div className="action">
          <Link to="/" className="action__link">
            <ArrowRightCircle className="action__icon" />
            <span>{t(I18nKeys.CheckCaloriesInOtherFood)}</span>
          </Link>
        </div>
      </section>

      <section className="page-section">
        <header>{t(I18nKeys.AnswersTitle)}</header>
        <button
          onClick={() => {
            history.push('/');
          }}
          className="start-again-button"
        >
          <span>{t(I18nKeys.StartAgain)}</span>
        </button>
        <SummaryList data={summaryListData} />
      </section>
      <Collapse style={{ display: 'none' }} bordered={false}>
        <Panel key={2} header="Learn how is calorie calculated">
          <div>
            <p>First, compute basal metabolic rate (BMR).</p>
            <p>Mifflin-St Jeor Equation is used:</p>
            <ul>
              <li>
                <span>For men:</span>
                <pre>{'BMR = 10 * weight\n      + 6.25 * height\n      - 5 * age\n      + 5'}</pre>
              </li>
              <li>
                <span>For women:</span>
                <pre>
                  {'BMR = 10 * weight\n      + 6.25 * height\n      - 5 * age\n      - 161'}
                </pre>
              </li>
            </ul>
            <p>Weight and height are in kg and cm, respectively.</p>
            <p>
              Then, obtain total daily energy expenditure (TDEE) by multiplying BMR with an activity
              rate.
            </p>
            <pre className="tdee-equation">TDEE = BMR * activityRate</pre>
            <p>Activity rate table:</p>
            <ActivityRateTable pagination={false} className="activity-rate-table" />
            <p>Lastly, adjust TDEE according to selected goal:</p>
            <ul>
              <li>Maintain weight: same as TDEE</li>
              <li>Gain muscle: add 10%</li>
              <li>Lose fat: reduce 10%</li>
            </ul>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
}

export default ResultPage;
