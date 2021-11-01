import React from 'react';
import { LeftOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { I18nKeys } from 'result/i18n-keys';

interface GoBackButtonProps {
  to: string;
}

function GoBackButton({ to }: GoBackButtonProps) {
  const { t } = useTranslation();
  const history = useHistory();
  return (
    <button onClick={() => history.push(to)} className="go-back-button">
      <LeftOutlined className="icon" />
      <span>{t(I18nKeys.PreviousPage)}</span>
    </button>
  );
}

export default GoBackButton;
