// AdminDashboard.js
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import Sidebar from "../../../components/Shared/Sidebar/Sidebar";
import AdminHome from "../AdminHome/AdminHome";
import BusesDashboard from "../BusesDashboard/BusesDashboard"; // Import BusesDashboard
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


console.log("institution details11111:", institutionDetails);

  return (
    <div className="dashboard-container">
      {/* Pass the props to both components */}
      <AdminHome isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
    </div>
  );
};

export default AdminDashboard;
