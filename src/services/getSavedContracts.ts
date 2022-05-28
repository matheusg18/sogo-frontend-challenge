import moment from 'moment';
import { IContract } from '../interfaces';

const getSavedContracts = (): IContract[] => {
  const savedContracts = JSON.parse(localStorage.getItem('@sogo/savedContracts') || 'null');

  return (
    savedContracts?.map((contract: any) => ({
      ...contract,
      registrationDate: moment(contract.registrationDate).toDate(),
      dueDate: moment(contract.dueDate).toDate(),
    })) || []
  );
};

export { getSavedContracts };
