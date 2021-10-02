import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'shared/i18n';
import { AllFormDataContextProvider } from 'shared/allFormDataContext';
import Home from './home/Home';
import Activity from './activity/Activity';
import Goal from './goal/Goal';
import { getSubmission, getStoreSubmissionFlag } from 'shared/store';
import Result from './result/Result';
import LastSubmissionBanner from 'shared/LastSubmissionBanner';
import { SaveSubmissionFlagContextProvider } from 'shared/saveSubmissionFlagContext';
import { ConfigProvider } from 'antd';

import './App.less';

function App() {
  const saveSubmissionFlag = getStoreSubmissionFlag();
  const lastSubmission = !saveSubmissionFlag ? null : getSubmission();

  return (
    <ConfigProvider autoInsertSpaceInButton={false}>
      <SaveSubmissionFlagContextProvider>
        <AllFormDataContextProvider saveSubmissionFlag={saveSubmissionFlag}>
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
        </AllFormDataContextProvider>
      </SaveSubmissionFlagContextProvider>
    </ConfigProvider>
  );
}

export default App;
