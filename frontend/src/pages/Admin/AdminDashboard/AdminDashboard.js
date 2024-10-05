import React, { useState, useEffect, useRef } from "react";
import AdminSidebar from "../../../components/Shared/Sidebar/AdminSidebar";
import AdminHome from "../AdminHome/AdminHome";
import AdminNotifications from "../AdminNotifications/AdminNotifications";
import BusesHome from "../BusesModule/BusesHome/BusesHome";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [activeComponent, setActiveComponent] = useState("home");
  const [resetHomeState, setResetHomeState] = useState(false);
  const dashboardRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Safeguard against null values
      if (
        dashboardRef.current &&
        !dashboardRef.current.contains(event.target)
      ) {
        console.log("Clicked outside dashboard");
      }
    };

    // Add event listener after component is mounted
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up the event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dashboardRef]); // Dependency on dashboardRef to ensure the latest ref is used

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const resetAdminHomeState = () => {
    setResetHomeState(true);
    setTimeout(() => setResetHomeState(false), 100);
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "home":
        return (
          <AdminHome
            toggleSidebar={toggleSidebar}
            resetState={resetHomeState}
          />
        );
      case "notifications":
        return <AdminNotifications toggleSidebar={toggleSidebar} />;
      case "buses":
        return <BusesHome toggleSidebar={toggleSidebar} />;
      default:
        return <AdminHome toggleSidebar={toggleSidebar} />;
    }
  };

  return (
    <div className="admin-dashboard-container" ref={dashboardRef}>
      <AdminSidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        setActiveComponent={(component) => {
          setActiveComponent(component);
          if (component === "home") {
            resetAdminHomeState();
          }
        }}
      />
      <div
        className={`admin-dashboard-main-content ${
          isSidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        {renderActiveComponent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
