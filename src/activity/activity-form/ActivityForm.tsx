import React, { useContext } from 'react';
import { Space, Button } from 'antd';
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
import { FormStateContext } from 'shared/FormStateContext';
import { I18nKeys } from 'result/i18n-keys';
import { useTranslation } from 'react-i18next';
import Expander from 'shared/Expander';

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
  const {
    formState: { formData },
    updateFormState,
  } = useContext(FormStateContext);
  const history = useHistory();
  const initialValue: FormModel = getActivityFormData(formData);
  const activityOptions = allActivityLevels.map((type) => (
    <Radio name={FormField.Level} key={type} value={type}>
      {t(activityLabelI18nKeys[type])}
    </Radio>
  ));

  const handleSubmit: FormikConfig<FormModel>['onSubmit'] = (values, { setSubmitting }) => {
    const dirty = Object.values(FormField).some((key) => values[key] !== initialValue[key]);
    if (dirty) {
      updateFormState({ ...formData, ...values }, Date.now());
    }
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
            <Expander title={t(I18nKeys.WhatCounts)}>
              <>
                <p>{t(I18nKeys.CountFirstParagraph)}</p>
                <ul>
                  {exampleActivityI18nKeys.map((key) => (
                    <li key={key}>{t(I18nKeys[key]).toLowerCase()}</li>
                  ))}
                </ul>
                <p>{t(I18nKeys.CountSecondParagraph)}</p>
              </>
            </Expander>
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
