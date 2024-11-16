import React, { useState, useEffect, useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  faBell,
  faEnvelope,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TopBar from "../../../components/Shared/TopBar/TopBar";
import NewUserRequest from "../AdminDashboard/NewUserRequest/NewUserRequest";
import AdminNotifications from "../AdminNotifications/AdminNotifications";
import Loading from "../../../components/Shared/Loading/Loading";
import "./AdminHome.css";

const AdminHome = ({ toggleSidebar, resetState }) => {
  const [showNewUserRequests, setShowNewUserRequests] = useState(false);
  const [showAdminNotifications, setShowAdminNotifications] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const envelopeRef = useRef(null);

  const handleEnvelopeClick = (event) => {
    event.preventDefault();
    setShowNewUserRequests(true);
  };

  const handleBellClick = (event) => {
    event.preventDefault();
    setShowAdminNotifications(true);
  };

  useEffect(() => {
    if (resetState) {
      setShowNewUserRequests(false);
      setShowAdminNotifications(false);
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 1500);
    }
  }, [resetState]);

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

  const additionalIcons = [
    { icon: faEnvelope, onClick: handleEnvelopeClick },
    { icon: faBell, onClick: handleBellClick },
  ];

  const realTimeData = [
    { title: "On Route", value: 36 },
    { title: "Available", value: 4 },
    { title: "Out of Service", value: 4 },
  ];

  const statusCards = [
    { title: "Deviation In Route", value: 4, color: "#FF0000" },
    { title: "Being Late", value: 18, color: "#FFA500" },
    { title: "Traffic Jam", value: 14, color: "#FFFF00" },
    { title: "Accidents", value: 0, color: "#00FF00" },
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

  // Doughnut chart data for boarding data
  const boardingData = {
    labels: ["Boarded", "Not Boarded"],
    datasets: [
      {
        data: [1326, 698], // 1326 boarded out of 2024 total
        backgroundColor: ["#4caf50", "#555555"],
        hoverBackgroundColor: ["#66bb6a", "#757575"],
        borderWidth: 1,
      },
    ],
  };

  const boardingChartOptions = {
    cutout: "70%",
    plugins: {
      tooltip: { enabled: true },
      legend: { display: false },
    },
  };

  if (showNewUserRequests)
    return <NewUserRequest onBack={() => setShowNewUserRequests(false)} />;
  if (showAdminNotifications)
    return <AdminNotifications toggleSidebar={toggleSidebar} />;

  return (
    <>
      {isLoading ? (
        <Loading message="Loading Admin Home..." />
      ) : (
        <div className="admin-home-container">
          <TopBar
            title="Admin Home"
            toggleSidebar={toggleSidebar}
            additionalIcons={additionalIcons}
          />

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
                      <Doughnut
                        data={boardingData}
                        options={boardingChartOptions}
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
                Warnings <FontAwesomeIcon icon={faExclamationTriangle} />
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
