import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import 'shared/i18n';
import { SubmissionContextProvider } from 'shared/SubmissionContext';
import { FormStateContextProvider } from 'shared/FormStateContext';
import { SaveSubmissionFlagContextProvider } from 'shared/saveSubmissionFlagContext';
import { RoutePath } from 'shared/models';
import PageTemplate from 'shared/page-template/PageTemplate';
import ScrollToTop from 'shared/ScrollToTop';
import Home from './home/Home';
import PersonalDetails from 'personal-details/PersonalDetails';
import ActivityLevel from './activity-level/ActivityLevel';
import FitnessGoal from './fitness-goal/FitnessGoal';
import Result from './results/Result';
import HowCalculationWorks from 'how-calculation-works/HowCalculationWorks';
import KeepSubmissionBanner from 'shared/KeepSubmissionBanner';
import UpdateDocumentLang from 'shared/UpdateDocumentLang';
import WeightGainGuide from 'WeightGainGuide';
import WeightLossGuide from 'WeightLossGuide';
import EatWellGuide from 'EatWellGuide';
import CalorieChecker from 'calorie-checker/CalorieChecker';
import AboutThisApp from 'AboutThisApp';
import Disclaimer from 'Disclaimer';

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
                    <ActivityLevel />
                  </Route>

                  <Route path={RoutePath.FitnessGoal}>
                    <FitnessGoal />
                  </Route>

                  <Route path={RoutePath.Results}>
                    <Result />
                  </Route>

                  <Route path={RoutePath.CalorieChecker}>
                    <CalorieChecker />
                  </Route>

                  <Route path={RoutePath.HowCalculationWorks}>
                    <HowCalculationWorks />
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

                  <Route path={RoutePath.AboutThisApp}>
                    <AboutThisApp />
                  </Route>

                  <Route path={RoutePath.Disclaimer}>
                    <Disclaimer />
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
