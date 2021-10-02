import React, { useEffect, useState } from 'react';
import { emptyFormModel, FullFormModel } from './models';
import { getSubmission, setFormData } from './store';

interface AllFormDataContextType {
  formModel: FullFormModel;
  setFormModel: (value: FullFormModel) => void;
}

interface AllFormDataContextProviderProps {
  saveSubmissionFlag: boolean;
  children: React.ReactNode;
}

export const AllFormDataContext = React.createContext<AllFormDataContextType>({
  formModel: null,
  setFormModel: () => {
    throw Error('not initialized');
  },
});

export const AllFormDataContextProvider = ({
  saveSubmissionFlag,
  children,
}: AllFormDataContextProviderProps) => {
  const lastSubmission = !saveSubmissionFlag ? null : getSubmission();
  const [formModel, setFormModel] = useState<FullFormModel>(lastSubmission?.data || emptyFormModel);

  useEffect(() => {
    setFormData(formModel);
  }, [formModel]);

  return (
    <AllFormDataContext.Provider value={{ formModel, setFormModel }}>
      {children}
    </AllFormDataContext.Provider>
  );
};
