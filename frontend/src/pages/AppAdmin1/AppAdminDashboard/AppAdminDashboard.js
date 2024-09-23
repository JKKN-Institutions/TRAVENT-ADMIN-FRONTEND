import React, { useState } from "react";
import Sidebar from "../../../components/Shared/Sidebar/AppAdminSidebar";
import AppAdminHome from "../AppAdminHome/AppAdminHome";
import ManageInstitutions from "../ManageInstitutions/ManageInstitutions";
import "./AppAdminDashboard.css";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("home"); // State to manage active component

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderActiveComponent = () => {
    if (activeComponent === "home") {
      return <AppAdminHome toggleSidebar={toggleSidebar} />;
    } else if (activeComponent === "manageInstitutions") {
      return <ManageInstitutions toggleSidebar={toggleSidebar} />;
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        setActiveComponent={setActiveComponent} // Passing setActiveComponent to Sidebar
      />
      <div className={`main-content ${isSidebarOpen ? "sidebar-open" : ""}`}>
        {renderActiveComponent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
