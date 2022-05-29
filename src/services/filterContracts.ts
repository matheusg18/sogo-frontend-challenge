import moment from 'moment';
import { IContract } from '../interfaces';
import { getSavedContracts } from './getSavedContracts';

type filterType = 'today' | 'next week' | 'next month' | 'next 2 weeks' | 'future';

const filterContracts = (filter: filterType): IContract[] => {
  const savedContracts = getSavedContracts();

  return savedContracts.filter((contract) => {
    switch (filter) {
      case 'next month':
        return moment(contract.dueDate).isBetween(moment(), moment().add(30, 'days'));

      case 'next 2 weeks':
        return moment(contract.dueDate).isBetween(moment(), moment().add(15, 'days'));

      case 'next week':
        return moment(contract.dueDate).isBetween(moment(), moment().add(7, 'days'));

      case 'today':
        return moment(contract.dueDate).isSame(moment(), 'day');

      case 'future':
        return moment(contract.dueDate).isSameOrAfter(moment(), 'day');

      default:
        return false;
    }
  });
};

export { filterContracts, type filterType };
