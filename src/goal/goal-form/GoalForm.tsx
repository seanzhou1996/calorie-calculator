import { Button, Space } from 'antd';
import React, { useContext } from 'react';
import { Formik, Form, FormikConfig, ErrorMessage } from 'formik';
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';
import { Radio } from 'shared/formik-antd';
import {
  GoalFormModel as FormModel,
  GoalFormField as FormField,
  goalLabels,
  GoalType,
  GoalSchema,
} from 'shared/model';

import { getFormModelFromStore } from 'shared/service';
import FullFormModelContext from 'shared/fullFormModelContext';

const allGoals = Object.values(GoalType);

const getGoalFormModelFromStore: () => FormModel = () => {
  const formModel = getFormModelFromStore();
  return { goal: formModel.goal };
};

export default function GoalForm() {
  const { formModel, setFormModel } = useContext(FullFormModelContext);
  const history = useHistory();
  const initialValue: FormModel = getGoalFormModelFromStore();

  const goalOptions = allGoals.map((goal) => (
    <Radio name={FormField.Goal} key={goal} value={goal}>
      {goalLabels[goal].toLowerCase()}
    </Radio>
  ));

  const handleSubmit: FormikConfig<FormModel>['onSubmit'] = (values, { setSubmitting }) => {
    const updatedFormModel = { ...formModel, ...values };
    setFormModel(updatedFormModel);
    setSubmitting(false);
    history.push('/result');
  };

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={GoalSchema}
      onSubmit={handleSubmit}
      validateOnBlur
      validateOnChange
    >
      {({ errors, touched, isSubmitting }) => (
        <Form name="goal" className="goal-form">
          <header>
            <h1>What is your fitness goal?</h1>
          </header>

          <div className="hint">
            <p>If you want to improve your body shape, think what you can do to achieve it.</p>
          </div>

          <div
            className={classnames(
              'input-wrapper',
              'element',
              errors.goal && touched.goal && 'input-wrapper--error'
            )}
          >
            <p className="element">I want to:</p>
            <ErrorMessage component="span" name={FormField.Goal} className="error-message" />
            <Radio.Group name={FormField.Goal} size="large" className="element control">
              <Space direction="vertical" size={12}>
                {goalOptions}
              </Space>
            </Radio.Group>
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
      )}
    </Formik>
  );
}
