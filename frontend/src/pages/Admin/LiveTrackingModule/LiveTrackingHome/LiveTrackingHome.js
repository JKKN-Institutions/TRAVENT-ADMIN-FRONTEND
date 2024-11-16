import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faLocationArrow,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Doughnut } from "react-chartjs-2";
import { format } from "date-fns";
import "react-circular-progressbar/dist/styles.css";
import "./LiveTrackingHome.css";
import AllRoutesLiveTracking from "../AllRoutesLiveTracking/AllRoutesLiveTracking";
import Loading from "../../../../components/Shared/Loading/Loading";
import SpecificRouteLiveTracking from "../SpecificRouteLiveTracking/SpecificRouteLiveTracking";
import TopBar from "../../../../components/Shared/TopBar/TopBar";
import TableContainer from "../../../../components/Shared/TableContainer/TableContainer";
import Pagination from "../../../../components/Shared/Pagination/Pagination";

// Static Data
const warnings = [
  {
    name: "Kumar S",
    route: "Route 19",
    message:
      "Over Speeding in the Salem Highways. Speed was 70 kmph, he went 80 kmph",
  },
  {
    name: "Velan K",
    route: "Route 03",
    message:
      "Staying in the Colony Hospital stop more than the allocated time.",
  },
];

const routesData = [
  {
    routeNo: "01",
    routeName: "Karuppur",
    schedules: 58,
    scannedCount: 10,
    missedCount: 48,
    inTime: "8:45 AM",
    outTime: "4:30 PM",
    status: "On-Time",
    driverName: "Velan",
    liveLocation: true,
  },
  {
    routeNo: "02",
    routeName: "Thiruvagowndanoor",
    schedules: 64,
    scannedCount: 12,
    missedCount: 52,
    inTime: "8:45 AM",
    outTime: "4:30 PM",
    status: "Delay",
    driverName: "Murugan S",
    liveLocation: true,
  },
];

const statusCards = [
  { title: "Deviation In Route", value: 4, color: "#FF0000", icon: "🚫" },
  { title: "Being Late", value: 18, color: "#FFA500", icon: "⚠️" },
  { title: "Traffic Jam", value: 14, color: "#FFFF00", icon: "🚦" },
  { title: "Accidents", value: 0, color: "#00FF00", icon: "🚗" },
];

const boardingData = {
  labels: ["Boarded", "Not Boarded"],
  datasets: [
    {
      data: [1326, 698],
      backgroundColor: ["#4caf50", "#555555"],
      hoverBackgroundColor: ["#66bb6a", "#757575"],
      borderWidth: 1,
    },
  ],
};

const boardingChartOptions = {
  cutout: "70%",
  plugins: { tooltip: { enabled: true }, legend: { display: false } },
};

const statusColors = {
  "on-time": "#4CAF50",
  delay: "#FF5722",
  early: "#2196F3",
};

const LiveTrackingHome = ({ toggleSidebar }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAllRoutes, setShowAllRoutes] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredRoutes = routesData.filter(
    (route) =>
      route.routeNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.routeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.driverName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentItems = filteredRoutes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleLocationClick = (route) =>
    setSelectedRoute({ routeData: route, initialZoom: 16 });
  const handleBackFromRoute = () => setSelectedRoute(null);
  const getStatusColor = (status) =>
    statusColors[status.toLowerCase()] || "#757575";

  if (selectedRoute)
    return (
      <SpecificRouteLiveTracking
        routeData={selectedRoute.routeData}
        initialZoom={selectedRoute.initialZoom}
        onBack={handleBackFromRoute}
      />
    );
  if (showAllRoutes)
    return <AllRoutesLiveTracking onBack={() => setShowAllRoutes(false)} />;

  return (
    <>
      {isLoading ? (
        <Loading message="Loading Live Tracking..." />
      ) : (
        <div className="live-tracking-container">
          <TopBar title="Live Tracking" toggleSidebar={toggleSidebar} />
          <main className="live-tracking-main-content">
            <h2>Real Time Data</h2>
            <section className="live-tracking-stats">
              <div className="live-tracking-boarding-data">
                <h2>Boarding Data</h2>
                <div className="live-tracking-boarding-chart">
                  <Doughnut
                    data={boardingData}
                    options={boardingChartOptions}
                  />
                </div>
                <div className="live-tracking-boarding-info">
                  <p>
                    <span className="live-tracking-boarding-number">1326</span>{" "}
                    of
                    <span className="live-tracking-boarding-total">
                      {" "}
                      2024
                    </span>{" "}
                    Boarded
                  </p>
                </div>
              </div>
              <div className="status-grid">
                {statusCards.map((card, index) => (
                  <div key={index} className="status-card">
                    <h3>
                      {card.title}{" "}
                      <FontAwesomeIcon
                        icon={faExclamationTriangle}
                        style={{ color: card.color }}
                      />
                    </h3>
                    <p>{card.value}</p>
                  </div>
                ))}
              </div>
            </section>
            <section className="warnings-section">
              <h2>
                Warnings <FontAwesomeIcon icon={faExclamationTriangle} />
              </h2>
              <div className="warnings-list">
                {warnings.map((warning, index) => (
                  <div key={index} className="warning-item">
                    <img
                      src="../uploads/splash-image.png"
                      alt={warning.name}
                      className="warning-avatar"
                    />
                    <div className="warning-content">
                      <h3>
                        {warning.name}, {warning.route}
                      </h3>
                      <p>{warning.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section className="routes-section">
              <div className="live-tracking-controls">
                <h2>All Routes</h2>
                <div className="live-tracking-date">
                  <div className="date-display">
                    {format(selectedDate, "EEEE, dd MMMM yyyy")}
                  </div>
                </div>
                <button
                  className="live-tracking-view-all"
                  onClick={() => setShowAllRoutes(true)}
                >
                  View All Routes <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
              <TableContainer
                headers={[
                  "Route No",
                  "Route Name",
                  "Schedules",
                  "Scanned Count",
                  "Missed Count",
                  "In Time",
                  "Out Time",
                  "Status",
                  "Driver Name",
                  "Live Location",
                ]}
                rows={currentItems.map((route) => ({
                  id: route.routeNo,
                  data: {
                    RouteNo: route.routeNo,
                    RouteName: route.routeName,
                    Schedules: route.schedules,
                    ScannedCount: route.scannedCount,
                    MissedCount: route.missedCount,
                    InTime: route.inTime,
                    OutTime: route.outTime,
                    Status: (
                      <span
                        className="status-badge"
                        style={{
                          backgroundColor: getStatusColor(route.status),
                        }}
                      >
                        {route.status}
                      </span>
                    ),
                    DriverName: route.driverName,
                    LiveLocation: (
                      <FontAwesomeIcon
                        icon={faLocationArrow}
                        className="location-icon"
                        style={{
                          color: route.liveLocation ? "#4CAF50" : "#757575",
                          cursor: route.liveLocation ? "pointer" : "default",
                        }}
                        onClick={() =>
                          route.liveLocation && handleLocationClick(route)
                        }
                      />
                    ),
                  },
                }))}
              />
            </section>
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredRoutes.length / itemsPerPage)}
              onPageChange={setCurrentPage}
            />
          </main>
        </div>
      )}
    </>
  );
};

export default LiveTrackingHome;
