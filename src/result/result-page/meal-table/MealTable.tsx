import React from 'react';
import { Table, TableProps } from 'antd';
import { mealLabelI18nKeys, mealPortions, MealType } from 'shared/models';
import { useTranslation } from 'react-i18next';
import { I18nKeys } from 'result/i18n-keys';

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
  const { t } = useTranslation();
  const dataSource: TableRow[] = allMealTypes.map((type) => ({
    meal: t(mealLabelI18nKeys[type]),
    key: type,
    percent: `${mealPortions[type] * 100}%`,
    calorie: Math.round(mealPortions[type] * calorieTarget),
  }));

  return (
    <Table size="large" dataSource={dataSource} {...restProps}>
      <Column title={t(I18nKeys.Meal)} dataIndex="meal" key="meal" />
      <Column
        title={t(I18nKeys.TargetPercentage)}
        dataIndex="percent"
        key="percent"
        className="align-right"
      />
      <Column
        title={t(I18nKeys.Calories)}
        dataIndex="calorie"
        key="calorie"
        className="align-right"
      />
    </Table>
  );
};

export default MealTable;
