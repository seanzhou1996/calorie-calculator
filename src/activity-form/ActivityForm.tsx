import { Button } from 'antd';
import React from 'react';
import {
  Formik, Form, FormikConfig, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import classnames from 'classnames';
import { Select } from '../formik-antd';
import {
  ActivityFormModel as FormModel,
  ActivityFormField as FormField,
  activityLabels,
  ActivityLevel,
} from '../model';

import './ActivityForm.less';

const { Option } = Select;

const allActivityLevels = Object.values(ActivityLevel);

const schema = Yup.object().shape({
  [FormField.Level]: Yup.string()
    .nullable()
    .required('Select an option'),
});

export default function ActivityForm() {
  const initialValue: FormModel = {
    activityLevel: null,
  };
  const activityOptions = allActivityLevels.map((type) => (
    <Option
      key={type}
      value={type}
    >
      { activityLabels[type].toLowerCase() }
    </Option>
  ));

  const handleSubmit: FormikConfig<FormModel>['onSubmit'] = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValue}
      onSubmit={handleSubmit}
      validationSchema={schema}
      validateOnBlur
      validateOnChange
    >
      {
        ({ errors, touched, isSubmitting }) => (
          <Form
            name="activity-level"
            className="activity-form"
          >
            <h1>How much exercise do you do?</h1>

            <div className="hint">
              <p>Consider sports with some intensity, such as:</p>
              <ul>
                <li>jogging</li>
                <li>rock climbing</li>
                <li>table tennis</li>
              </ul>
              <p>
                For low-intensity sports, deduct some hours as needed
                to get more accurate results.
              </p>
            </div>

            <div className={classnames('input-wrapper', (errors.activityLevel && touched.activityLevel) ? 'input-wrapper--error' : null)}>
              <span className="element">I exercise for</span>
              <Select
                name={FormField.Level}
                placeholder="select an option"
                dropdownMatchSelectWidth={false}
                size="large"
                bordered={false}
                className="element control"
              >
                {activityOptions}
              </Select>
              <span className="element">per week.</span>
              <ErrorMessage
                component="span"
                name={FormField.Level}
                className="error-message"
              />
            </div>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              disabled={isSubmitting}
              className="submit-button"
            >
              Continue
            </Button>
          </Form>
        )
      }
    </Formik>
  );
}
