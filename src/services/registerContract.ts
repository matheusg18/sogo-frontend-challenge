import moment from 'moment';
import { IContract, IRegisterContractFormValues } from '../interfaces';
import { genContractNumber } from '../utils';
import { getSavedContracts } from './getSavedContracts';
import { getSavedPersons } from './getSavedPersons';

const buildNewContract = (data: IRegisterContractFormValues): IContract => ({
  contractNumber: genContractNumber(),
  registrationDate: moment(data.registrationDate, 'DD/MM/YYYY').toDate(),
  dueDate: moment(data.dueDate, 'DD/MM/YYYY').toDate(),
  personCpf: data.personCpf,
});

const registerContract = (contractData: IRegisterContractFormValues): void => {
  const savedContracts = getSavedContracts();
  const newContract = buildNewContract(contractData);

  if (moment(newContract.registrationDate).isAfter(moment(newContract.dueDate))) {
    throw new Error('due date must be after registration date');
  }

  if (!getSavedPersons().find(({ cpf }) => newContract.personCpf === cpf)) {
    throw new Error('cpf not found');
  }

  localStorage.setItem('@sogo/savedContracts', JSON.stringify([...savedContracts, newContract]));
};

export { registerContract };
