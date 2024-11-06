import React, { useState } from "react";
import "./AddAdminForm.css";

const AddAdminForm = ({ onSave, onBack }) => {
  const [adminData, setAdminData] = useState({
    adminName: "",
    email: "",
    contactNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData({ ...adminData, [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!adminData.adminName) formErrors.adminName = "Admin Name is required";
    if (!adminData.email) formErrors.email = "Email is required";
    if (!adminData.contactNumber)
      formErrors.contactNumber = "Contact Number is required";
    if (!adminData.password) formErrors.password = "Password is required";
    if (adminData.password !== adminData.confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match";
    }
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      const { confirmPassword, ...adminDetails } = adminData;
      onSave(adminDetails);
    }
  };

  const handleBack = () => {
    onBack();
  };

  return (
    <div className="add-admin-form-container">
      <div className="add-admin-form-header">
        <h2>Add Admin Details</h2>
      </div>
      <form>
        <div className="add-admin-form-grid">
          <div className="add-admin-form-group">
            <input
              name="adminName"
              placeholder="Admin Name"
              value={adminData.adminName}
              onChange={handleInputChange}
              className={errors.adminName ? "input-error" : ""}
            />
            {errors.adminName && <p className="error">{errors.adminName}</p>}
          </div>
          <div className="add-admin-form-group">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={adminData.email}
              onChange={handleInputChange}
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="add-admin-form-group">
            <input
              name="contactNumber"
              placeholder="Contact Number"
              value={adminData.contactNumber}
              onChange={handleInputChange}
              className={errors.contactNumber ? "input-error" : ""}
            />
            {errors.contactNumber && (
              <p className="error">{errors.contactNumber}</p>
            )}
          </div>
          <div className="add-admin-form-group">
            <input
              name="password"
              type="password"
              placeholder="Create Password"
              value={adminData.password}
              onChange={handleInputChange}
              className={errors.password ? "input-error" : ""}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div className="add-admin-form-group">
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={adminData.confirmPassword}
              onChange={handleInputChange}
              className={errors.confirmPassword ? "input-error" : ""}
            />
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword}</p>
            )}
          </div>
        </div>
        <div className="add-admin-form-buttons-container">
          <button
            type="button"
            className="add-admin-form-submit-button"
            onClick={handleBack}
          >
            Back
          </button>
          <button
            type="submit"
            className="add-admin-form-submit-button"
            onClick={handleSubmit}
          >
            Save Admin Details
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAdminForm;
