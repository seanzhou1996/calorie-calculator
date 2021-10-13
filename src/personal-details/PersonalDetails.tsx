import React from 'react';
import PersonalInfoForm from './PersonalInfoForm';
import { RoutePath } from 'shared/models';
import GoBackButton from 'shared/GoBackButton';

function PersonalDetails() {
  return (
    <div className="width-container">
      <GoBackButton to={RoutePath.Home} />

      <PersonalInfoForm />
    </div>
  );
}

export default PersonalDetails;
