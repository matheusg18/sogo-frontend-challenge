import { v4 as uuid } from 'uuid';
import moment from 'moment';
import { IPerson, IRegisterPersonFormValues } from '../interfaces';
import { getSavedPersons } from './getSavedPersons';

const buildNewPerson = (data: IRegisterPersonFormValues): IPerson => ({
  id: uuid(),
  cpf: data.cpf,
  firstName: data.firstName,
  lastName: data.lastName,
  birthDate: moment(data.birthDate, 'DD/MM/YYYY').toDate(),
  address: {
    cep: data.cep,
    state: data.state,
    city: data.city,
    street: data.street,
    number: data.number,
    district: data.district,
    complement: data.complement,
  },
});

const registerPerson = (personData: IRegisterPersonFormValues): void => {
  const savedPersons = getSavedPersons();
  const newPerson = buildNewPerson(personData);

  if (savedPersons.find(({ cpf }) => newPerson.cpf === cpf)) {
    throw new Error('person already registered');
  }

  localStorage.setItem('@sogo/savedPersons', JSON.stringify([...savedPersons, newPerson]));
};

export { registerPerson };
