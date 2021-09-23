import React, { useState, createContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import PersonalInfoForm from './calorie-form/Form';
import './App.less';
import {
  ActivityLevel,
  PersonalInfoFormModel,
  GoalType,
  PersonInfo,
  Validity,
  ActivityFormModel,
  GoalFormModel,
} from './model';
import CalorieResult from './calorie-result/Result';
import ActivityForm from './activity-form/ActivityForm';
import GoalForm from './goal-form/GoalForm';
import {
  getValidityFromStore,
  getPersonalInfoFromStore,
  storeValidity,
  storePersonalInfo,
  getActivityLevelFromStore,
  storeActivityLevel,
  storeGoal,
  getGoalFromStore,
} from './service';

interface ProvideAuthProps {
  validity: Validity;
  children: React.ReactNode;
}

const authContext = createContext<Validity>(null);

function ProvideAuth({ validity, children }: ProvideAuthProps) {
  return (
    <authContext.Provider value={validity}>
      {children}
    </authContext.Provider>
  );
}

function App() {
  const [validity, setValidity] = useState<Validity>(getValidityFromStore());
  const [
    personalInfo,
    setPersonalInfo,
  ] = useState<PersonalInfoFormModel>(getPersonalInfoFromStore());
  const [
    activityLevel,
    setActivityLevel,
  ] = useState<ActivityLevel>(getActivityLevelFromStore());
  const [goal, setGoal] = useState<GoalType>(getGoalFromStore());

  const updateValidity = (value: Validity) => {
    setValidity(value);
    storeValidity(value);
  };

  const updatePersonalInfo = (data: PersonalInfoFormModel) => {
    setPersonalInfo(data);
    storePersonalInfo(data);
    updateValidity({ ...validity, personalInfo: true });
  };

  const updateActivityLevel = ({ activityLevel: level }: ActivityFormModel) => {
    setActivityLevel(level);
    storeActivityLevel(level);
    updateValidity({ ...validity, activity: true });
  };

  const updateGoal = ({ goal: $goal }: GoalFormModel) => {
    setGoal($goal);
    storeGoal($goal);
    updateValidity({ ...validity, goal: true });
  };

  const person: PersonInfo = {
    ...personalInfo,
    goal,
    activityLevel,
  };

  return (
    <ProvideAuth validity={validity}>
      <Router>
        <div className="app">
          <div className="width-container">
            <Switch>
              <Route path="/" exact>
                <div>
                  <div>
                    <h1>Calorie calculator</h1>
                    <p>
                      Find out how many calories you need daily to
                    </p>
                    <ul>
                      <li>maintain weight</li>
                      <li>gain muscle</li>
                      <li>lose fat</li>
                    </ul>
                    <p>To start, fill in the fields below.</p>
                  </div>
                  <PersonalInfoForm onSubmitForm={updatePersonalInfo} />
                </div>
              </Route>

              <Route
                path="/activity"
                render={({ location }) => (
                  validity?.personalInfo
                    ? <ActivityForm onSubmitForm={updateActivityLevel} />
                    : (
                      <Redirect
                        to={{
                          pathname: '/',
                          state: { from: location },
                        }}
                      />
                    )
                )}
              />

              <Route
                path="/goal"
                render={({ location }) => (
                  validity?.activity
                    ? <GoalForm onSubmitForm={updateGoal} />
                    : (
                      <Redirect
                        to={{
                          pathname: '/activity',
                          state: { from: location },
                        }}
                      />
                    )
                )}
              />

              <Route
                path="/result"
                render={({ location }) => (
                  Object.values(validity).reduce((accum, val) => accum && val, true)
                    ? <CalorieResult personInfo={person} />
                    : (
                      <Redirect
                        to={{
                          pathname: '/goal',
                          state: { from: location },
                        }}
                      />
                    )
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </ProvideAuth>
  );
}

export default App;
