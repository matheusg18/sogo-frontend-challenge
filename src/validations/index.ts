import * as yup from 'yup';
import cepSchema from './cepSchema';
import cpfSchema from './cpfSchema';
import firstNameSchema from './firstNameSchema';
import lastNameSchema from './lastNameSchema';
import numberSchema from './numberSchema';
import dateSchema from './dateSchema';

const registerPersonValidation = yup.object({
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  cep: cepSchema,
  cpf: cpfSchema,
  number: numberSchema,
  birthDate: dateSchema,
});

export { registerPersonValidation };
