import { Button } from 'antd';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { FormStateContext } from 'shared/FormStateContext';
import { RoutePath } from 'shared/models';
import { SubmissionContext } from 'shared/SubmissionContext';
import { I18nKeys } from 'shared/i18n-keys';

function ResultInputChangeNotification() {
  const { t } = useTranslation();
  const history = useHistory();
  const { formState } = useContext(FormStateContext);
  const { submission } = useContext(SubmissionContext);

  if (submission.submissionTime >= formState.updatedAt) {
    return null;
  }
  return (
    <div className="notification">
      <h3 className="notification__header">{t(I18nKeys.YouHaveUnsubmittedData)}</h3>
      <p>{t(I18nKeys.NotificationFirstPara)}</p>

      <Button type="primary" htmlType="button" onClick={() => history.push(RoutePath.FitnessGoal)}>
        {t(I18nKeys.GoBack)}
      </Button>
    </div>
  );
}

export default ResultInputChangeNotification;
