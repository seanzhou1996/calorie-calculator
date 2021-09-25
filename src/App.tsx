import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import FullFormModelContext from './fullFormModelContext';
import Home from './home/Home';
import Activity from './activity/Activity';
import Goal from './goal/Goal';
import './App.less';
import {
  FullFormModel,
} from './model';
import {
  storeFormModel,
  getFormModelFromStore,
} from './service';
import Result from './result/Result';

function App() {
  const [formModel, setFormModel] = useState<FullFormModel>(getFormModelFromStore());

  useEffect(() => {
    storeFormModel(formModel);
  }, [formModel]);

  return (
    <FullFormModelContext.Provider value={{
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
    </FullFormModelContext.Provider>
  );
}

export default App;
