import React, { useState, useEffect, useCallback, useRef } from "react";
import AdminSidebar from "../../../components/Shared/Sidebar/AdminSidebar";
import AdminHome from "../AdminHome/AdminHome";
import AdminNotifications from "../AdminNotifications/AdminNotifications";
import BusesHome from "../BusesModule/BusesHome/BusesHome";
import PassengersHome from "../PassengersModule/PassengersHome/PassengersHome";
import Schedules from "../SchedulesModule/ScheduleHome/ScheduleHome";
import SubscriptionPlans from "../SubscriptionModule/SubscriptionPlans/AdminSubscriptionPlans";
import DriversHome from "../DriversModule/DriversHome/DriversHome";
import PaymentsDashboardHome from "../PaymentModule/PaymentDashboardHome/PaymentDashboardHome";
import MaintenanceFuelHome from "../MaintenanceModule/MaintenanceFuelHome/MaintenanceFuelHome";
import FeedbackHome from "../FeedbackModule/FeedbackHome/FeedbackHome";
import LiveTrackingHome from "../LiveTrackingModule/LiveTrackingHome/LiveTrackingHome";
import UnifiedSidebar from "../../../components/Shared/Sidebar/UnifiedSidebar";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [activeComponent, setActiveComponent] = useState("home");
  const [resetHomeState, setResetHomeState] = useState(false);
  const dashboardRef = useRef(null);

  const handleResize = useCallback(() => {
    setIsSidebarOpen(window.innerWidth > 768);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dashboardRef.current &&
        !dashboardRef.current.contains(event.target)
      ) {
        console.log("Clicked outside dashboard");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const resetAdminHomeState = useCallback(() => {
    setResetHomeState(true);
    setTimeout(() => setResetHomeState(false), 100);
  }, []);

  const renderActiveComponent = useCallback(() => {
    const components = {
      home: (
        <AdminHome
          key="home"
          toggleSidebar={toggleSidebar}
          resetState={resetHomeState}
        />
      ),
      notifications: <AdminNotifications toggleSidebar={toggleSidebar} />,
      buses: <BusesHome toggleSidebar={toggleSidebar} />,
      passengers: <PassengersHome toggleSidebar={toggleSidebar} />,
      schedules: <Schedules toggleSidebar={toggleSidebar} />,
      subscriptionPlans: <SubscriptionPlans toggleSidebar={toggleSidebar} />,
      drivers: <DriversHome toggleSidebar={toggleSidebar} />,
      payment: <PaymentsDashboardHome toggleSidebar={toggleSidebar} />,
      maintenance: <MaintenanceFuelHome toggleSidebar={toggleSidebar} />,
      feedback: <FeedbackHome toggleSidebar={toggleSidebar} />,
      liveTracking: <LiveTrackingHome toggleSidebar={toggleSidebar} />,
    };
    return (
      components[activeComponent] || <AdminHome toggleSidebar={toggleSidebar} />
    );
  }, [activeComponent, toggleSidebar, resetHomeState]);

  return (
    <div className="admin-dashboard-container" ref={dashboardRef}>
      <UnifiedSidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        setActiveComponent={(component) => {
          setActiveComponent(component);
          if (component === "home") resetAdminHomeState();
        }}
        userRole="admin"
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
