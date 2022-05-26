import React from 'react';
import { Field, Form, Formik } from 'formik';

function RegisterPerson() {
  const initialValues = {
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

  return (
    <div>
      <h1>Cadastro de pessoa prestadora de serviço</h1>
      <Formik initialValues={initialValues} onSubmit={console.log}>
        {() => (
          <Form>
            <h2>Dados pessoais</h2>
            <Field name="firstName" placeholder="Nome" />
            <Field name="lastName" placeholder="Sobrenome" />
            <Field name="cpf" placeholder="CPF" />
            <Field name="birthDate" placeholder="Data de nascimento" />

            <h2>Endereço</h2>
            <Field name="cep" placeholder="CEP" />
            <Field name="street" placeholder="Rua" />
            <Field name="number" placeholder="número" />
            <Field name="state" placeholder="Estado" />
            <Field name="city" placeholder="Cidade" />
            <Field name="district" placeholder="Bairro" />
            <Field name="complement" placeholder="Complemento" />

            <button type="submit">Cadastrar</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default RegisterPerson;
