import React, { useState, useEffect } from "react";
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
import Button from "../../../../components/Shared/Button/Button";
import Loading from "../../../../components/Shared/Loading/Loading";
import TopBar from "../../../../components/Shared/TopBar/TopBar";
import apiClient from "../../../../apiClient";

const DriversHome = ({ toggleSidebar }) => {
  const [showAddNewDriver, setShowAddNewDriver] = useState(false);
  const [viewAllCategory, setViewAllCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [driversData, setDriversData] = useState({ main: [], spare: [] });

  const institutionId = localStorage.getItem("institutionId");
  useEffect(() => {
    // Fetch drivers when the component mounts

    console.log("Institution Id in DriversHome:", institutionId);

    fetchDrivers();
  }, [institutionId]);

  const fetchDrivers = async () => {
    try {
      const response = await apiClient.get(
        `/admin/drivers/get-drivers/${institutionId}`
      );
      setDriversData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNewDriver = () => setShowAddNewDriver(true);

  const handleSaveNewDriver = (driverData) => {
    console.log("New driver data:", driverData);
    setShowAddNewDriver(false);
  };

  const handleViewAll = (category) => setViewAllCategory(category);

  const renderDriverCard = (driver, index) => (
    <div key={index} className="drivers-home-card">
      <div className="drivers-home-card-avatar">
        <FontAwesomeIcon icon={faUser} className="drivers-home-avatar-icon" />
      </div>
      <div className="drivers-home-card-content">
        <h3 className="drivers-home-card-name">{driver.name}</h3>
        <p className="drivers-home-card-info">
          Route Assigned: {driver.routeAssigned || "N/A"}
        </p>
      </div>
    </div>
  );

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
        drivers={driversData[viewAllCategory]}
        onBack={() => setViewAllCategory(null)}
      />
    );
  }

  const renderDriverSection = (title, category) => (
    <div className="drivers-home-section">
      <div className="drivers-home-section-header">
        <h2>{title}</h2>
        <button
          className="drivers-home-view-all"
          onClick={() => handleViewAll(category)}
        >
          View All Drivers <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      <div className="drivers-home-grid">
        {driversData[category]
          .slice(0, 5)
          .map((driver, index) => renderDriverCard(driver, index))}
      </div>
    </div>
  );

  return isLoading ? (
    <Loading message="Loading Drivers..." />
  ) : (
    <div className="drivers-home-container">
      <TopBar title="Drivers" toggleSidebar={toggleSidebar} />
      <main className="drivers-home-main-content">
        <div className="drivers-home-controls">
          <Button
            label={
              <>
                <FontAwesomeIcon icon={faPlus} /> Add New Driver
              </>
            }
            onClick={handleAddNewDriver}
          />
        </div>
        {renderDriverSection("Main Drivers", "main")}
        {renderDriverSection("Spare Drivers", "spare")}
      </main>
    </div>
  );
};

export default DriversHome;
