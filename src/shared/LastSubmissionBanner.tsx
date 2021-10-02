import React, { useContext, useState } from 'react';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { I18nKeys } from 'result/i18n-keys';
import { getSubmissionBannerAckTime, setSubmissionBannerAckTime } from 'shared/store';
import { Submission } from './models';
import { SaveSubmissionFlagContext } from './saveSubmissionFlagContext';

interface BannerProps {
  lastSubmission: Submission;
}

function shouldShowBanner(lastSubmission: Submission, lastBannerAckTime: number): boolean {
  if (!lastSubmission) {
    return false;
  }
  return !lastBannerAckTime;
}

function LastSubmissionBanner({ lastSubmission }: BannerProps) {
  const { t } = useTranslation();
  const bannerAckTime = getSubmissionBannerAckTime();
  const { saveSubmissionFlag, setSaveSubmissionFlag } = useContext(SaveSubmissionFlagContext);
  const [showBanner, setShowBanner] = useState(shouldShowBanner(lastSubmission, bannerAckTime));
  const [showConfirmation, setShowConfirmation] = useState(false);
  const handleClickYes = () => {
    setSubmissionBannerAckTime(Date.now());
    setShowConfirmation(true);
  };
  const handleClickNo = () => {
    setSaveSubmissionFlag(false);
    setSubmissionBannerAckTime(Date.now());
    setShowConfirmation(true);
  };
  const hideBanner = () => setShowBanner(false);

  if (!showBanner) {
    return null;
  }
  return (
    <div className="last-submission-banner">
      <div className="width-container">
        {showConfirmation ? (
          <>
            <p>
              {t(
                saveSubmissionFlag
                  ? I18nKeys.KeepSubmissionConfirmation
                  : I18nKeys.DoNotKeepSubmissionConfirmation
              )}
            </p>
            <div className="action-group">
              <Button size="large" htmlType="button" className="button" onClick={hideBanner}>
                {t(I18nKeys.HideThisMessage)}
              </Button>
            </div>
          </>
        ) : (
          <>
            <header>{t(I18nKeys.LastSubmissionLoaded)}</header>
            <p>{t(I18nKeys.BannerFirstParagraph)}</p>
            <div className="action-group">
              <Button size="large" htmlType="button" className="button" onClick={handleClickYes}>
                {t(I18nKeys.BannerKeepSubmission)}
              </Button>
              <Button size="large" htmlType="button" className="button" onClick={handleClickNo}>
                {t(I18nKeys.BannerDoNotKeepSubmission)}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LastSubmissionBanner;
