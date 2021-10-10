import React from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router';
import { useFormikContext } from 'formik';

interface SubmitButtonProps {
  redirectTo: string;
  children: React.ReactNode;
}

function SubmitButton<Values>({ redirectTo, children }: SubmitButtonProps) {
  const history = useHistory();
  const { submitForm, isSubmitting, dirty } = useFormikContext<Values>();

  const handleClick = () => {
    if (!dirty) {
      history.push(redirectTo);
      return;
    }
    submitForm();
  };

  return (
    <Button
      type="primary"
      htmlType="button"
      size="large"
      disabled={isSubmitting}
      className="submit-button"
      onClick={handleClick}
    >
      {children}
    </Button>
  );
}

export default SubmitButton;
