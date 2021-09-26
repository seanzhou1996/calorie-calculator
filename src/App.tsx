import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AllFormDataContext from 'shared/allFormDataContext';
import Home from './home/Home';
import Activity from './activity/Activity';
import Goal from './goal/Goal';
import { emptyFormModel, FullFormModel } from 'shared/models';
import { setFormData, getSubmission } from 'shared/store';
import Result from './result/Result';
import LastSubmissionBanner from 'shared/LastSubmissionBanner';

import './App.less';

function App() {
  const lastSubmission = getSubmission();
  const [formModel, setFormModel] = useState<FullFormModel>(lastSubmission?.data || emptyFormModel);

  useEffect(() => {
    setFormData(formModel);
  }, [formModel]);

  return (
    <AllFormDataContext.Provider
      value={{
        formModel,
        setFormModel,
      }}
    >
      <LastSubmissionBanner lastSubmission={lastSubmission} />
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>

          <Route path="/activity">
            <Activity />
          </Route>

          <Route path="/goal">
            <Goal />
          </Route>

          <Route path="/result">
            <Result />
          </Route>
        </Switch>
      </Router>
    </AllFormDataContext.Provider>
  );
}

export default App;
