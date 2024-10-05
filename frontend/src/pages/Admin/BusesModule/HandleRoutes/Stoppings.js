import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddStop from "./AddStop"; // Assuming you have an AddStop component

const Stoppings = ({ route, onBack, institutionId}) => {
  const navigate = useNavigate();
  const [showAddStop, setShowAddStop] = useState(false);
  const [editStop, setEditStop] = useState(null);

  const handleAddStopClick = () => {
    // Show the AddStop component
    setShowAddStop(true);
  };

  const handleDeleteStopClick = (stopId) => {
    // Implement logic to delete a stop
    const confirmation = window.confirm("Are you sure you want to delete this stop?");
    if (confirmation) {
      console.log(`Delete stop with ID: ${stopId}`);
      // Implement the delete functionality, likely involving an API call
    }
  };

  const handleEditStopClick = (stop) => {
    // Set the stop to be edited and show the AddStop component
    setEditStop(stop);
    setShowAddStop(true);
  };

  const handleAddStopBack = () => {
    setShowAddStop(false);
    setEditStop(null);
  };

  return (
    <>
      {!showAddStop ? (
        <div className="stoppings-container">
          <div className="stoppings-header">
            <span className="stoppings-back-icon" onClick={onBack}>
              ← Back
            </span>
            <h2>Stoppings for Route {route.routeNumber}</h2>
          </div>
          <div className="stoppings-actions">
            <button onClick={handleAddStopClick}>+ Add New Stop</button>
          </div>
          <div className="stoppings-list">
            {route.stops && route.stops.length > 0 ? (
              route.stops.map((stop, index) => (
                <div key={index} className="stop-card">
                  <p>Stop Name: {stop.stopName}</p>
                  <p>Boarding Time: {stop.boardTime}</p>
                  <p>Drop Time: {stop.dropTime}</p>
                  <p>Location: {stop.cityName}, {stop.districtName}, {stop.stateName}</p>
                  <p>Passengers: {stop.boardingCountMorning + stop.boardingCountEvening}</p>
                  <div className="stop-actions">
                    <button onClick={() => handleEditStopClick(stop)}>Edit</button>
                    <button onClick={() => handleDeleteStopClick(stop.stopID)}>Delete</button>
                  </div>
                </div>
              ))
            ) : (
              <p>No stoppings available for this route.</p>
            )}
          </div>
        </div>
      ) : (
        <AddStop 
          route={route} 
          onBack={handleAddStopBack} 
          institutionId={institutionId}
        />
      )}
    </>
  );
};

export default Stoppings;
