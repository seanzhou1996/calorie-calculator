import React from 'react';
import PersonalDetailsForm from './PersonalDetailsForm';
import { RoutePath } from 'shared/models';
import BaseGoBackButton from 'shared/BaseGoBackButton';

function PersonalDetails() {
  return (
    <div className="width-container">
      <BaseGoBackButton to={RoutePath.Home} />

      <PersonalDetailsForm />
    </div>
  );
}

export default PersonalDetails;
