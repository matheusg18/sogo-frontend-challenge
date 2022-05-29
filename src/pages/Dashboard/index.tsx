import React, { useEffect, useState } from 'react';
import { FaFileContract, FaCalendarTimes } from 'react-icons/fa';
import { BsClockHistory } from 'react-icons/bs';
import * as services from '../../services';
import DashboardCard from '../../components/DashboardCard';
import Button from '../../components/Button';
import './styles.scss';

type filterType = 'today' | 'next week' | 'next month' | 'next 2 weeks' | 'future';

function Dashboard() {
  const [contracts, setContracts] = useState(0);
  const [averageContractTime, setAverageContractTime] = useState({ value: '0', unity: 'dias' });
  const [contractsToExpire, setContractsToExpire] = useState(0);
  const [expireInterval, setExpireInterval] = useState<filterType>('future');

  useEffect(() => {
    setContracts(services.getSavedContracts().length);
    setAverageContractTime(services.getAverageContractTime());
    setContractsToExpire(services.filterContracts(expireInterval).length);
  }, []);

  useEffect(() => {
    setContractsToExpire(services.filterContracts(expireInterval).length);
  }, [expireInterval]);

  const handleFilterButtonClick = (filter: filterType): void => {
    setExpireInterval((prev) => (prev === filter ? 'future' : filter));
  };

  return (
    <main className="dashboard-page">
      <div className="dashboard-page__cards-wrapper">
        <DashboardCard
          header="Contratos cadastrados"
          icon={<FaFileContract size="52px" />}
          displayData={contracts}
        />
        <DashboardCard
          header="Contratos a vencer"
          icon={<FaCalendarTimes size="52px" />}
          displayData={contractsToExpire}
        >
          <div className="dashboard-page__filter-wrapper">
            <Button
              variant="small-filter"
              value="next month"
              state={expireInterval === 'next month' ? 'selected' : 'normal'}
              handleClick={() => handleFilterButtonClick('next month')}
            >
              30 dias
            </Button>
            <Button
              variant="small-filter"
              value="next 2 weeks"
              state={expireInterval === 'next 2 weeks' ? 'selected' : 'normal'}
              handleClick={() => handleFilterButtonClick('next 2 weeks')}
            >
              15 dias
            </Button>
            <Button
              variant="small-filter"
              value="next week"
              state={expireInterval === 'next week' ? 'selected' : 'normal'}
              handleClick={() => handleFilterButtonClick('next week')}
            >
              7 dias
            </Button>
            <Button
              variant="small-filter"
              value="today"
              state={expireInterval === 'today' ? 'selected' : 'normal'}
              handleClick={() => handleFilterButtonClick('today')}
            >
              Hoje
            </Button>
          </div>
        </DashboardCard>
        <DashboardCard
          header="Tempo médio de prestação de serviços"
          icon={<BsClockHistory size="52px" />}
          displayData={averageContractTime.value}
          unity={averageContractTime.unity}
        />
      </div>
    </main>
  );
}

export default Dashboard;
