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
import Expander from 'shared/Expander';

const getPersonalInfo: (value: FullFormModel) => FormModel = (value) => {
  const { age, gender, height, weight } = value;
  return {
    age,
    gender,
    height,
    weight,
  };
};

function PersonalInfoForm() {
  const { t } = useTranslation();
  const {
    formState: { formData },
    updateFormState,
  } = useContext(FormStateContext);
  const initialValues: FormModel = getPersonalInfo(formData);

  const history = useHistory();

  const handleSubmit: FormikConfig<FormModel>['onSubmit'] = (values, { setSubmitting }) => {
    const dirty = Object.values(FormField).some((key) => initialValues[key] !== values[key]);
    if (dirty) {
      updateFormState({ ...formData, ...values }, Date.now());
    }
    setSubmitting(false);
    history.push('/activity');
  };

  return (
    <div>
      <Formik<FormModel>
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={PersonalInfoFormSchema}
        validateOnBlur
        validateOnChange
      >
        {({ errors, touched, isSubmitting }) => (
          <Form name="personal-info" className="personal-info-form">
            <header>
              <h1>{t(I18nKeys.PersonalDetailsPageTitle)}</h1>
            </header>
            <p>Enter your age, gender, height and weight.</p>
            <div className="hint">
              <Expander title="Why do we need them?">
                <>
                  <p>We need age, sex and body mass to calculate the basal metabolic rate.</p>
                  <p>
                    The basal metabolic rate (BMR) is the amount of energy your body needs at rest.
                    It is the foundation for calculating your daily calorie intake target.
                  </p>
                  <p>Age, sex and body mass affects the BMR:</p>
                  <ul>
                    <li>A person&apos;s BMR declines gradually after age 20</li>
                    <li>BMR is higher in men than in women</li>
                    <li>BMR is proportional to a person&apos;s body mass</li>
                  </ul>
                </>
              </Expander>
            </div>
            <div className="form-item">
              <div
                className={classnames(
                  'input-wrapper',
                  errors.age && touched.age ? 'input-wrapper--error' : null
                )}
              >
                <label htmlFor="input_age" className="label">
                  {t(I18nKeys.Age)}
                </label>
                <div>
                  <InputNumber
                    name={FormField.Age}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    size="large"
                    id="input_age"
                    className="control"
                  />
                </div>

                <ErrorMessage name={FormField.Age}>
                  {(key) => (
                    <span className="error-message">
                      {t(key, { field: t(I18nKeys.Age), max: 120, min: 18 })}
                    </span>
                  )}
                </ErrorMessage>
              </div>
            </div>

            <div className="form-item">
              <div
                className={classnames(
                  'input-wrapper',
                  errors.gender && touched.gender ? 'input-wrapper--error' : null
                )}
              >
                <span className="label">{t(I18nKeys.Gender)}</span>
                <Radio.Group
                  name={FormField.Gender}
                  size="large"
                  className="control gender-control"
                >
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
            </div>

            <div className="form-item">
              <div
                className={classnames(
                  'input-wrapper',
                  errors.height && touched.height ? 'input-wrapper--error' : null
                )}
              >
                <label htmlFor="input_height" className="label">
                  {t(I18nKeys.Height)}
                </label>
                <div>
                  <InputNumber
                    name={FormField.Height}
                    inputMode="decimal"
                    pattern="[0-9]+([\.][0-9]+)?"
                    id="input_height"
                    className="control control--height"
                    size="large"
                  />
                  <span className="suffix">
                    <span>cm</span>
                  </span>
                </div>

                <ErrorMessage name={FormField.Height}>
                  {(key) => (
                    <span className="error-message">
                      {t(key, { field: t(I18nKeys.Height), max: '272 cm', min: '100 cm' })}
                    </span>
                  )}
                </ErrorMessage>
              </div>
            </div>

            <div className="form-item">
              <div
                className={classnames(
                  'input-wrapper',
                  errors.weight && touched.weight ? 'input-wrapper--error' : null
                )}
              >
                <label htmlFor="input_weight" className="label">
                  {t(I18nKeys.Weight)}
                </label>
                <div>
                  <InputNumber
                    name={FormField.Weight}
                    inputMode="decimal"
                    pattern="[0-9]+([\.][0-9]+)?"
                    id="input_weight"
                    className="control"
                    size="large"
                  />
                  <span className="suffix">
                    <span>kg</span>
                  </span>
                </div>

                <ErrorMessage name={FormField.Weight}>
                  {(key) => (
                    <span className="error-message">
                      {t(key, { field: t(I18nKeys.Weight), max: '130 kg', min: '30 kg' })}
                    </span>
                  )}
                </ErrorMessage>
              </div>
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
}

export default PersonalInfoForm;
