import React, { FocusEvent } from 'react';
import { useFormik } from 'formik';
import * as utils from '../../utils';
import { IRegisterPersonFormValues } from '../../interfaces';
import TextInput from '../../components/TextInput';
import { registerPersonValidation } from '../../validations';
import Button from '../../components/Button';

function RegisterPerson() {
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

  const formik = useFormik<IRegisterPersonFormValues>({
    initialValues,
    onSubmit: console.log,
    validationSchema: registerPersonValidation,
  });

  const handleCepBlur = async (event: FocusEvent<HTMLInputElement>) => {
    formik.handleBlur(event);
    if (formik.errors.cep) return;

    const { state, city, district, street } = await utils.fetchInfoFromCep(event.target.value);

    formik.setFieldValue('state', state);
    formik.setFieldValue('city', city);
    formik.setFieldValue('district', district);
    formik.setFieldValue('street', street);
  };

  return (
    <div>
      <h1>Cadastro de pessoa prestadora de serviço</h1>
      <form onSubmit={formik.handleSubmit}>
        <h2>Dados pessoais</h2>

        <TextInput name="firstName" placeholder="Nome" formik={formik} />
        <TextInput name="lastName" placeholder="Sobrenome" formik={formik} />
        <TextInput name="cpf" placeholder="CPF" formik={formik} />
        <TextInput name="birthDate" placeholder="Data de nascimento" formik={formik} />

        <h2>Endereço</h2>

        <TextInput name="cep" placeholder="CEP" handleBlur={handleCepBlur} formik={formik} />
        <TextInput name="street" placeholder="Rua" formik={formik} readOnly />
        <TextInput name="number" placeholder="Número" formik={formik} />
        <TextInput name="state" placeholder="Estado" formik={formik} readOnly />
        <TextInput name="city" placeholder="Cidade" formik={formik} readOnly />
        <TextInput name="district" placeholder="Bairro" formik={formik} readOnly />
        <TextInput name="complement" placeholder="Complemento" formik={formik} />

        <Button type="submit">Cadastrar</Button>
      </form>
    </div>
  );
}

export default RegisterPerson;
