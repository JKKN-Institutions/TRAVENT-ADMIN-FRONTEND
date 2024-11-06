import React, { useState, useEffect } from "react";
import "./AddDepartmentForm.css";

const AddDepartmentForm = ({ onBack, onSave, initialData, instituteData }) => {
  const [departmentData, setDepartmentData] = useState(
    initialData || {
      departmentCode: "",
      departmentName: "",
      hodName: "",
      hodEmail: "",
      hodContactNumber: "",
    }
  );

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!initialData) {
      setDepartmentData({
        departmentCode: "",
        departmentName: "",
        hodName: "",
        hodEmail: "",
        hodContactNumber: "",
      });
    }
  }, [initialData]);

  const validateForm = () => {
    let formErrors = {};
    if (!departmentData.departmentCode)
      formErrors.departmentCode = "Department Code is required";
    if (!departmentData.departmentName)
      formErrors.departmentName = "Department Name is required";
    if (!departmentData.hodName) formErrors.hodName = "HOD Name is required";
    if (!departmentData.hodEmail) formErrors.hodEmail = "HOD Email is required";
    if (!departmentData.hodContactNumber)
      formErrors.hodContactNumber = "HOD Contact Number is required";
    return formErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDepartmentData({ ...departmentData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      onSave(departmentData);
    }
  };

  const handleBackClick = () => {
    setDepartmentData(initialData);
    onBack();
  };

  return (
    <div className="add-department-form-container">
      <div className="department-form-content">
        <div className="department-left-side">
          <h3>Institute Details</h3>
          {instituteData && Object.keys(instituteData).length > 0 ? (
            <ul className="institution-details">
              <li>
                <strong>Institute Code:</strong> {instituteData.instituteCode}
              </li>
              <li>
                <strong>Institute Name:</strong> {instituteData.instituteName}
              </li>
              <li>
                <strong>State:</strong> {instituteData.state}
              </li>
              <li>
                <strong>Address:</strong> {instituteData.address}
              </li>
              <li>
                <strong>Principal Name:</strong> {instituteData.principalName}
              </li>
              <li>
                <strong>Principal Email:</strong> {instituteData.principalEmail}
              </li>
              <li>
                <strong>Principal Contact:</strong>{" "}
                {instituteData.principalContactNumber}
              </li>
            </ul>
          ) : (
            <p>No institution details available.</p>
          )}
        </div>
        <div className="department-vertical-line"></div>
        <div className="department-right-side">
          <div className="department-form-header">
            <h2>Add New Department</h2>
          </div>
          <form>
            <div className="department-form-grid">
              <div className="department-form-group">
                <input
                  name="departmentCode"
                  placeholder="Department Code"
                  value={departmentData.departmentCode}
                  onChange={handleInputChange}
                  className={errors.departmentCode ? "input-error" : ""}
                />
                {errors.departmentCode && (
                  <p className="error">{errors.departmentCode}</p>
                )}
              </div>
              <div className="department-form-group">
                <input
                  name="departmentName"
                  placeholder="Department Name"
                  value={departmentData.departmentName}
                  onChange={handleInputChange}
                  className={errors.departmentName ? "input-error" : ""}
                />
                {errors.departmentName && (
                  <p className="error">{errors.departmentName}</p>
                )}
              </div>
              <div className="department-form-group">
                <input
                  name="hodName"
                  placeholder="HOD Name"
                  value={departmentData.hodName}
                  onChange={handleInputChange}
                  className={errors.hodName ? "input-error" : ""}
                />
                {errors.hodName && <p className="error">{errors.hodName}</p>}
              </div>
              <div className="department-form-group">
                <input
                  name="hodEmail"
                  placeholder="HOD Email"
                  value={departmentData.hodEmail}
                  onChange={handleInputChange}
                  className={errors.hodEmail ? "input-error" : ""}
                />
                {errors.hodEmail && <p className="error">{errors.hodEmail}</p>}
              </div>
              <div className="department-form-group">
                <input
                  name="hodContactNumber"
                  placeholder="HOD Contact Number"
                  value={departmentData.hodContactNumber}
                  onChange={handleInputChange}
                  className={errors.hodContactNumber ? "input-error" : ""}
                />
                {errors.hodContactNumber && (
                  <p className="error">{errors.hodContactNumber}</p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="department-buttons-container">
        <button
          type="button"
          className="department-submit-button"
          onClick={handleBackClick}
        >
          Previous
        </button>
        <button
          type="submit"
          className="department-submit-button"
          onClick={handleSubmit}
        >
          Save Department & Next
        </button>
      </div>
    </div>
  );
};

export default AddDepartmentForm;
