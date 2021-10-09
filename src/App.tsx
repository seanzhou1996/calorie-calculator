import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'shared/i18n';
import { AllFormDataContextProvider } from 'shared/allFormDataContext';
import { getSubmission, getStoreSubmissionFlag } from 'shared/store';
import PageTemplate from 'shared/PageTemplate';
import ScrollToTop from 'shared/ScrollToTop';
import Home from './home/Home';
import Activity from './activity/Activity';
import Goal from './goal/Goal';
import Result from './result/Result';
import HowItWorks from 'HowItWorks';
import KeepSubmissionBanner from 'shared/KeepSubmissionBanner';
import UpdateDocumentLang from 'shared/UpdateDocumentLang';
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
          <KeepSubmissionBanner lastSubmission={lastSubmission} />
          <Router>
            <PageTemplate>
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

                <Route path="/how-it-works">
                  <HowItWorks />
                </Route>
              </Switch>
            </PageTemplate>
            <ScrollToTop />
          </Router>
          <UpdateDocumentLang />
        </AllFormDataContextProvider>
      </SaveSubmissionFlagContextProvider>
    </ConfigProvider>
  );
}

export default App;
