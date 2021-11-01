import React from 'react';
import { LeftOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { I18nKeys } from 'shared/i18n-keys';

interface BaseGoBackButtonProps {
  to: string;
  titleOverride?: string;
}

function BaseGoBackButton({ to, titleOverride }: BaseGoBackButtonProps) {
  const { t } = useTranslation();
  const history = useHistory();
  return (
    <button onClick={() => history.push(to)} className="go-back-button">
      <LeftOutlined className="icon" />
      <span>{titleOverride || t(I18nKeys.PreviousPage)}</span>
    </button>
  );
}

export default BaseGoBackButton;
