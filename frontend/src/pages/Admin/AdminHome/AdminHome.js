import React, { useState, useEffect, useRef } from "react";
import "./AdminHome.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faBars,
  faEnvelope,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import NewUserRequest from "../AdminDashboard/NewUserRequest/NewUserRequest";
import AdminNotifications from "../AdminNotifications/AdminNotifications";

const AdminHome = ({ toggleSidebar, resetState }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showNewUserRequests, setShowNewUserRequests] = useState(false);
  const [showAdminNotifications, setShowAdminNotifications] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const envelopeRef = useRef(null);

  const handleEnvelopeClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowNewUserRequests(true);
    }, 3000);
  };

  const handleBellClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setShowAdminNotifications(true);
  };

  // Reset the component state when `resetState` changes
  useEffect(() => {
    if (resetState) {
      setShowNotifications(false);
      setShowNewUserRequests(false);
      setShowAdminNotifications(false);
    }
  }, [resetState]);

  // Dismiss modal or overlay when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !isLoading &&
        envelopeRef.current &&
        !envelopeRef.current.contains(event.target)
      ) {
        setShowNewUserRequests(false);
        setShowAdminNotifications(false);
      }
    };

    if (!isLoading) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLoading]);

  const handleBackFromForm = () => {
    setShowNewUserRequests(false);
  };

  const realTimeData = [
    { title: "On Route", value: 36 },
    { title: "Available", value: 4 },
    { title: "Out of Service", value: 4 },
  ];

  const statusCards = [
    { title: "Deviation In Route", value: 4, color: "#FF0000" }, // Red
    { title: "Being Late", value: 18, color: "#FFA500" }, // Orange
    { title: "Traffic Jam", value: 14, color: "#FFFF00" }, // Yellow
    { title: "Accidents", value: 0, color: "#00FF00" }, // Green
  ];

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

  if (showNewUserRequests) {
    return <NewUserRequest onBack={handleBackFromForm} />;
  }

  if (showAdminNotifications) {
    return <AdminNotifications toggleSidebar={toggleSidebar} />;
  }

  return (
    <>
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <div className="admin-home-container">
          <header className="admin-top-bar">
            <div className="admin-menu-icon" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faBars} />
            </div>
            <h1>Admin Home</h1>
            <div className="admin-top-bar-icons">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="admin-icon"
                onClick={handleEnvelopeClick}
                ref={envelopeRef}
              />
              <FontAwesomeIcon
                icon={faBell}
                className="admin-home-icon"
                onClick={handleBellClick}
              />
            </div>
          </header>

          <main className="admin-main-content">
            <div className="admin-content-wrapper">
              <h2>Real Time Data</h2>
              <div className="admin-sub-content-wrapper">
                <div className="admin-left-column">
                  <section className="admin-real-time-data">
                    <div className="admin-data-cards">
                      {realTimeData.map((item, index) => (
                        <div key={index} className="admin-data-card">
                          <h3>{item.title}</h3>
                          <p>{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="admin-status-cards">
                    {statusCards.map((card, index) => (
                      <div key={index} className="admin-status-card">
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
                  </section>
                </div>

                <div className="admin-right-column">
                  <section className="admin-boarding-data">
                    <h2>Boarding Data</h2>
                    <div className="admin-boarding-chart">
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
                    <div className="admin-boarding-info">
                      <p>
                        <span className="admin-boarding-number">1326</span> of
                        <span className="admin-boarding-total"> 2024</span>{" "}
                        Boarded
                      </p>
                    </div>
                  </section>
                </div>
              </div>
            </div>
            <section className="admin-warnings">
              <h2>
                Warnings{"  "}
                <FontAwesomeIcon icon={faExclamationTriangle} />
              </h2>
              {warnings.map((warning, index) => (
                <div key={index} className="admin-warning-item">
                  <img
                    src="./uploads/splash-image.png"
                    alt={warning.name}
                    className="admin-avatar"
                  />
                  <div className="admin-warning-content">
                    <h3>
                      {warning.name}, {warning.route}
                    </h3>
                    <p>{warning.message}</p>
                  </div>
                </div>
              ))}
            </section>
          </main>
        </div>
      )}
    </>
  );
};

export default AdminHome;
