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
                <button
                  className="show-routes-add-button"
                  onClick={handleAddNewRoute}
                >
                  <FontAwesomeIcon icon={faPlus} /> Add New Route
                </button>
                <button
                  className="show-routes-view-button"
                  disabled={selectedRoutes.length !== 1}
                  onClick={handleViewRouteDetails}
                >
                  <FontAwesomeIcon icon={faEye} className="view-icon" /> View
                  Route Details
                </button>
                <button
                  className="show-routes-delete-button"
                  disabled={selectedRoutes.length === 0}
                  onClick={() => setShowDeleteConfirmation(true)}
                >
                  <FontAwesomeIcon icon={faTrash} /> Delete Selected Routes
                </button>
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
            <div className="delete-confirmation-overlay">
              <div className="delete-confirmation-dialog">
                <h2>Are you absolutely sure?</h2>
                <p>
                  This action cannot be undone. This will permanently delete the
                  selected routes.
                </p>
                <div className="delete-confirmation-buttons">
                  <button onClick={() => setShowDeleteConfirmation(false)}>
                    Cancel
                  </button>
                  <button onClick={handleDeleteRoutes}>Continue</button>
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
