import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Shared/Sidebar/AppAdminSidebar";
import AppAdminHome from "../AppAdminHome/AppAdminHome";
import ViewInstitutions from "../ManageInstitutions/ViewInstitutions";
import SubscriptionPlans from "../SubscriptionPlans/SubscriptionPlans";
import Notifications from "../Notifications/Notifications";
import "./AppAdminDashboard.css";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [activeComponent, setActiveComponent] = useState("home");

  const handleResize = () => {
    if (window.innerWidth > 768) {
      setIsSidebarOpen(true);
    } else {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "home":
        return <AppAdminHome toggleSidebar={toggleSidebar} />;
      case "viewInstitutions":
        return <ViewInstitutions toggleSidebar={toggleSidebar} />;
      case "subscriptionPlans":
        return <SubscriptionPlans toggleSidebar={toggleSidebar} />;
      case "notifications":
        return <Notifications toggleSidebar={toggleSidebar} />;
      default:
        return <AppAdminHome toggleSidebar={toggleSidebar} />;
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        setActiveComponent={setActiveComponent}
      />
      <div
        className={`main-content ${
          isSidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        {renderActiveComponent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
