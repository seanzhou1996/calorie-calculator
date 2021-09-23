import React from 'react';
import {
  Button,
} from 'antd';
import {
  Formik, Form, FormikConfig, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';
import { InputNumber, Radio } from '../formik-antd';
import {
  PersonalInfoFormField as FormField,
  PersonalInfoFormModel as FormModel,
} from '../model';

import './Form.less';
import { getPersonalInfoFromStore } from '../service';

const ageSchema = Yup.number()
  .nullable()
  .required('Age is required')
  .integer('Age must be an integer')
  .min(18, 'This calculator is intended for over 18 year olds')
  .max(120, 'The maximum age input is 120');
const heightSchema = Yup.number()
  .nullable()
  .required('Height is required')
  .min(100, 'The minimum height input is 100 cm')
  .max(272, 'The maximum height input is 272 cm');
const weightSchema = Yup.number()
  .nullable()
  .required('Weight is required')
  .min(30, 'The minimum weight input is 30 kg')
  .max(130, 'The maximum weight input is 130 kg');
const genderSchema = Yup.string()
  .nullable()
  .required('Select a gender');

const Schema = Yup.object().shape({
  [FormField.Age]: ageSchema,
  [FormField.Height]: heightSchema,
  [FormField.Weight]: weightSchema,
  [FormField.Gender]: genderSchema,
});

interface PersonalFormProps {
  onSubmitForm: (data: FormModel) => void;
}

function PersonalInfoForm({ onSubmitForm }: PersonalFormProps) {
  const initialValues: FormModel = getPersonalInfoFromStore();

  const history = useHistory();

  const handleSubmit: FormikConfig<FormModel>['onSubmit'] = (values, { setSubmitting }) => {
    onSubmitForm(values);
    setSubmitting(false);
    history.push('/activity');
  };

  return (
    <div className="form-wrapper">
      <Formik<FormModel>
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={Schema}
        validateOnBlur
        validateOnChange
      >
        {
          ({
            errors, touched, isSubmitting,
          }) => (
            <Form
              name="personal-info"
              className="personal-info-form"
            >
              <div className={classnames('input-wrapper', (errors.age && touched.age) ? 'input-wrapper--error' : null)}>
                <label
                  htmlFor="input_age"
                  className="label"
                >
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

              <div className={classnames('input-wrapper', (errors.gender && touched.gender) ? 'input-wrapper--error' : null)}>
                <span className="label">Gender</span>
                <Radio.Group
                  name={FormField.Gender}
                  size="large"
                  className="control control--gender"
                >
                  <Radio
                    name={FormField.Gender}
                    value="male"
                    className="radio-button"
                  >
                    Male
                  </Radio>
                  <Radio
                    name={FormField.Gender}
                    value="female"
                    className="radio-button"
                  >
                    Female
                  </Radio>
                </Radio.Group>
                <ErrorMessage component="span" name={FormField.Gender} className="error-message" />
              </div>

              <div className={classnames('input-wrapper', (errors.height && touched.height) ? 'input-wrapper--error' : null)}>
                <label
                  htmlFor="input_height"
                  className="label"
                >
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

              <div className={classnames('input-wrapper', (errors.weight && touched.weight) ? 'input-wrapper--error' : null)}>
                <label
                  htmlFor="input_weight"
                  className="label"
                >
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
          )
        }
      </Formik>
    </div>
  );
}

export default PersonalInfoForm;
