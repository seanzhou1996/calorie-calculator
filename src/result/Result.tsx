import React, { useContext } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import CalorieResult from '../calorie-result/Result';
import FullFormModelContext from '../fullFormModelContext';
import { FullFormSchema } from '../model';
import PageTemplate from '../PageTemplate';
import { isFormValid } from '../service';

function Result() {
  const location = useLocation();
  const { formModel } = useContext(FullFormModelContext);

  const valid = isFormValid(formModel, FullFormSchema);

  return (
    valid ? (
      <PageTemplate title="">
        <div className="width-container">
          <CalorieResult personInfo={formModel} />
        </div>
      </PageTemplate>
    ) : (
      <Redirect
        to={{
          pathname: '/goal',
          state: { from: location },
        }}
      />
    )
  );
}

export default Result;
