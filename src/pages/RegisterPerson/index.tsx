/* eslint-disable no-use-before-define */
import React, { FocusEvent } from 'react';
import { FormikHelpers, useFormik } from 'formik';
import { useAlert } from 'react-alert';
import { isValid as isCpfValid } from '@fnando/cpf';
import * as utils from '../../utils';
import * as services from '../../services';
import { IRegisterPersonFormValues } from '../../interfaces';
import TextInput from '../../components/TextInput';
import { registerPersonValidation } from '../../validations';
import Button from '../../components/Button';
import './styles.scss';

const initialValues: IRegisterPersonFormValues = {
  firstName: '',
  lastName: '',
  cpf: '',
  birthDate: '',
  cep: '',
  street: '',
  number: '',
  state: '',
  city: '',
  district: '',
  complement: '',
};

function RegisterPerson() {
  const alert = useAlert();

  const handleSubmit = (
    values: IRegisterPersonFormValues,
    formikHelpers: FormikHelpers<IRegisterPersonFormValues>,
  ) => {
    if (!isCpfValid(formik.values.cpf, true)) {
      alert.error('CPF inválido!');
      formik.setFieldError('cpf', 'CPF inválido');
      return;
    }

    try {
      services.registerPerson(values);
      formikHelpers.resetForm();
    } catch (error) {
      if (error instanceof Error && error.message === 'person already registered') {
        alert.error('CPF já cadastrado!');
        formik.setFieldError('cpf', 'CPF já cadastrado!');
      }
    }
  };

  const formik = useFormik<IRegisterPersonFormValues>({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: registerPersonValidation,
  });

  const handleCepBlur = async (event: FocusEvent<HTMLInputElement>) => {
    formik.handleBlur(event);
    if (formik.errors.cep || formik.values.cep === '') return;

    const { state, city, district, street } = await utils.fetchInfoFromCep(event.target.value);

    formik.setFieldValue('state', state);
    formik.setFieldValue('city', city);
    formik.setFieldValue('district', district);
    formik.setFieldValue('street', street);
  };

  return (
    <main className="register-person-page">
      <div className="register-person-page__container">
        <h1 className="register-person-page__h1">Cadastro de pessoa prestadora de serviço</h1>
        <form className="register-person-page__form" onSubmit={formik.handleSubmit}>
          <h2 className="register-person-page__h2">Dados pessoais</h2>
          <div className="register-person-page__personal-data-container">
            <TextInput name="firstName" placeholder="Nome" formik={formik} />
            <TextInput name="lastName" placeholder="Sobrenome" formik={formik} />
            <TextInput name="cpf" placeholder="CPF" formik={formik} />
            <TextInput name="birthDate" placeholder="Data de nascimento" formik={formik} />
          </div>
          <h2 className="register-person-page__h2">Endereço</h2>
          <div className="register-person-page__address-data-container">
            <TextInput name="cep" placeholder="CEP" handleBlur={handleCepBlur} formik={formik} />
            <TextInput name="street" placeholder="Rua" formik={formik} readOnly />
            <TextInput name="number" placeholder="Número" formik={formik} />
            <TextInput name="state" placeholder="Estado" formik={formik} readOnly />
            <TextInput name="city" placeholder="Cidade" formik={formik} readOnly />
            <TextInput name="district" placeholder="Bairro" formik={formik} readOnly />
            <TextInput name="complement" placeholder="Complemento" formik={formik} />
          </div>
          <Button type="submit">Cadastrar</Button>
        </form>
      </div>
    </main>
  );
}

export default RegisterPerson;
