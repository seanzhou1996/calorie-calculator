import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpOutlined } from '@ant-design/icons';
import { I18nKeys } from 'shared/i18n-keys';

interface BaseBackToTopButtonProps {
  href?: string;
}

export default function BaseBackToTopButton({ href }: BaseBackToTopButtonProps) {
  const { t } = useTranslation();
  return (
    <a href={href || '#'} className="back-to-top-button">
      <ArrowUpOutlined className="back-to-top-button__arrow" />
      <span>{t(I18nKeys.BackToTop)}</span>
    </a>
  );
}
