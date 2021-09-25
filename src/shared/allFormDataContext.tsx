import React from 'react';
import { FullFormModel } from './models';

interface AllFormDataContextType {
  formModel: FullFormModel;
  setFormModel: (value: FullFormModel) => void;
}

const AllFormDataContext = React.createContext<AllFormDataContextType>({
  formModel: null,

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setFormModel: () => {},
});

export default AllFormDataContext;
