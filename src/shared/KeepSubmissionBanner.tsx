import React, { useContext, useState } from 'react';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { I18nKeys } from 'shared/i18n-keys';
import { SaveSubmissionFlagContext } from './saveSubmissionFlagContext';
import { SubmissionContext } from './SubmissionContext';

function KeepSubmissionBanner() {
  const { t } = useTranslation();
  const { saveSubmissionFlag, setSaveSubmissionFlag } = useContext(SaveSubmissionFlagContext);
  const { submission } = useContext(SubmissionContext);
  const [showBanner, setShowBanner] = useState(submission && saveSubmissionFlag === null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleClickYes = () => {
    setSaveSubmissionFlag(true);
    setShowConfirmation(true);
  };
  const handleClickNo = () => {
    setSaveSubmissionFlag(false);
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
            <header>{t(I18nKeys.DoYouWantToKeepSubmission)}</header>
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

export default KeepSubmissionBanner;
