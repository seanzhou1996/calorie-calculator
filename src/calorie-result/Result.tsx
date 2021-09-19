import React from 'react';
import {
  Collapse, Table, TableProps,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import {
  mealLabels, mealPortions, MealType, PersonInfo,
} from '../model';
import { computeBMR, computeTarget } from '../service';

import './Result.less';

const { Panel } = Collapse;

interface CalorieResultProps {
  personInfo: PersonInfo;
}

interface TableRow {
  meal: string;
  portion: string;
  calorie: number;
}

const allMealTypes = Object.values(MealType);

function CalorieResult({
  personInfo: {
    age, gender, height, weight, activityLevel, goal,
  },
}: CalorieResultProps) {
  const bmr = computeBMR(age, gender, height, weight);

  // const tdee = computeTDEE(bmr, activityLevel);
  const target = computeTarget(bmr, activityLevel, goal);
  const tableColumns: ColumnsType<TableRow> = [
    {
      title: 'Meal type',
      dataIndex: 'meal',
      key: 'meal',
    },
    {
      title: 'Calorie portion',
      dataIndex: 'portion',
      key: 'portion',
    },
    {
      title: 'Calorie amount',
      dataIndex: 'calorie',
      key: 'calorie',
    },
  ];
  const dataSource: TableRow[] = allMealTypes.map((type) => ({
    meal: mealLabels[type],
    key: type,
    portion: `${mealPortions[type] * 100}%`,
    calorie: Math.round(mealPortions[type] * target),
  }));

  const MealTable = (props: Omit<TableProps<TableRow>, 'columns' | 'dataSource'>) => (
    <Table
      columns={tableColumns}
      dataSource={dataSource}
      {...props}
    />
  );

  return (
    <section className="result">
      <header><span>Your target calorie input:</span></header>
      <div className="number-wrapper">
        <span className="number">{ Math.round(target) }</span>
        <span className="label">calories / day</span>
      </div>
      <p>Next actions:</p>
      <Collapse
        bordered={false}
        defaultActiveKey={1}
      >
        <Panel key={1} header="Estimate calorie goal per meal">
          <div className="panel">
            <p>
              The following table shows how you can spread your
              calorie target throughout the day.
            </p>
            <MealTable
              pagination={false}
              className="meal-table"
            />
            <p>
              The portions are per UK National Health Service recommendations.
              View them as suggestions rather than rigid target.
            </p>
          </div>
        </Panel>
      </Collapse>
    </section>
  );
}

export default CalorieResult;
