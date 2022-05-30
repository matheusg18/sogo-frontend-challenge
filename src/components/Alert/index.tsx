import React from 'react';
import { MdError, MdWarning, MdCheck } from 'react-icons/md';
import { AlertTemplateProps } from 'react-alert';
import './styles.scss';

function Alert({ style, options, message }: AlertTemplateProps) {
  return (
    <div style={style} className={`alert alert--${options.type}`}>
      <div className="alert__icon">
        {options.type === 'info' && <MdWarning size="24px" />}
        {options.type === 'success' && <MdCheck size="24px" />}
        {options.type === 'error' && <MdError size="24px" />}
      </div>
      {message}
    </div>
  );
}

export default Alert;
