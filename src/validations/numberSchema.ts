import * as yup from 'yup';

const numberSchema = yup.string().required('Número é obrigatório');

export default numberSchema;
