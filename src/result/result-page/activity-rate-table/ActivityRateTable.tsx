import React from 'react';
import { Table, TableProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { HowItWorksI18nKeys } from 'shared/i18n-keys';
import { activityLabelI18nKeys, activityRates, ActivityLevel } from 'shared/models';

const { Column } = Table;

interface TableRow {
  activityLevel: string;
  rate: number;
}

type MealTableProps = Omit<TableProps<TableRow>, 'columns' | 'dataSource'>;

const allActivityTypes = Object.values(ActivityLevel);

export function ActivityRateTable(props: MealTableProps) {
  const { t } = useTranslation();
  const tableData: TableRow[] = allActivityTypes.map((type) => ({
    key: type,
    activityLevel: t(activityLabelI18nKeys[type]),
    rate: activityRates[type],
  }));

  return (
    <Table size="large" dataSource={tableData} {...props}>
      <Column
        title={t(HowItWorksI18nKeys.WeeklyExerciseAmount)}
        dataIndex="activityLevel"
        key="activityLevel"
      />
      <Column
        title={t(HowItWorksI18nKeys.ActivityLevelFactor)}
        dataIndex="rate"
        key="rate"
        className="align-right"
      />
    </Table>
  );
}

export default ActivityRateTable;
