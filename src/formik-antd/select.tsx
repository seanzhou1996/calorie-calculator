import React from 'react';
import { Select as AntSelect, SelectProps as $SelectProps } from 'antd';
import { FieldProps } from 'formik';
import { FormikFieldProps } from './field-props';
import { Field } from './field';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SelectProps<T = any> = FormikFieldProps & $SelectProps<T>;

export const Select = ({
  name,
  validate,
  fast,
  children,
  onChange: $onChange,
  onBlur: $onBlur,
  ...restProps
}: SelectProps) => (
  <Field name={name} validate={validate} fast={fast}>
    {({ field: { value }, form: { setFieldValue, setFieldTouched } }: FieldProps) => (
      <AntSelect
        onChange={(v, option) => {
          setFieldValue(name, v, true);
          $onChange && $onChange(v, option);
        }}
        onBlur={(event) => {
          setFieldTouched(name, true);
          $onBlur && $onBlur(event);
        }}
        value={!value ? undefined : value}
        {...restProps}
      >
        {children}
      </AntSelect>
    )}
  </Field>
);

Select.Option = AntSelect.Option;
Select.OptGroup = AntSelect.OptGroup;

export default Select;
