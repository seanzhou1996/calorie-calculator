import React, { useContext } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import PageTemplate from '../PageTemplate';
import ActivityForm from '../activity-form/ActivityForm';
import FullFormModelContext from '../fullFormModelContext';
import { isFormValid } from '../service';
import { PersonalInfoFormSchema } from '../model';

function Activity() {
  const { formModel } = useContext(FullFormModelContext);
  const location = useLocation();

  const isPrevFormValid = isFormValid(formModel, PersonalInfoFormSchema);

  return (
    isPrevFormValid
      ? (
        <PageTemplate>
          <div className="width-container">
            <ActivityForm onSubmitForm={() => {}} />
          </div>
        </PageTemplate>
      )
      : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: location },
          }}
        />
      )
  );
}

export default Activity;
