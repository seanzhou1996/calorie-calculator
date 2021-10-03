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
  activityLabelI18nKeys,
  ActivityLevel,
  ActivityFormSchema,
  FullFormModel,
} from 'shared/models';
import { AllFormDataContext } from 'shared/allFormDataContext';
import { I18nKeys } from 'result/i18n-keys';
import { useTranslation } from 'react-i18next';

const { Panel } = Collapse;

const getActivityFormData: (values: FullFormModel) => FormModel = (values) => {
  return { activityLevel: values.activityLevel };
};

const exampleActivityI18nKeys: I18nKeys[] = [
  I18nKeys.Jogging,
  I18nKeys.Swimming,
  I18nKeys.Tennis,
  I18nKeys.Dancing,
];

const allActivityLevels = Object.values(ActivityLevel);

export default function ActivityForm() {
  const { t } = useTranslation();
  const { formModel, setFormModel } = useContext(AllFormDataContext);
  const history = useHistory();
  const initialValue: FormModel = getActivityFormData(formModel);
  const activityOptions = allActivityLevels.map((type) => (
    <Radio name={FormField.Level} key={type} value={type}>
      {t(activityLabelI18nKeys[type])}
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
            <h1>{t(I18nKeys.ActivityPageTitle)}</h1>
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
                header={<span className="hint__header">{t(I18nKeys.WhatCounts)}</span>}
                className="hint__panel"
              >
                <div className="hint__content">
                  <p>{t(I18nKeys.CountFirstParagraph)}</p>
                  <ul>
                    {exampleActivityI18nKeys.map((key) => (
                      <li key={key}>{t(I18nKeys[key]).toLowerCase()}</li>
                    ))}
                  </ul>
                  <p>{t(I18nKeys.CountSecondParagraph)}</p>
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
            {t(I18nKeys.Continue)}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
