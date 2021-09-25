import React, { useContext } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import PageTemplate from 'shared/PageTemplate';
import GoalForm from './goal-form/GoalForm';
import AllFormDataContext from 'shared/allFormDataContext';
import { isFormValid } from 'shared/utils';
import { ActivityFormSchema } from 'shared/models';

function Goal() {
  const { formModel } = useContext(AllFormDataContext);
  const location = useLocation();
  const isPrevFormValid = isFormValid(formModel, ActivityFormSchema);

  return isPrevFormValid ? (
    <PageTemplate>
      <div className="width-container">
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
