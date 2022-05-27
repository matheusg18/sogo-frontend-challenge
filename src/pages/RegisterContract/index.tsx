import React from 'react';
import { useFormik } from 'formik';
import { IRegisterContractFormValues } from '../../interfaces';
import { registerContractValidation } from '../../validations';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import './styles.scss';

const initialValues: IRegisterContractFormValues = {
  registrationDate: '',
  dueDate: '',
  personCpf: '',
};

function RegisterContract() {
  const formik = useFormik<IRegisterContractFormValues>({
    initialValues,
    onSubmit: console.log,
    validationSchema: registerContractValidation,
  });

  return (
    <main className="register-contract-page">
      <div className="register-contract-page__container">
        <h1 className="register-contract-page__h1">Cadastro de contrato individual</h1>
        <form className="register-contract-page__form" onSubmit={formik.handleSubmit}>
          <h2 className="register-contract-page__h2">Dados pessoais</h2>
          <div className="register-contract-page__contract-data-container">
            <TextInput name="registrationDate" placeholder="Data de registro" formik={formik} />
            <TextInput name="dueDate" placeholder="Data de vencimento" formik={formik} />
            <TextInput
              name="personCpf"
              placeholder="CPF da pessoa prestadora de serviço"
              formik={formik}
            />
          </div>
          <Button type="submit">Cadastrar</Button>
        </form>
      </div>
    </main>
  );
}

export default RegisterContract;
