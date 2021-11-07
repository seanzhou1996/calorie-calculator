import React from 'react';
import { useTranslation } from 'react-i18next';
import scrollTo from 'antd/lib/_util/scrollTo';
import { ArrowUpOutlined } from '@ant-design/icons';
import { I18nKeys } from 'shared/i18n-keys';

export default function BaseBackToTopButton() {
  const { t } = useTranslation();
  const scrollToTop = () => scrollTo(0);
  return (
    <button onClick={scrollToTop} className="back-to-top-button">
      <ArrowUpOutlined className="back-to-top-button__arrow" />
      <span>{t(I18nKeys.BackToTop)}</span>
    </button>
  );
}
