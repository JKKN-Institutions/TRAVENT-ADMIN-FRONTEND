import React, { useState } from "react";
import "./AddNewRoute.css";
import { useLocation } from "react-router-dom";

import axios from "axios";

const AddNewRoute = () => {
  const institutionDetails = JSON.parse(localStorage.getItem('institutionDetails'));
  console.log("00000000000",institutionDetails);


  const [routeData, setRouteData] = useState({
    routeNumber: "",
    routeName: "",
    eta: "",
    sittingCapacity: 0,
    standingCapacity: 0,
    vehicleRegistrationNumber: "",
    mainDriver: "",
    departureFromHalt: "",
    collegeArrivalTime: "",
    departureFromCollege: "",
    dropTimeFromCollege: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRouteData({
      ...routeData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Add the institutionId to the route data
    const routePayload = {
        ...routeData,
        stops: null, // Set stops to null by default
        institutionId: institutionDetails.institutionId // Include the institutionId
    };
    
    try {
        const response = await axios.post(
            "http://localhost:3000/api/bus/add-route",
            routePayload
        );
        if (response.data.success) {
            alert("Route added successfully!");
        } else {
            alert(response.data.message);
        }
    } catch (error) {
        console.error("Error adding route:", error);
        alert("Failed to add route.");
    }
};

  return (
    <div className="add-route-container">
      <h2>Add New Route</h2>
      <form onSubmit={handleSubmit} className="add-route-form">
        <div className="form-group">
          <label>Route Number</label>
          <input
            type="text"
            name="routeNumber"
            value={routeData.routeNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Route Name</label>
          <input
            type="text"
            name="routeName"
            value={routeData.routeName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>ETA</label>
          <input
            type="text"
            name="eta"
            value={routeData.eta}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Sitting Capacity</label>
          <input
            type="number"
            name="sittingCapacity"
            value={routeData.sittingCapacity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Standing Capacity</label>
          <input
            type="number"
            name="standingCapacity"
            value={routeData.standingCapacity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Vehicle Registration Number</label>
          <input
            type="text"
            name="vehicleRegistrationNumber"
            value={routeData.vehicleRegistrationNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Main Driver</label>
          <input
            type="text"
            name="mainDriver"
            value={routeData.mainDriver}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Departure from Halt</label>
          <input
            type="text"
            name="departureFromHalt"
            value={routeData.departureFromHalt}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>College Arrival Time</label>
          <input
            type="text"
            name="collegeArrivalTime"
            value={routeData.collegeArrivalTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Departure from College</label>
          <input
            type="text"
            name="departureFromCollege"
            value={routeData.departureFromCollege}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Drop Time from College</label>
          <input
            type="text"
            name="dropTimeFromCollege"
            value={routeData.dropTimeFromCollege}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Add Route
        </button>
      </form>
    </div>
  );
};

export default AddNewRoute;
