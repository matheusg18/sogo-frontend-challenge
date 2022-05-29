import React, { ReactNode } from 'react';
import './styles.scss';

type PropTypes = {
  header: string;
  icon: ReactNode;
  displayData: string | number;
  unity?: string;
  children?: ReactNode;
};

function DashboardCard({ header, icon, displayData, unity, children }: PropTypes) {
  return (
    <div className="dashboard-card">
      <h2 className="dashboard-card__header">{header}</h2>
      {children}
      <div className="dashboard-card__spacer" />
      <div className="dashboard-card__wrapper">
        {icon}
        <div className="dashboard-card__display-data">
          {displayData}
          {unity && <span className="dashboard-card__unity">{unity}</span>}
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;
