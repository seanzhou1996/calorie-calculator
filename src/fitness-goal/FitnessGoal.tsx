import React, { useContext } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import FitnessGoalForm from './FitnessGoalForm';
import { FormStateContext } from 'shared/FormStateContext';
import { isFormValid } from 'shared/utils';
import { ActivityFormSchema, RoutePath } from 'shared/models';
import BaseGoBackButton from 'shared/BaseGoBackButton';

export default function FitnessGoal() {
  const {
    formState: { formData },
  } = useContext(FormStateContext);
  const location = useLocation();
  const isPrevFormValid = isFormValid(formData, ActivityFormSchema);

  return isPrevFormValid ? (
    <div className="width-container">
      <BaseGoBackButton to={RoutePath.ActivityLevel} />

      <FitnessGoalForm />
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
