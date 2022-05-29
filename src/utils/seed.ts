import contracts from '../data/contracts.json';
import persons from '../data/persons.json';

const seed = () => {
  localStorage.setItem('@sogo/savedPersons', JSON.stringify(persons));
  localStorage.setItem('@sogo/savedContracts', JSON.stringify(contracts));
};

export { seed };
