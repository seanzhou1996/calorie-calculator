import React from 'react';
import PersonalDetailsForm from './PersonalDetailsForm';
import { RoutePath } from 'shared/models';
import GoBackButton from 'shared/GoBackButton';

function PersonalDetails() {
  return (
    <div className="width-container">
      <GoBackButton to={RoutePath.Home} />

      <PersonalDetailsForm />
    </div>
  );
}

export default PersonalDetails;
