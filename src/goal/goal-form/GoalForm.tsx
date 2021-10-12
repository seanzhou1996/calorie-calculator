import { Button, Space } from 'antd';
import React, { useContext } from 'react';
import { Formik, Form, FormikConfig, ErrorMessage } from 'formik';
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';
import { Radio } from 'shared/formik-antd';
import {
  GoalFormModel as FormModel,
  GoalFormField as FormField,
  goalLabelI18nKeys,
  GoalType,
  GoalFormSchema,
  FullFormModel,
  RoutePath,
} from 'shared/models';

import { FormStateContext } from 'shared/FormStateContext';
import { useTranslation } from 'react-i18next';
import { I18nKeys } from 'result/i18n-keys';
import { SubmissionContext } from 'shared/SubmissionContext';
import Expander from 'shared/Expander';

const allGoals = Object.values(GoalType);

const getGoalFormData: (values: FullFormModel) => FormModel = (values) => {
  return { goal: values.goal };
};

export default function GoalForm() {
  const { t } = useTranslation();
  const {
    formState: { formData },
    updateFormState,
  } = useContext(FormStateContext);
  const { updateSubmission } = useContext(SubmissionContext);
  const history = useHistory();
  const initialValue: FormModel = getGoalFormData(formData);

  const goalOptions = allGoals.map((goal) => (
    <Radio name={FormField.Goal} key={goal} value={goal}>
      {t(I18nKeys.ToAchieveGoal_goal, { goal: t(goalLabelI18nKeys[goal]).toLowerCase() })}
    </Radio>
  ));

  const handleSubmit: FormikConfig<FormModel>['onSubmit'] = (values, { setSubmitting }) => {
    const submissionTime = Date.now();
    const updatedFormData = { ...formData, ...values };
    if (values[FormField.Goal] !== initialValue[FormField.Goal]) {
      updateFormState(updatedFormData, submissionTime);
    }
    updateSubmission(updatedFormData, submissionTime);
    setSubmitting(false);
    history.push(RoutePath.Results);
  };

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={GoalFormSchema}
      onSubmit={handleSubmit}
      validateOnBlur
      validateOnChange
    >
      {({ errors, touched, isSubmitting }) => (
        <Form name="goal" className="goal-form">
          <header>
            <h1>{t(I18nKeys.GoalPageTitle)}</h1>
          </header>

          <div className="hint">
            <Expander title={t(I18nKeys.WhyAreWeAsking)}>
              <>
                <p>{t(I18nKeys.GoalPageFirstParagraph)}</p>
                <p>{t(I18nKeys.GoalPageSecondParagraph)}</p>
                <p>{t(I18nKeys.GoalPageThirdParagraph)}</p>
              </>
            </Expander>
          </div>

          <div
            className={classnames(
              'input-wrapper',
              'element',
              errors.goal && touched.goal && 'input-wrapper--error'
            )}
          >
            <ErrorMessage component="span" name={FormField.Goal} className="error-message" />
            <Radio.Group name={FormField.Goal} size="large" className="element control">
              <Space direction="vertical" size={12}>
                {goalOptions}
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
            {t(I18nKeys.SeeResults)}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
