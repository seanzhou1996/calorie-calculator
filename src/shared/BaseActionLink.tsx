import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as ArrowRightCircle } from 'assets/icon-arrow-right-circle.svg';

interface BaseActionLinkProps {
  to: string;
  title: string;
}

export default function BaseActionLink({ to, title }: BaseActionLinkProps) {
  return (
    <Link to={to} className="action__link">
      <ArrowRightCircle className="action__icon" />
      <span>{title}</span>
    </Link>
  );
}
