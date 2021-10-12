import React from 'react';
import { LeftOutlined } from '@ant-design/icons';
import { I18nKeys } from 'result/i18n-keys';
import PersonalInfoForm from './PersonalInfoForm';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

function PersonalDetails() {
  const { t } = useTranslation();
  const history = useHistory();
  return (
    <div className="width-container">
      <button
        onClick={() => {
          history.push('/');
        }}
        className="go-back-button"
      >
        <LeftOutlined className="icon" />
        <span>{t(I18nKeys.Home)}</span>
      </button>

      <PersonalInfoForm />
    </div>
  );
}

export default PersonalDetails;
