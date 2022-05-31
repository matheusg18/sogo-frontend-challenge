import * as yup from 'yup';

const cpfSchema = yup
  .string()
  .matches(/^\d{11}$/, 'Formato inválido')
  .required('CPF é obrigatório');

export default cpfSchema;
