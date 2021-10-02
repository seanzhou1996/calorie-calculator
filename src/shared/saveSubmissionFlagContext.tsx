import React, { useState } from 'react';
import { clearSubmission, getStoreSubmissionFlag, setStoreSubmissionFlag } from './store';

interface SaveSubmissionFlagContextType {
  saveSubmissionFlag: boolean;
  setSaveSubmissionFlag: (save: boolean) => void;
}

interface SaveSubmissionFlagContextProviderProps {
  children: React.ReactNode;
}

export const SaveSubmissionFlagContext = React.createContext<SaveSubmissionFlagContextType>({
  saveSubmissionFlag: null,
  setSaveSubmissionFlag: () => {
    throw Error('not initialized');
  },
});

export const SaveSubmissionFlagContextProvider = ({
  children,
}: SaveSubmissionFlagContextProviderProps) => {
  const [saveSubmissionFlag, setFlag] = useState(getStoreSubmissionFlag());

  const setSaveSubmissionFlag = (save: boolean) => {
    setFlag(save);
    setStoreSubmissionFlag(save);
    if (!save) {
      clearSubmission();
    }
  };

  return (
    <SaveSubmissionFlagContext.Provider
      value={{
        saveSubmissionFlag,
        setSaveSubmissionFlag,
      }}
    >
      {children}
    </SaveSubmissionFlagContext.Provider>
  );
};
