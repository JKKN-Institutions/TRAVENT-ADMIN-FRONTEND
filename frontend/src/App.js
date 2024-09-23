// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutApp from "./pages/prelogin/AboutApp";
import NewUserForm from "./pages/prelogin/NewUserForm";
import AppAdminDashboard from "./pages/AppAdmin/AppAdminDashboard/AppAdminDashboard";
import Layout from "./pages/Admin/AdminLayout/AdminLayout";
import AdminHome from "./pages/Admin/AdminHome/AdminHome";
import BusesDashboard from "./pages/Admin/BusesModule/Buses/Buses";
import StaffDashboard from "./pages/StaffDashboard/StaffDashboard";
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";
import BusesLayout from "./pages/Admin/BusesModule/BusesLayout/BusesLayout"; // Import BusesLayout
import ViewRoutes from "./pages/Admin/BusesModule/ViewRoutes/ViewRoutes"; // Import ViewRoutes
import AddNewRoute from "./pages/Admin/BusesModule/AddNewRoute/AddNewRoute"; // Import AddNewRoute

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AboutApp />} />
        <Route path="/new-user-form" element={<NewUserForm />} />
        <Route path="/app-admin" element={<AppAdminDashboard />} />

        {/* Wrap admin-related routes within the Layout */}
        <Route path="/admin" element={<Layout />}>
          <Route path="dashboard" element={<AdminHome />} />
        </Route>

        {/* Route for BusesDashboard with BusesLayout */}
        <Route path="/admin/buses-dashboard" element={<BusesLayout />}>
          <Route path="" element={<BusesDashboard />} />
        </Route>

        {/* Independent route for ViewRoutes */}
        <Route path="/admin/view-routes" element={<ViewRoutes />} />
        <Route path="/admin/add-route" element={<AddNewRoute />} />

        {/* Other Routes */}
        <Route path="/admin/staff-dashboard" element={<StaffDashboard />} />
        <Route path="/admin/student-dashboard" element={<StudentDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
