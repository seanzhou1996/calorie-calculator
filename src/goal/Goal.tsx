import React, { useContext } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import GoalForm from './goal-form/GoalForm';
import { AllFormDataContext } from 'shared/allFormDataContext';
import { isFormValid } from 'shared/utils';
import { ActivityFormSchema } from 'shared/models';
import { LeftOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { I18nKeys } from 'result/i18n-keys';

function Goal() {
  const { t } = useTranslation();
  const history = useHistory();
  const { formModel } = useContext(AllFormDataContext);
  const location = useLocation();
  const isPrevFormValid = isFormValid(formModel, ActivityFormSchema);

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
