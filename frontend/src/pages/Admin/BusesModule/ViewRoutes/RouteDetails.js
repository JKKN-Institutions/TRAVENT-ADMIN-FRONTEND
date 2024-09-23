import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stoppings from "./Stoppings"; // Import the Stoppings component

const RouteDetails = ({ route, onBack, institutionId}) => {
  const navigate = useNavigate();
  const [showStoppings, setShowStoppings] = useState(false);

  const handleStoppingsClick = () => {
    setShowStoppings(true); // Toggle the state to show stoppings
  };
console.log("99090", institutionId)
  const handleBackClick = () => {
    if (showStoppings) {
      setShowStoppings(false); // Go back to route details if stoppings are shown
    } else if (onBack) {
      onBack(); // Call the onBack function passed as a prop
    } else {
      navigate(-1); // Go back to the previous page
    }
  };

  return (
    <div className="route-details-container">
      {!showStoppings ? (
        <>
          <div className="route-details-header">
            <span className="route-details-back-icon" onClick={handleBackClick}>
              ← Back
            </span>
            <h2>Route {route.routeNumber}</h2>
          </div>
          <div className="route-details">
            <p>Route Name: {route.routeName}</p>
            <p>Main Driver: {route.mainDriver}</p>
            <p>Departure Time: {route.departureFromHalt}</p>
            <p>ETA: {route.eta}</p>
            <p>Seat Capacity: {route.sittingCapacity}</p>
            <p>Standing Capacity: {route.standingCapacity}</p>
            <p>Vehicle Registration No: {route.vehicleRegistrationNumber}</p>
            <p>Fuel: 60 / 80 litres</p>
            {/* Add more details as per the screenshot */}
          </div>
          <div className="route-details-actions">
            <button onClick={handleStoppingsClick}>Stoppings</button>
            <button>Passengers</button>
            <button>Track</button>
            <button>Edit</button>
          </div>
        </>
      ) : (
        <Stoppings route={route} onBack={handleBackClick} institutionId={institutionId}/>
      )}
    </div>
  );
};

export default RouteDetails;
