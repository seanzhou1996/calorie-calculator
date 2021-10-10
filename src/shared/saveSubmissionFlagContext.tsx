import React, { useEffect, useState } from 'react';
import { getStoreSubmissionFlag, setStoreSubmissionFlag } from './store';

interface SaveSubmissionFlagContextType {
  saveSubmissionFlag: boolean | null;
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
  const [saveSubmissionFlag, setSaveSubmissionFlag] = useState(getStoreSubmissionFlag());

  useEffect(() => {
    if (saveSubmissionFlag === null) {
      return;
    }
    setStoreSubmissionFlag(saveSubmissionFlag);
  }, [saveSubmissionFlag]);

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
