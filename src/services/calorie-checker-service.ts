import { parse } from 'papaparse';
import { Food } from 'shared/models';

const url = `${process.env.PUBLIC_URL}/food-calorie-table.csv`;

export const listFoodCalories: () => Promise<Food[]> = () => {
  return new Promise((resolve) => {
    parse<Food>(url, {
      delimiter: ',',
      download: true,
      header: true,
      transformHeader: (header) => header.trim(),
      transform: (value, field) => {
        const _value = value.trim();
        if (field === 'weight' || field === 'calorie') {
          return Number(_value);
        }
        return _value === 'n/a' ? null : _value;
      },
      complete: ({ data }) => resolve(data),
    });
  });
};
