import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import "./PassengersHome.css";
import ViewStudents from "../ViewStudents/ViewStudents";
import ViewStaffs from "../ViewStaffs/ViewStaffs";
import Loading from "../../../../components/Shared/Loading/Loading";

const PassengersHome = ({ toggleSidebar }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showViewStudents, setShowViewStudents] = useState(false);
  const [showViewStaffs, setShowViewStaffs] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const accountStatus = {
    active: 2447,
    blocked: 412,
    total: 5058,
  };

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

  const handleViewStudents = () => {
    setShowViewStudents(true);
  };

  const handleViewStaffs = () => {
    setShowViewStaffs(true);
  };

  const handleBackFromViewStudents = () => {
    setShowViewStudents(false);
  };

  const handleBackFromViewStaffs = () => {
    setShowViewStaffs(false);
  };

  const activePercentage = Math.round(
    (accountStatus.active / accountStatus.total) * 100
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} : ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

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
          <header className="passengers-home-top-bar">
            <div className="passengers-home-menu-icon" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faBars} />
            </div>
            <h1>Passengers</h1>
          </header>
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
                <div className="doughnut-chart-container">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Active", value: accountStatus.active },
                          { name: "Blocked", value: accountStatus.blocked },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        startAngle={90}
                        endAngle={-270}
                      >
                        <Cell fill="#3498db" />
                        <Cell fill="#e74c3c" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="doughnut-chart-percentage">
                    {activePercentage}%
                  </div>
                </div>
                <div className="doughnut-stat-details">
                  <div className="doughnut-stat-item">
                    <span className="doughnut-active-dot"></span>
                    <span className="doughnut-stat-label">Active</span>
                    <span className="doughnut-stat-value">
                      {accountStatus.active}
                    </span>
                  </div>
                  <div className="doughnut-stat-item">
                    <span className="doughnut-blocked-dot"></span>
                    <span className="doughnut-stat-label">Blocked</span>
                    <span className="doughnut-stat-value">
                      {accountStatus.blocked}
                    </span>
                  </div>
                </div>
              </div>
              <div className="passengers-stat-card paid-fees">
                <h2>Paid Fees Passengers Count</h2>
                <div className="passengers-pie-chart-stat-container">
                  <div className="passengers-pie-chart-container">
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={paidFeesCount}
                          cx="50%"
                          cy="50%"
                          outerRadius={65}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {paidFeesCount.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="passengers-pie-stat-details">
                    {paidFeesCount.map((item, index) => (
                      <div className="passengers-pie-stat-item" key={item.name}>
                        <span
                          className="passengers-pie-dot"
                          style={{
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        ></span>
                        <span className="passengers-pie-stat-label">
                          {item.name}
                        </span>
                        <span className="passengers-pie-stat-value">
                          {item.value}
                        </span>
                      </div>
                    ))}
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
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={amuletStatus} barSize={50}>
                      <XAxis dataKey="none" />
                      <YAxis fontSize={14} color="#fff" />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar
                        dataKey="count"
                        style={{ backgroundColor: "transparent" }}
                      >
                        {amuletStatus.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={AMULET_COLORS[index % AMULET_COLORS.length]}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="amulet-legend">
                  {amuletStatus.map((item, index) => (
                    <div className="amulet-legend-item" key={item.range}>
                      <span
                        className="amulet-legend-color"
                        style={{ backgroundColor: AMULET_COLORS[index] }}
                      ></span>
                      <span className="amulet-legend-range">{item.range}</span>
                      <span className="amulet-legend-count">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="institution-wise-passengers">
                <h2>Institution Wise Passengers</h2>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    layout="vertical"
                    data={institutions}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis type="number" fontSize={14} color="#fff" />
                    <YAxis
                      dataKey="name"
                      type="category"
                      fontSize={14}
                      color="#fff"
                      width={200}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="count" barSize={30}>
                      {institutions.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            INSTITUTION_COLORS[
                              index % INSTITUTION_COLORS.length
                            ]
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default PassengersHome;
