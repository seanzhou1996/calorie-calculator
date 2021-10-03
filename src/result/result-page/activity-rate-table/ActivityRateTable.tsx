import { Table, TableProps } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { activityLabelI18nKeys, activityRates, ActivityLevel } from 'shared/models';

interface TableRow {
  activityLevel: string;
  rate: number;
}

type MealTableProps = Omit<TableProps<TableRow>, 'columns' | 'dataSource'>;

const allActivityTypes = Object.values(ActivityLevel);
const tableColumns: ColumnsType<TableRow> = [
  {
    title: 'Exercise per week',
    dataIndex: 'activityLevel',
    key: 'activityLevel',
  },
  {
    title: 'Activity rate',
    dataIndex: 'rate',
    key: 'rate',
  },
];
const tableData: TableRow[] = allActivityTypes.map((type) => ({
  key: type,
  activityLevel: activityLabelI18nKeys[type],
  rate: activityRates[type],
}));

export const ActivityRateTable = (props: MealTableProps) => (
  <Table columns={tableColumns} dataSource={tableData} {...props} />
);

export default ActivityRateTable;
