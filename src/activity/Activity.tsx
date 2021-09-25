import React, { useContext } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import PageTemplate from 'shared/PageTemplate';
import ActivityForm from './activity-form/ActivityForm';
import FullFormModelContext from 'shared/fullFormModelContext';
import { isFormValid } from 'shared/service';
import { PersonalInfoFormSchema } from 'shared/model';

function Activity() {
  const { formModel } = useContext(FullFormModelContext);
  const location = useLocation();

  const isPrevFormValid = isFormValid(formModel, PersonalInfoFormSchema);

  return isPrevFormValid ? (
    <PageTemplate>
      <div className="width-container">
        <ActivityForm />
      </div>
    </PageTemplate>
  ) : (
    <Redirect
      to={{
        pathname: '/',
        state: { from: location },
      }}
    />
  );
}

export default Activity;
