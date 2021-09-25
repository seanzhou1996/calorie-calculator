import React from 'react';
import { Table, TableProps } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { mealLabels, mealPortions, MealType } from 'shared/models';

interface TableRow {
  meal: string;
  portion: string;
  calorie: number;
}

interface MealTableProps extends Omit<TableProps<TableRow>, 'columns' | 'dataSource'> {
  calorieTarget: number;
}

const allMealTypes = Object.values(MealType);
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

export const MealTable = ({ calorieTarget, ...restProps }: MealTableProps) => {
  const dataSource: TableRow[] = allMealTypes.map((type) => ({
    meal: mealLabels[type],
    key: type,
    portion: `${mealPortions[type] * 100}%`,
    calorie: Math.round(mealPortions[type] * calorieTarget),
  }));

  return <Table columns={tableColumns} dataSource={dataSource} {...restProps} />;
};

export default MealTable;
