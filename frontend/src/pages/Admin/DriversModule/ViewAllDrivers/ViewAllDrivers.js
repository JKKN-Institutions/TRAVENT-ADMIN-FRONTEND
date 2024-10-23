import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faUser,
  faSearch,
  faEdit,
  faTrash,
  faCheck,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import "./ViewAllDrivers.css";
import AddNewDriver from "../AddNewDriver/AddNewDriver";
import DriverDetails from "../DriverDetails/DriverDetails";
import Button from "../../../../components/Shared/Button/Button";

const ViewAllDrivers = ({ category, drivers, onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDrivers, setFilteredDrivers] = useState(drivers);
  const [selectedDrivers, setSelectedDrivers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showDriverDetails, setShowDriverDetails] = useState(false);

  useEffect(() => {
    const results = drivers.filter((driver) =>
      driver.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDrivers(results);
  }, [searchTerm, drivers]);

  const getCategoryTitle = () => {
    return category === "main" ? "Main Drivers" : "Spare Drivers";
  };

  const handleDriverClick = (driver) => {
    setSelectedDrivers((prevSelected) => {
      if (
        prevSelected.some(
          (d) =>
            d.name === driver.name && d.routeAssigned === driver.routeAssigned
        )
      ) {
        return prevSelected.filter(
          (d) =>
            !(
              d.name === driver.name && d.routeAssigned === driver.routeAssigned
            )
        );
      } else {
        return [driver];
      }
    });
  };

  const isDriverSelected = (driver) => {
    return selectedDrivers.some(
      (d) => d.name === driver.name && d.routeAssigned === driver.routeAssigned
    );
  };

  const handleViewDriverDetails = () => {
    if (selectedDrivers.length === 1) {
      const selectedDriver = selectedDrivers[0];
      setShowDriverDetails(true);
    }
  };

  const handleEditDriver = () => {
    setEditingDriver(selectedDrivers[0]);
    setIsEditing(true);
  };

  const handleDeleteDriver = () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteDriver = () => {
    const updatedDrivers = filteredDrivers.filter(
      (driver) => driver.name !== selectedDrivers[0].name
    );
    setFilteredDrivers(updatedDrivers);
    setSelectedDrivers([]);
    setShowDeleteConfirmation(false);
  };

  // Toggle the driver category between "main" and "spare"
  const handleToggleCategory = (driver) => {
    const updatedDriver = {
      ...driver,
      category: driver.category === "main" ? "spare" : "main",
    };

    const updatedDrivers = filteredDrivers.map((d) =>
      d.name === driver.name && d.routeAssigned === driver.routeAssigned
        ? updatedDriver
        : d
    );

    setFilteredDrivers(updatedDrivers);
    setSelectedDrivers([updatedDriver]);
  };

  const handleSaveDriver = (updatedDriver) => {
    console.log("Save/Update driver:", updatedDriver);
    setIsEditing(false);
    setEditingDriver(null);
  };

  if (isEditing) {
    return (
      <AddNewDriver
        driver={editingDriver}
        onBack={() => setIsEditing(false)}
        onSave={handleSaveDriver}
      />
    );
  }

  if (showDriverDetails) {
    return (
      <DriverDetails
        driver={selectedDrivers[0]}
        onBack={() => setShowDriverDetails(false)}
        onEdit={handleEditDriver}
        onToggleCategory={handleToggleCategory}
      />
    );
  }

  return (
    <div className="view-all-drivers-container">
      <header className="view-all-drivers-top-bar">
        <div className="view-all-drivers-back-icon" onClick={onBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <h1>{getCategoryTitle()}</h1>
      </header>

      <main className="view-all-drivers-main-content">
        <div className="view-all-drivers-controls">
          <div className="view-all-drivers-search-bar-container">
            <div className="view-all-drivers-search-input-wrapper">
              <FontAwesomeIcon
                icon={faSearch}
                className="view-all-drivers-search-icon"
              />
              <input
                type="text"
                className="view-all-drivers-search-bar"
                placeholder="Search drivers"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="view-all-drivers-action-buttons">
            <Button
              label={
                <>
                  <FontAwesomeIcon icon={faEye} className="view-icon" /> View
                  Driver Details
                </>
              }
              onClick={handleViewDriverDetails}
              disabled={selectedDrivers.length !== 1}
            />

            <Button
              label={
                <>
                  <FontAwesomeIcon icon={faEdit} /> Edit Driver
                </>
              }
              onClick={handleEditDriver}
              disabled={selectedDrivers.length !== 1}
            />

            <Button
              label={
                <>
                  <FontAwesomeIcon icon={faTrash} /> Delete Driver
                </>
              }
              onClick={handleDeleteDriver}
              disabled={selectedDrivers.length !== 1}
            />
          </div>
        </div>

        <div className="view-all-drivers-grid">
          {filteredDrivers.map((driver, index) => (
            <div
              key={index}
              className={`view-all-drivers-card ${
                isDriverSelected(driver) ? "selected" : ""
              }`}
              onClick={() => handleDriverClick(driver)}
            >
              {isDriverSelected(driver) && (
                <div className="view-all-drivers-card-check">
                  <FontAwesomeIcon icon={faCheck} />
                </div>
              )}
              <div className="view-all-drivers-card-avatar">
                <FontAwesomeIcon
                  icon={faUser}
                  className="view-all-drivers-avatar-icon"
                />
              </div>
              <div className="view-all-drivers-card-content">
                <h3 className="view-all-drivers-card-name">{driver.name}</h3>
                <p className="view-all-drivers-card-info">
                  Route Assigned: {driver.routeAssigned}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {showDeleteConfirmation && (
        <div className="view-all-drivers-delete-confirmation-modal">
          <div className="view-all-drivers-delete-confirmation-content">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this driver?</p>
            <div className="view-all-drivers-delete-confirmation-buttons">
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="view-all-drivers-cancel-delete"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteDriver}
                className="view-all-drivers-confirm-delete"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAllDrivers;
