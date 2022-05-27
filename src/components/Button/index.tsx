import React, { MouseEvent } from 'react';
import './styles.scss';

type PropTypes = {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'filter';
  handleClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
  children: string;
};

function Button({ type = 'button', variant = 'primary', handleClick, children }: PropTypes) {
  return (
    <button
      className={`button-component button-component--${variant}`}
      type={type}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default Button;
