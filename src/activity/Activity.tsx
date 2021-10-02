import React, { useContext } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import ActivityForm from './activity-form/ActivityForm';
import { AllFormDataContext } from 'shared/allFormDataContext';
import { isFormValid } from 'shared/utils';
import { PersonalInfoFormSchema } from 'shared/models';
import { LeftOutlined } from '@ant-design/icons';

function Activity() {
  const history = useHistory();
  const { formModel } = useContext(AllFormDataContext);
  const location = useLocation();

  const isPrevFormValid = isFormValid(formModel, PersonalInfoFormSchema);

  return isPrevFormValid ? (
    <div className="width-container">
      <button
        onClick={() => {
          history.push('/');
        }}
        className="go-back-button"
      >
        <LeftOutlined className="icon" />
        <span>Home</span>
      </button>

      <ActivityForm />
    </div>
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
