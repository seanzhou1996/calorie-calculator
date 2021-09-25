import React, { useContext } from 'react';
import { Button, Space, Collapse } from 'antd';
import { CaretRightFilled } from '@ant-design/icons';
import { Formik, Form, FormikConfig, ErrorMessage } from 'formik';
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';
import { Radio } from 'shared/formik-antd';
import {
  ActivityFormModel as FormModel,
  ActivityFormField as FormField,
  activityLabels,
  ActivityLevel,
  ActivityFormSchema,
} from 'shared/model';
import { getFormModelFromStore } from 'shared/service';
import FullFormModelContext from 'shared/fullFormModelContext';

const { Panel } = Collapse;

const getActivityFormModelFromStore: () => FormModel = () => {
  const formModel = getFormModelFromStore();
  return { activityLevel: formModel.activityLevel };
};

const allActivityLevels = Object.values(ActivityLevel);

export default function ActivityForm() {
  const { formModel, setFormModel } = useContext(FullFormModelContext);
  const history = useHistory();
  const initialValue: FormModel = getActivityFormModelFromStore();
  const activityOptions = allActivityLevels.map((type) => (
    <Radio name={FormField.Level} key={type} value={type}>
      {activityLabels[type]}
    </Radio>
  ));

  const handleSubmit: FormikConfig<FormModel>['onSubmit'] = (values, { setSubmitting }) => {
    const updatedFormModel = { ...formModel, ...values };
    setFormModel(updatedFormModel);
    setSubmitting(false);
    history.push('/goal');
  };

  return (
    <Formik
      initialValues={initialValue}
      onSubmit={handleSubmit}
      validationSchema={ActivityFormSchema}
      validateOnBlur
      validateOnChange
    >
      {({ errors, touched, isSubmitting }) => (
        <Form name="activity-level" className="activity-form">
          <header>
            <h1>How much exercise do you do per week?</h1>
          </header>

          <div className="hint">
            <Collapse
              ghost
              className="hint__expander"
              expandIcon={({ isActive }) => (
                <CaretRightFilled rotate={isActive ? 90 : 0} className="hint__expand-icon" />
              )}
            >
              <Panel
                key={1}
                header={<span className="hint__header">What counts?</span>}
                className="hint__panel"
              >
                <div className="hint__content">
                  <p>All activities that make you breathe faster and feel warmer. For example:</p>
                  <ul>
                    <li>jogging</li>
                    <li>swimming</li>
                    <li>tennis</li>
                    <li>dancing</li>
                  </ul>
                  <p>
                    If your work involves manual labor, count it so you can get more accurate
                    results.
                  </p>
                </div>
              </Panel>
            </Collapse>
          </div>

          <div
            className={classnames(
              'input-wrapper',
              errors.activityLevel && touched.activityLevel ? 'input-wrapper--error' : null
            )}
          >
            <ErrorMessage component="span" name={FormField.Level} className="error-message" />
            <Radio.Group name={FormField.Level} size="large" className="control">
              <Space direction="vertical" size={12}>
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
      )}
    </Formik>
  );
}
