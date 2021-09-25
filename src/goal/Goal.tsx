import React, { useContext } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import PageTemplate from '../PageTemplate';
import GoalForm from '../goal-form/GoalForm';
import FullFormModelContext from '../fullFormModelContext';
import { isFormValid } from '../service';
import { ActivityFormSchema } from '../model';

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
