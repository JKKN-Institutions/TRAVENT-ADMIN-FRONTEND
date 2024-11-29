import React, { useState, useEffect } from "react";
import "./AddInstituteForm.css";
import FormInput from "../../../components/Shared/FormInput/FormInput";
import ActionButtons from "../../../components/Shared/ActionButtons/ActionButtons";

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
    const formErrors = {};

    // Institute Code: Required and should have minimum of 3 characters
    if (
      !instituteData.instituteCode ||
      instituteData.instituteCode.length < 3
    ) {
      formErrors.instituteCode =
        "Institute Code is required and should be at least 3 characters";
    }

    // Institute Name: Required and should have minimum of 3 characters
    if (
      !instituteData.instituteName ||
      instituteData.instituteName.length < 3
    ) {
      formErrors.instituteName =
        "Institute Name is required and should be at least 3 characters";
    }

    // State: Required and should contain only letters and spaces
    if (!instituteData.state || !/^[A-Za-z\s]+$/.test(instituteData.state)) {
      formErrors.state = "State is required and should contain only letters";
    }

    // Address: Required and should have minimum of 5 characters
    if (!instituteData.address || instituteData.address.length < 5) {
      formErrors.address =
        "Address is required and should be at least 5 characters";
    }

    // Principal Name: Required and should contain only letters and spaces
    if (
      !instituteData.principalName ||
      !/^[A-Za-z\s]+$/.test(instituteData.principalName)
    ) {
      formErrors.principalName =
        "Principal Name is required and should contain only letters and spaces";
    }

    // Principal Email: Required and should be in a valid email format
    if (
      !instituteData.principalEmail ||
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(instituteData.principalEmail)
    ) {
      formErrors.principalEmail = "Valid Principal Email is required";
    }

    // Principal Contact Number: Required and should be exactly 10 digits
    if (
      !instituteData.principalContactNumber ||
      !/^\d{10}$/.test(instituteData.principalContactNumber)
    ) {
      formErrors.principalContactNumber =
        "Principal Contact Number is required and should be 10 digits";
    }

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
      console.log("Institute Data Submitted:", instituteData);
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
                <strong>Contact 1:</strong> {institutionData.contact1}
              </li>
              <li>
                <strong>Contact 2:</strong> {institutionData.contact2}
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

          <form onSubmit={handleSubmit}>
            <div className="institute-form-grid">
              <FormInput
                id="instituteCode"
                name="instituteCode"
                type="text"
                placeholder="Institute Code"
                value={instituteData.instituteCode}
                onChange={handleInputChange}
                error={errors.instituteCode}
              />
              <FormInput
                id="instituteName"
                name="instituteName"
                type="text"
                placeholder="Institute Name"
                value={instituteData.instituteName}
                onChange={handleInputChange}
                error={errors.instituteName}
              />
              <FormInput
                id="state"
                name="state"
                type="text"
                placeholder="State"
                value={instituteData.state}
                onChange={handleInputChange}
                error={errors.state}
              />
              <FormInput
                id="principalName"
                name="principalName"
                type="text"
                placeholder="Principal Name"
                value={instituteData.principalName}
                onChange={handleInputChange}
                error={errors.principalName}
              />
              <FormInput
                id="principalEmail"
                name="principalEmail"
                type="email"
                placeholder="Principal Email"
                value={instituteData.principalEmail}
                onChange={handleInputChange}
                error={errors.principalEmail}
              />
              <FormInput
                id="principalContactNumber"
                name="principalContactNumber"
                type="tel"
                placeholder="Principal Contact Number"
                value={instituteData.principalContactNumber}
                onChange={handleInputChange}
                error={errors.principalContactNumber}
              />
              <div className="full-width">
                <FormInput
                  id="address"
                  name="address"
                  type="textarea"
                  placeholder="Address"
                  value={instituteData.address}
                  onChange={handleInputChange}
                  error={errors.address}
                />
              </div>
            </div>
            <ActionButtons
              onCancel={handleBackClick}
              onSubmit={handleSubmit}
              submitText="Save Institute & Next"
              cancelText="Previous"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddInstituteForm;
