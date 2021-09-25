import React from 'react';
import { FullFormModel } from './model';

interface FullFormModelContextType {
  formModel: FullFormModel,
  setFormModel: (value: FullFormModel) => void
}

const FullFormModelContext = React.createContext<FullFormModelContextType>({
  formModel: null,
  setFormModel: () => {},
});

export default FullFormModelContext;
