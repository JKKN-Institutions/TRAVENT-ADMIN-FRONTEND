import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import ViewRoutes from "./ViewRoutes";

const AddStop = ({ route, onBack, institutionId }) => {
  const [stopData, setStopData] = useState({
    stopName: "",
    latitude: "",
    longitude: "",
    districtName: "",
    cityName: "",
    stateName: "",
    boardTime: "",
    dropTime: "",
    boardingCountMorning: 0,
    boardingCountEvening: 0,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStopData({
      ...stopData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/bus/add-stop", {
        ...stopData,
        routeNumber: route.routeNumber,
        institutionId: institutionId,
      });
      if (response.data.success) {
        alert("Stop added/updated successfully!");
        navigate("/admin/buses-dashboard"); // Navigate back after adding/editing
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error adding/updating stop:", error);
      alert("Failed to add/update stop.");
    }
  };

  return (
    <div className="add-stop-container">
      <h2>{"Add New Stop"}</h2>
      <form onSubmit={handleSubmit} className="add-stop-form">
        <input
          type="text"
          name="stopName"
          value={stopData.stopName}
          onChange={handleChange}
          placeholder="Stop Name"
          required
        />
        <input
          type="number"
          name="latitude"
          value={stopData.latitude}
          onChange={handleChange}
          placeholder="Latitude"
          required
        />
        <input
          type="number"
          name="longitude"
          value={stopData.longitude}
          onChange={handleChange}
          placeholder="Longitude"
          required
        />
        <input
          type="text"
          name="districtName"
          value={stopData.districtName}
          onChange={handleChange}
          placeholder="District Name"
          required
        />
        <input
          type="text"
          name="cityName"
          value={stopData.cityName}
          onChange={handleChange}
          placeholder="City Name"
          required
        />
        <input
          type="text"
          name="stateName"
          value={stopData.stateName}
          onChange={handleChange}
          placeholder="State Name"
          required
        />
        <input
          type="time"
          name="boardTime"
          value={stopData.boardTime}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="dropTime"
          value={stopData.dropTime}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="boardingCountMorning"
          value={stopData.boardingCountMorning}
          onChange={handleChange}
          placeholder="Morning Boarding Count"
          min="0"
          required
        />
        <input
          type="number"
          name="boardingCountEvening"
          value={stopData.boardingCountEvening}
          onChange={handleChange}
          placeholder="Evening Boarding Count"
          min="0"
          required
        />
        <button type="submit">{"Add Stop"}</button>
        <button type="button" onClick={onBack}>Cancel</button>
      </form>
    </div>
  );
};

export default AddStop;
