import React, { useEffect, useState } from 'react';
import { FaFileContract, FaCalendarTimes } from 'react-icons/fa';
import { BsClockHistory } from 'react-icons/bs';
import * as services from '../../services';
import DashboardCard from '../../components/DashboardCard';
import Button from '../../components/Button';
import './styles.scss';

function Dashboard() {
  const [contracts, setContracts] = useState(0);

  useEffect(() => {
    setContracts(services.getSavedContracts().length);
  }, []);

  return (
    <main className="dashboard-page">
      <div className="dashboard-page__admin-wrapper">
        <p className="dashboard-page__admin-wrapper__name">Matheus Santos</p>
        <p className="dashboard-page__admin-wrapper__email">matheus@gmail.com</p>
      </div>
      <div className="dashboard-page__cards-wrapper">
        <DashboardCard
          header="Contratos cadastrados"
          icon={<FaFileContract size="52px" />}
          displayData={contracts}
        />
        <DashboardCard
          header="Contratos a vencer"
          icon={<FaCalendarTimes size="52px" />}
          displayData={10}
        >
          <div className="dashboard-page__filter-wrapper">
            <Button variant="small-filter">30 dias</Button>
            <Button variant="small-filter">15 dias</Button>
            <Button variant="small-filter">7 dias</Button>
            <Button variant="small-filter">Hoje</Button>
          </div>
        </DashboardCard>
        <DashboardCard
          header="Tempo médio de prestação de serviços"
          icon={<BsClockHistory size="52px" />}
          displayData="144 dias"
        />
      </div>
    </main>
  );
}

export default Dashboard;
