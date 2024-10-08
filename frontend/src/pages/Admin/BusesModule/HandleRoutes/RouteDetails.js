import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faGasPump,
  faRoad,
  faUsers,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import Stoppings from "./Stoppings";

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
          <header className="route-details-header">
            <button
              className="route-details-back-button"
              onClick={handleBackClick}
            >
              <FontAwesomeIcon icon={faArrowLeft} /> Back
            </button>
            <h2>Route {route.routeNumber}</h2>
          </header>
          <main className="route-details-content">
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
            <div className="route-details-actions">
              <button onClick={handleStoppingsClick}>
                <FontAwesomeIcon icon={faRoad} /> Stoppings
              </button>
              <button>
                <FontAwesomeIcon icon={faUsers} /> Passengers
              </button>
              <button>
                <FontAwesomeIcon icon={faGasPump} /> Track
              </button>
              <button>
                <FontAwesomeIcon icon={faPencilAlt} /> Edit
              </button>
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
