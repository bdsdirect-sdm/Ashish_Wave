import React, { useState } from 'react';
import DashboardOverview from './DashboardOverview';
import UserList from './UserList';
import WaveList from './WaveList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './dashboard.css';

const Dashboard: React.FC = () => {
    const [isChanged, setIsChanged] = useState(false);
    const adminName = localStorage.getItem('adminName');

    const handleLogout = () => {

        localStorage.removeItem("token");
        window.location.href = "/login";
        console.log("Logout clicked");
    };

    return (
        <div id="dashboard-page">
            <div id="dashboard">
                <div id="navbaar">
                    <h3>Welcome</h3>
                    <h3>&nbsp;&lt;&nbsp;{adminName}&nbsp;&gt;</h3>
                    <h3 id="logout-btn" onClick={handleLogout}>
                        Logout
                    </h3>
                </div>
            </div>
            <DashboardOverview isChanged={isChanged} />
            <UserList isChanged={isChanged} setIsChanged={setIsChanged} />
            <WaveList isChanged={isChanged} setIsChanged={setIsChanged} />
            <ToastContainer />
        </div>
    );
};

export default Dashboard;