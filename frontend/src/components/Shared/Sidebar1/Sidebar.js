// Sidebar.js
import React from "react";
import "./Sidebar.css";
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
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar-container ${isOpen ? "open" : ""}`}>
      <div className="admin-sidebar-header">
        <h1>Travent</h1>
        <FontAwesomeIcon
          icon={faTimes}
          className="close-icon"
          onClick={toggleSidebar}
        />
      </div>
      <ul className="sidebar-menu">
        <li className="menu-item">
          <Link to="/admin/dashboard" className="menu-link">
            <FontAwesomeIcon icon={faHome} className="icon" />
            <span>Home</span>
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/live-tracking" className="menu-link">
            <FontAwesomeIcon icon={faBus} className="icon" />
            <span>Live Tracking</span>
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/schedules" className="menu-link">
            <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
            <span>Schedules</span>
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/admin/buses-dashboard" className="menu-link">
            <FontAwesomeIcon icon={faBus} className="icon" />
            <span>Buses</span>
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/passengers" className="menu-link">
            <FontAwesomeIcon icon={faUsers} className="icon" />
            <span>Passengers</span>
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/drivers" className="menu-link">
            <FontAwesomeIcon icon={faUsers} className="icon" />
            <span>Drivers</span>
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/maintenance" className="menu-link">
            <FontAwesomeIcon icon={faTools} className="icon" />
            <span>Maintenance</span>
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/notifications" className="menu-link">
            <FontAwesomeIcon icon={faBell} className="icon" />
            <span>Notifications</span>
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/feedback" className="menu-link">
            <FontAwesomeIcon icon={faComment} className="icon" />
            <span>Ratings & Feedback</span>
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/payment" className="menu-link">
            <FontAwesomeIcon icon={faMoneyBill} className="icon" />
            <span>Payment</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
