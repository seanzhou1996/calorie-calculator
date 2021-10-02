import React, { useContext } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import ResultPage from './result-page/ResultPage';
import { AllFormDataContext } from 'shared/allFormDataContext';
import { FullFormSchema } from 'shared/models';
import { isFormValid } from 'shared/utils';

function Result() {
  const location = useLocation();
  const { formModel } = useContext(AllFormDataContext);

  const valid = isFormValid(formModel, FullFormSchema);

  return valid ? (
    <div className="width-container">
      <ResultPage personInfo={formModel} />
    </div>
  ) : (
    <Redirect
      to={{
        pathname: '/goal',
        state: { from: location },
      }}
    />
  );
}

export default Result;
