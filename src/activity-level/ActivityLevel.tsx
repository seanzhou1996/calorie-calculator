import React, { useContext } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import ActivityLevelForm from './ActivityLevelForm';
import { FormStateContext } from 'shared/FormStateContext';
import { isFormValid } from 'shared/utils';
import { PersonalInfoFormSchema, RoutePath } from 'shared/models';
import BaseGoBackButton from 'shared/BaseGoBackButton';

export default function ActivityLevel() {
  const {
    formState: { formData },
  } = useContext(FormStateContext);
  const location = useLocation();

  const isPrevFormValid = isFormValid(formData, PersonalInfoFormSchema);

  return isPrevFormValid ? (
    <div className="width-container">
      <BaseGoBackButton to={RoutePath.PersonalDetails} />

      <ActivityLevelForm />
    </div>
  ) : (
    <Redirect
      to={{
        pathname: RoutePath.PersonalDetails,
        state: { from: location },
      }}
    />
  );
}
