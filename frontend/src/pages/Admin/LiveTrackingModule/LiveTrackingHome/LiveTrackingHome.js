import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faExclamationTriangle,
  faChevronRight,
  faChevronLeft,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./LiveTrackingHome.css";
import { format } from "date-fns";
import AllRoutesLiveTracking from "../AllRoutesLiveTracking/AllRoutesLiveTracking";
import Loading from "../../../../components/Shared/Loading/Loading";
import SpecificRouteLiveTracking from "../SpecificRouteLiveTracking/SpecificRouteLiveTracking";

const LiveTrackingHome = ({ toggleSidebar }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAllRoutes, setShowAllRoutes] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

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
    // ... keep existing code (rest of the route data)
  ];

  const statusCards = [
    { title: "Deviation In Route", value: 4, color: "#FF0000", icon: "🚫" },
    { title: "Being Late", value: 18, color: "#FFA500", icon: "⚠️" },
    { title: "Traffic Jam", value: 14, color: "#FFFF00", icon: "🚦" },
    { title: "Accidents", value: 0, color: "#00FF00", icon: "🚗" },
  ];

  const filteredRoutes = routesData.filter(
    (route) =>
      route.routeNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.routeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.driverName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRoutes.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleLocationClick = (route) => {
    setSelectedRoute({
      routeData: route,
      initialZoom: 16,
    });
  };

  const handleBackFromRoute = () => {
    setSelectedRoute(null);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "on-time":
        return "#4CAF50";
      case "delay":
        return "#FF5722";
      case "early":
        return "#2196F3";
      default:
        return "#757575";
    }
  };

  if (selectedRoute) {
    return (
      <SpecificRouteLiveTracking
        routeData={selectedRoute.routeData}
        initialZoom={selectedRoute.initialZoom}
        onBack={handleBackFromRoute}
      />
    );
  }

  if (showAllRoutes) {
    return <AllRoutesLiveTracking onBack={() => setShowAllRoutes(false)} />;
  }

  return (
    <>
      {isLoading ? (
        <Loading message="Loading Live Tracking..." />
      ) : (
        <div className="live-tracking-container">
          <header className="live-tracking-top-bar">
            <div className="live-tracking-menu-icon" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faBars} />
            </div>
            <h1>Live Tracking</h1>
          </header>

          <main className="live-tracking-main-content">
            <h2>Real Time Data</h2>
            <section className="live-tracking-stats">
              <div className="live-tracking-boarding-data">
                <h2>Boarding Data</h2>
                <div className="live-tracking-boarding-chart">
                  <CircularProgressbar
                    value={65}
                    text={`${65}%`}
                    styles={buildStyles({
                      textColor: "#ffffff",
                      pathColor: "#4caf50",
                      trailColor: "#555555",
                    })}
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
                  <div
                    key={index}
                    className="status-card"
                    style={{ borderColor: card.color }}
                  >
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
                Warnings{"  "}
                <FontAwesomeIcon icon={faExclamationTriangle} />
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
                  {/* <input
                type="date"
                value={format(selectedDate, "yyyy-MM-dd")}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                className="date-input"
              /> */}
                </div>
                <button
                  className="live-tracking-view-all"
                  onClick={() => setShowAllRoutes(true)}
                >
                  View All Routes <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
              <div className="live-tracking-table-container">
                <div className="live-tracking-table-wrapper">
                  <table className="live-tracking-table">
                    <thead>
                      <tr>
                        <th>Route No</th>
                        <th>Route Name</th>
                        <th>Schedules</th>
                        <th>Scanned Count</th>
                        <th>Missed Count</th>
                        <th>In Time</th>
                        <th>Out Time</th>
                        <th>Status</th>
                        <th>Driver Name</th>
                        <th>Live Location</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((route) => (
                        <tr key={route.routeNo}>
                          <td>{route.routeNo}</td>
                          <td>{route.routeName}</td>
                          <td>{route.schedules}</td>
                          <td>{route.scannedCount}</td>
                          <td>{route.missedCount}</td>
                          <td>{route.inTime}</td>
                          <td>{route.outTime}</td>
                          <td>
                            <span
                              className="status-badge"
                              style={{
                                backgroundColor: getStatusColor(route.status),
                              }}
                            >
                              {route.status}
                            </span>
                          </td>
                          <td>{route.driverName}</td>
                          <td>
                            <FontAwesomeIcon
                              icon={faLocationArrow}
                              className="location-icon"
                              style={{
                                color: route.liveLocation
                                  ? "#4CAF50"
                                  : "#757575",
                                cursor: route.liveLocation
                                  ? "pointer"
                                  : "default",
                              }}
                              onClick={() =>
                                route.liveLocation && handleLocationClick(route)
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <div className="live-tracking-pagination">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="live-tracking-pagination-button"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>

              {Array.from({
                length: Math.ceil(filteredRoutes.length / itemsPerPage),
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`live-tracking-pagination-button ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={
                  currentPage ===
                  Math.ceil(filteredRoutes.length / itemsPerPage)
                }
                className="live-tracking-pagination-button"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default LiveTrackingHome;
