import React, { useState } from 'react';
import CalorieForm from './calorie-form/Form';
import './App.less';
import { ActivityType, Goal, PersonInfo } from './model';
import CalorieResult from './calorie-result/Result';

const dummyPersonInfo: PersonInfo = {
  age: 24,
  gender: 'male',
  height: 174,
  weight: 63,
  activityLevel: ActivityType.Active,
  goal: Goal.Balance,
};

function App() {
  const [personInfo, setPersonInfo] = useState<PersonInfo>();

  const updatePersonInfo = (data: PersonInfo) => {
    console.log(data);
    setPersonInfo(data);
  };

  return (
    <div className="app width-container">
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
        <p>To start, fill in the blanks below.</p>
      </div>
      <CalorieForm onSubmitForm={updatePersonInfo} />
      { dummyPersonInfo && <CalorieResult personInfo={dummyPersonInfo} /> }
    </div>
  );
}

export default App;
