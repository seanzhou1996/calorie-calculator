import React, { useState } from 'react';
import { Button } from 'antd';
import { Submission } from './models';
import {
  clearFormData,
  clearSubmission,
  getSubmissionBannerAckTime,
  setSubmissionBannerAckTime,
} from 'shared/store';

interface BannerProps {
  lastSubmission: Submission;
}

function shouldShowBanner(lastSubmission: Submission, lastBannerAckTime: number): boolean {
  if (!lastSubmission) {
    return false;
  }
  if (!lastBannerAckTime) {
    return true;
  }
  return lastSubmission.submissionTime > lastBannerAckTime;
}

function formatDate(date: number | Date): string {
  return new Intl.DateTimeFormat().format(date);
}

function LastSubmissionBanner({ lastSubmission }: BannerProps) {
  const bannerAckTime = getSubmissionBannerAckTime();
  const [showBanner, setShowBanner] = useState(shouldShowBanner(lastSubmission, bannerAckTime));
  const handleClickOk = () => {
    setShowBanner(false);
    setSubmissionBannerAckTime(Date.now());
  };
  const handleClickReset = () => {
    clearSubmission();
    clearFormData();
    window.location.href = '/';
  };
  return !showBanner ? null : (
    <div className="last-submission-banner">
      <div className="width-container">
        <div className="content">
          <header>Data from last submission is restored</header>

          <p>You submitted the form on {formatDate(lastSubmission.submissionTime)}.</p>

          <div className="action-group">
            <Button size="large" className="button" onClick={handleClickOk}>
              Got it
            </Button>
            <Button size="large" className="button" onClick={handleClickReset}>
              No, start fresh
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LastSubmissionBanner;
