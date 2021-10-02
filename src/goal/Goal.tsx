import React, { useContext } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import PageTemplate from 'shared/PageTemplate';
import GoalForm from './goal-form/GoalForm';
import { AllFormDataContext } from 'shared/allFormDataContext';
import { isFormValid } from 'shared/utils';
import { ActivityFormSchema } from 'shared/models';
import { LeftOutlined } from '@ant-design/icons';

function Goal() {
  const history = useHistory();
  const { formModel } = useContext(AllFormDataContext);
  const location = useLocation();
  const isPrevFormValid = isFormValid(formModel, ActivityFormSchema);

  return isPrevFormValid ? (
    <PageTemplate>
      <div className="width-container">
        <button
          onClick={() => {
            history.push('/activity');
          }}
          className="go-back-button"
        >
          <LeftOutlined className="icon" />
          <span>Previous question</span>
        </button>
        <GoalForm />
      </div>
    </PageTemplate>
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
