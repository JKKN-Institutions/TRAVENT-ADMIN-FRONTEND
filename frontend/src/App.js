// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutApp from "./pages/prelogin/AboutApp";
import NewUserForm from "./pages/prelogin/NewUserForm";
import AppAdminDashboard from "./pages/AppAdmin/AppAdminDashboard/AppAdminDashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard/AdminDashboard";
import AdminHome from "./pages/Admin/AdminHome/AdminHome";
import BusesDashboard from "./pages/Admin/BusesModule/Buses/Buses";
import StaffDashboard from "./pages/StaffDashboard/StaffDashboard";
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";
import BusesLayout from "./pages/Admin/BusesModule/BusesLayout/BusesLayout"; // Import BusesLayout
// import ViewRoutes from "./pages/Admin/BusesModule/ViewRoutes/ViewRoutes"; // Import ViewRoutes
import AddNewRoute from "./pages/Admin/BusesModule/AddNewRoute/AddNewRoute"; // Import AddNewRoute

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AboutApp />} />
        <Route path="/new-user-form" element={<NewUserForm />} />
        <Route path="/app-admin" element={<AppAdminDashboard />} />

        {/* Wrap admin-related routes within the Layout */}
        <Route path="/admin" element={<AdminDashboard />}></Route>

        {/* Independent route for ViewRoutes */}
        {/* <Route path="/view-routes" element={<ViewRoutes />} /> */}
        <Route path="/add-route" element={<AddNewRoute />} />
      </Routes>
    </Router>
  );
}

export default App;
