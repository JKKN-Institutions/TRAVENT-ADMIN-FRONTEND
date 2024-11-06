import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./AddInstitutionForm.css";

const AddInstitutionForm = ({ onSave, onBack, initialData }) => {
  const [institutionData, setInstitutionData] = useState(
    initialData || {
      institutionName: "",
      state: "",
      founderName: "",
      founderEmail: "",
      founderContactNumber: "",
      address: "",
      contact1: "",
      contact2: "",
      emailDomain: "",
    }
  );

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!initialData) {
      setInstitutionData({
        institutionName: "",
        state: "",
        founderName: "",
        founderEmail: "",
        founderContactNumber: "",
        address: "",
        contact1: "",
        contact2: "",
        emailDomain: "",
      });
    }
  }, [initialData]);

  const validateForm = () => {
    let formErrors = {};
    if (!institutionData.institutionName)
      formErrors.institutionName = "Institution Name is required";
    if (!institutionData.state) formErrors.state = "State is required";
    if (!institutionData.founderName)
      formErrors.founderName = "Founder Name is required";
    if (!institutionData.founderEmail)
      formErrors.founderEmail = "Founder Email is required";
    if (!institutionData.founderContactNumber)
      formErrors.founderContactNumber = "Founder Contact Number is required";
    if (!institutionData.address) formErrors.address = "Address is required";
    if (!institutionData.contact1)
      formErrors.contact1 = "Contact 1 is required";
    if (!institutionData.emailDomain)
      formErrors.emailDomain = "Email Domain is required";
    return formErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInstitutionData({ ...institutionData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      console.log("Institution data to save:", institutionData);
      onSave(institutionData); // Pass form data back to parent
    }
  };

  const handleBack = () => {
    setInstitutionData({
      institutionName: "",
      state: "",
      founderName: "",
      founderEmail: "",
      founderContactNumber: "",
      address: "",
      contact1: "",
      contact2: "",
      emailDomain: "",
    });
    onBack();
  };

  return (
    <div className="add-institution-form-container">
      <div className="add-institution-form-header">
        <h2>Add New Institution</h2>
      </div>
      <form>
        <div className="add-institution-form-form-grid">
          <div className="add-institution-form-form-group">
            <input
              name="institutionName"
              placeholder="Institution Name"
              value={institutionData.institutionName}
              onChange={handleInputChange}
              className={errors.institutionName ? "input-error" : ""}
            />
            {errors.institutionName && (
              <p className="error">{errors.institutionName}</p>
            )}
          </div>
          <div className="add-institution-form-form-group">
            <input
              name="state"
              placeholder="State"
              value={institutionData.state}
              onChange={handleInputChange}
              className={errors.state ? "input-error" : ""}
            />
            {errors.state && <p className="error">{errors.state}</p>}
          </div>
          <div className="add-institution-form-form-group">
            <input
              name="founderName"
              placeholder="Founder Name"
              value={institutionData.founderName}
              onChange={handleInputChange}
              className={errors.founderName ? "input-error" : ""}
            />
            {errors.founderName && (
              <p className="error">{errors.founderName}</p>
            )}
          </div>
          <div className="add-institution-form-form-group">
            <input
              name="founderEmail"
              placeholder="Founder Email"
              value={institutionData.founderEmail}
              onChange={handleInputChange}
              className={errors.founderEmail ? "input-error" : ""}
            />
            {errors.founderEmail && (
              <p className="error">{errors.founderEmail}</p>
            )}
          </div>
          <div className="add-institution-form-form-group">
            <input
              name="founderContactNumber"
              placeholder="Founder Contact Number"
              value={institutionData.founderContactNumber}
              onChange={handleInputChange}
              className={errors.founderContactNumber ? "input-error" : ""}
            />
            {errors.founderContactNumber && (
              <p className="error">{errors.founderContactNumber}</p>
            )}
          </div>
          <div className="add-institution-form-form-group full-width">
            <textarea
              name="address"
              placeholder="Address"
              value={institutionData.address}
              onChange={handleInputChange}
              className={errors.address ? "input-error" : ""}
              rows="3"
            />
            {errors.address && <p className="error">{errors.address}</p>}
          </div>
          <div className="add-institution-form-form-group">
            <input
              name="contact1"
              placeholder="Contact 1"
              value={institutionData.contact1}
              onChange={handleInputChange}
              className={errors.contact1 ? "input-error" : ""}
            />
            {errors.contact1 && <p className="error">{errors.contact1}</p>}
          </div>
          <div className="add-institution-form-form-group">
            <input
              name="contact2"
              placeholder="Contact 2 (Optional)"
              value={institutionData.contact2}
              onChange={handleInputChange}
            />
          </div>
          <div className="add-institution-form-form-group">
            <input
              name="emailDomain"
              placeholder="Email Domain"
              value={institutionData.emailDomain}
              onChange={handleInputChange}
              className={errors.emailDomain ? "input-error" : ""}
            />
            {errors.emailDomain && (
              <p className="error">{errors.emailDomain}</p>
            )}
          </div>
        </div>
        <div className="institution-buttons-container">
          <button
            type="button"
            className="institution-submit-button"
            onClick={handleBack}
          >
            Back
          </button>
          <button
            type="submit"
            className="institution-submit-button"
            onClick={handleSubmit}
          >
            Save Institution & Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddInstitutionForm;
