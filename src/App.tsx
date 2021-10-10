import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import 'shared/i18n';
import { FormStateContextProvider } from 'shared/FormStateContext';
import { SaveSubmissionFlagContextProvider } from 'shared/saveSubmissionFlagContext';
import PageTemplate from 'shared/PageTemplate';
import ScrollToTop from 'shared/ScrollToTop';
import Home from './home/Home';
import Activity from './activity/Activity';
import Goal from './goal/Goal';
import Result from './result/Result';
import HowItWorks from 'HowItWorks';
import KeepSubmissionBanner from 'shared/KeepSubmissionBanner';
import UpdateDocumentLang from 'shared/UpdateDocumentLang';

import './App.less';
import { SubmissionContextProvider } from 'shared/SubmissionContext';

function App() {
  return (
    <ConfigProvider autoInsertSpaceInButton={false}>
      <SaveSubmissionFlagContextProvider>
        <SubmissionContextProvider>
          <FormStateContextProvider>
            <KeepSubmissionBanner />
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
          </FormStateContextProvider>
        </SubmissionContextProvider>
      </SaveSubmissionFlagContextProvider>
    </ConfigProvider>
  );
}

export default App;
