import React, { useContext } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import PageTemplate from 'shared/PageTemplate';
import GoalForm from './goal-form/GoalForm';
import FullFormModelContext from 'shared/fullFormModelContext';
import { isFormValid } from 'shared/service';
import { ActivityFormSchema } from 'shared/model';

function Goal() {
  const { formModel } = useContext(FullFormModelContext);
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
