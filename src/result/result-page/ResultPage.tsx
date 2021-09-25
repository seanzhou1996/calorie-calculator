import React from 'react';
import { Collapse } from 'antd';
import { PersonInfo } from 'shared/model';
import { computeBMR, computeTarget } from 'shared/service';
import { ActivityRateTable } from './activity-rate-table/ActivityRateTable';
import { MealTable } from './meal-table/MealTable';

const { Panel } = Collapse;

interface CalorieResultProps {
  personInfo: PersonInfo;
}

function ResultPage({
  personInfo: { age, gender, height, weight, activityLevel, goal },
}: CalorieResultProps) {
  const bmr = computeBMR(age, gender, height, weight);

  // const tdee = computeTDEE(bmr, activityLevel);
  const target = computeTarget(bmr, activityLevel, goal);
  return (
    <section className="result">
      <header>
        <h1 className="title">Your target calorie input:</h1>
      </header>
      <div className="number-wrapper">
        <span className="number">{Math.round(target)}</span>
        <span className="label">calories / day</span>
      </div>
      <p>Next actions:</p>
      <Collapse bordered={false} defaultActiveKey={1}>
        <Panel key={1} header="Estimate calorie goal per meal">
          <div className="panel">
            <p>
              The following table shows how you can spread your calorie target throughout the day.
            </p>
            <MealTable calorieTarget={target} pagination={false} className="meal-table" />
            <p>
              The portions are per UK National Health Service recommendations. View them as
              suggestions rather than rigid targets.
            </p>
          </div>
        </Panel>
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
    </section>
  );
}

export default ResultPage;
