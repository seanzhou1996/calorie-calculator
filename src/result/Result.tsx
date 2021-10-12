import React, { useContext } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import ResultPage from './result-page/ResultPage';
import { SubmissionContext } from 'shared/SubmissionContext';
import InputChangeNotification from './InputChangeNotification';
import { RoutePath } from 'shared/models';

function Result() {
  const location = useLocation();
  const { submission } = useContext(SubmissionContext);

  if (!submission) {
    return <Redirect to={{ pathname: RoutePath.Goal, state: { from: location } }} />;
  }

  return (
    <div className="width-container">
      <InputChangeNotification />
      <ResultPage personInfo={submission.data} />
    </div>
  );
}

export default Result;
