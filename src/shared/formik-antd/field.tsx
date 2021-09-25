import React from 'react';
import { Field as FormikField, FastField } from 'formik';
import { FormikFieldProps } from './field-props';

export const Field: React.FC<FormikFieldProps> = ({ fast, children, ...restProps }) => {
  if (fast) {
    return <FastField {...restProps}>{children}</FastField>;
  }
  return <FormikField {...restProps}>{children}</FormikField>;
};

export default Field;
