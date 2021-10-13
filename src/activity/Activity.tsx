import React, { useContext } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import ActivityForm from './activity-form/ActivityForm';
import { FormStateContext } from 'shared/FormStateContext';
import { isFormValid } from 'shared/utils';
import { PersonalInfoFormSchema, RoutePath } from 'shared/models';
import GoBackButton from 'shared/GoBackButton';

function Activity() {
  const {
    formState: { formData },
  } = useContext(FormStateContext);
  const location = useLocation();

  const isPrevFormValid = isFormValid(formData, PersonalInfoFormSchema);

  return isPrevFormValid ? (
    <div className="width-container">
      <GoBackButton to={RoutePath.PersonalDetails} />

      <ActivityForm />
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

export default Activity;
