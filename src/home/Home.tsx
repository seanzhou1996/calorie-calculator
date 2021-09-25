import React from 'react';
import PageTemplate from '../PageTemplate';
import PersonalInfoForm from '../personal-info-form/Form';

function Home() {
  return (
    <PageTemplate title="Calorie calculator">
      <div className="width-container">
        <div>
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
        <PersonalInfoForm onSubmitForm={() => {}} />
      </div>
    </PageTemplate>
  );
}

export default Home;
