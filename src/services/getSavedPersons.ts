import moment from 'moment';
import { IPerson } from '../interfaces';

const getSavedPersons = (): IPerson[] => {
  const savedPersons = JSON.parse(localStorage.getItem('@sogo/savedPersons') || 'null');

  return savedPersons
    ?.map((person: any) => ({ ...person, birthDate: moment(person.birthDate).toDate() }))
    || [];
};

export { getSavedPersons };
