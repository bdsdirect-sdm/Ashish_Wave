import React from 'react';
import './dashboardOverview.css';

interface DashboardOverviewProps {
    totalUser: number;
    activeUser: number;
    inactiveUser: number;
    totalWaves: number;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ totalUser, activeUser, inactiveUser, totalWaves }) => {
    return (
        <div id="overview-page">
            <div id="overview-heading">
                <h6>DASHBOARD</h6>
                <h2>Overview</h2>
            </div>
            <div id="overview-detail-container">
                <div className="overview-card">
                    <h4>TOTAL USERS</h4>
                    <h4>{totalUser}</h4>
                </div>
                <div className="overview-card">
                    <h4>ACTIVE USERS</h4>
                    <h4>{activeUser}</h4>
                </div>
                <div className="overview-card">
                    <h4>INACTIVE USERS</h4>
                    <h4>{inactiveUser}</h4>
                </div>
                <div className="overview-card">
                    <h4>TOTAL WAVES</h4>
                    <h4>{totalWaves}</h4>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;