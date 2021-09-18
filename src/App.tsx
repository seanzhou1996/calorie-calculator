import React from 'react';
import {
  Button,
} from 'antd';
import {
  Formik, Form, FormikConfig, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import './App.less';

import { InputNumber, Select, Radio } from './formik-antd';

import {
  ActivityType,
  ActivityLevel,
  FormField,
  FormModel,
} from './model';

const allActivityTypes = Object.values(ActivityType);

const { Option } = Select;

const activities: Record<ActivityType, ActivityLevel> = {
  [ActivityType.Sendentary]: {
    rate: 1.2,
    name: 'Less than 1 hour',
  },
  [ActivityType.Light]: {
    rate: 1.375,
    name: '1-2 hours',
  },
  [ActivityType.Moderate]: {
    rate: 1.55,
    name: '3-5 hours',
  },
  [ActivityType.Active]: {
    rate: 1.725,
    name: '6-7 hours',
  },
  [ActivityType.ExtraActive]: {
    rate: 1.9,
    name: 'More than 7 hours',
  },
};

// TODO skip checking when input field is empty
const Schema = Yup.object().shape({
  [FormField.Age]: Yup.number()
    .nullable()
    .required('Age is required')
    .integer('Age must be an integer')
    .min(18, 'This calculator is intended for over 18 year olds')
    .max(120, 'The maximum age input is 120'),
  [FormField.Height]: Yup.number()
    .nullable()
    .required('Height is required')
    .min(50, 'The minimum height input is 50 cm')
    .max(272, 'The maximum height input is 272 cm'),
  [FormField.Weight]: Yup.number()
    .nullable()
    .required()
    .min(30, 'The minimum weight input is 30 kg')
    .max(130, 'The maximum weight input is 130 kg'),
  [FormField.Gender]: Yup.string()
    .nullable()
    .required('Please select a gender'),
  [FormField.ActivityLevel]: Yup.string()
    .nullable()
    .required('Please select an activity level'),
});

function App() {
  const initialValues: FormModel = {
    age: null,
    gender: null,
    height: null,
    weight: null,
    activityLevel: null,
  };

  const activityOptions = allActivityTypes.map((type) => {
    const { name } = activities[type];
    return <Option key={type} value={type}>{name}</Option>;
  });

  const handleSubmit: FormikConfig<FormModel>['onSubmit'] = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };

  // TODO calculation and results
  return (
    <div className="app width-container">
      <Formik<FormModel>
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={Schema}
      >
        {
          ({ isSubmitting }) => (
            <Form
              name="calorie-form"
              className="form"
            >
              <div className="input-age">
                <label className="input-age__label">
                  <span>Age:</span>
                  <InputNumber
                    name={FormField.Age}
                    size="large"
                    className="input-age__input"
                  />
                </label>
              </div>

              <ErrorMessage component="span" name={FormField.Age} className="error-message" />

              <div className="select-gender">
                <span>Gender:</span>
                <Radio.Group
                  name={FormField.Gender}
                  size="large"
                  className="select-gender__radio-group"
                >
                  <Radio.Button value="male">Male</Radio.Button>
                  <Radio.Button value="female">Female</Radio.Button>
                </Radio.Group>
              </div>

              <ErrorMessage component="span" name={FormField.Gender} className="error-message" />

              <div className="input-height">
                <label className="input-height__label">
                  <span>Height:</span>
                  <InputNumber
                    name={FormField.Height}
                    className="input-height__input"
                    size="large"
                  />
                </label>
                <span className="input-height__suffix">cm</span>
              </div>

              <ErrorMessage component="span" name={FormField.Height} className="error-message" />

              <div className="input-weight">
                <label className="input-weight__label">
                  <span>Weight:</span>
                  <InputNumber
                    name={FormField.Weight}
                    className="input-weight__control"
                    size="large"
                  />
                  <span className="input-weight__suffix">kg</span>
                </label>
              </div>

              <ErrorMessage component="span" name={FormField.Weight} className="error-message" />

              <div className="select-activity-level">
                <label className="select-activity-level__label">
                  <span>Exercise level:</span>
                  <Select
                    bordered={false}
                    name={FormField.ActivityLevel}
                    placeholder="Select an option"
                    dropdownMatchSelectWidth={false}
                    className="select-activity-level__control"
                    size="large"
                  >
                    {activityOptions}
                  </Select>
                  <span>per week</span>
                </label>
              </div>

              <ErrorMessage component="span" name={FormField.ActivityLevel} className="error-message" />

              <Button
                type="primary"
                htmlType="submit"
                size="large"
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </Form>
          )
        }
      </Formik>
    </div>
  );
}

export default App;
