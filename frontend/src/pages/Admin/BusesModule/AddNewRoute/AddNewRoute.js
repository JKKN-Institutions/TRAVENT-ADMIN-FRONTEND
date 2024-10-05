import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./AddNewRoute.css";

const AddNewRoute = ({ onBack }) => {
  const navigate = useNavigate();
  const institutionDetails = JSON.parse(
    localStorage.getItem("institutionDetails")
  );

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

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRouteData({
      ...routeData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    let formErrors = {};
    Object.keys(routeData).forEach((key) => {
      if (!routeData[key] && key !== "standingCapacity") {
        formErrors[key] = `${
          key.charAt(0).toUpperCase() +
          key
            .slice(1)
            .replace(/([A-Z])/g, " $1")
            .trim()
        } is required`;
      }
    });
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      try {
        const routePayload = {
          ...routeData,
          stops: null,
          institutionId: institutionDetails.institutionId,
        };
        const response = await axios.post(
          "https://travent-admin-server.vercel.app/api/bus/add-route",
          routePayload
        );
        if (response.data.success) {
          alert("Route added successfully!");
          navigate(-1);
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error("Error adding route:", error);
        alert("Failed to add route.");
      }
    }
  };

  return (
    <div className="add-new-route-container">
      <div className="add-new-route-header">
        <button className="add-new-route-back-button" onClick={onBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h2>Add New Route</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="add-new-route-form-grid">
          {Object.keys(routeData).map((key) => (
            <div key={key} className="add-new-route-form-group">
              <input
                type={key.includes("Capacity") ? "number" : "text"}
                id={key}
                name={key}
                value={routeData[key]}
                onChange={handleChange}
                placeholder={
                  key.charAt(0).toUpperCase() +
                  key
                    .slice(1)
                    .replace(/([A-Z])/g, " $1")
                    .trim()
                }
                className={errors[key] ? "input-error" : ""}
              />
              {errors[key] && <p className="error">{errors[key]}</p>}
            </div>
          ))}
        </div>
        <div className="add-new-route-buttons-container">
          <button
            type="button"
            className="add-new-route-cancel-button"
            onClick={onBack}
          >
            Cancel
          </button>
          <button type="submit" className="add-new-route-save-button">
            Add Route
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewRoute;
