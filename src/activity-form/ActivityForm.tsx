import React from 'react';
import { Button, Space, Collapse } from 'antd';
import { CaretRightFilled } from '@ant-design/icons';
import {
  Formik, Form, FormikConfig, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';
import { Radio } from '../formik-antd';
import {
  ActivityFormModel as FormModel,
  ActivityFormField as FormField,
  activityLabels,
  ActivityLevel,
} from '../model';
import { getActivityLevelFromStore } from '../service';

const { Panel } = Collapse;

interface FormProps {
  onSubmitForm: (data: FormModel) => void;
}

const allActivityLevels = Object.values(ActivityLevel);

const schema = Yup.object().shape({
  [FormField.Level]: Yup.string()
    .nullable()
    .required('Select an option'),
});

export default function ActivityForm({ onSubmitForm }: FormProps) {
  const history = useHistory();
  const initialValue: FormModel = {
    activityLevel: getActivityLevelFromStore(),
  };
  const activityOptions = allActivityLevels.map((type) => (
    <Radio
      name={FormField.Level}
      key={type}
      value={type}
    >
      { activityLabels[type] }
    </Radio>
  ));

  const handleSubmit: FormikConfig<FormModel>['onSubmit'] = (values, { setSubmitting }) => {
    onSubmitForm(values);
    setSubmitting(false);
    history.push('/goal');
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
            <h1>How much exercise do you do per week?</h1>

            <div className="hint">
              <Collapse
                ghost
                className="hint__expander"
                expandIcon={({ isActive }) => (
                  <CaretRightFilled
                    rotate={isActive ? 90 : 0}
                    className="hint__expand-icon"
                  />
                )}
              >
                <Panel
                  key={1}
                  header={<span className="hint__header">What counts?</span>}
                  className="hint__panel"
                >
                  <div className="hint__content">
                    <p>
                      All activities that make you breathe faster and
                      feel warmer. For example:
                    </p>
                    <ul>
                      <li>jogging</li>
                      <li>swimming</li>
                      <li>tennis</li>
                      <li>dancing</li>
                    </ul>
                    <p>
                      If your work involves manual labor, count it so you can get
                      more accurate results.
                    </p>
                  </div>
                </Panel>
              </Collapse>
            </div>

            <div className={classnames('input-wrapper', (errors.activityLevel && touched.activityLevel) ? 'input-wrapper--error' : null)}>
              <ErrorMessage
                component="span"
                name={FormField.Level}
                className="error-message"
              />
              <Radio.Group
                name={FormField.Level}
                size="large"
                className="control"
              >
                <Space
                  direction="vertical"
                  size={12}
                >
                  {activityOptions}
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
              Continue
            </Button>
          </Form>
        )
      }
    </Formik>
  );
}
