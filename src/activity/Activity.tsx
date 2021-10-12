import React, { useContext } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import ActivityForm from './activity-form/ActivityForm';
import { FormStateContext } from 'shared/FormStateContext';
import { isFormValid } from 'shared/utils';
import { PersonalInfoFormSchema, RoutePath } from 'shared/models';
import { LeftOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { I18nKeys } from 'result/i18n-keys';

function Activity() {
  const { t } = useTranslation();
  const history = useHistory();
  const {
    formState: { formData },
  } = useContext(FormStateContext);
  const location = useLocation();

  const isPrevFormValid = isFormValid(formData, PersonalInfoFormSchema);

  return isPrevFormValid ? (
    <div className="width-container">
      <button
        onClick={() => {
          history.push(RoutePath.PersonalDetails);
        }}
        className="go-back-button"
      >
        <LeftOutlined className="icon" />
        <span>{t(I18nKeys.PreviousQuestion)}</span>
      </button>

      <ActivityForm />
    </div>
  ) : (
    <Redirect
      to={{
        pathname: RoutePath.PersonalDetails,
        state: { from: location },
      }}
    />
  );
}

export default Activity;
