import React, { useContext } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import ResultPage from './ResultPage';
import { SubmissionContext } from 'shared/SubmissionContext';
import ResultInputChangeNotification from './ResultInputChangeNotification';
import { RoutePath } from 'shared/models';

function Result() {
  const location = useLocation();
  const { submission } = useContext(SubmissionContext);

  if (!submission) {
    return <Redirect to={{ pathname: RoutePath.FitnessGoal, state: { from: location } }} />;
  }

  return (
    <div className="width-container">
      <ResultInputChangeNotification />
      <ResultPage personInfo={submission.data} />
    </div>
  );
}

export default Result;
