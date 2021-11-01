import React, { useContext } from 'react';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { I18nKeys } from 'shared/i18n-keys';
import { formatDate, getLocaleTime } from 'shared/utils';
import { useHistory } from 'react-router';
import { SaveSubmissionFlagContext } from 'shared/saveSubmissionFlagContext';
import { SubmissionContext } from 'shared/SubmissionContext';
import { RoutePath } from 'shared/models';

export default function HomeResultNotification() {
  const { t } = useTranslation();
  const history = useHistory();
  const { saveSubmissionFlag } = useContext(SaveSubmissionFlagContext);
  const { submission: latestSubmission } = useContext(SubmissionContext);

  if (saveSubmissionFlag !== true || !latestSubmission) {
    return null;
  }

  const { submissionTime } = latestSubmission;
  const isToday = formatDate(Date.now()) === formatDate(submissionTime);

  return (
    <div className="notification">
      <h3 className="notification__header">{t(I18nKeys.ResultsAvailable)}</h3>
      <p>
        {isToday
          ? t(I18nKeys.YouCompletedFormToday_time, { time: getLocaleTime(submissionTime) })
          : t(I18nKeys.YouCompletedFormOnDate_date, { date: formatDate(submissionTime) })}
      </p>
      <Button type="default" htmlType="button" onClick={() => history.push(RoutePath.Results)}>
        {t(I18nKeys.ViewResults)}
      </Button>
    </div>
  );
}
