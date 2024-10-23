import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faGasPump,
  faRoad,
  faUsers,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import Stoppings from "../Stoppings/Stoppings";
import Passengers from "../Passengers/Passengers";
import AddNewRoute from "../AddNewRoute/AddNewRoute";
import "./RouteDetails.css";
import Button from "../../../../components/Shared/Button/Button";

const RouteDetails = ({ route, onBack, institutionId, onRouteUpdate }) => {
  const [showStoppings, setShowStoppings] = useState(false);
  const [showPassengers, setShowPassengers] = useState(false);
  const [showEditRoute, setShowEditRoute] = useState(false);

  const handleStoppingsClick = () => setShowStoppings(true);
  const handlePassengersClick = () => setShowPassengers(true);
  const handleEditClick = () => setShowEditRoute(true);

  const handleBackClick = () => {
    if (showStoppings) setShowStoppings(false);
    else if (showPassengers) setShowPassengers(false);
    else if (showEditRoute) setShowEditRoute(false);
    else if (onBack) onBack();
  };

  const handleRouteUpdate = (updatedRoute) => {
    onRouteUpdate(updatedRoute);
    setShowEditRoute(false);
  };

  if (showStoppings) {
    return (
      <Stoppings
        route={route}
        onBack={handleBackClick}
        institutionId={institutionId}
      />
    );
  }

  if (showPassengers) {
    return (
      <Passengers
        route={route}
        onBack={handleBackClick}
        institutionId={institutionId}
      />
    );
  }

  if (showEditRoute) {
    return (
      <AddNewRoute
        route={route}
        onBack={handleBackClick}
        onSave={handleRouteUpdate}
        institutionId={institutionId}
      />
    );
  }

  return (
    <div className="route-details-container">
      <header className="route-details-top-bar">
        <button className="route-details-back-button" onClick={handleBackClick}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h2>Route {route.routeNumber}</h2>
      </header>
      <main className="route-details-main-content">
        <div className="route-details-action-buttons">
          <Button
            label={
              <>
                <FontAwesomeIcon icon={faRoad} /> Stoppings
              </>
            }
            onClick={handleStoppingsClick}
          />

          <Button
            label={
              <>
                <FontAwesomeIcon icon={faUsers} /> Passengers
              </>
            }
            onClick={handlePassengersClick}
          />

          <Button
            label={
              <>
                <FontAwesomeIcon icon={faGasPump} /> Track
              </>
            }
          />

          <Button
            label={
              <>
                <FontAwesomeIcon icon={faPencilAlt} /> Edit
              </>
            }
            onClick={handleEditClick}
            disabled={false} // If you want to control when to disable the button
          />
        </div>
        <div className="route-details-info">
          <div className="route-details-info-item">
            <span className="route-details-info-label">Route Name:</span>
            <span className="route-details-info-value">{route.routeName}</span>
          </div>
          <div className="route-details-info-item">
            <span className="route-details-info-label">Main Driver:</span>
            <span className="route-details-info-value">{route.mainDriver}</span>
          </div>
          <div className="route-details-info-item">
            <span className="route-details-info-label">Departure Time:</span>
            <span className="route-details-info-value">
              {route.departureFromHalt}
            </span>
          </div>
          <div className="route-details-info-item">
            <span className="route-details-info-label">ETA:</span>
            <span className="route-details-info-value">{route.eta}</span>
          </div>
          <div className="route-details-info-item">
            <span className="route-details-info-label">Seat Capacity:</span>
            <span className="route-details-info-value">
              {route.sittingCapacity}
            </span>
          </div>
          <div className="route-details-info-item">
            <span className="route-details-info-label">Standing Capacity:</span>
            <span className="route-details-info-value">
              {route.standingCapacity}
            </span>
          </div>
          <div className="route-details-info-item">
            <span className="route-details-info-label">
              Vehicle Registration No:
            </span>
            <span className="route-details-info-value">
              {route.vehicleRegistrationNumber}
            </span>
          </div>
          <div className="route-details-info-item">
            <span className="route-details-info-label">Fuel:</span>
            <span className="route-details-info-value">60 / 80 litres</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RouteDetails;
