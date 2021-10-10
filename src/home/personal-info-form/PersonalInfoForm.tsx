import React, { useContext } from 'react';
import { Button } from 'antd';
import { Formik, Form, FormikConfig, ErrorMessage } from 'formik';
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { InputNumber, Radio } from 'shared/formik-antd';
import {
  FullFormModel,
  genderI18nKeys,
  PersonalInfoFormField as FormField,
  PersonalInfoFormModel as FormModel,
  PersonalInfoFormSchema,
} from 'shared/models';
import { FormStateContext } from 'shared/FormStateContext';
import { I18nKeys } from 'result/i18n-keys';

const getPersonalInfo: (value: FullFormModel) => FormModel = (value) => {
  const { age, gender, height, weight } = value;
  return {
    age,
    gender,
    height,
    weight,
  };
};

const PersonalInfoForm = () => {
  const { t } = useTranslation();
  const {
    formState: { formData },
    updateFormState,
  } = useContext(FormStateContext);
  const initialValues: FormModel = getPersonalInfo(formData);

  const history = useHistory();

  const handleSubmit: FormikConfig<FormModel>['onSubmit'] = (values, { setSubmitting }) => {
    updateFormState({ ...formData, ...values }, Date.now());
    setSubmitting(false);
    history.push('/activity');
  };

  return (
    <div className="form-wrapper">
      <Formik<FormModel>
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={PersonalInfoFormSchema}
        validateOnBlur
        validateOnChange
      >
        {({ errors, touched, isSubmitting }) => (
          <Form name="personal-info" className="personal-info-form">
            <div
              className={classnames(
                'input-wrapper',
                errors.age && touched.age ? 'input-wrapper--error' : null
              )}
            >
              <label htmlFor="input_age" className="label">
                {t(I18nKeys.Age)}
              </label>
              <InputNumber
                name={FormField.Age}
                inputMode="numeric"
                pattern="[0-9]*"
                size="large"
                id="input_age"
                className="control"
              />
              <ErrorMessage name={FormField.Age}>
                {(key) => (
                  <span className="error-message">
                    {t(key, { field: t(I18nKeys.Age), max: 120, min: 18 })}
                  </span>
                )}
              </ErrorMessage>
            </div>

            <div
              className={classnames(
                'input-wrapper',
                errors.gender && touched.gender ? 'input-wrapper--error' : null
              )}
            >
              <span className="label">{t(I18nKeys.Gender)}</span>
              <Radio.Group name={FormField.Gender} size="large" className="control gender-control">
                <Radio name={FormField.Gender} value="male" className="radio-button">
                  {t(genderI18nKeys['male'])}
                </Radio>
                <Radio name={FormField.Gender} value="female" className="radio-button">
                  {t(genderI18nKeys['female'])}
                </Radio>
              </Radio.Group>
              <ErrorMessage name={FormField.Gender}>
                {(key) => (
                  <span className="error-message">{t(key, { field: t(I18nKeys.Gender) })}</span>
                )}
              </ErrorMessage>
            </div>

            <div
              className={classnames(
                'input-wrapper',
                errors.height && touched.height ? 'input-wrapper--error' : null
              )}
            >
              <label htmlFor="input_height" className="label">
                {t(I18nKeys.Height)}
              </label>
              <InputNumber
                name={FormField.Height}
                inputMode="decimal"
                pattern="[0-9]+([\.][0-9]+)?"
                id="input_height"
                className="control control--height"
                size="large"
              />
              <div className="suffix">
                <span>cm</span>
              </div>
              <ErrorMessage name={FormField.Height}>
                {(key) => (
                  <span className="error-message">
                    {t(key, { field: t(I18nKeys.Height), max: '272 cm', min: '100 cm' })}
                  </span>
                )}
              </ErrorMessage>
            </div>

            <div
              className={classnames(
                'input-wrapper',
                errors.weight && touched.weight ? 'input-wrapper--error' : null
              )}
            >
              <label htmlFor="input_weight" className="label">
                {t(I18nKeys.Weight)}
              </label>
              <InputNumber
                name={FormField.Weight}
                inputMode="decimal"
                pattern="[0-9]+([\.][0-9]+)?"
                id="input_weight"
                className="control"
                size="large"
              />
              <div className="suffix">
                <span>kg</span>
              </div>
              <ErrorMessage name={FormField.Weight}>
                {(key) => (
                  <span className="error-message">
                    {t(key, { field: t(I18nKeys.Weight), max: '130 kg', min: '30 kg' })}
                  </span>
                )}
              </ErrorMessage>
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
    </div>
  );
};

export default PersonalInfoForm;
