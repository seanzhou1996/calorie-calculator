import React, { useContext } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import ResultPage from './result-page/ResultPage';
import { SubmissionContext } from 'shared/SubmissionContext';

function Result() {
  const location = useLocation();
  const { submission } = useContext(SubmissionContext);

  if (submission) {
    return (
      <div className="width-container">
        <ResultPage personInfo={submission.data} />
      </div>
    );
  }
  return (
    <Redirect
      to={{
        pathname: '/goal',
        state: { from: location },
      }}
    />
  );
}

export default Result;
