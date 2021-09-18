import React from 'react';
import { InputNumber as AntInputNumber, InputNumberProps as $InputNumberProps } from 'antd';
import { FieldProps } from 'formik';
import { Field } from './field';
import { FormikFieldProps } from './field-props';

export type InputNumberProps = FormikFieldProps & $InputNumberProps;

export const InputNumber = ({
  name,
  validate,
  fast,
  onChange: $onChange,
  onBlur: $onBlur,
  ...restProps
}: InputNumberProps) => (
  <Field
    name={name}
    validate={validate}
    fast={fast}
  >
    {
      ({ field: { value, onBlur }, form: { setFieldValue } }: FieldProps) => (
        <AntInputNumber
          name={name}
          value={value}
          onChange={(v) => {
            setFieldValue(name, v);
            $onChange && $onChange(v);
          }}
          onBlur={(event) => {
            onBlur(event);
            $onBlur && $onBlur(event);
          }}
          {...restProps}
        />
      )
    }
  </Field>
);

export default InputNumber;
