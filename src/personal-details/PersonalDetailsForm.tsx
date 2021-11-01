import React, { useContext } from 'react';
import { Button } from 'antd';
import { Formik, Form, FormikConfig, ErrorMessage } from 'formik';
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { InputNumber, Radio } from 'shared/formik-antd';
import {
  FullFormModel,
  sexI18nKeys,
  PersonalInfoFormField as FormField,
  PersonalInfoFormModel as FormModel,
  PersonalInfoFormSchema,
  RoutePath,
} from 'shared/models';
import { FormStateContext } from 'shared/FormStateContext';
import { I18nKeys, PersonalDetailsI18nKeys } from 'shared/i18n-keys';
import BaseExpander from 'shared/BaseExpander';

const getPersonalInfo: (value: FullFormModel) => FormModel = (value) => {
  const { age, sex, height, weight } = value;
  return {
    age,
    sex,
    height,
    weight,
  };
};

export default function PersonalDetailsForm() {
  const { t, i18n } = useTranslation();
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
    history.push(RoutePath.ActivityLevel);
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
              <h1>{t(PersonalDetailsI18nKeys.PageTitle)}</h1>
            </header>
            <p>{t(PersonalDetailsI18nKeys.EnterAgeSexHeightWeight)}</p>
            <div className="hint">
              <BaseExpander title={t(PersonalDetailsI18nKeys.WhyDoWeNeedThem)}>
                <>
                  <p>{t(PersonalDetailsI18nKeys.AnswerFirstParagraph)}</p>
                  <p>{t(PersonalDetailsI18nKeys.AnswerSecondParagraph)}</p>
                  <p>{t(PersonalDetailsI18nKeys.AnswerThirdParagraph)}</p>
                  <ul>
                    <li>{t(PersonalDetailsI18nKeys.FactorFirstParagraph)}</li>
                    <li>{t(PersonalDetailsI18nKeys.FactorSecondParagraph)}</li>
                    <li>{t(PersonalDetailsI18nKeys.FactorThirdParagraph)}</li>
                  </ul>
                </>
              </BaseExpander>
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

                <ErrorMessage key={i18n.resolvedLanguage} name={FormField.Age}>
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
                  errors.sex && touched.sex ? 'input-wrapper--error' : null
                )}
              >
                <span className="label">{t(I18nKeys.Sex)}</span>
                <Radio.Group name={FormField.Sex} size="large" className="control radio-group">
                  <Radio name={FormField.Sex} value="male" className="radio-button">
                    {t(sexI18nKeys['male'])}
                  </Radio>
                  <Radio name={FormField.Sex} value="female" className="radio-button">
                    {t(sexI18nKeys['female'])}
                  </Radio>
                </Radio.Group>
                <ErrorMessage key={i18n.resolvedLanguage} name={FormField.Sex}>
                  {(key) => (
                    <span className="error-message">{t(key, { field: t(I18nKeys.Sex) })}</span>
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

                <ErrorMessage key={i18n.resolvedLanguage} name={FormField.Height}>
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

                <ErrorMessage key={i18n.resolvedLanguage} name={FormField.Weight}>
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
