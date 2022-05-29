import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { IContract } from '../../interfaces';
import * as services from '../../services';
import * as utils from '../../utils';
import './styles.scss';
import Button from '../../components/Button';

function ContractsToExpire() {
  const [contracts, setContracts] = useState<IContract[]>([]);
  const [expireInterval, setExpireInterval] = useState<services.filterType>('future');

  useEffect(() => {
    setContracts(services.filterContracts(expireInterval));
  }, [expireInterval]);

  const handleFilterButtonClick = (filter: services.filterType): void => {
    setExpireInterval((prev) => (prev === filter ? 'future' : filter));
  };

  return (
    <main className="contracts-to-expire">
      <div className="contracts-to-expire__filter-wrapper">
        <Button
          variant="filter"
          value="next month"
          state={expireInterval === 'next month' ? 'selected' : 'normal'}
          handleClick={() => handleFilterButtonClick('next month')}
        >
          30 dias
        </Button>
        <Button
          variant="filter"
          value="next 2 weeks"
          state={expireInterval === 'next 2 weeks' ? 'selected' : 'normal'}
          handleClick={() => handleFilterButtonClick('next 2 weeks')}
        >
          15 dias
        </Button>
        <Button
          variant="filter"
          value="next week"
          state={expireInterval === 'next week' ? 'selected' : 'normal'}
          handleClick={() => handleFilterButtonClick('next week')}
        >
          7 dias
        </Button>
        <Button
          variant="filter"
          value="today"
          state={expireInterval === 'today' ? 'selected' : 'normal'}
          handleClick={() => handleFilterButtonClick('today')}
        >
          Hoje
        </Button>
      </div>
      <table className="contracts-to-expire__table">
        <thead className="contracts-to-expire__thead">
          <tr className="contracts-to-expire__tr">
            <th className="contracts-to-expire__th">Número do contrato</th>
            <th className="contracts-to-expire__th">Data de vencimento</th>
            <th className="contracts-to-expire__th">Data do registro</th>
            <th className="contracts-to-expire__th">CPF da pessoa prestadora</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map(({ contractNumber, registrationDate, dueDate, personCpf }) => (
            <tr key={contractNumber}>
              <td className="contracts-to-expire__td">{contractNumber}</td>
              <td className="contracts-to-expire__td">{moment(dueDate).format('DD/MM/YYYY')}</td>
              <td className="contracts-to-expire__td">
                {moment(registrationDate).format('DD/MM/YYYY')}
              </td>
              <td className="contracts-to-expire__td">{utils.formatCpf(personCpf)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default ContractsToExpire;
