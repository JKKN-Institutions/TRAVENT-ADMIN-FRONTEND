import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faUser,
  faEdit,
  faTrash,
  faCheck,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import "./ViewAllDrivers.css";
import AddNewDriver from "../AddNewDriver/AddNewDriver";
import DriverDetails from "../DriverDetails/DriverDetails";
import Button from "../../../../components/Shared/Button/Button";
import ConfirmationModal from "../../../../components/Shared/ConfirmationModal/ConfirmationModal";
import TopBar from "../../../../components/Shared/TopBar/TopBar";
import SearchBar from "../../../../components/Shared/SearchBar/SearchBar";
import ToastNotification, {
  showToast,
} from "../../../../components/Shared/ToastNotification/ToastNotification";

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

  const getCategoryTitle = () =>
    category === "main" ? "Main Drivers" : "Spare Drivers";

  const handleDriverClick = (driver) => {
    setSelectedDrivers((prevSelected) => {
      if (prevSelected.includes(driver)) {
        return prevSelected.filter((d) => d !== driver);
      }
      return [...prevSelected, driver];
    });
  };

  const handleActionButtonsState = () => {
    const selectedCount = selectedDrivers.length;
    return {
      isSingleSelected: selectedCount === 1,
      isMultipleSelected: selectedCount > 1,
    };
  };

  const handleViewDriverDetails = () => {
    if (selectedDrivers.length === 1) {
      setShowDriverDetails(true);
    }
  };

  const handleEditDriver = () => {
    if (selectedDrivers.length === 1) {
      setEditingDriver(selectedDrivers[0]);
      setIsEditing(true);
    }
  };

  const handleDeleteDriver = () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteDriver = () => {
    const updatedDrivers = filteredDrivers.filter(
      (driver) => !selectedDrivers.includes(driver)
    );
    setFilteredDrivers(updatedDrivers);
    setSelectedDrivers([]);
    setShowDeleteConfirmation(false);
    showToast("success", "Driver(s) deleted successfully.");
  };

  const handleSaveDriver = (updatedDriver) => {
    setIsEditing(false);
    setEditingDriver(null);
    showToast("success", `Driver ${updatedDriver.name} updated successfully.`);
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
      />
    );
  }

  return (
    <div className="view-all-drivers-container">
      <ToastNotification />
      <TopBar title={getCategoryTitle()} onBack={onBack} backButton={true} />
      <main className="view-all-drivers-main-content">
        <div className="view-all-drivers-controls">
          <SearchBar
            placeholder="Search drivers"
            value={searchTerm}
            onSearch={setSearchTerm}
          />
          <div className="view-all-drivers-action-buttons">
            <Button
              label={
                <>
                  <FontAwesomeIcon icon={faEye} /> View Driver Details
                </>
              }
              onClick={handleViewDriverDetails}
              disabled={!handleActionButtonsState().isSingleSelected}
            />
            <Button
              label={
                <>
                  <FontAwesomeIcon icon={faEdit} /> Edit Driver
                </>
              }
              onClick={handleEditDriver}
              disabled={!handleActionButtonsState().isSingleSelected}
            />
            <Button
              label={
                <>
                  <FontAwesomeIcon icon={faTrash} /> Delete Driver
                </>
              }
              onClick={handleDeleteDriver}
              disabled={!handleActionButtonsState().isMultipleSelected}
            />
          </div>
        </div>

        <div className="view-all-drivers-grid">
          {filteredDrivers.map((driver, index) => (
            <div
              key={index}
              className={`view-all-drivers-card ${
                selectedDrivers.includes(driver) ? "selected" : ""
              }`}
              onClick={() => handleDriverClick(driver)}
            >
              {selectedDrivers.includes(driver) && (
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
        <ConfirmationModal
          title="Confirm Deletion"
          message="Are you sure you want to delete this driver?"
          onCancel={() => setShowDeleteConfirmation(false)}
          onConfirm={confirmDeleteDriver}
        />
      )}
    </div>
  );
};

export default ViewAllDrivers;
