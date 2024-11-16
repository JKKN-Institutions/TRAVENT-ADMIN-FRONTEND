import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie, Doughnut, Bar } from "react-chartjs-2";
import "./PassengersHome.css";
import ViewStudents from "../ViewStudents/ViewStudents";
import ViewStaffs from "../ViewStaffs/ViewStaffs";
import Loading from "../../../../components/Shared/Loading/Loading";
import TopBar from "../../../../components/Shared/TopBar/TopBar";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PassengersHome = ({ toggleSidebar }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showViewStudents, setShowViewStudents] = useState(false);
  const [showViewStaffs, setShowViewStaffs] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const accountStatus = { active: 2447, blocked: 412, total: 5058 };
  const paidFeesCount = [
    { name: "Term 1", value: 750 },
    { name: "Term 2", value: 1922 },
    { name: "Term 3", value: 1921 },
    { name: "Not Paid", value: 465 },
  ];
  const amuletStatus = [
    { range: "100 - 70", count: 2447 },
    { range: "70 - 50", count: 1988 },
    { range: "50 - 30", count: 1007 },
    { range: "30 - 10", count: 513 },
    { range: "10", count: 250 },
  ];
  const institutions = [
    { name: "JKKN College of Arts & Science", count: 1000 },
    { name: "JKKN Dental College & Hospital", count: 900 },
    { name: "JKKN College of Education", count: 800 },
    { name: "JKKN College of Engineering & Technology", count: 700 },
    { name: "JKKN College of Pharmacy", count: 600 },
    { name: "JKKN College of Allied Health Sciences", count: 500 },
    { name: "JKKN Group of Institutions", count: 400 },
  ];

  const COLORS = ["#3498db", "#f1c40f", "#e74c3c", "#2ecc71"];
  const AMULET_COLORS = ["#2ecc71", "#3498db", "#f1c40f", "#e67e22", "#e74c3c"];
  const INSTITUTION_COLORS = [
    "#3498db",
    "#2ecc71",
    "#e74c3c",
    "#f1c40f",
    "#9b59b6",
    "#1abc9c",
    "#34495e",
  ];

  const accountStatusData = {
    labels: ["Active", "Blocked"],
    datasets: [
      {
        data: [accountStatus.active, accountStatus.blocked],
        backgroundColor: ["#3498db", "#e74c3c"],
        borderColor: ["rgba(255, 255, 255, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: { color: "#fff", font: { size: 14 } },
      },
      tooltip: { enabled: true },
    },
  };

  const accountStatusOptions = { ...commonOptions, cutout: "70%" };

  const paidFeesData = {
    labels: paidFeesCount.map((item) => item.name),
    datasets: [
      {
        data: paidFeesCount.map((item) => item.value),
        backgroundColor: COLORS,
        borderColor: ["rgba(255, 255, 255, 1)"],
        borderWidth: 1,
      },
    ],
  };

  // Define the paidFeesOptions here
  const paidFeesOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "#fff", // Font color for the legend items
          font: {
            size: 14, // Font size for the legend items
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  const amuletStatusData = {
    labels: amuletStatus.map((item) => item.range),
    datasets: [
      {
        data: amuletStatus.map((item) => item.count),
        backgroundColor: AMULET_COLORS,
        borderColor: ["rgba(255, 255, 255, 1)"],
        borderWidth: 1,
        barThickness: 40,
      },
    ],
  };

  const amuletStatusOptions = {
    ...commonOptions,

    indexAxis: "x",
    plugins: {
      legend: {
        display: false, // Disable legend for amulet status
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: "#fff", font: { size: 14 } },
      },
      x: {
        ticks: { display: true, color: "#fff", font: { size: 14 } },
      },
    },
  };

  const institutionData = {
    labels: institutions.map((item) => item.name),
    datasets: [
      {
        data: institutions.map((item) => item.count),
        backgroundColor: INSTITUTION_COLORS,
        borderColor: ["rgba(255, 255, 255, 1)"],
        borderWidth: 1,
        barThickness: 30,
      },
    ],
  };

  const institutionOptions = {
    ...commonOptions,
    indexAxis: "y",
    plugins: {
      legend: {
        display: false, // Disable legend for amulet status
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: { color: "#fff", font: { size: 14 } },
      },
      y: {
        ticks: { color: "#fff", font: { size: 14 } },
      },
    },
  };

  const activePercentage = Math.round(
    (accountStatus.active / accountStatus.total) * 100
  );

  const handleViewStudents = () => setShowViewStudents(true);
  const handleViewStaffs = () => setShowViewStaffs(true);

  const handleBackFromViewStudents = () => setShowViewStudents(false);
  const handleBackFromViewStaffs = () => setShowViewStaffs(false);

  if (showViewStudents) {
    return <ViewStudents onBack={handleBackFromViewStudents} />;
  }

  if (showViewStaffs) {
    return <ViewStaffs onBack={handleBackFromViewStaffs} />;
  }

  return (
    <>
      {isLoading ? (
        <Loading message="Loading Passengers..." />
      ) : (
        <div className="passengers-home-container">
          <TopBar title="Passengers" toggleSidebar={toggleSidebar} />
          <main className="passengers-home-main-content">
            <div className="passengers-stats-row">
              <div className="passengers-stat-card boarding-status">
                <h2>Total Users</h2>
                <div className="total-passengers-info">
                  <p className="total-passengers">{accountStatus.total}</p>
                  <p className="total-passengers-text">
                    Passengers using Travent totally
                  </p>
                </div>
              </div>
              <div className="passengers-stat-card account-status">
                <h2>Account Status</h2>
                <div className="passengers-doughnut-chart-stat-container">
                  <div className="doughnut-chart-container">
                    <div style={{ height: "200px", position: "relative" }}>
                      <Doughnut
                        data={accountStatusData}
                        options={accountStatusOptions}
                      />
                    </div>
                    <div className="doughnut-chart-percentage">
                      {activePercentage}%
                    </div>
                  </div>
                </div>
              </div>
              <div className="passengers-stat-card paid-fees">
                <h2>Paid Fees Passengers Count</h2>
                <div className="passengers-pie-chart-stat-container">
                  <div className="passengers-pie-chart-container">
                    <div style={{ height: "200px", position: "relative" }}>
                      <Pie data={paidFeesData} options={paidFeesOptions} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="passengers-actions-column">
                <div className="passengers-action-card">
                  <h3>View Students</h3>
                  <p>
                    Shows the list of students using Travent for their travel
                  </p>
                  <div className="passengers-action-footer">
                    <span className="passengers-action-count">4651</span>
                    <div
                      className="passengers-action-icon-container"
                      onClick={handleViewStudents}
                    >
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="passengers-action-icon"
                      />
                    </div>
                  </div>
                </div>
                <div className="passengers-action-card">
                  <h3>View Staffs</h3>
                  <p>Shows the list of staffs using Travent for their travel</p>
                  <div className="passengers-action-footer">
                    <span className="passengers-action-count">407</span>
                    <div
                      className="passengers-action-icon-container"
                      onClick={handleViewStaffs}
                    >
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="passengers-action-icon"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="passengers-charts-row">
              <div className="passengers-amulet-status">
                <h2>Passengers Amulets Status</h2>
                <div className="amulet-chart-container">
                  <div style={{ height: "300px" }}>
                    <Bar
                      data={amuletStatusData}
                      options={amuletStatusOptions}
                    />
                  </div>
                </div>
              </div>
              <div className="institution-wise-passengers">
                <h2>Institution Wise Passengers</h2>
                <div style={{ height: "330px" }}>
                  <Bar data={institutionData} options={institutionOptions} />
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default PassengersHome;
