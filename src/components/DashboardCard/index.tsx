import React, { ReactNode } from 'react';
import './styles.scss';

type PropTypes = {
  header: string;
  icon: ReactNode;
  displayData: string | number;
  children?: ReactNode;
};

function DashboardCard({ header, icon, displayData, children }: PropTypes) {
  return (
    <div className="dashboard-card">
      <h2 className="dashboard-card__header">{header}</h2>
      {children}
      <div className="dashboard-card__spacer" />
      <div className="dashboard-card__wrapper">
        {icon}
        <span className="dashboard-card__display-data">{displayData}</span>
      </div>
    </div>
  );
}

export default DashboardCard;
