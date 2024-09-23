import React from "react";
import "./AppAdminSidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSchool,
  faUserShield,
  faChartBar,
  faBell,
  faList,
  faComments,
  faUser,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ isOpen, toggleSidebar, setActiveComponent }) => {
  return (
    <div className={`sidebar-container ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <h1>Travent</h1>
      </div>
      <ul className="sidebar-menu">
        <li className="menu-item">
          <button
            className="menu-link"
            onClick={() => {
              setActiveComponent("home");
              toggleSidebar();
            }}
          >
            <FontAwesomeIcon icon={faHome} className="icon" />
            <span>Home</span>
          </button>
        </li>
        <li className="menu-item">
          <button
            className="menu-link"
            onClick={() => {
              setActiveComponent("manageInstitutions");
              toggleSidebar();
            }}
          >
            <FontAwesomeIcon icon={faSchool} className="icon" />
            <span>Manage Institutions</span>
          </button>
        </li>

        <li className="menu-item">
          <button
            className="menu-link"
            onClick={() => {
              setActiveComponent("notifications");
              toggleSidebar();
            }}
          >
            <FontAwesomeIcon icon={faBell} className="icon" />
            <span>Notifications</span>
          </button>
        </li>
        <li className="menu-item">
          <button
            className="menu-link"
            onClick={() => {
              setActiveComponent("subscriptions");
              toggleSidebar();
            }}
          >
            <FontAwesomeIcon icon={faList} className="icon" />
            <span>Subscriptions</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
