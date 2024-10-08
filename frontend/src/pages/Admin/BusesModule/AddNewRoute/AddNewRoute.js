import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./AddNewRoute.css";

const AddNewRoute = ({ route, onBack, onSave, institutionId }) => {
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

  useEffect(() => {
    if (route) {
      const { stops, boardingCount, stoppingCount, _id, ...editableFields } =
        route;
      setRouteData(editableFields);
    }
  }, [route]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRouteData({ ...routeData, [name]: value });
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
        const url = route
          ? "https://travent-admin-server.vercel.app/api/bus/update-route"
          : "https://travent-admin-server.vercel.app/api/bus/add-route";
        const response = await axios.post(url, {
          ...routeData,
          institutionId: institutionId,
        });
        if (response.data.success) {
          alert(
            route ? "Route updated successfully!" : "Route added successfully!"
          );
          onSave(response.data.route);
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error("Error saving route:", error);
        alert("Failed to save route.");
      }
    }
  };

  return (
    <div className="add-new-route-container">
      <div className="add-new-route-header">
        <button className="add-new-route-back-button" onClick={onBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h2>{route ? "Edit Route" : "Add New Route"}</h2>
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
            {route ? "Update Route" : "Add Route"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewRoute;
