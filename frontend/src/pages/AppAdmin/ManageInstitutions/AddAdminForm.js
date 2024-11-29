import React, { useState } from "react";
import "./AddAdminForm.css";
import FormInput from "../../../components/Shared/FormInput/FormInput";
import ActionButtons from "../../../components/Shared/ActionButtons/ActionButtons";

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
          <FormInput
            name="password"
            type="password"
            placeholder="Create Password"
            value={adminData.password}
            onChange={handleInputChange}
            error={errors.password}
          />
          <FormInput
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={adminData.confirmPassword}
            onChange={handleInputChange}
            error={errors.confirmPassword}
          />
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
