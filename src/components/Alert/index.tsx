import React, { ReactNode } from 'react';
import { MdError, MdWarning, MdCheck } from 'react-icons/md';
import './styles.scss';

type PropTypes = {
  type: 'success' | 'error' | 'warning';
  children: string;
};

function Alert({ type, children }: PropTypes) {
  let icon: ReactNode;

  switch (type) {
    case 'error':
      icon = <MdError size="24px" />;
      break;

    case 'warning':
      icon = <MdWarning size="24px" />;
      break;

    case 'success':
      icon = <MdCheck size="24px" />;
      break;

    default:
      break;
  }

  return (
    <div className={`alert alert--${type}`}>
      <div className="alert__icon">{icon}</div>
      {children}
    </div>
  );
}

export default Alert;
