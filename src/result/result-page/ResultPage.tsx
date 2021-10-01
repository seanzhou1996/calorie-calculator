import React from 'react';
import { Collapse } from 'antd';
import {
  activityLabels,
  genderLabels,
  goalLabels,
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

const { Panel } = Collapse;

const food = [
  {
    name: "McDonald's Big Mac combo",
    icon: '🍔',
    supInfo: 'With medium fries and medium coke',
    calorie: 1080,
  },
  {
    name: 'Hainanese chicken rice',
    icon: '🍚',
    supInfo: 'With skin and sauce',
    calorie: 607,
  },
];

const targetToFood = (target: number, calorie: number) => (target / calorie).toFixed(1);

interface CalorieResultProps {
  personInfo: PersonInfo;
}

function ResultPage({ personInfo }: CalorieResultProps) {
  const history = useHistory();
  const { age, gender, height, weight, activityLevel, goal } = personInfo;
  const bmr = computeBMR(age, gender, height, weight);

  // const tdee = computeTDEE(bmr, activityLevel);
  const target = computeTarget(bmr, activityLevel, goal);
  const summaryListData: SummaryListRow[] = [
    {
      key: '1. Personal details',
      value: (
        <ul className="personal-info-list">
          <li>Age: {age}</li>
          <li>Gender: {genderLabels[gender]}</li>
          <li>Height: {height} cm</li>
          <li>Weight: {weight} kg</li>
        </ul>
      ),
      action: {
        name: 'Change',
        callback: () => history.push('/'),
      },
    },
    {
      key: '2. How much exercise do you do per week?',
      value: activityLabels[activityLevel],
      action: {
        name: 'Change',
        callback: () => history.push('/activity'),
      },
    },
    {
      key: '3. What is your fitness goal?',
      value: `To ${goalLabels[goal].toLowerCase()}`,
      action: {
        name: 'Change',
        callback: () => history.push('/goal'),
      },
    },
  ];

  return (
    <div>
      <div className="result-panel">
        <h1 className="title">Your calorie intake target</h1>
        <span className="number">{Math.round(target)}</span>
        <span className="label">calories / day</span>
      </div>

      <section className="page-section">
        {/* <p>The UK National Health Service suggests spreading daily energy input as follows:</p>
          <ul>
            <li>breakfast: 20%</li>
            <li>lunch: 30%</li>
            <li>dinner: 30%</li>
            <li>drinks and snacks: 20%</li>
          </ul> */}
        <header>Planning your diet</header>
        <p>Here is a guide to how you can spread your intake target throughout the day:</p>
        <MealTable calorieTarget={target} pagination={false} className="meal-table" />
        <p>
          Snack is anything you eat or drink between major meals. It could be an apple, an energy
          bar, or a cup of milk.
        </p>
        <p>You can adjust these allocations as long as they add up to your daily target.</p>
      </section>

      <section className="page-section">
        <header>Comparing your target to food</header>
        <p>Your intake target is equivalent to</p>
        <div className="food-list">
          {food.map(({ name, icon, supInfo, calorie }, index) => (
            <div key={index} className="food">
              <div className="food__header">
                <span className="food__quantity">{targetToFood(target, calorie)} </span>
                <span>servings</span>
              </div>
              <div className="food__name">
                <span className="food__icon">{icon}</span>
                <span>{name}</span>
                <div className="food__sup-info">{supInfo}</div>
              </div>
              <div className="food__calorie">{calorie} calories per serving</div>
            </div>
          ))}
        </div>
        <div className="action">
          <Link to="/" className="action__link">
            <ArrowRightCircle className="action__icon" />
            <span>Check calories in other food</span>
          </Link>
        </div>
      </section>

      <section className="page-section">
        <header>Your answers</header>
        <button
          onClick={() => {
            history.push('/');
          }}
          className="start-again-button"
        >
          <span>Start again</span>
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
