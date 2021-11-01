import React, { useContext } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import GoalForm from './goal-form/GoalForm';
import { FormStateContext } from 'shared/FormStateContext';
import { isFormValid } from 'shared/utils';
import { ActivityFormSchema, RoutePath } from 'shared/models';
import GoBackButton from 'shared/GoBackButton';

function Goal() {
  const {
    formState: { formData },
  } = useContext(FormStateContext);
  const location = useLocation();
  const isPrevFormValid = isFormValid(formData, ActivityFormSchema);

  return isPrevFormValid ? (
    <div className="width-container">
      <GoBackButton to={RoutePath.ActivityLevel} />

      <GoalForm />
    </div>
  ) : (
    <Redirect
      to={{
        pathname: RoutePath.ActivityLevel,
        state: { from: location },
      }}
    />
  );
}

export default Goal;
