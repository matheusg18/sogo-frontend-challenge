import * as yup from 'yup';

const firstNameSchema = yup
  .string()
  .min(2, 'Nome deve ter mais que 2 caracters')
  .max(100, 'Nome deve ter menos que 100 caracters')
  .required('Nome é obrigatório');

export default firstNameSchema;
