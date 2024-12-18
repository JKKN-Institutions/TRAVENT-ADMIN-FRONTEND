import React, { useEffect, useState, useRef } from "react";
import "./ViewRoutes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEye,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import RouteDetails from "../RouteDetails/RouteDetails";
import AddNewRoute from "../AddNewRoute/AddNewRoute";
import Button from "../../../../components/Shared/Button/Button";
import TopBar from "../../../../components/Shared/TopBar/TopBar";
import SearchBar from "../../../../components/Shared/SearchBar/SearchBar";
import ConfirmationModal from "../../../../components/Shared/ConfirmationModal/ConfirmationModal";
import ToastNotification, {
  showToast,
} from "../../../../components/Shared/ToastNotification/ToastNotification";
import apiClient from "../../../../apiClient";

const ViewRoutes = ({ onBack }) => {
  const [showRouteDetails, setShowRouteDetails] = useState(false);
  const [routeDetails, setRouteDetails] = useState(null);
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddNewRoute, setShowAddNewRoute] = useState(false);
  const [selectedRoutes, setSelectedRoutes] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const institutionId = localStorage.getItem("institutionId");

  const toastRef = useRef(false);

  const fetchRoutes = async () => {
    if (!institutionId) {
      showToast("error", "Institution details are missing.");
      return;
    }

    try {
      const response = await apiClient.get(
        `/institutionsExtended/view-routes/${institutionId}`
      );
      const sortedRoutes = response.data.routes.sort(
        (a, b) => parseInt(a.routeNumber) - parseInt(b.routeNumber)
      ); // Sort by routeNumber in ascending order
      setRouteDetails({ ...response.data, routes: sortedRoutes });
      if (!toastRef.current) {
        showToast("success", "Routes loaded successfully.");
        toastRef.current = true; // Set flag to avoid showing the toast again
      }
    } catch (error) {
      console.error("Error fetching routes:", error.response || error);
      showToast("error", "Failed to load routes.");
      toastRef.current = false;
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  useEffect(() => {
    if (routeDetails && routeDetails.routes) {
      const filtered = searchTerm
        ? routeDetails.routes.filter(
            (route) =>
              route.routeNumber
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              route.routeName.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : routeDetails.routes;
      setFilteredRoutes(filtered);
    } else {
      setFilteredRoutes([]);
    }
  }, [routeDetails, searchTerm]);

  // Reset selected routes when navigating back
  useEffect(() => {
    if (!showRouteDetails && !showAddNewRoute) {
      setSelectedRoutes([]);
    }
  }, [showRouteDetails, showAddNewRoute]);

  const handleAddNewRoute = () => {
    setSelectedRoute(null); // Clear the selected route
    setShowAddNewRoute(true); // Open AddNewRoute
  };

  const handleBackFromAddNewRoute = () => {
    setShowAddNewRoute(false);
    fetchRoutes(); // Refresh routes after adding a new one
  };

  const handleRouteClick = (route) => {
    setSelectedRoutes((prevSelected) =>
      prevSelected.some((r) => r._id === route._id)
        ? prevSelected.filter((r) => r._id !== route._id)
        : [...prevSelected, route]
    );
  };

  const handleViewRouteDetails = () => {
    if (selectedRoutes.length === 1) {
      setSelectedRoute(selectedRoutes[0]);
      setShowRouteDetails(true);
    }
  };

  const handleDeleteRoutes = async () => {
    if (selectedRoutes.length === 0) {
      showToast("error", "No routes selected to delete.");
      return;
    }

    // Close the confirmation modal immediately
    setShowDeleteConfirmation(false);

    try {
      const routeNumbers = selectedRoutes.map((route) => route.routeNumber);

      const response = await apiClient.delete(
        "/institutionsExtended/delete-routes",
        {
          data: {
            institutionId,
            routeNumbers,
          },
        }
      );

      if (response.data.success) {
        showToast("success", response.data.message);
        fetchRoutes(); // Refresh routes after deletion
        setSelectedRoutes([]); // Clear selection
      } else {
        showToast("error", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting routes:", error.response || error);
      showToast("error", "Failed to delete selected routes.");
    }
  };

  if (showAddNewRoute) {
    return (
      <AddNewRoute
        route={selectedRoute} // Pass the currently selected route
        onBack={handleBackFromAddNewRoute}
        onSave={fetchRoutes} // Pass a function to refresh routes or handle save
        institutionId={institutionId}
      />
    );
  }

  return (
    <>
      <ToastNotification />
      {!showRouteDetails && (
        <div className="show-routes-container">
          <TopBar title="View Routes" onBack={onBack} backButton={true} />
          <main className="show-routes-main-content">
            <div className="show-routes-controls">
              <SearchBar
                placeholder="Search by Route No or Name"
                onSearch={setSearchTerm}
              />
              <div className="show-routes-action-buttons">
                <Button
                  label={
                    <>
                      <FontAwesomeIcon icon={faPlus} /> Add New Route
                    </>
                  }
                  onClick={handleAddNewRoute}
                />
                <Button
                  label={
                    <>
                      <FontAwesomeIcon icon={faEye} /> View Route Details
                    </>
                  }
                  onClick={handleViewRouteDetails}
                  disabled={selectedRoutes.length !== 1}
                />
                <Button
                  label={
                    <>
                      <FontAwesomeIcon icon={faTrash} /> Delete Selected Route
                    </>
                  }
                  onClick={() => setShowDeleteConfirmation(true)}
                  disabled={selectedRoutes.length === 0}
                />
              </div>
            </div>

            <div className="show-routes-grid">
              {routeDetails && routeDetails.routes ? (
                filteredRoutes.length > 0 ? (
                  filteredRoutes.map((route) => (
                    <div
                      key={route._id}
                      className={`show-routes-card ${
                        selectedRoutes.some((r) => r._id === route._id)
                          ? "selected"
                          : ""
                      }`}
                      onClick={() => handleRouteClick(route)}
                    >
                      {selectedRoutes.some((r) => r._id === route._id) && (
                        <div className="show-routes-card-check">
                          <FontAwesomeIcon icon={faCheck} />
                        </div>
                      )}
                      <div className="show-routes-card-content">
                        <h2 className="show-routes-card-number">
                          {route.routeNumber}
                        </h2>
                        <h3 className="show-routes-card-name">
                          {route.routeName}
                        </h3>
                        <p className="show-routes-card-info">
                          Stops: {route.stoppingCount}
                        </p>
                        <p className="show-routes-card-info">
                          Boardings: {route.boardingCount}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No routes found matching the search criteria.</p>
                )
              ) : (
                <p>No routes available for this institution.</p>
              )}
            </div>
          </main>

          {showDeleteConfirmation && (
            <ConfirmationModal
              title="Confirm Deletion"
              message="Are you sure you want to delete the selected route(s)?"
              confirmText="Yes, Delete"
              cancelText="Cancel"
              onConfirm={handleDeleteRoutes}
              onCancel={() => setShowDeleteConfirmation(false)}
            />
          )}
        </div>
      )}

      {showRouteDetails && selectedRoute && (
        <RouteDetails
          route={selectedRoute}
          institutionId={institutionId}
          onBack={() => setShowRouteDetails(false)}
        />
      )}
    </>
  );
};

export default ViewRoutes;
