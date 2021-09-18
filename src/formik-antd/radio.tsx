import React from 'react';
import { Radio as AntRadio, RadioProps as $RadioProps, RadioGroupProps as $RadioGroupProps } from 'antd';
import { FieldProps } from 'formik';
import { FormikFieldProps } from './field-props';
import { Field } from './field';

export type RadioProps = FormikFieldProps & $RadioProps;
export type RadioGroupProps = FormikFieldProps & $RadioGroupProps;

export const Radio = ({
  name,
  validate,
  fast,
  onChange: $onChange,
  ...restProps
}: RadioProps) => (
  <Field
    name={name}
    validate={validate}
    fast={fast}
  >
    {({ field: { value }, form: { setFieldValue, setFieldTouched } }: FieldProps) => (
      <AntRadio
        name={name}
        value={value}
        onChange={(event) => {
          setFieldValue(name, event.target.value);
          setFieldTouched(name, true, false);
          $onChange && $onChange(event);
        }}
        {...restProps}
      />
    )}
  </Field>
);

Radio.Group = ({
  name,
  validate,
  fast,
  onChange: $onChange,
  ...restProps
}: RadioGroupProps) => (
  <Field
    name={name}
    validate={validate}
    fast={fast}
  >
    {({ field: { value }, form: { setFieldValue, setFieldTouched } }: FieldProps) => (
      <AntRadio.Group
        value={value}
        onChange={(event) => {
          setFieldValue(name, event.target.value);
          setFieldTouched(name, true, false);
          $onChange && $onChange(event);
        }}
        {...restProps}
      />
    )}
  </Field>
);

Radio.Button = AntRadio.Button;

export default Radio;
