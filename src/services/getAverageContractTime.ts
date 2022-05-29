import moment from 'moment';
import { getSavedContracts } from './getSavedContracts';

const chooseOutput = (averageInDays: number): { value: string; unity: string } => {
  if (averageInDays > 365) return { value: (averageInDays / 365).toFixed(1), unity: 'anos' };
  if (averageInDays > 30) return { value: (averageInDays / 30).toFixed(1), unity: 'meses' };
  if (averageInDays > 7) return { value: (averageInDays / 7).toFixed(1), unity: 'semanas' };
  return { value: averageInDays.toString(), unity: 'dias' };
};

const getAverageContractTime = (): { value: string, unity: string } => {
  const savedContracts = getSavedContracts();
  const sumOfDays = savedContracts.reduce((acc, { registrationDate, dueDate }) => (
    acc + moment(dueDate).diff(moment(registrationDate), 'days')
  ), 0);
  const averageInDays = (sumOfDays / savedContracts.length) || 0;

  return chooseOutput(averageInDays);
};

export { getAverageContractTime };
