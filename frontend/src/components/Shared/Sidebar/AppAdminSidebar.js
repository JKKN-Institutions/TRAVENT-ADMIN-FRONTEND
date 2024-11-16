import React, { useEffect, useCallback, useState } from "react";
import "./AppAdminSidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSchool,
  faBell,
  faList,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import Logout from "../Logout/Logout";

const AppAdminSidebar = React.memo(
  ({ isOpen, toggleSidebar, setActiveComponent }) => {
    const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

    const handleClickOutside = useCallback(
      (event) => {
        const sidebar = document.querySelector(".sidebar");
        const menuIcon = document.querySelector(".menu-icon");

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

    const handleLogoutClick = () => {
      setShowLogoutConfirmation(true);
    };

    return (
      <>
        <div className={`sidebar ${isOpen ? "active" : ""}`}>
          <aside
            className="sidebar-content"
            role="navigation"
            aria-label="Main Sidebar"
          >
            <div className="sidebar-header">
              <img
                src="./uploads/splash-image.png"
                alt="Vuexy logo"
                className="app-admin-logo"
                loading="lazy"
              />
              <span className="logo-text">Travent</span>
            </div>
            <nav className="sidebar-nav">
              <ul>
                <li>
                  <button
                    className="menu-link"
                    onClick={() => {
                      setActiveComponent("home");
                    }}
                  >
                    <FontAwesomeIcon icon={faHome} className="icon" />
                    <span>Home</span>
                  </button>
                </li>
                <li>
                  <button
                    className="menu-link"
                    onClick={() => {
                      setActiveComponent("viewInstitutions");
                    }}
                  >
                    <FontAwesomeIcon icon={faSchool} className="icon" />
                    <span>Manage Institutions</span>
                  </button>
                </li>
                <li>
                  <button
                    className="menu-link"
                    onClick={() => {
                      setActiveComponent("notifications");
                    }}
                  >
                    <FontAwesomeIcon icon={faBell} className="icon" />
                    <span>Notifications</span>
                  </button>
                </li>
                <li>
                  <button
                    className="menu-link"
                    onClick={() => {
                      setActiveComponent("subscriptionPlans");
                    }}
                  >
                    <FontAwesomeIcon icon={faList} className="icon" />
                    <span>Subscriptions</span>
                  </button>
                </li>
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
        {showLogoutConfirmation && (
          <Logout
            onCancel={() => setShowLogoutConfirmation(false)}
            onConfirm={() => {
              // Implement logout logic here
              setShowLogoutConfirmation(false);
              // Redirect to login page
            }}
          />
        )}
      </>
    );
  }
);

export default AppAdminSidebar;
