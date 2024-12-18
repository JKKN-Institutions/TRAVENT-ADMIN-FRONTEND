import React, { useState, useCallback } from "react";
import "./AddAdminForm.css";
import FormInput from "../../../components/Shared/FormInput/FormInput";
import ActionButtons from "../../../components/Shared/ActionButtons/ActionButtons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const AddAdminForm = ({ onSave, onBack }) => {
  const [adminData, setAdminData] = useState({
    adminName: "",
    email: "",
    contactNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // Password visibility toggle state
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Confirm password visibility toggle state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData({ ...adminData, [name]: value });
  };

  const validateForm = () => {
    const formErrors = {};
    if (!adminData.adminName || adminData.adminName.length < 3) {
      formErrors.adminName =
        "Admin Name is required and should be at least 3 characters";
    }

    if (
      !adminData.email ||
      !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(adminData.email)
    ) {
      formErrors.email = "Valid email is required";
    }

    if (!adminData.contactNumber || !/^\d{10}$/.test(adminData.contactNumber)) {
      formErrors.contactNumber =
        "Contact Number is required and should be 10 digits";
    }

    if (!adminData.password || adminData.password.length < 6) {
      formErrors.password =
        "Password is required and should be at least 6 characters";
    }

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
      console.log("Admin Data Submitted:", adminDetails);
      onSave(adminDetails);
    }
  };

  // Password toggle function for visibility
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  // Confirm password toggle function for visibility
  const toggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword((prev) => !prev);
  }, []);

  return (
    <div className="add-admin-form-container">
      <div className="add-admin-form-header">
        <h2>Add Admin Details</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="add-admin-form-grid">
          <FormInput
            name="adminName"
            type="text"
            placeholder="Admin Name"
            value={adminData.adminName}
            onChange={handleInputChange}
            error={errors.adminName}
          />
          <FormInput
            name="email"
            type="email"
            placeholder="Email"
            value={adminData.email}
            onChange={handleInputChange}
            error={errors.email}
          />
          <FormInput
            name="contactNumber"
            type="tel"
            placeholder="Contact Number"
            value={adminData.contactNumber}
            onChange={handleInputChange}
            error={errors.contactNumber}
          />
          <div className="add-admin-form-password-container">
            <FormInput
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create Password"
              value={adminData.password}
              onChange={handleInputChange}
              error={errors.password}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility}
              aria-label="Toggle password visibility"
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </button>
          </div>
          <div className="add-admin-form-password-container">
            <FormInput
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={adminData.confirmPassword}
              onChange={handleInputChange}
              error={errors.confirmPassword}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={toggleConfirmPasswordVisibility}
              aria-label="Toggle confirm password visibility"
            >
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEye : faEyeSlash}
              />
            </button>
          </div>
        </div>
        <ActionButtons
          onCancel={onBack}
          onSubmit={handleSubmit}
          submitText="Save Admin Details"
          cancelText="Previous"
        />
      </form>
    </div>
  );
};

export default AddAdminForm;
