// AdminHome.js
import React, { useState } from 'react';
import './AppAdminHome.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEnvelope, faBars } from '@fortawesome/free-solid-svg-icons';
import NewUserRequest from '../../Admin/AdminDashboard/NewUserRequest/NewUserRequest';
import AnalyticsCard from './AnalyticsCard';
import Chart from './Chart';

const AdminHome = ({ toggleSidebar }) => {
  const [showNewUserRequests, setShowNewUserRequests] = useState(false);

  const handleEnvelopeClick = () => {
    setShowNewUserRequests(true);
  };

  const institutionGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Institution Growth',
        data: [12, 19, 3, 5, 2, 3, 7],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const busUtilizationData = {
    labels: ['Bus 1', 'Bus 2', 'Bus 3', 'Bus 4', 'Bus 5'],
    datasets: [
      {
        label: 'Bus Utilization',
        data: [65, 59, 80, 81, 56],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const userActivityData = {
    labels: ['Active', 'Inactive', 'Pending'],
    datasets: [
      {
        label: 'User Activity',
        data: [300, 50, 100],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const recentActivitiesData = [
    { description: 'User John Doe logged in', date: '2024-08-07' },
    { description: 'New institution added: ABC Institute', date: '2024-08-06' },
    { description: 'Bus 42 departed on time', date: '2024-08-05' },
  ];

  return (
    <div className="admin-home-container">
      <div className="top-bar">
        <FontAwesomeIcon icon={faBars} className="menu-icon" onClick={toggleSidebar} />
        <h2>App Admin Home</h2>
        <div className="top-bar-right">
          <FontAwesomeIcon icon={faEnvelope} className="icon" onClick={handleEnvelopeClick} />
          <FontAwesomeIcon icon={faBell} className="icon" />
        </div>
      </div>
      <div className="content">
        {!showNewUserRequests ? (
          <>
            <div className="analytics-cards">
              <AnalyticsCard title="Total Institutions" value="25" />
              <AnalyticsCard title="Avg Schedules / Institution" value="56000" />
              <AnalyticsCard title="Avg Buses / Institution" value="40" />
              <AnalyticsCard title="Active Users" value="1200000" />
            </div>
            <div className="charts">
              <Chart title="Institution Growth" type="line" data={institutionGrowthData} />
              <Chart title="Bus Utilization" type="bar" data={busUtilizationData} />
              <Chart title="User Activity" type="pie" data={userActivityData} />
            </div>
          </>
        ) : (
          <NewUserRequest />
        )}
      </div>
    </div>
  );
};

export default AdminHome;