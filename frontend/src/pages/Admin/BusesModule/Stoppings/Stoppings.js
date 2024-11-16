import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import AddNewStop from "../AddNewStop/AddNewStop";
import StoppingPassengers from "../StoppingPassengers/StoppingPassengers";
import Button from "../../../../components/Shared/Button/Button";
import TopBar from "../../../../components/Shared/TopBar/TopBar";
import SearchBar from "../../../../components/Shared/SearchBar/SearchBar";
import TableContainer from "../../../../components/Shared/TableContainer/TableContainer";
import Pagination from "../../../../components/Shared/Pagination/Pagination";
import ConfirmationModal from "../../../../components/Shared/ConfirmationModal/ConfirmationModal";
import ToastNotification, {
  showToast,
} from "../../../../components/Shared/ToastNotification/ToastNotification";
import "./Stoppings.css";

const Stoppings = ({ route, onBack, institutionId }) => {
  const [showAddStop, setShowAddStop] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStops, setSelectedStops] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [editingStop, setEditingStop] = useState(null);
  const [stops, setStops] = useState(route.stops);
  const [showStoppingPassengers, setShowStoppingPassengers] = useState(false);
  const [selectedStopForPassengers, setSelectedStopForPassengers] =
    useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const containerRef = useRef(null);

  const handleViewStudents = (stop) => {
    setSelectedStopForPassengers(stop);
    setShowStoppingPassengers(true);
  };

  if (showStoppingPassengers) {
    return (
      <StoppingPassengers
        stop={selectedStopForPassengers}
        onBack={() => setShowStoppingPassengers(false)}
        institutionId={institutionId}
      />
    );
  }

  const handleDeleteStop = async () => {
    try {
      // Filter out selected stops from the current stops list
      const updatedStops = stops.filter(
        (stop) => !selectedStops.includes(stop.stopID)
      );

      setStops(updatedStops); // Update stops state

      // Display success message
      showToast("success", "Stops deleted successfully!");

      // Clear selections and close confirmation modal
      setSelectedStops([]);
      setShowDeleteConfirmation(false);
    } catch (error) {
      showToast("error", "Failed to delete stops.");
    }
  };

  const handleEditStop = () => {
    if (selectedStops.length === 1) {
      const stopToEdit = stops.find((stop) => stop.stopID === selectedStops[0]);
      setEditingStop(stopToEdit);
      setShowAddStop(true);
    } else {
      showToast("warn", "Please select a single stop to edit.");
    }
  };

  const handleAddOrEditComplete = (newOrUpdatedStop) => {
    if (newOrUpdatedStop) {
      const loadingToastId = showToast(
        "loading",
        editingStop ? "Updating stop..." : "Adding new stop..."
      );

      setStops((prevStops) =>
        editingStop
          ? prevStops.map((stop) =>
              stop.stopID === newOrUpdatedStop.stopID ? newOrUpdatedStop : stop
            )
          : [...prevStops, newOrUpdatedStop]
      );

      showToast(
        "success",
        editingStop
          ? "Stop updated successfully!"
          : "New stop added successfully!",
        loadingToastId
      );
    }
    setShowAddStop(false);
    setEditingStop(null);
    setSelectedStops([]);
  };

  const handleRowClick = (stopId) => {
    setSelectedStops((prevSelected) =>
      prevSelected.includes(stopId)
        ? prevSelected.filter((id) => id !== stopId)
        : [...prevSelected, stopId]
    );
  };

  const handleSelectAll = () => {
    if (selectedStops.length === stops.length) {
      setSelectedStops([]); // Deselect all
    } else {
      setSelectedStops(stops.map((stop) => stop.stopID)); // Select all
    }
  };

  const isSelectAllChecked = selectedStops.length === stops.length;
  const isSelectAllIndeterminate =
    selectedStops.length > 0 && selectedStops.length < stops.length;

  const filteredStops = stops.filter((stop) =>
    stop.stopName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStops.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const headers = [
    <label className="custom-checkbox">
      <input
        type="checkbox"
        checked={isSelectAllChecked}
        ref={(el) => el && (el.indeterminate = isSelectAllIndeterminate)}
        onChange={handleSelectAll}
      />
      <span className="checkbox-checkmark"></span>
    </label>,
    "S.No",
    "Stop Name",
    "Latitude",
    "Longitude",
    "District",
    "City",
    "State",
    "Board Time",
    "Drop Time",
    "Boarding Count Morning",
    "Boarding Count Evening",
    "View Passengers",
  ];

  const rows =
    currentItems.length > 0
      ? currentItems.map((stop, index) => ({
          id: stop.stopID,
          data: {
            select: (
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={selectedStops.includes(stop.stopID)}
                  onChange={() => handleRowClick(stop.stopID)}
                />
                <span className="checkbox-checkmark"></span>
              </label>
            ),
            sNo: indexOfFirstItem + index + 1,
            stopName: stop.stopName,
            latitude: stop.latitude,
            longitude: stop.longitude,
            district: stop.districtName,
            city: stop.cityName,
            state: stop.stateName,
            boardTime: stop.boardTime,
            dropTime: stop.dropTime,
            boardingCountMorning: stop.boardingCountMorning,
            boardingCountEvening: stop.boardingCountEvening,
            viewPassengers: (
              <span
                className="view-passengers-link"
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewStudents(stop);
                }}
              >
                <FontAwesomeIcon icon={faEye} />
              </span>
            ),
          },
          onClick: () => handleRowClick(stop.stopID),
        }))
      : [
          {
            id: "no-data",
            data: { message: "No data available" },
            colSpan: headers.length,
          },
        ];

  return (
    <div className="stoppings-container" ref={containerRef}>
      <ToastNotification />
      {!showAddStop ? (
        <>
          <TopBar
            title={`Stoppings for Route ${route.routeNumber}`}
            onBack={onBack}
            backButton={true}
          />

          <main className="stoppings-main-content">
            <div className="stoppings-controls">
              <SearchBar
                placeholder="Search by Stop Name"
                onSearch={setSearchTerm}
              />
              <div className="stoppings-action-buttons-container">
                <Button
                  label={
                    <>
                      <FontAwesomeIcon icon={faPlus} /> Add
                    </>
                  }
                  onClick={() => setShowAddStop(true)}
                />
                <Button
                  label={
                    <>
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </>
                  }
                  onClick={handleEditStop}
                  disabled={selectedStops.length !== 1}
                />
                <Button
                  label={
                    <>
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </>
                  }
                  onClick={() => setShowDeleteConfirmation(true)}
                  disabled={selectedStops.length === 0}
                />
              </div>
            </div>

            <TableContainer
              headers={headers}
              rows={rows}
              onRowClick={(row) => handleRowClick(row.id)}
              selectedRowId={selectedStops}
            />

            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredStops.length / itemsPerPage)}
              onPageChange={handlePageChange}
            />
          </main>

          {showDeleteConfirmation && (
            <ConfirmationModal
              title="Confirm Deletion"
              message="Are you sure you want to delete the selected stop(s)?"
              confirmText="Yes, Delete"
              cancelText="Cancel"
              onConfirm={handleDeleteStop}
              onCancel={() => setShowDeleteConfirmation(false)}
            />
          )}
        </>
      ) : (
        <AddNewStop
          route={route}
          onBack={handleAddOrEditComplete}
          institutionId={institutionId}
          editingStop={editingStop}
        />
      )}
    </div>
  );
};

export default Stoppings;
