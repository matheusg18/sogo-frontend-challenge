import React, { FocusEvent } from 'react';
import { FormikProps } from 'formik';
import { IRegisterPersonFormValues } from '../../interfaces';

type PropTypes = {
  name: keyof IRegisterPersonFormValues;
  placeholder: string;
  handleBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  formik: FormikProps<IRegisterPersonFormValues>;
  readOnly?: boolean;
};

function TextInput({ name, placeholder, handleBlur, formik, readOnly = false }: PropTypes) {
  return (
    <div>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        onBlur={handleBlur || formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values[name]}
        readOnly={readOnly}
      />
      {formik.errors[name] && formik.touched[name] && <p>{formik.errors[name]}</p>}
    </div>
  );
}

export default TextInput;
