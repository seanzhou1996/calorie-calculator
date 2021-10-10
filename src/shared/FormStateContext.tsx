import React, { useEffect, useState } from 'react';
import { emptyFormModel, FormState, FullFormModel } from './models';
import { getInMemoryFormState, setInMemoryFormState } from './store';

interface FormStateContextType {
  formState: FormState;
  updateFormState: (formData: FullFormModel, updatedAt: number) => void;
}

export const FormStateContext = React.createContext<FormStateContextType>({
  formState: null,
  updateFormState: () => {
    throw Error('not initialized');
  },
});

const formStateInitialValue: FormState = { formData: emptyFormModel, updatedAt: null };

export const FormStateContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [formState, setFormState] = useState(getInMemoryFormState() || formStateInitialValue);

  useEffect(() => {
    setInMemoryFormState(formState.formData, formState.updatedAt);
  }, [formState]);

  return (
    <FormStateContext.Provider
      value={{
        formState,
        updateFormState: (formData, updatedAt) => setFormState({ formData, updatedAt }),
      }}
    >
      {children}
    </FormStateContext.Provider>
  );
};
