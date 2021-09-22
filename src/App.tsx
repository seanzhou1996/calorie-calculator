import React, { useState } from 'react';
import CalorieForm from './calorie-form/Form';
import './App.less';
import {
  ActivityLevel, PersonalInfoFormModel, GoalType, PersonInfo,
} from './model';
import CalorieResult from './calorie-result/Result';
import ActivityForm from './activity-form/ActivityForm';
import GoalForm from './goal-form/GoalForm';

const dummyPersonInfo: PersonInfo = {
  age: 24,
  gender: 'male',
  height: 174,
  weight: 63,
  activityLevel: ActivityLevel.Active,
  goal: GoalType.Balance,
};

function App() {
  const [personInfo, setPersonInfo] = useState<PersonInfo>();

  const updatePersonInfo = (data: PersonalInfoFormModel) => {
    console.log(data);
    setPersonInfo({ ...personInfo, ...data });
  };

  return (
    <div className="app">
      <div className="width-container">
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
        <CalorieForm onSubmitForm={updatePersonInfo} />
        <ActivityForm />
        <GoalForm />
        { personInfo && <CalorieResult personInfo={personInfo} /> }
      </div>
    </div>
  );
}

export default App;
