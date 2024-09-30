import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../../../components/Shared/Sidebar/AdminSidebar"; // Adjust the path as needed
import NewUserRequest from "../AdminDashboard/NewUserRequest/NewUserRequest";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faEnvelope, faBell } from "@fortawesome/free-solid-svg-icons";
import "./AdminLayout.css";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showNewUserRequests, setShowNewUserRequests] = useState(false);
  const location = useLocation();
  console.log("14789", location.state);
  const toggleSidebar = () => {
    if (showNewUserRequests) {
      setShowNewUserRequests(false); // Close NewUserRequest if it's open
    } else {
      setIsSidebarOpen(!isSidebarOpen); // Toggle Sidebar visibility
    }
  };

  const handleEnvelopeClick = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false); // Close Sidebar if it's open
    }
    setShowNewUserRequests(true); // Open NewUserRequest page
  };

  // Determine top bar content based on the current path
  let topBarTitle;
  let topBarIcons;

  switch (location.pathname) {
    case "/admin/dashboard":
      topBarTitle = "Admin Dashboard";
      topBarIcons = (
        <>
          <FontAwesomeIcon
            icon={faEnvelope}
            className="icon"
            onClick={handleEnvelopeClick} // Use handleEnvelopeClick function
          />
          <FontAwesomeIcon icon={faBell} className="icon" />
        </>
      );
      break;
    case "/admin/buses-dashboard":
      topBarTitle = "Buses Dashboard";
      topBarIcons = (
        <>
          <FontAwesomeIcon icon={faBell} className="icon" />
          {/* Add more icons if needed */}
        </>
      );
      break;
    // Add more cases for other routes
    default:
      topBarTitle = "Admin Panel";
      topBarIcons = null;
      break;
  }

  return (
    <div className="layout-container">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="content-container">
        {/* Conditionally render the top bar or NewUserRequest component */}
        {!showNewUserRequests ? (
          <div className="top-bar">
            <FontAwesomeIcon
              icon={faBars}
              className="menu-icon"
              onClick={toggleSidebar}
            />
            <h2>{topBarTitle}</h2>
            <div className="top-bar-right">{topBarIcons}</div>
          </div>
        ) : (
          <NewUserRequest onBack={() => setShowNewUserRequests(false)} />
        )}
        {!showNewUserRequests && <Outlet />}
      </div>
    </div>
  );
};

export default AdminLayout;
