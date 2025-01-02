import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import apiClient from "../../../../apiClient";
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
  const [stops, setStops] = useState(route.stops || []); // Initialize stops from the route prop
  const [selectedStops, setSelectedStops] = useState([]);
  const [showAddStop, setShowAddStop] = useState(false);
  const [editingStop, setEditingStop] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showStoppingPassengers, setShowStoppingPassengers] = useState(false);
  const [selectedStopForPassengers, setSelectedStopForPassengers] =
    useState(null);
  const itemsPerPage = 10;
  const containerRef = useRef(null);

  const handleViewPassengers = (stop) => {
    setSelectedStopForPassengers(stop);
    setShowStoppingPassengers(true);
  };

  if (showStoppingPassengers) {
    return (
      <StoppingPassengers
        route={route}
        stop={selectedStopForPassengers}
        onBack={() => setShowStoppingPassengers(false)}
        institutionId={institutionId}
      />
    );
  }

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

  const handleDeleteStop = async () => {
    if (selectedStops.length === 0) {
      showToast("warn", "No stops selected to delete.");
      return;
    }

    // Close the confirmation modal immediately
    setShowDeleteConfirmation(false);

    try {
      // Make the API call using apiClient
      const response = await apiClient.delete(
        "/institutionsExtended/delete-stops",
        {
          data: {
            institutionId,
            routeNumber: route.routeNumber,
            stopIDs: selectedStops,
          },
        }
      );

      console.log("hhhhhh", response.data);

      if (response.data.success) {
        // Update the stops state
        setStops((prevStops) =>
          prevStops.filter((stop) => !selectedStops.includes(stop.stopID))
        );

        showToast("success", "Stops deleted successfully.");
      } else {
        showToast("error", response.data.message);
      }

      setSelectedStops([]); // Clear selection
    } catch (error) {
      console.error("Error deleting stops:", error);
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

  const formatTimeTo12Hour = (time) => {
    if (!time) return ""; // Handle empty time
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for midnight
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
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

            boardTime: formatTimeTo12Hour(stop.boardTime), // Format boardTime
            dropTime: formatTimeTo12Hour(stop.dropTime), // Format dropTime
            boardingCountMorning: stop.boardingCountMorning,
            boardingCountEvening: stop.boardingCountEvening,
            viewPassengers: (
              <span
                className="view-passengers-link"
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewPassengers(stop);
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
