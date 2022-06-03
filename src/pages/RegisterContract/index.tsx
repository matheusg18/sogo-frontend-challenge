/* eslint-disable no-use-before-define */
import React from 'react';
import { FormikHelpers, useFormik } from 'formik';
import { useAlert } from 'react-alert';
import { isValid as isCpfValid } from '@fnando/cpf';
import { IRegisterContractFormValues } from '../../interfaces';
import { registerContractValidation } from '../../validations';
import * as services from '../../services';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import './styles.scss';

const initialValues: IRegisterContractFormValues = {
  registrationDate: '',
  dueDate: '',
  personCpf: '',
};

function RegisterContract() {
  const alert = useAlert();

  const handleSubmit = (
    values: IRegisterContractFormValues,
    formikHelpers: FormikHelpers<IRegisterContractFormValues>,
  ) => {
    if (!isCpfValid(formik.values.personCpf, true)) {
      alert.error('CPF inválido!');
      formik.setFieldError('personCpf', 'CPF inválido');
      return;
    }

    try {
      services.registerContract(values);
      formikHelpers.resetForm();
      alert.success('Contrato cadastrada com sucesso!');
    } catch (error) {
      if ((error as Error).message === 'due date must be after registration date') {
        alert.error('Data de vencimento deve ser menor do que a data de registro!', {
          timeout: 5000,
        });
        formik.setFieldError('dueDate', 'Data inválida');
      }

      if ((error as Error).message === 'cpf not found') {
        alert.error('CPF não cadastrado!');
        formik.setFieldError('personCpf', 'CPF não cadastrado');
      }
    }
  };

  const formik = useFormik<IRegisterContractFormValues>({
    initialValues,
    onSubmit: handleSubmit,
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
