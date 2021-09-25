import React, { useContext } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import PageTemplate from 'shared/PageTemplate';
import ActivityForm from './activity-form/ActivityForm';
import AllFormDataContext from 'shared/allFormDataContext';
import { isFormValid } from 'shared/utils';
import { PersonalInfoFormSchema } from 'shared/models';

function Activity() {
  const { formModel } = useContext(AllFormDataContext);
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
