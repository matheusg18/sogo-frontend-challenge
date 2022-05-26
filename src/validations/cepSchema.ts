import * as yup from 'yup';

const cepSchema = yup
  .string()
  .matches(/^\d{8}$/, 'CEP inválido')
  .required('CEP é obrigatório');

export default cepSchema;
