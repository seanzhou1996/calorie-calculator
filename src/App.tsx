import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import 'shared/i18n';
import { SubmissionContextProvider } from 'shared/SubmissionContext';
import { FormStateContextProvider } from 'shared/FormStateContext';
import { SaveSubmissionFlagContextProvider } from 'shared/saveSubmissionFlagContext';
import { RoutePath } from 'shared/models';
import PageTemplate from 'shared/PageTemplate';
import ScrollToTop from 'shared/ScrollToTop';
import Home from './home/Home';
import PersonalDetails from 'personal-details/PersonalDetails';
import Activity from './activity/Activity';
import Goal from './goal/Goal';
import Result from './result/Result';
import HowItWorks from 'HowItWorks';
import KeepSubmissionBanner from 'shared/KeepSubmissionBanner';
import UpdateDocumentLang from 'shared/UpdateDocumentLang';
import WeightGainGuide from 'WeightGainGuide';
import WeightLossGuide from 'WeightLossGuide';
import EatWellGuide from 'EatWellGuide';

import './App.less';

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
                  <Route path={RoutePath.Home} exact>
                    <Home />
                  </Route>

                  <Route path={RoutePath.PersonalDetails}>
                    <PersonalDetails />
                  </Route>

                  <Route path={RoutePath.ActivityLevel}>
                    <Activity />
                  </Route>

                  <Route path={RoutePath.Goal}>
                    <Goal />
                  </Route>

                  <Route path={RoutePath.Results}>
                    <Result />
                  </Route>

                  <Route path={RoutePath.How}>
                    <HowItWorks />
                  </Route>

                  <Route path={RoutePath.WeightGainGuide}>
                    <WeightGainGuide />
                  </Route>

                  <Route path={RoutePath.WeightLossGuide}>
                    <WeightLossGuide />
                  </Route>

                  <Route path={RoutePath.EatWellGuide}>
                    <EatWellGuide />
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
