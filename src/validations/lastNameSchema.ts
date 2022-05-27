import * as yup from 'yup';

const lastNameSchema = yup
  .string()
  .min(2, 'Sobrenome deve ter mais que 2 caracters')
  .max(100, 'Sobrenome deve ter menos que 100 caracters')
  .required('Sobrenome é obrigatório');

export default lastNameSchema;
