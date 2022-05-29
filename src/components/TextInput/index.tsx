import React, { FocusEvent } from 'react';
import { FormikProps } from 'formik';
import { IRegisterContractFormValues, IRegisterPersonFormValues } from '../../interfaces';
import './styles.scss';

type PropTypes = {
  name: string;
  placeholder: string;
  handleBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  formik: FormikProps<IRegisterPersonFormValues> | FormikProps<IRegisterContractFormValues>;
  readOnly?: boolean;
};

function TextInput({ name, placeholder, handleBlur, formik, readOnly = false }: PropTypes) {
  // @ts-ignore
  const canShowError = formik.errors[name] && formik.touched[name];

  return (
    <div className="input-container" data-inputName={name}>
      <input
        type="text"
        className={`input-container__input ${canShowError ? 'input-container__input--error' : ''}`}
        name={name}
        placeholder={placeholder}
        onBlur={handleBlur || formik.handleBlur}
        onChange={formik.handleChange}
        // @ts-ignore
        value={formik.values[name]}
        readOnly={readOnly}
      />
      {canShowError && (
        <p className="input-container__error-message" data-testid="input-error-message">
          {/* @ts-ignore */}
          {formik.errors[name]}
        </p>
      )}
    </div>
  );
}

export default TextInput;
