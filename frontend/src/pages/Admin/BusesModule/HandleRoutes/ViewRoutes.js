import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewRoutes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import RouteDetails from "./RouteDetails";

const ViewRoutes = () => {
  const navigate = useNavigate();
  const institutionDetails = JSON.parse(
    localStorage.getItem("institutionDetails")
  );
  const [showRouteDetails, setShowRouteDetails] = useState(false);
  const [routeDetails, setRoutesDetails] = useState();
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRoutes, setFilteredRoutes] = useState([]);

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
        console.log(response.data.institutionRoutes);
        setRoutesDetails(response.data.institutionRoutes);
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };

    fetchRoutes();
  }, []);
  console.log("112222333", routeDetails);

  const handleBackClick = () => {
    if (showRouteDetails) {
      setShowRouteDetails(false);
      setSelectedRoute(null);
    } else {
      navigate(-1);
    }
  };

  const handleRouteClick = (route) => {
    console.log("vfghbjnkml", route);
    setShowRouteDetails(true);
    setSelectedRoute(route);
  };
  useEffect(() => {
    if (routeDetails) {
      setFilteredRoutes(routeDetails.routes);
    }
  }, [routeDetails, searchTerm]);

  return (
    <>
      {!showRouteDetails && (
        <div className="view-routes-container">
          <div className="view-routes-content">
            <div className="view-routes-header">
              <span className="view-routes-back-icon" onClick={handleBackClick}>
                ←
              </span>
              <h2>View Routes</h2>
            </div>
            <div className="search-bar-container">
              <div className="search-bar-wrapper">
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search by Route No or Name"
                  className="search-bar"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="route-actions">
                <button
                  className="add-route-button"
                  onClick={() => navigate("/admin/add-route")}
                >
                  + Add A New Route
                </button>
                <button className="delete-route-button">
                  ✕ Delete A Route
                </button>
              </div>
            </div>
            <div className="routes-grid">
              {routeDetails && (
                <>
                  {filteredRoutes.length > 0 ? (
                    filteredRoutes.map((route, index) => (
                      <div
                        key={index}
                        className="route-card"
                        onClick={() => handleRouteClick(route)}
                      >
                        <h3>{route.routeNumber}</h3>
                        <h4>{route.routeName}</h4>
                        <p>Stops: {route.stoppingCount}</p>
                        <p>Boardings: {route.boardingCount}</p>
                      </div>
                    ))
                  ) : (
                    <p>No routes available for this institution.</p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {showRouteDetails && selectedRoute && (
        <RouteDetails
          route={selectedRoute}
          onBack={handleBackClick}
          institutionId={routeDetails.institutionId}
        />
      )}
    </>
  );
};

export default ViewRoutes;
