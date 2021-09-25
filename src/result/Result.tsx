import React, { useContext } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import ResultPage from './result-page/ResultPage';
import AllFormDataContext from 'shared/allFormDataContext';
import { FullFormSchema } from 'shared/models';
import PageTemplate from 'shared/PageTemplate';
import { isFormValid } from 'shared/utils';

function Result() {
  const location = useLocation();
  const { formModel } = useContext(AllFormDataContext);

  const valid = isFormValid(formModel, FullFormSchema);

  return valid ? (
    <PageTemplate>
      <div className="width-container">
        <ResultPage personInfo={formModel} />
      </div>
    </PageTemplate>
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
