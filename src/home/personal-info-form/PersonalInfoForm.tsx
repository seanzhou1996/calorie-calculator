import React, { useContext } from 'react';
import { Button } from 'antd';
import { Formik, Form, FormikConfig, ErrorMessage } from 'formik';
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';
import { InputNumber, Radio } from 'shared/formik-antd';
import {
  FullFormModel,
  PersonalInfoFormField as FormField,
  PersonalInfoFormModel as FormModel,
  PersonalInfoFormSchema,
} from 'shared/models';
import AllFormDataContext from 'shared/allFormDataContext';

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
  const { formModel, setFormModel } = useContext(AllFormDataContext);
  const initialValues: FormModel = getPersonalInfo(formModel);

  const history = useHistory();

  const handleSubmit: FormikConfig<FormModel>['onSubmit'] = (values, { setSubmitting }) => {
    const updatedFormModel = { ...formModel, ...values };
    setFormModel(updatedFormModel);
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
                Age
              </label>
              <InputNumber
                name={FormField.Age}
                inputMode="numeric"
                pattern="[0-9]*"
                size="large"
                id="input_age"
                className="control"
              />
              <ErrorMessage component="span" name={FormField.Age} className="error-message" />
            </div>

            <div
              className={classnames(
                'input-wrapper',
                errors.gender && touched.gender ? 'input-wrapper--error' : null
              )}
            >
              <span className="label">Gender</span>
              <Radio.Group name={FormField.Gender} size="large" className="control gender-control">
                <Radio name={FormField.Gender} value="male" className="radio-button">
                  Male
                </Radio>
                <Radio name={FormField.Gender} value="female" className="radio-button">
                  Female
                </Radio>
              </Radio.Group>
              <ErrorMessage component="span" name={FormField.Gender} className="error-message" />
            </div>

            <div
              className={classnames(
                'input-wrapper',
                errors.height && touched.height ? 'input-wrapper--error' : null
              )}
            >
              <label htmlFor="input_height" className="label">
                Height
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
              <ErrorMessage component="span" name={FormField.Height} className="error-message" />
            </div>

            <div
              className={classnames(
                'input-wrapper',
                errors.weight && touched.weight ? 'input-wrapper--error' : null
              )}
            >
              <label htmlFor="input_weight" className="label">
                Weight
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
              <ErrorMessage component="span" name={FormField.Weight} className="error-message" />
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
    </div>
  );
};

export default PersonalInfoForm;
