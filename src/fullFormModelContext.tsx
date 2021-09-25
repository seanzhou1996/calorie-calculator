import React from 'react';
import { FullFormModel } from './model';

interface FullFormModelContextType {
  formModel: FullFormModel;
  setFormModel: (value: FullFormModel) => void;
}

const FullFormModelContext = React.createContext<FullFormModelContextType>({
  formModel: null,

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setFormModel: () => {},
});

export default FullFormModelContext;
