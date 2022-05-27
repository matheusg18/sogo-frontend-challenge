import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormikProps, useFormik } from 'formik';
import * as yup from 'yup';
import TextInput from '.';
import { IRegisterPersonFormValues } from '../../interfaces';

const customBlur = jest.fn();

// it's necessary to simulate the formik prop
// it renders another input to simulate the blur event
function TestComponent({ type }: { type: 'normal' | 'readOnly' | 'customBlur' }) {
  const initialValues = { firstName: '' };
  const validationSchema = yup.object({ firstName: yup.string().required('is required!') });
  const onSubmit = jest.fn();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  }) as unknown as FormikProps<IRegisterPersonFormValues>;

  switch (type) {
    case 'readOnly':
      return (
        <>
          <input type="text" placeholder="Last name" />
          <TextInput name="firstName" placeholder="First name" formik={formik} readOnly />
        </>
      );

    case 'customBlur':
      return (
        <>
          <input type="text" placeholder="Last name" />
          <TextInput
            name="firstName"
            placeholder="First name"
            formik={formik}
            handleBlur={customBlur}
          />
        </>
      );

    default:
      return (
        <>
          <input type="text" placeholder="Last name" />
          <TextInput name="firstName" placeholder="First name" formik={formik} />
        </>
      );
  }
}

describe('TextInput - unit test', () => {
  it('should behave like a input with no error message', async () => {
    render(<TestComponent type="normal" />);

    const input = screen.getByPlaceholderText('First name');
    expect(input).toBeInTheDocument();

    await act(() => {
      userEvent.type(input, 'Matheus');
    });

    expect(input).toHaveValue('Matheus');
    expect(screen.queryByTestId('input-error-message')).not.toBeInTheDocument();
  });

  it('should show the error message on invalid value', async () => {
    render(<TestComponent type="normal" />);

    const input = screen.getByPlaceholderText('First name');
    const input2 = screen.getByPlaceholderText('Last name');

    await act(() => {
      userEvent.click(input);
      userEvent.click(input2);
    });

    expect(screen.queryByTestId('input-error-message')).toBeInTheDocument();
  });

  it('should be readOnly if passed readOnly prop', async () => {
    render(<TestComponent type="readOnly" />);

    const input = screen.getByPlaceholderText('First name');

    await act(() => {
      userEvent.type(input, 'Matheus');
    });

    expect(input).toHaveValue('');
    expect(screen.queryByTestId('input-error-message')).not.toBeInTheDocument();
  });

  it('should use custom onBlur method if passed handleBlur prop', async () => {
    render(<TestComponent type="customBlur" />);

    const input = screen.getByPlaceholderText('First name');
    const input2 = screen.getByPlaceholderText('Last name');

    await act(() => {
      userEvent.type(input, 'Matheus');
      userEvent.click(input2);
    });

    expect(input).toHaveValue('Matheus');
    expect(customBlur).toHaveBeenCalled();
  });
});
