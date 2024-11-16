import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faEye } from "@fortawesome/free-solid-svg-icons";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Pie, Doughnut } from "react-chartjs-2";
import "./BusesHome.css";
import ViewRoutes from "../ViewRoutes/ViewRoutes";
import PassengerArrivalStatus from "../PassengerArrivalStatus/PassengerArrivalStatus";
import Loading from "../../../../components/Shared/Loading/Loading";
import TopBar from "../../../../components/Shared/TopBar/TopBar"; // Import TopBar
import TableContainer from "../../../../components/Shared/TableContainer/TableContainer"; // Import TableContainer
import Pagination from "../../../../components/Shared/Pagination/Pagination"; // Import Pagination

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

const BusesHome = ({ toggleSidebar }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showRoutes, setShowRoutes] = useState(false);
  const [showPassengerArrivalStatus, setShowPassengerArrivalStatus] =
    useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const data = {
    arrivalStatus: [
      { status: "Early", value: 9, color: "#FFD700" },
      { status: "On Time", value: 18, color: "#4CAF50" },
      { status: "Slightly Delay", value: 5, color: "#FFA500" },
      { status: "Delay", value: 3, color: "#FF4500" },
      { status: "Over Delay", value: 1, color: "#FF0000" },
    ],

    busesStatus: [
      { label: "Buses Running", value: 36 },
      { label: "Spare Buses", value: 4 },
      { label: "Under service", value: 4 },
    ],
    busesCondition: [
      { label: "Good", value: 24, percentage: 68, color: "#4caf50" },
      { label: "Satisfactory", value: 15, percentage: 42, color: "#ff9800" },
      { label: "Critical", value: 3, percentage: 8, color: "#f44336" },
    ],

    arrivalStatusData: [
      { route: "1", driver: "Murugan S", scheduled: "60", scanned: "55" },
      { route: "2", driver: "Murugan S", scheduled: "56", scanned: "54" },
      { route: "3", driver: "Kumar S", scheduled: "55", scanned: "30" },
      { route: "4", driver: "Murugan S", scheduled: "43", scanned: "43" },
      { route: "5", driver: "Murugan S", scheduled: "54", scanned: "44" },
      { route: "6", driver: "Kumar S", scheduled: "66", scanned: "50" },
      { route: "7", driver: "Murugan S", scheduled: "44", scanned: "34" },
      { route: "8", driver: "Vel K", scheduled: "51", scanned: "40" },
    ],
  };

  const handleBack = (type) => {
    type === "routes"
      ? setShowRoutes(false)
      : setShowPassengerArrivalStatus(false);
  };

  const handleViewDetails = (route) => {
    setSelectedRoute(route);
    setShowPassengerArrivalStatus(true);
  };

  // If showRoutes is true, display ViewRoutes component
  if (showRoutes) return <ViewRoutes onBack={() => handleBack("routes")} />;
  if (showPassengerArrivalStatus)
    return (
      <PassengerArrivalStatus
        onBack={() => handleBack("passenger")}
        route={selectedRoute}
      />
    );

  const paginatedItems = data.arrivalStatusData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      {isLoading ? (
        <Loading message="Loading Buses..." />
      ) : (
        <div className="buses-home-container">
          <TopBar title="Buses" toggleSidebar={toggleSidebar} />
          <main className="buses-main-content">
            <div className="buses-content-wrapper">
              <div className="buses-top-row">
                <BoardingData />
                <ArrivalStatus arrivalStatus={data.arrivalStatus} />
                <BusesCondition busesCondition={data.busesCondition} />
              </div>
              <div className="buses-status-row">
                {data.busesStatus.map((status, index) => (
                  <BusStatusItem key={index} status={status} />
                ))}
              </div>
              <div className="arrival-status-table-section">
                <div className="buses-arrival-header">
                  <h2>Arrival Status</h2>
                  <p
                    className="buses-view-routes"
                    onClick={() => setShowRoutes(true)}
                  >
                    View Routes <FontAwesomeIcon icon={faArrowRight} />
                  </p>
                </div>
                <TableContainer
                  headers={[
                    "Route",
                    "Driver",
                    "Scheduled",
                    "Scanned",
                    "View Details",
                  ]}
                  rows={paginatedItems.map((data) => ({
                    id: data.route,
                    data: {
                      Route: data.route,
                      Driver: data.driver,
                      Scheduled: data.scheduled,
                      Scanned: data.scanned,
                      "View Details": (
                        <FontAwesomeIcon
                          icon={faEye}
                          className="buses-view-icon"
                          onClick={() => handleViewDetails(data)}
                        />
                      ),
                    },
                  }))}
                />
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(
                    data.arrivalStatusData.length / itemsPerPage
                  )}
                  onPageChange={setCurrentPage}
                />
              </div>
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

const ArrivalStatus = ({ arrivalStatus }) => {
  const chartData = {
    labels: arrivalStatus.map((item) => item.status),
    datasets: [
      {
        data: arrivalStatus.map((item) => item.value),
        backgroundColor: arrivalStatus.map((item) => item.color),
        borderColor: ["rgba(255, 255, 255, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#fff",
          padding: 10,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        enabled: true,

        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 10,
        displayColors: false,
      },
    },
  };

  return (
    <div className="buses-status-container">
      <h2>Arrival Status</h2>
      <div className="buses-status-grid">
        <div style={{ width: "100%", height: "200px", position: "relative" }}>
          <Pie data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

const BusesCondition = ({ busesCondition }) => {
  const totalBuses = busesCondition.reduce((acc, curr) => acc + curr.value, 0);

  const chartData = {
    labels: busesCondition.map((item) => item.label),
    datasets: [
      {
        data: busesCondition.map((item) => item.value),
        backgroundColor: busesCondition.map((item) => item.color),
        borderColor: ["rgba(255, 255, 255, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#fff",
          padding: 10,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const condition = busesCondition[context.dataIndex];
            return `${condition.value} buses`;
          },
        },

        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 10,
        displayColors: false,
      },
    },
  };

  return (
    <div className="buses-condition-container">
      <h2>Buses Condition</h2>
      <div className="buses-condition-grid">
        <div style={{ width: "100%", height: "200px", position: "relative" }}>
          <Doughnut data={chartData} options={options} />
          <div
            style={{
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            <div
              style={{ fontSize: "24px", fontWeight: "bold", color: "#fff" }}
            >
              {totalBuses}
            </div>
            <div style={{ fontSize: "14px", color: "#ccc" }}>Total Buses</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BusStatusItem = ({ status }) => (
  <div className="buses-status-container buses-running-container">
    <div className="buses-status-value">{status.value}</div>
    <div className="buses-status-label">{status.label}</div>
  </div>
);

export default BusesHome;
