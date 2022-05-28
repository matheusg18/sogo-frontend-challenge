import { v4 as uuid } from 'uuid';
import moment from 'moment';
import { IContract, IRegisterContractFormValues } from '../interfaces';
import { getSavedContracts } from './getSavedContracts';

const buildNewContract = (data: IRegisterContractFormValues): IContract => ({
  contractNumber: uuid(),
  registrationDate: moment(data.registrationDate, 'DD/MM/YYYY').toDate(),
  dueDate: moment(data.dueDate, 'DD/MM/YYYY').toDate(),
  personCpf: data.personCpf,
});

const registerContract = (contractData: IRegisterContractFormValues): void => {
  const savedContracts = getSavedContracts();
  const newContract = buildNewContract(contractData);

  localStorage.setItem('@sogo/savedContracts', JSON.stringify([...savedContracts, newContract]));
};

export { registerContract };
