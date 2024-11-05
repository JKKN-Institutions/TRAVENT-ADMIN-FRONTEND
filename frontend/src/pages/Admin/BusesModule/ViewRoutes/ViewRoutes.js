import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewRoutes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faArrowLeft,
  faCheck,
  faEye,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import RouteDetails from "../RouteDetails/RouteDetails";
import AddNewRoute from "../AddNewRoute/AddNewRoute";
import Button from "../../../../components/Shared/Button/Button";

const ViewRoutes = ({ onBack }) => {
  const navigate = useNavigate();
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
        console.error("No institutionId found in localStorage");
        return;
      }

      try {
        const response = await axios.get(
          `https://travent-admin-server.vercel.app/api/bus/view-routes/${institutionDetails.institutionId}`
        );
        setRoutesDetails(response.data.institutionRoutes);
      } catch (error) {
        console.error("Error fetching routes:", error);
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
      if (prevSelected.some((r) => r._id === route._id)) {
        return prevSelected.filter((r) => r._id !== route._id);
      } else {
        return [route];
      }
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
      for (const route of selectedRoutes) {
        await axios.delete(
          `https://travent-admin-server.vercel.app/api/bus/delete-route/${route._id}`
        );
      }
      const response = await axios.get(
        `https://travent-admin-server.vercel.app/api/bus/view-routes/${institutionDetails.institutionId}`
      );
      setRoutesDetails(response.data.institutionRoutes);
      setSelectedRoutes([]);
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error("Error deleting routes:", error);
    }
  };

  useEffect(() => {
    if (routeDetails) {
      setFilteredRoutes(routeDetails.routes);
    }
  }, [routeDetails, searchTerm]);

  if (showAddNewRoute) {
    return <AddNewRoute onBack={handleBackFromAddNewRoute} />;
  }

  return (
    <>
      {!showRouteDetails && (
        <div className="show-routes-container">
          <header className="show-routes-top-bar">
            <div className="show-routes-menu-icon" onClick={onBack}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </div>
            <h1>View Routes</h1>
          </header>

          <main className="show-routes-main-content">
            <div className="show-routes-controls">
              <div className="show-routes-search-bar-container">
                <div className="show-routes-search-input-wrapper">
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="show-routes-search-icon"
                  />
                  <input
                    type="text"
                    className="show-routes-search-bar"
                    placeholder="Search by Route No or Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

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
                  disabled={selectedRoutes.length !== 1} // Disable if not exactly one route selected
                />

                <Button
                  label={
                    <>
                      <FontAwesomeIcon icon={faTrash} /> Delete Selected Route
                    </>
                  }
                  onClick={() => setShowDeleteConfirmation(true)}
                  disabled={selectedRoutes.length === 0} // Disable if no routes selected
                />
              </div>
            </div>

            <div className="show-routes-grid">
              {routeDetails && (
                <>
                  {filteredRoutes.length > 0 ? (
                    filteredRoutes.map((route, index) => (
                      <div
                        key={index}
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
            <div className="view-routes-delete-confirmation-modal">
              <div className="view-routes-delete-confirmation-content">
                <h3>Confirm Deletion</h3>
                <p>Are you sure you want to delete this route?</p>
                <div className="view-routes-delete-confirmation-buttons">
                  <button
                    onClick={() => setShowDeleteConfirmation(false)}
                    className="view-routes-cancel-delete"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteRoutes}
                    className="view-routes-confirm-delete"
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            </div>
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
