import React from 'react';
import { Table, TableProps } from 'antd';
import { mealLabels, mealPortions, MealType } from 'shared/models';

const { Column } = Table;

interface TableRow {
  meal: string;
  percent: string;
  calorie: number;
}

interface MealTableProps extends Omit<TableProps<TableRow>, 'columns' | 'dataSource'> {
  calorieTarget: number;
}

const allMealTypes = Object.values(MealType);

export const MealTable = ({ calorieTarget, ...restProps }: MealTableProps) => {
  const dataSource: TableRow[] = allMealTypes.map((type) => ({
    meal: mealLabels[type],
    key: type,
    percent: `${mealPortions[type] * 100}%`,
    calorie: Math.round(mealPortions[type] * calorieTarget),
  }));

  return (
    <Table size="large" dataSource={dataSource} {...restProps}>
      <Column title="Meal" dataIndex="meal" key="meal" />
      <Column title="% of daily target" dataIndex="percent" key="percent" className="align-right" />
      <Column title="Calorie" dataIndex="calorie" key="calorie" className="align-right" />
    </Table>
  );
};

export default MealTable;
