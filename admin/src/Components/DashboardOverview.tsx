import React from 'react';
import './dashboardOverview.css';
import { useEffect, useState } from 'react';


interface DashboardOverviewProps {
    totalUser: number;
    activeUser: number;
    inactiveUser: number;
    totalWaves: number;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = () => {


    const [userCounts, setUserCounts] = useState({ totalUser: 0, activeUser: 0, inactiveUser: 0 });
    const [waveCount, setWaveCount] = useState(0);

    useEffect(() => {
        const fetchUserCounts = async () => {   
            try {
                const response = await fetch('http://localhost:3000/Count', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                })

                const data = await response.json();
                setUserCounts(data);

            } catch (error) {
                console.error('Error fetching user counts:', error);
            }
        };

        const fetchWaveCount = async () => {
            try {
                const response = await fetch('/api/waveCount');
                const data = await response.json();
                setWaveCount(data.totalWaves);
            } catch (error) {
                console.error('Error fetching wave count:', error);
            }
        };

        fetchUserCounts();
        fetchWaveCount();
    }, []);

    return (
        <div id="overview-page">
            <div id="overview-heading">
                <h6>DASHBOARD</h6>
                <h2>Overview</h2>
            </div>
            <div id="overview-detail-container">
                <div className="overview-card">
                    <h4>TOTAL USERS</h4>
                    <h4>{userCounts.totalUser}</h4>
                </div>
                <div className="overview-card">
                    <h4>ACTIVE USERS</h4>
                    <h4>{userCounts.activeUser}</h4>
                </div>
                <div className="overview-card">
                    <h4>INACTIVE USERS</h4>
                    <h4>{userCounts.inactiveUser}</h4>
                </div>
                <div className="overview-card">
                    <h4>TOTAL WAVES</h4>
                    <h4>{waveCount}</h4>
                </div>
            </div>
        </div>
    );
};

// return (
//     <div id="overview-page">
//         <div id="overview-heading">
//             <h6>DASHBOARD</h6>
//             <h2>Overview</h2>
//         </div>
//         <div id="overview-detail-container">
//             <div className="overview-card">
//                 <h4>TOTAL USERS</h4>
//                 <h4>{totalUser}</h4>
//             </div>
//             <div className="overview-card">
//                 <h4>ACTIVE USERS</h4>
//                 <h4>{activeUser}</h4>
//             </div>
//             <div className="overview-card">
//                 <h4>INACTIVE USERS</h4>
//                 <h4>{inactiveUser}</h4>
//             </div>
//             <div className="overview-card">
//                 <h4>TOTAL WAVES</h4>
//                 <h4>{totalWaves}</h4>
//             </div>
//         </div>
//     </div>
// );
// };

export default DashboardOverview;