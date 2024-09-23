import React, { useState, useEffect } from "react";
import "./AddInstituteForm.css";
const AddInstituteForm = ({ onSave, onBack }) => {
  const [instituteData, setInstituteData] = useState({
    instituteCode: "",
    instituteName: "",
    state: "",
    address: "",
    principalName: "",
    principalEmail: "",
    principalContactNumber: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};
    if (!instituteData.instituteCode)
      formErrors.instituteCode = "Institute Code is required";
    if (!instituteData.instituteName)
      formErrors.instituteName = "Institute Name is required";
    if (!instituteData.state) formErrors.state = "State is required";
    if (!instituteData.address) formErrors.address = "Address is required";
    if (!instituteData.principalName)
      formErrors.principalName = "Principal Name is required";
    if (!instituteData.principalEmail)
      formErrors.principalEmail = "Principal Email is required";
    if (!instituteData.principalContactNumber)
      formErrors.principalContactNumber =
        "Principal Contact Number is required";
    return formErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInstituteData({ ...instituteData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      onSave(instituteData); // Pass form data back to parent
    }
  };

  return (
    <div className="add-institute-form-container">
      <div className="form-header">
        <h2>Add New Institute</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <input
              name="instituteCode"
              placeholder="Institute Code"
              value={instituteData.instituteCode}
              onChange={handleInputChange}
              className={errors.instituteCode ? "input-error" : ""}
            />
            {errors.instituteCode && (
              <p className="error">{errors.instituteCode}</p>
            )}
          </div>
          <div className="form-group">
            <input
              name="instituteName"
              placeholder="Institute Name"
              value={instituteData.instituteName}
              onChange={handleInputChange}
              className={errors.instituteName ? "input-error" : ""}
            />
            {errors.instituteName && (
              <p className="error">{errors.instituteName}</p>
            )}
          </div>
          <div className="form-group">
            <input
              name="state"
              placeholder="State"
              value={instituteData.state}
              onChange={handleInputChange}
              className={errors.state ? "input-error" : ""}
            />
            {errors.state && <p className="error">{errors.state}</p>}
          </div>
          <div className="form-group full-width">
            <textarea
              name="address"
              placeholder="Address"
              value={instituteData.address}
              onChange={handleInputChange}
              className={errors.address ? "input-error" : ""}
              rows="3"
            />
            {errors.address && <p className="error">{errors.address}</p>}
          </div>
          <div className="form-group">
            <input
              name="principalName"
              placeholder="Principal Name"
              value={instituteData.principalName}
              onChange={handleInputChange}
              className={errors.principalName ? "input-error" : ""}
            />
            {errors.principalName && (
              <p className="error">{errors.principalName}</p>
            )}
          </div>
          <div className="form-group">
            <input
              name="principalEmail"
              placeholder="Principal Email"
              value={instituteData.principalEmail}
              onChange={handleInputChange}
              className={errors.principalEmail ? "input-error" : ""}
            />
            {errors.principalEmail && (
              <p className="error">{errors.principalEmail}</p>
            )}
          </div>
          <div className="form-group">
            <input
              name="principalContactNumber"
              placeholder="Principal Contact Number"
              value={instituteData.principalContactNumber}
              onChange={handleInputChange}
              className={errors.principalContactNumber ? "input-error" : ""}
            />
            {errors.principalContactNumber && (
              <p className="error">{errors.principalContactNumber}</p>
            )}
          </div>
        </div>
        <div className="institute-buttons-container">
          <button
            type="button"
            className="institute-submit-button"
            onClick={onBack}
          >
            Back
          </button>
          <button type="submit" className="institute-submit-button">
            Save Institute
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddInstituteForm;
