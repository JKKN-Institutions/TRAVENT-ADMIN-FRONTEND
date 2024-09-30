import React, { useState, useEffect } from "react";
import AdminSidebar from "../../../components/Shared/Sidebar/AdminSidebar";
import AdminHome from "../AdminHome/AdminHome";
// import LiveTracking from "../LiveTracking/LiveTracking";
// import Schedules from "../Schedules/Schedules";
// import BusesDashboard from "../BusesDashboard/BusesDashboard";
// import Passengers from "../Passengers/Passengers";
// import Drivers from "../Drivers/Drivers";
// import Maintenance from "../Maintenance/Maintenance";
// import Notifications from "../Notifications/Notifications";
// import Feedback from "../Feedback/Feedback";
// import Payment from "../Payment/Payment";
import "./AdminDashboard.css";

const AdminDashboard = () => {
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

  // Function to reset AdminHome state
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
      // case "liveTracking":
      //   return <LiveTracking toggleSidebar={toggleSidebar} />;
      // case "schedules":
      //   return <Schedules toggleSidebar={toggleSidebar} />;
      // case "buses":
      //   return <BusesDashboard toggleSidebar={toggleSidebar} />;
      // case "passengers":
      //   return <Passengers toggleSidebar={toggleSidebar} />;
      // case "drivers":
      //   return <Drivers toggleSidebar={toggleSidebar} />;
      // case "maintenance":
      //   return <Maintenance toggleSidebar={toggleSidebar} />;
      // case "notifications":
      //   return <Notifications toggleSidebar={toggleSidebar} />;
      // case "feedback":
      //   return <Feedback toggleSidebar={toggleSidebar} />;
      // case "payment":
      //   return <Payment toggleSidebar={toggleSidebar} />;
      default:
        return <AdminHome toggleSidebar={toggleSidebar} />;
    }
  };

  return (
    <div className="admin-dashboard-container">
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
        className={`admin-dashboard-main-content  ${
          isSidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        {renderActiveComponent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
