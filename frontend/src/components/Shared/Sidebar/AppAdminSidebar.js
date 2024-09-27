import React, { useEffect } from "react";
import "./AppAdminSidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSchool,
  faBell,
  faList,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ isOpen, toggleSidebar, setActiveComponent }) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.querySelector(".sidebar");
      const menuIcon = document.querySelector(".menu-icon");
      if (
        window.innerWidth <= 768 &&
        sidebar &&
        !sidebar.contains(event.target) &&
        !menuIcon.contains(event.target)
      ) {
        toggleSidebar(false); // Close sidebar on mobile when clicking outside
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [toggleSidebar]);

  return (
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
                  toggleSidebar(false); // Close the sidebar after selection
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
                  toggleSidebar(false); // Close the sidebar after selection
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
                  toggleSidebar(false); // Close the sidebar after selection
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
                  toggleSidebar(false); // Close the sidebar after selection
                }}
              >
                <FontAwesomeIcon icon={faList} className="icon" />
                <span>Subscriptions</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
