import React, { useState } from "react";
import "./UnifiedSidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBus,
  faUsers,
  faCalendarAlt,
  faTools,
  faBell,
  faMoneyBill,
  faComment,
  faSignOutAlt,
  faList,
  faSchool,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Logout from "../Logout/Logout";

const UnifiedSidebar = React.memo(
  ({ isOpen, toggleSidebar, setActiveComponent, userRole }) => {
    const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

    const handleLogoutClick = () => setShowLogoutConfirmation(true);

    const menuItems =
      userRole === "admin"
        ? [
            { icon: faHome, label: "Home", component: "home" },
            { icon: faBus, label: "Live Tracking", component: "liveTracking" },
            { icon: faCalendarAlt, label: "Schedules", component: "schedules" },
            { icon: faBus, label: "Buses", component: "buses" },
            { icon: faUsers, label: "Passengers", component: "passengers" },
            { icon: faUsers, label: "Drivers", component: "drivers" },
            { icon: faTools, label: "Maintenance", component: "maintenance" },
            {
              icon: faBell,
              label: "Notifications",
              component: "notifications",
            },
            {
              icon: faComment,
              label: "Ratings & Feedback",
              component: "feedback",
            },
            { icon: faMoneyBill, label: "Payment", component: "payment" },
            {
              icon: faList,
              label: "Subscription Plans",
              component: "subscriptionPlans",
            },
          ]
        : [
            { icon: faHome, label: "Home", component: "home" },
            {
              icon: faSchool,
              label: "Manage Institutions",
              component: "viewInstitutions",
            },
            {
              icon: faBell,
              label: "Notifications",
              component: "notifications",
            },
            {
              icon: faList,
              label: "Subscriptions",
              component: "subscriptionPlans",
            },
          ];

    return (
      <>
        <div className={`sidebar ${isOpen ? "active" : ""}`}>
          <aside
            className="sidebar-content"
            role="navigation"
            aria-label="Main Sidebar"
          >
            <div className="mobile-close">
              <button
                className="close-button"
                onClick={() => toggleSidebar(false)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="sidebar-header">
              <img
                src="../uploads/splash-image.png"
                alt="Travent logo"
                className="logo"
                loading="lazy"
              />
              <span className="logo-text">Travent</span>
            </div>
            <nav className="sidebar-nav">
              <ul>
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <button
                      className="menu-link"
                      onClick={() => {
                        setActiveComponent(item.component);
                        if (window.innerWidth <= 768) toggleSidebar(false);
                      }}
                    >
                      <FontAwesomeIcon icon={item.icon} className="icon" />
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    className="menu-link logout-button"
                    onClick={handleLogoutClick}
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </nav>
          </aside>
        </div>
        {isOpen && (
          <div
            className="sidebar-overlay"
            onClick={() => toggleSidebar(false)}
          />
        )}
        {showLogoutConfirmation && (
          <Logout
            onCancel={() => setShowLogoutConfirmation(false)}
            onConfirm={() => {
              // Remove specific fields from local storage
              console.log("Logging out... Clearing local storage:");
              const keysToRemove = [
                "accessToken",
                "refreshToken",
                "institutionId",
                "institutionName",
              ];

              keysToRemove.forEach((key) => {
                console.log(`Removing ${key}: ${localStorage.getItem(key)}`);
                localStorage.removeItem(key);
              });

              console.log("Local storage cleared. Redirecting to login page.");
              setShowLogoutConfirmation(false);
            }}
          />
        )}
      </>
    );
  }
);

export default UnifiedSidebar;
