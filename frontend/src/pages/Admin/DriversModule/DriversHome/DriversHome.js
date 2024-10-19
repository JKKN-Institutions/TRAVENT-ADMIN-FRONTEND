import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faChevronRight,
  faUser,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "./DriversHome.css";
import AddNewDriver from "../AddNewDriver/AddNewDriver";
import ViewAllDrivers from "../ViewAllDrivers/ViewAllDrivers";

const DriversHome = ({ toggleSidebar }) => {
  const [showAddNewDriver, setShowAddNewDriver] = useState(false);
  const [viewAllCategory, setViewAllCategory] = useState(null);

  const mainDrivers = [
    { name: "Velan K", routeAssigned: "1", category: "main" },
    { name: "Kathir", routeAssigned: "2", category: "main" },
    { name: "Ragavan", routeAssigned: "3", category: "main" },
    { name: "Muthu", routeAssigned: "4", category: "main" },
    { name: "Marudhu", routeAssigned: "5", category: "main" },
    { name: "Karthik", routeAssigned: "6", category: "main" },
  ];

  const spareDrivers = [
    { name: "Velan", routeAssigned: "9", category: "spare" },
    { name: "Kathir", routeAssigned: "10", category: "spare" },
    { name: "Velan", routeAssigned: "12", category: "spare" },
    { name: "Kathir", routeAssigned: "13", category: "spare" },
  ];

  const handleAddNewDriver = () => {
    setShowAddNewDriver(true);
  };

  const handleSaveNewDriver = (driverData) => {
    console.log("New driver data:", driverData);
    setShowAddNewDriver(false);
  };

  const handleViewAll = (category) => {
    setViewAllCategory(category);
  };

  if (showAddNewDriver) {
    return (
      <AddNewDriver
        onBack={() => setShowAddNewDriver(false)}
        onSave={handleSaveNewDriver}
      />
    );
  }

  if (viewAllCategory) {
    return (
      <ViewAllDrivers
        category={viewAllCategory}
        drivers={viewAllCategory === "main" ? mainDrivers : spareDrivers}
        onBack={() => setViewAllCategory(null)}
      />
    );
  }

  const renderDriverCard = (driver, index) => (
    <div key={index} className="drivers-home-card">
      <div className="drivers-home-card-avatar">
        <FontAwesomeIcon icon={faUser} className="drivers-home-avatar-icon" />
      </div>
      <div className="drivers-home-card-content">
        <h3 className="drivers-home-card-name">{driver.name}</h3>
        <p className="drivers-home-card-info">
          Route Assigned: {driver.routeAssigned}
        </p>
      </div>
    </div>
  );

  return (
    <div className="drivers-home-container">
      <header className="drivers-home-top-bar">
        <div className="drivers-home-menu-icon" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <h1>Drivers</h1>
      </header>

      <main className="drivers-home-main-content">
        <div className="drivers-home-controls">
          <div className="drivers-home-action-buttons">
            <button
              className="drivers-home-add-button"
              onClick={handleAddNewDriver}
            >
              <FontAwesomeIcon icon={faPlus} /> Add New Driver
            </button>
          </div>
        </div>
        <div className="drivers-home-section">
          <div className="drivers-home-section-header">
            <h2>Main Drivers</h2>
            <button
              className="drivers-home-view-all"
              onClick={() => handleViewAll("main")}
            >
              View All Drivers <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
          <div className="drivers-home-grid">
            {mainDrivers
              .slice(0, 5)
              .map((driver, index) => renderDriverCard(driver, index))}
          </div>
        </div>

        <div className="drivers-home-section">
          <div className="drivers-home-section-header">
            <h2>Spare Drivers</h2>
            <button
              className="drivers-home-view-all"
              onClick={() => handleViewAll("spare")}
            >
              View All Drivers <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
          <div className="drivers-home-grid">
            {spareDrivers
              .slice(0, 5)
              .map((driver, index) => renderDriverCard(driver, index))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DriversHome;
