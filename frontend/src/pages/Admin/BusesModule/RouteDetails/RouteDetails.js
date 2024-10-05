import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faGasPump,
  faRoad,
  faUsers,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import Stoppings from "../HandleRoutes/Stoppings";
import "./RouteDetails.css";

const RouteDetails = ({ route, onBack, institutionId }) => {
  const [showStoppings, setShowStoppings] = useState(false);

  const handleStoppingsClick = () => {
    setShowStoppings(true);
  };

  const handleBackClick = () => {
    if (showStoppings) {
      setShowStoppings(false);
    } else if (onBack) {
      onBack();
    }
  };

  return (
    <div className="route-details-container">
      {!showStoppings ? (
        <>
          <header className="route-details-top-bar">
            <button
              className="route-details-back-button"
              onClick={handleBackClick}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <h2>Route {route.routeNumber}</h2>
          </header>
          <main className="route-details-main-content">
            <div className="route-details-action-buttons">
              <button
                onClick={handleStoppingsClick}
                className="route-details-stoppings-button"
              >
                <FontAwesomeIcon icon={faRoad} /> Stoppings
              </button>
              <button className="route-details-passengers-button">
                <FontAwesomeIcon icon={faUsers} /> Passengers
              </button>
              <button className="route-details-track-button">
                <FontAwesomeIcon icon={faGasPump} /> Track
              </button>
              <button className="route-details-edit-button">
                <FontAwesomeIcon icon={faPencilAlt} /> Edit
              </button>
            </div>
            <div className="route-details-info">
              <p>
                <strong>Route Name:</strong> {route.routeName}
              </p>
              <p>
                <strong>Main Driver:</strong> {route.mainDriver}
              </p>
              <p>
                <strong>Departure Time:</strong> {route.departureFromHalt}
              </p>
              <p>
                <strong>ETA:</strong> {route.eta}
              </p>
              <p>
                <strong>Seat Capacity:</strong> {route.sittingCapacity}
              </p>
              <p>
                <strong>Standing Capacity:</strong> {route.standingCapacity}
              </p>
              <p>
                <strong>Vehicle Registration No:</strong>{" "}
                {route.vehicleRegistrationNumber}
              </p>
              <p>
                <strong>Fuel:</strong> 60 / 80 litres
              </p>
            </div>
          </main>
        </>
      ) : (
        <Stoppings
          route={route}
          onBack={handleBackClick}
          institutionId={institutionId}
        />
      )}
    </div>
  );
};

export default RouteDetails;
