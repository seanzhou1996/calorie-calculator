import { Button } from 'antd';
import React from 'react';
import {
  Formik, Form, FormikConfig, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';
import { Select } from '../formik-antd';
import {
  GoalFormModel as FormModel,
  GoalFormField as FormField,
  goalLabels,
  GoalType,
} from '../model';

import './GoalForm.less';
import { getGoalFromStore } from '../service';

interface FormProps {
  onSubmitForm: (data: FormModel) => void;
}

const allGoals = Object.values(GoalType);
const { Option } = Select;

const schema = Yup.object().shape({
  [FormField.Goal]: Yup.string()
    .nullable()
    .required('Select a goal'),
});

export default function GoalForm({ onSubmitForm }: FormProps) {
  const history = useHistory();
  const initialValue: FormModel = {
    goal: getGoalFromStore(),
  };

  const goalOptions = allGoals.map((goal) => (
    <Option
      key={goal}
      value={goal}
    >
      { goalLabels[goal].toLowerCase() }
    </Option>
  ));

  const handleSubmit: FormikConfig<FormModel>['onSubmit'] = (values, { setSubmitting }) => {
    onSubmitForm(values);
    setSubmitting(false);
    history.push('/result');
  };

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={schema}
      onSubmit={handleSubmit}
      validateOnBlur
      validateOnChange
    >
      {
        ({ errors, touched, isSubmitting }) => (
          <Form
            name="goal"
            className="goal-form"
          >
            <h1>What is your fitness goal?</h1>

            <div className="hint">
              <p>
                If you want to improve your body shape, think
                what you can do to achieve it.
              </p>
            </div>

            <div className={classnames('input-wrapper', errors.goal && touched.goal && 'input-wrapper--error')}>
              <span className="element">I want to:</span>
              <Select
                name={FormField.Goal}
                dropdownMatchSelectWidth={false}
                size="large"
                className="element control"
                placeholder="select a goal"
                bordered={false}
              >
                {goalOptions}
              </Select>

              <ErrorMessage
                component="span"
                name={FormField.Goal}
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
              Submit
            </Button>
          </Form>
        )
      }
    </Formik>
  );
}
