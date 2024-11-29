// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutApp from "./pages/prelogin/AboutApp";
import AppAdminDashboard from "./pages/AppAdmin/AppAdminDashboard/AppAdminDashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard/AdminDashboard";
import AddNewRoute from "./pages/Admin/BusesModule/AddNewRoute/AddNewRoute"; // Import AddNewRoute
import AllRoutesLiveTracking from "./pages/Admin/LiveTrackingModule/AllRoutesLiveTracking/AllRoutesLiveTracking";
import ToastNotification from "./components/Shared/ToastNotification/ToastNotification";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AboutApp />} />

        <Route path="/app-admin" element={<AppAdminDashboard />} />

        {/* Wrap admin-related routes within the Layout */}
        <Route
          path="/admin/:uniqueRoute"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        {/* Independent route for ViewRoutes */}
        {/* <Route path="/view-routes" element={<ViewRoutes />} /> */}
        <Route path="/add-route" element={<AddNewRoute />} />
        <Route
          path="/all-routes-live-tracking"
          element={<AllRoutesLiveTracking />}
        />
      </Routes>
    </Router>
  );
}

export default App;
