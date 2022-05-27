import { IPerson } from '../interfaces';

const getSavedPersons = (): IPerson[] => {
  const savedPersons = JSON.parse(localStorage.getItem('@sogo/savedPersons') || 'null');

  return savedPersons || [];
};

export { getSavedPersons };
