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
} from 'shared/models';

import { setSubmission } from 'shared/store';
import { AllFormDataContext } from 'shared/allFormDataContext';
import { SaveSubmissionFlagContext } from 'shared/saveSubmissionFlagContext';
import { useTranslation } from 'react-i18next';
import { I18nKeys } from 'result/i18n-keys';

const allGoals = Object.values(GoalType);

const getGoalFormData: (values: FullFormModel) => FormModel = (values) => {
  return { goal: values.goal };
};

export default function GoalForm() {
  const { t } = useTranslation();
  const { formModel, setFormModel } = useContext(AllFormDataContext);
  const { saveSubmissionFlag } = useContext(SaveSubmissionFlagContext);
  const history = useHistory();
  const initialValue: FormModel = getGoalFormData(formModel);

  const goalOptions = allGoals.map((goal) => (
    <Radio name={FormField.Goal} key={goal} value={goal}>
      {t(goalLabelI18nKeys[goal]).toLowerCase()}
    </Radio>
  ));

  const handleSubmit: FormikConfig<FormModel>['onSubmit'] = (values, { setSubmitting }) => {
    const updatedFormModel = { ...formModel, ...values };
    setFormModel(updatedFormModel);
    !saveSubmissionFlag ? null : setSubmission(updatedFormModel, Date.now());
    setSubmitting(false);
    history.push('/result');
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
            <p>{t(I18nKeys.GoalPageFirstParagraph)}</p>
          </div>

          <div
            className={classnames(
              'input-wrapper',
              'element',
              errors.goal && touched.goal && 'input-wrapper--error'
            )}
          >
            <p className="element">{t(I18nKeys.IWantTo)}</p>
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
