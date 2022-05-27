import * as yup from 'yup';

const dateSchema = yup
  .string()
  .matches(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/, 'Data inválida')
  .required('Data é obrigatória');

export default dateSchema;
