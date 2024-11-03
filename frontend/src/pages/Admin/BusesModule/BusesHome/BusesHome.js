import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { PieChart, Pie, Cell } from "recharts";
import "./BusesHome.css";
import ViewRoutes from "../ViewRoutes/ViewRoutes";
import PassengerArrivalStatus from "../PassengerArrivalStatus/PassengerArrivalStatus";
import Loading from "../../../../components/Shared/Loading/Loading";

const BusesHome = ({ toggleSidebar }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showRoutes, setShowRoutes] = useState(false);
  const [showPassengerArrivalStatus, setShowPassengerArrivalStatus] =
    useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const arrivalStatus = [
    { status: "Early", value: 9, color: "#FFD700" },
    { status: "On Time", value: 18, color: "#4CAF50" },
    { status: "Slightly Delay", value: 5, color: "#FFA500" },
    { status: "Delay", value: 3, color: "#FF4500" },
    { status: "Over Delay", value: 1, color: "#FF0000" },
  ];

  const busesStatus = [
    { label: "Buses Running", value: 36 },
    { label: "Spare Buses", value: 4 },
    { label: "Under service", value: 4 },
  ];

  const busesCondition = [
    { label: "Good", value: 24, percentage: 68, color: "#4caf50" },
    { label: "Satisfactory", value: 15, percentage: 42, color: "#ff9800" },
    { label: "Critical", value: 3, percentage: 8, color: "#f44336" },
  ];

  const arrivalStatusData = [
    { route: "1", driver: "Murugan S", scheduled: "60", scanned: "55" },
    { route: "2", driver: "Murugan S", scheduled: "56", scanned: "54" },
    { route: "3", driver: "Kumar S", scheduled: "55", scanned: "30" },
    { route: "4", driver: "Murugan S", scheduled: "43", scanned: "43" },
    { route: "5", driver: "Murugan S", scheduled: "54", scanned: "44" },
    { route: "6", driver: "Kumar S", scheduled: "66", scanned: "50" },
    { route: "7", driver: "Murugan S", scheduled: "44", scanned: "34" },
    { route: "8", driver: "Vel K", scheduled: "51", scanned: "40" },
  ];

  // Function to go back to the main buses page from the routes page
  const handleBackFromRoutes = () => {
    setShowRoutes(false); // Reset the state to hide ViewRoutes
  };

  const handleBackFromPassengerArrivalStatus = () => {
    setShowPassengerArrivalStatus(false);
  };

  const handleViewDetails = (route) => {
    setSelectedRoute(route);
    setShowPassengerArrivalStatus(true);
  };

  // If showRoutes is true, display ViewRoutes component
  if (showRoutes) {
    return <ViewRoutes onBack={handleBackFromRoutes} />;
  }

  if (showPassengerArrivalStatus) {
    return (
      <PassengerArrivalStatus
        onBack={handleBackFromPassengerArrivalStatus}
        route={selectedRoute}
      />
    );
  }

  return (
    <>
      {isLoading ? (
        <Loading message="Loading Buses..." />
      ) : (
        <div className="buses-home-container">
          <header className="buses-top-bar">
            <div className="buses-menu-icon" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faBars} />
            </div>
            <h1>Buses</h1>
          </header>

          <main className="buses-main-content">
            <div className="buses-content-wrapper">
              <div className="buses-top-row">
                <BoardingData />
                <ArrivalStatus arrivalStatus={arrivalStatus} />
                <BusesCondition busesCondition={busesCondition} />
              </div>

              <div className="buses-status-row">
                {busesStatus.map((status, index) => (
                  <BusStatusItem key={index} status={status} />
                ))}
              </div>

              <ArrivalStatusTable
                arrivalStatusData={arrivalStatusData}
                onViewRoutes={() => setShowRoutes(true)}
                onViewDetails={handleViewDetails}
              />
            </div>
          </main>
        </div>
      )}
    </>
  );
};

const BoardingData = () => (
  <div className="buses-boarding-data">
    <h2>Boarding Data</h2>
    <div className="buses-boarding-info">
      <p className="buses-boarding-number">1326</p>
      <p>of</p>
      <p className="buses-boarding-total">2024 Boarded</p>
    </div>
  </div>
);

const ArrivalStatus = ({ arrivalStatus }) => (
  <div className="buses-status-container">
    <h2>Arrival Status</h2>
    <div className="buses-status-grid">
      <div className="buses-status-chart">
        <PieChart width={150} height={150}>
          <Pie
            data={arrivalStatus}
            dataKey="value"
            nameKey="status"
            cx="50%"
            cy="50%"
            outerRadius={60}
            fill="#8884d8"
          >
            {arrivalStatus.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </div>
      <div className="buses-status-legend">
        {arrivalStatus.map(
          (status, index) =>
            index % 2 === 0 && (
              <div key={index} className="buses-status-row">
                <StatusItem status={status} />
                {arrivalStatus[index + 1] && (
                  <StatusItem status={arrivalStatus[index + 1]} />
                )}
              </div>
            )
        )}
      </div>
    </div>
  </div>
);

const StatusItem = ({ status }) => (
  <div className="buses-status-item">
    <div
      className="buses-status-color"
      style={{ backgroundColor: status.color }}
    ></div>
    <div className="buses-status-label">{status.status}</div>
    <div className="buses-arrival-status-value">{status.value}</div>
  </div>
);

const BusesCondition = ({ busesCondition }) => (
  <div className="buses-condition-container">
    <h2>Buses Condition</h2>
    <div className="buses-condition-grid">
      {busesCondition.map((condition, index) => (
        <div key={index} className="buses-condition-item">
          <div className="buses-condition-chart">
            <svg viewBox="0 0 36 36" className="circular-chart">
              <path
                className="circle-bg"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="circle"
                strokeDasharray={`${condition.percentage}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                style={{ stroke: condition.color }}
              />
              <text x="18" y="20.35" className="percentage">
                {condition.percentage}%
              </text>
            </svg>
          </div>
          <div className="buses-condition-percentage">{condition.value}</div>
          <div className="buses-condition-label">{condition.label}</div>
        </div>
      ))}
    </div>
  </div>
);

const BusStatusItem = ({ status }) => (
  <div className="buses-status-container buses-running-container">
    <div className="buses-status-value">{status.value}</div>
    <div className="buses-status-label">{status.label}</div>
  </div>
);

const ArrivalStatusTable = ({
  arrivalStatusData,
  onViewRoutes,
  onViewDetails,
}) => (
  <div className="buses-arrival-status">
    <div className="buses-arrival-header">
      <h2>Arrival Status</h2>
      <p className="buses-view-routes" onClick={onViewRoutes}>
        View Routes <FontAwesomeIcon icon={faArrowRight} />
      </p>
    </div>
    <div className="buses-table-container">
      <table className="buses-table">
        <thead>
          <tr>
            <th>Route</th>
            <th>Driver</th>
            <th>Scheduled</th>
            <th>Scanned</th>
            <th>View Details</th>
          </tr>
        </thead>
        <tbody>
          {arrivalStatusData.map((data, index) => (
            <tr key={index}>
              <td>{data.route}</td>
              <td>{data.driver}</td>
              <td>{data.scheduled}</td>
              <td>{data.scanned}</td>
              <td>
                <button
                  className="buses-view-details"
                  onClick={() => onViewDetails(data)}
                >
                  View details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default BusesHome;
