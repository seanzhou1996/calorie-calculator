import React, { useContext } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import GoalForm from './goal-form/GoalForm';
import { FormStateContext } from 'shared/FormStateContext';
import { isFormValid } from 'shared/utils';
import { ActivityFormSchema } from 'shared/models';
import { LeftOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { I18nKeys } from 'result/i18n-keys';

function Goal() {
  const { t } = useTranslation();
  const history = useHistory();
  const {
    formState: { formData },
  } = useContext(FormStateContext);
  const location = useLocation();
  const isPrevFormValid = isFormValid(formData, ActivityFormSchema);

  return isPrevFormValid ? (
    <div className="width-container">
      <button
        onClick={() => {
          history.push('/activity');
        }}
        className="go-back-button"
      >
        <LeftOutlined className="icon" />
        <span>{t(I18nKeys.PreviousQuestion)}</span>
      </button>
      <GoalForm />
    </div>
  ) : (
    <Redirect
      to={{
        pathname: '/activity',
        state: { from: location },
      }}
    />
  );
}

export default Goal;
