import React, { useEffect, useState } from "react";
import "./ViewRoutes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEye,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import RouteDetails from "../RouteDetails/RouteDetails";
import AddNewRoute from "../AddNewRoute/AddNewRoute";
import Button from "../../../../components/Shared/Button/Button";
import TopBar from "../../../../components/Shared/TopBar/TopBar";
import SearchBar from "../../../../components/Shared/SearchBar/SearchBar";
import ConfirmationModal from "../../../../components/Shared/ConfirmationModal/ConfirmationModal";
import ToastNotification, {
  showToast,
} from "../../../../components/Shared/ToastNotification/ToastNotification";

const ViewRoutes = ({ onBack }) => {
  const institutionDetails = JSON.parse(
    localStorage.getItem("institutionDetails")
  );
  const [showRouteDetails, setShowRouteDetails] = useState(false);
  const [routeDetails, setRoutesDetails] = useState();
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [showAddNewRoute, setShowAddNewRoute] = useState(false);
  const [selectedRoutes, setSelectedRoutes] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    const fetchRoutes = async () => {
      if (!institutionDetails || !institutionDetails.institutionId) {
        showToast("error", "Institution details not found.");
        return;
      }

      try {
        const response = await axios.get(
          `https://travent-admin-server.vercel.app/api/bus/view-routes/${institutionDetails.institutionId}`
        );
        setRoutesDetails(response.data.institutionRoutes);
        showToast("success", "Routes loaded successfully.");
      } catch (error) {
        console.error("Error fetching routes:", error);
        showToast("error", "Failed to load routes.");
      }
    };

    fetchRoutes();
  }, []);

  const handleAddNewRoute = () => {
    setShowAddNewRoute(true);
  };

  const handleBackFromAddNewRoute = () => {
    setShowAddNewRoute(false);
  };

  const handleRouteClick = (route) => {
    setSelectedRoutes((prevSelected) => {
      const isSelected = prevSelected.some((r) => r._id === route._id);
      return isSelected
        ? prevSelected.filter((r) => r._id !== route._id)
        : [...prevSelected, route];
    });
  };

  const handleViewRouteDetails = () => {
    if (selectedRoutes.length === 1) {
      setSelectedRoute(selectedRoutes[0]);
      setShowRouteDetails(true);
    }
  };

  const handleDeleteRoutes = async () => {
    try {
      await Promise.all(
        selectedRoutes.map((route) =>
          axios.delete(
            `https://travent-admin-server.vercel.app/api/bus/delete-route/${route._id}`
          )
        )
      );

      const response = await axios.get(
        `https://travent-admin-server.vercel.app/api/bus/view-routes/${institutionDetails.institutionId}`
      );
      setRoutesDetails(response.data.institutionRoutes);

      setSelectedRoutes([]);
      setShowDeleteConfirmation(false);
      showToast("success", "Selected routes deleted successfully.");
    } catch (error) {
      console.error("Error deleting routes:", error);
      showToast("error", "Failed to delete selected routes.");
    }
  };

  useEffect(() => {
    if (routeDetails) {
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
    }
  }, [routeDetails, searchTerm]);

  if (showAddNewRoute) {
    return <AddNewRoute onBack={handleBackFromAddNewRoute} />;
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
              {routeDetails && (
                <>
                  {filteredRoutes.length > 0 ? (
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
                    <p>No routes available for this institution.</p>
                  )}
                </>
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
          institutionId={routeDetails.institutionId}
          onBack={() => setShowRouteDetails(false)}
        />
      )}
    </>
  );
};

export default ViewRoutes;
