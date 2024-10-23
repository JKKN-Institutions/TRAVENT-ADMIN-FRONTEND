import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faUser } from "@fortawesome/free-solid-svg-icons";
import "./AddNewDriver.css";

const AddNewDriver = ({ driver, onBack, onSave }) => {
  const [driverData, setDriverData] = useState({
    name: "",
    mobileNo: "",
    address: "",
    licenseNumber: "",
    aadharNumber: "",
    experience: "",
    category: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (driver) {
      setDriverData({ ...driverData, ...driver });
    }
  }, [driver]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDriverData({ ...driverData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    let formErrors = {};
    Object.keys(driverData).forEach((key) => {
      if (!driverData[key]) {
        formErrors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required`;
      }
    });
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      onSave(driverData);
    }
  };

  const renderInput = (key) => {
    if (key === "category") {
      return (
        <select
          id={key}
          name={key}
          value={driverData[key]}
          onChange={handleChange}
          className={errors[key] ? "input-error" : ""}
        >
          <option value="">Select Category</option>
          <option value="main">Main Driver</option>
          <option value="spare">Spare Driver</option>
        </select>
      );
    } else {
      return (
        <input
          type={key === "experience" ? "number" : "text"}
          id={key}
          name={key}
          value={driverData[key]}
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
      );
    }
  };

  return (
    <div className="add-new-driver-container">
      <header className="add-new-driver-top-bar">
        <button className="add-new-driver-back-button" onClick={onBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className="add-new-driver-header">
          <h2>{driver ? "Edit Driver" : "Add New Driver"}</h2>
        </div>
      </header>
      <main className="add-new-driver-main-content">
        <form onSubmit={handleSubmit}>
          <div className="add-new-driver-avatar">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div className="add-new-driver-form-grid">
            {Object.keys(driverData).map((key) => (
              <div key={key} className="add-new-driver-form-group">
                {renderInput(key)}
                {errors[key] && <p className="error">{errors[key]}</p>}
              </div>
            ))}
          </div>
          <div className="add-new-driver-buttons-container">
            <button
              type="button"
              className="add-new-driver-cancel-button"
              onClick={onBack}
            >
              Cancel
            </button>
            <button type="submit" className="add-new-driver-save-button">
              {driver ? "Update Driver" : "Add Driver"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddNewDriver;
