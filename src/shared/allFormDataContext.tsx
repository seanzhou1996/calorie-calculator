import React from 'react';
import { FullFormModel } from './models';

interface AllFormDataContextType {
  formModel: FullFormModel;
  setFormModel: (value: FullFormModel) => void;
}

const AllFormDataContext = React.createContext<AllFormDataContextType>({
  formModel: null,
  setFormModel: () => {
    throw Error('not initialized');
  },
});

export default AllFormDataContext;
