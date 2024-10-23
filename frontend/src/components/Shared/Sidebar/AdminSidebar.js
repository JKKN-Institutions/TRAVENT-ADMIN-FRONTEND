import React, { useEffect, useCallback } from "react";
import "./AdminSidebar.css";
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
} from "@fortawesome/free-solid-svg-icons";

const AdminSidebar = React.memo(
  ({ isOpen, toggleSidebar, setActiveComponent }) => {
    const handleClickOutside = useCallback(
      (event) => {
        const sidebar = document.querySelector(".admin-sidebar");
        const menuIcon = document.querySelector(".admin-menu-icon");

        if (
          window.innerWidth <= 768 &&
          sidebar &&
          !sidebar.contains(event.target) &&
          !menuIcon.contains(event.target)
        ) {
          toggleSidebar(false);
        }
      },
      [toggleSidebar]
    );

    useEffect(() => {
      const debouncedClickOutside = (event) => {
        setTimeout(() => handleClickOutside(event), 100);
      };

      document.addEventListener("click", debouncedClickOutside);
      return () => {
        document.removeEventListener("click", debouncedClickOutside);
      };
    }, [handleClickOutside]);

    return (
      <div className={`admin-sidebar ${isOpen ? "active" : ""}`}>
        <aside
          className="admin-sidebar-content"
          role="navigation"
          aria-label="Admin Sidebar"
        >
          <div className="admin-sidebar-header">
            <img
              src="../uploads/splash-image.png"
              alt="Travent logo"
              className="admin-logo"
              loading="lazy"
            />
            <span className="admin-logo-text">Travent</span>
          </div>
          <nav className="admin-sidebar-nav">
            <ul>
              <li>
                <button
                  className="admin-menu-link"
                  onClick={() => {
                    setActiveComponent("home");
                    // toggleSidebar(false);
                  }}
                >
                  <FontAwesomeIcon icon={faHome} className="admin-icon" />
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button
                  className="admin-menu-link"
                  onClick={() => {
                    setActiveComponent("liveTracking");
                  }}
                >
                  <FontAwesomeIcon icon={faBus} className="admin-icon" />
                  <span>Live Tracking</span>
                </button>
              </li>
              <li>
                <button
                  className="admin-menu-link"
                  onClick={() => {
                    setActiveComponent("schedules");
                  }}
                >
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    className="admin-icon"
                  />
                  <span>Schedules</span>
                </button>
              </li>
              <li>
                <button
                  className="admin-menu-link"
                  onClick={() => {
                    setActiveComponent("buses");
                  }}
                >
                  <FontAwesomeIcon icon={faBus} className="admin-icon" />
                  <span>Buses</span>
                </button>
              </li>
              <li>
                <button
                  className="admin-menu-link"
                  onClick={() => {
                    setActiveComponent("passengers");
                  }}
                >
                  <FontAwesomeIcon icon={faUsers} className="admin-icon" />
                  <span>Passengers</span>
                </button>
              </li>
              <li>
                <button
                  className="admin-menu-link"
                  onClick={() => {
                    setActiveComponent("drivers");
                  }}
                >
                  <FontAwesomeIcon icon={faUsers} className="admin-icon" />
                  <span>Drivers</span>
                </button>
              </li>
              <li>
                <button
                  className="admin-menu-link"
                  onClick={() => {
                    setActiveComponent("maintenance");
                  }}
                >
                  <FontAwesomeIcon icon={faTools} className="admin-icon" />
                  <span>Maintenance</span>
                </button>
              </li>
              <li>
                <button
                  className="admin-menu-link"
                  onClick={() => {
                    setActiveComponent("notifications");
                  }}
                >
                  <FontAwesomeIcon icon={faBell} className="admin-icon" />
                  <span>Notifications</span>
                </button>
              </li>
              <li>
                <button
                  className="admin-menu-link"
                  onClick={() => {
                    setActiveComponent("feedback");
                  }}
                >
                  <FontAwesomeIcon icon={faComment} className="admin-icon" />
                  <span>Ratings & Feedback</span>
                </button>
              </li>
              <li>
                <button
                  className="admin-menu-link"
                  onClick={() => {
                    setActiveComponent("payment");
                  }}
                >
                  <FontAwesomeIcon icon={faMoneyBill} className="admin-icon" />
                  <span>Payment</span>
                </button>
              </li>
              <li>
                <button
                  className="admin-menu-link"
                  onClick={() => {
                    setActiveComponent("subscriptionPlans");
                  }}
                >
                  <FontAwesomeIcon icon={faList} className="admin-icon" />
                  <span>Subscription Plans</span>
                </button>
              </li>
              <li>
                <button
                  className="admin-menu-link admin-logout-button"
                  onClick={() => {
                    // Implement logout logic here
                  }}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="admin-icon" />
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </nav>
        </aside>
      </div>
    );
  }
);

export default AdminSidebar;
