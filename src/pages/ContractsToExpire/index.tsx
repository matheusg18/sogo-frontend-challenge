import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useSearchParams } from 'react-router-dom';
import { IContract } from '../../interfaces';
import * as services from '../../services';
import * as utils from '../../utils';
import Button from '../../components/Button';
import './styles.scss';
import Pagination from '../../components/Pagination';

const contractsPerPage = 10;

function ContractsToExpire() {
  const [contracts, setContracts] = useState<IContract[]>([]);
  const [expireInterval, setExpireInterval] = useState<services.filterType>('future');
  const [currentPage, setCurrentPage] = useState(1);
  const [queryParams, setQueryParams] = useSearchParams();

  useEffect(() => {
    setContracts(services.filterContracts(expireInterval));
    setQueryParams({ page: '1' });
  }, [expireInterval]);

  useEffect(() => {
    const page = parseInt(queryParams.get('page') || '1', 10);
    setCurrentPage(page);
  }, [queryParams]);

  const handleFilterButtonClick = (filter: services.filterType): void => {
    setExpireInterval((prev) => (prev === filter ? 'future' : filter));
  };

  const indexOfLastContract = currentPage * contractsPerPage;
  const indexOfFirsContract = indexOfLastContract - contractsPerPage;
  const currentContracts = contracts.slice(indexOfFirsContract, indexOfLastContract);

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
      {contracts.length > 0 ? (
        <div className="contracts-to-expire__table-wrapper">
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
              {currentContracts.map(({ contractNumber, registrationDate, dueDate, personCpf }) => (
                <tr key={contractNumber}>
                  <td className="contracts-to-expire__td">{contractNumber}</td>
                  <td className="contracts-to-expire__td">
                    {moment(dueDate).format('DD/MM/YYYY')}
                  </td>
                  <td className="contracts-to-expire__td">
                    {moment(registrationDate).format('DD/MM/YYYY')}
                  </td>
                  <td className="contracts-to-expire__td">{utils.formatCpf(personCpf)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h2 className="contracts-to-expire__no-data">Não há dados para este filtro</h2>
      )}
      {contracts.length > contractsPerPage && (
        <div className="contracts-to-expire__pagination">
          <Pagination itemsPerPage={contractsPerPage} totalItems={contracts.length} />
        </div>
      )}
    </main>
  );
}

export default ContractsToExpire;
