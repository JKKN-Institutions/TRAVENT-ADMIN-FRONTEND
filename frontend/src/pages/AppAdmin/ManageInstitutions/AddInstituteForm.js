import React, { useState, useEffect } from "react";
import "./AddInstituteForm.css";

const AddInstituteForm = ({ onBack, onSave, initialData, institutionData }) => {
  const [instituteData, setInstituteData] = useState(
    initialData || {
      instituteCode: "",
      instituteName: "",
      state: "",
      address: "",
      principalName: "",
      principalEmail: "",
      principalContactNumber: "",
    }
  );

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!initialData) {
      setInstituteData({
        instituteCode: "",
        instituteName: "",
        state: "",
        address: "",
        principalName: "",
        principalEmail: "",
        principalContactNumber: "",
      });
    }
  }, [initialData]);

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

  const handleBackClick = () => {
    setInstituteData(initialData);
    onBack(); // Call the onBack prop to navigate back to AddInstitutionForm
  };

  return (
    <div className="add-institute-form-container">
      <div className="institute-form-content">
        <div className="institute-left-side">
          <h3>Institution Details</h3>
          {institutionData && Object.keys(institutionData).length > 0 ? (
            <ul className="institution-details">
              <li>
                <strong>Institution Name:</strong>{" "}
                {institutionData.institutionName}
              </li>
              <li>
                <strong>State:</strong> {institutionData.state}
              </li>
              <li>
                <strong>Founder Name:</strong> {institutionData.founderName}
              </li>
              <li>
                <strong>Founder Email:</strong> {institutionData.founderEmail}
              </li>
              <li>
                <strong>Founder Contact:</strong>{" "}
                {institutionData.founderContactNumber}
              </li>
              <li>
                <strong>Address:</strong> {institutionData.address}
              </li>
              <li>
                <strong>Email Domain:</strong> {institutionData.emailDomain}
              </li>
            </ul>
          ) : (
            <p>No institution details available.</p>
          )}
        </div>
        <div className="institute-vertical-line"></div>
        <div className="institute-right-side">
          <div className="institute-form-header">
            <h2>Add New Institute</h2>
          </div>
          <form>
            <div className="institute-form-grid">
              <div className="institute-form-group">
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
              <div className="institute-form-group">
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
              <div className="institute-form-group">
                <input
                  name="state"
                  placeholder="State"
                  value={instituteData.state}
                  onChange={handleInputChange}
                  className={errors.state ? "input-error" : ""}
                />
                {errors.state && <p className="error">{errors.state}</p>}
              </div>
              <div className="institute-form-group">
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
              <div className="institute-form-group">
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
              <div className="institute-form-group">
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
              <div className="institute-form-group full-width">
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
            </div>
          </form>
        </div>
      </div>
      <div className="institute-buttons-container">
        <button
          type="button"
          className="institute-submit-button"
          onClick={handleBackClick}
        >
          Previous
        </button>
        <button
          type="submit"
          className="institute-submit-button"
          onClick={handleSubmit}
        >
          Save Institute & Next
        </button>
      </div>
    </div>
  );
};

export default AddInstituteForm;
