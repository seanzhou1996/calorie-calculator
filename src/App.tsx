import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AllFormDataContext from 'shared/allFormDataContext';
import Home from './home/Home';
import Activity from './activity/Activity';
import Goal from './goal/Goal';
import { FullFormModel } from 'shared/models';
import { storeFormData, getFormDataFromStore } from 'shared/utils';
import Result from './result/Result';

import './App.less';

function App() {
  const [formModel, setFormModel] = useState<FullFormModel>(getFormDataFromStore());

  useEffect(() => {
    storeFormData(formModel);
  }, [formModel]);

  return (
    <AllFormDataContext.Provider
      value={{
        formModel,
        setFormModel,
      }}
    >
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
