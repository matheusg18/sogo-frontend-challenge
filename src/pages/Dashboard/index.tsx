import React from 'react';
import { FaFileContract, FaCalendarTimes } from 'react-icons/fa';
import { BsClockHistory } from 'react-icons/bs';
import DashboardCard from '../../components/DashboardCard';
import Button from '../../components/Button';

function Dashboard() {
  return (
    <div>
      <DashboardCard
        header="Contratos cadastrados"
        icon={<FaFileContract size="52px" />}
        displayData={100}
      />
      <DashboardCard
        header="Contratos a vencer"
        icon={<FaCalendarTimes size="52px" />}
        displayData={10}
      >
        <div>
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
  );
}

export default Dashboard;
