import React from 'react';
import './styles.scss';

type PropTypes = {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'filter' | 'small-filter';
  state?: 'normal' | 'selected';
  value?: string;
  handleClick?: any;
  children: string;
};

function Button({ type = 'button', variant = 'primary', state = 'normal', value, handleClick, children }: PropTypes) {
  return (
    <button
      className={`button-component button-component--${variant} button-component--${state}`}
      type={type}
      value={value}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default Button;
