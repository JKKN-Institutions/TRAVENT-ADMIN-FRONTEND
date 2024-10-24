import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./AddNewStop.css";

const AddNewStop = ({ route, onBack, institutionId, editingStop }) => {
  const [stopData, setStopData] = useState({
    stopName: "",
    latitude: "",
    longitude: "",
    districtName: "",
    cityName: "",
    stateName: "",
    boardTime: "",
    dropTime: "",
    boardingCountMorning: "",
    boardingCountEvening: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingStop) {
      const relevantStopData = Object.keys(stopData).reduce((acc, key) => {
        acc[key] = editingStop[key] || "";
        return acc;
      }, {});
      setStopData(relevantStopData);
    }
  }, [editingStop]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStopData({ ...stopData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    let formErrors = {};
    Object.keys(stopData).forEach((key) => {
      if (!stopData[key]) {
        formErrors[key] = `${key
          .replace(/([A-Z])/g, " $1")
          .trim()} is required`;
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
        const url = editingStop
          ? "https://travent-admin-server.vercel.app/api/bus/update-stop"
          : "https://travent-admin-server.vercel.app/api/bus/add-stop";

        const response = await axios.post(url, {
          ...stopData,
          routeNumber: route.routeNumber,
          institutionId: institutionId,
          ...(editingStop && { stopID: editingStop.stopID }),
        });

        if (response.data.success) {
          const newStop = response.data.stop; // Ensure API returns the added stop data
          alert(
            editingStop
              ? "Stop updated successfully!"
              : "Stop added successfully!"
          );
          onBack(newStop); // Pass the newly added or updated stop to the parent component
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error("Error saving stop:", error);
        alert("Failed to save stop.");
      }
    }
  };

  return (
    <div className="add-stop-container">
      <header className="add-stop-top-bar">
        <button className="add-stop-back-button" onClick={onBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className="add-stop-header">
          <h2>{editingStop ? "Edit Stop" : "Add New Stop"}</h2>
        </div>
      </header>
      <main className="add-stop-main-content">
        <form onSubmit={handleSubmit}>
          <div className="add-stop-form-grid">
            {Object.keys(stopData).map((key) => (
              <div key={key} className="add-stop-form-group">
                <input
                  type={
                    key.includes("Count") ||
                    key.includes("latitude") ||
                    key.includes("longitude")
                      ? "number"
                      : key.includes("Time")
                      ? "time"
                      : "text"
                  }
                  id={key}
                  name={key}
                  value={stopData[key]}
                  onChange={handleChange}
                  placeholder={key.replace(/([A-Z])/g, " $1").trim()}
                  className={errors[key] ? "input-error" : ""}
                />
                {errors[key] && <p className="error">{errors[key]}</p>}
              </div>
            ))}
          </div>
          <div className="add-stop-buttons-container">
            <button
              type="button"
              className="add-stop-cancel-button"
              onClick={onBack}
            >
              Cancel
            </button>
            <button type="submit" className="add-stop-save-button">
              {editingStop ? "Update Stop" : "Add Stop"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddNewStop;
