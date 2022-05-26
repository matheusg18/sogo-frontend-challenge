import React, { FocusEvent } from 'react';
import { useFormik } from 'formik';
import * as utils from '../../utils';

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

  const formik = useFormik({ initialValues, onSubmit: console.log });

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
        <input
          type="text"
          name="firstName"
          placeholder="Nome"
          onChange={formik.handleChange}
          value={formik.values.firstName}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Sobrenome"
          onChange={formik.handleChange}
          value={formik.values.lastName}
        />
        <input
          type="text"
          name="cpf"
          placeholder="CPF"
          onChange={formik.handleChange}
          value={formik.values.cpf}
        />
        <input
          type="text"
          name="birthDate"
          placeholder="Data de nascimento"
          onChange={formik.handleChange}
          value={formik.values.birthDate}
        />
        <h2>Endereço</h2>
        <input
          type="text"
          name="cep"
          placeholder="CEP"
          onChange={formik.handleChange}
          value={formik.values.cep}
          onBlur={handleCepBlur}
        />
        <input
          type="text"
          name="street"
          placeholder="Rua"
          onChange={formik.handleChange}
          value={formik.values.street}
          readOnly
        />
        <input
          type="text"
          name="number"
          placeholder="número"
          onChange={formik.handleChange}
          value={formik.values.number}
        />
        <input
          type="text"
          name="state"
          placeholder="Estado"
          onChange={formik.handleChange}
          value={formik.values.state}
          readOnly
        />
        <input
          type="text"
          name="city"
          placeholder="Cidade"
          onChange={formik.handleChange}
          value={formik.values.city}
          readOnly
        />
        <input
          type="text"
          name="district"
          placeholder="Bairro"
          onChange={formik.handleChange}
          value={formik.values.district}
          readOnly
        />
        <input
          type="text"
          name="complement"
          placeholder="Complemento"
          onChange={formik.handleChange}
          value={formik.values.complement}
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default RegisterPerson;
