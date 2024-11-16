import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Shared/Sidebar/AppAdminSidebar";
import AppAdminHome from "../AppAdminHome/AppAdminHome";
import ViewInstitutions from "../ManageInstitutions/ViewInstitutions";
import SubscriptionPlans from "../SubscriptionPlans/SubscriptionPlans";
import Notifications from "../Notifications/Notifications";
import UnifiedSidebar from "../../../components/Shared/Sidebar/UnifiedSidebar";
import "./AppAdminDashboard.css";

const AppAdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [activeComponent, setActiveComponent] = useState("home");
  const [resetHomeState, setResetHomeState] = useState(false);

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

  // Function to reset AppAdminHome state
  const resetAppAdminHomeState = () => {
    setResetHomeState(true); // Trigger reset
    setTimeout(() => setResetHomeState(false), 100); // Reset back after a brief delay
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "home":
        return (
          <AppAdminHome
            toggleSidebar={toggleSidebar}
            resetState={resetHomeState}
          />
        );
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
    <div className="app-admin-dashboard-container">
      <UnifiedSidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        setActiveComponent={(component) => {
          setActiveComponent(component);
          if (component === "home") {
            resetAppAdminHomeState(); // Reset when "Home" is clicked
          }
        }}
        userRole="appadmin"
      />
      <div
        className={`app-admin-dashboard-main-content ${
          isSidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        {renderActiveComponent()}
      </div>
    </div>
  );
};

export default AppAdminDashboard;
