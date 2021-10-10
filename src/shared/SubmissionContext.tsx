import React, { createContext, useContext, useEffect, useState } from 'react';
import { FullFormModel, Submission } from './models';
import { SaveSubmissionFlagContext } from './saveSubmissionFlagContext';
import {
  clearInMemorySubmission,
  clearSubmission,
  getInMemorySubmission,
  getSubmission,
  setInMemorySubmission,
  setSubmission as setLocalSubmission,
} from './store';

interface SubmissionContextType {
  submission: Submission | null;
  updateSubmission: (formData: FullFormModel, submissionTime: number) => void;
}

const submissionContextInitialValue: SubmissionContextType = {
  submission: null,
  updateSubmission: () => {
    throw Error('Not implemented');
  },
};

export const SubmissionContext = createContext<SubmissionContextType>(
  submissionContextInitialValue
);

export function SubmissionContextProvider({ children }: { children: React.ReactNode }) {
  const { saveSubmissionFlag } = useContext(SaveSubmissionFlagContext);
  const [submission, setSubmission] = useState<Submission>(
    saveSubmissionFlag !== false ? getSubmission() : getInMemorySubmission()
  );
  const updateSubmission = (formData: FullFormModel, submissionTime: number) => {
    setSubmission({ submissionTime, data: formData });
    saveSubmissionFlag !== false
      ? setLocalSubmission(formData, submissionTime)
      : setInMemorySubmission(formData, submissionTime);
  };

  useEffect(() => {
    if (saveSubmissionFlag === null) {
      return;
    }
    if (saveSubmissionFlag === true) {
      const submission = getInMemorySubmission();
      if (submission) {
        setLocalSubmission(submission.data, submission.submissionTime);
        clearInMemorySubmission();
      }
    }
    if (saveSubmissionFlag === false) {
      const submission = getSubmission();
      if (submission) {
        setInMemorySubmission(submission.data, submission.submissionTime);
        clearSubmission();
      }
    }
  }, [saveSubmissionFlag]);

  return (
    <SubmissionContext.Provider value={{ submission, updateSubmission }}>
      {children}
    </SubmissionContext.Provider>
  );
}
