// BusesLayout.js
import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../../../../components/Shared/Sidebar/Sidebar"; // Adjust the path as needed
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";
import "./BusesLayout.css";

const BusesLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Only show top bar if we're not viewing routes
  let topBarTitle = "Buses Panel";
  let topBarIcons = null;

  if (location.pathname === "/admin/buses-dashboard") {
    topBarTitle = "Buses Dashboard";
    topBarIcons = (
      <>
        <FontAwesomeIcon icon={faBell} className="icon" />
        {/* Add more icons if needed */}
      </>
    );
  }

  return (
    <div className="buses-layout-container">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="content-container">
        <div className="top-bar">
          <FontAwesomeIcon
            icon={faBars}
            className="menu-icon"
            onClick={toggleSidebar}
          />
          <h2>{topBarTitle}</h2>
          <div className="top-bar-right">{topBarIcons}</div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default BusesLayout;
