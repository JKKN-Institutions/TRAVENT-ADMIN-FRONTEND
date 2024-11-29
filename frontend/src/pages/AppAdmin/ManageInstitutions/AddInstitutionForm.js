import React, { useState, useEffect } from "react";
import "./AddInstitutionForm.css";
import ActionButtons from "../../../components/Shared/ActionButtons/ActionButtons";
import FormInput from "../../../components/Shared/FormInput/FormInput";

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
    if (initialData) {
      setInstitutionData(initialData);
    }
  }, [initialData]);

  const validateForm = () => {
    let formErrors = {};

    if (
      !institutionData.institutionName ||
      institutionData.institutionName.length < 3
    )
      formErrors.institutionName =
        "Institution Name is required and should be at least 3 characters";

    if (!institutionData.state || !/^[A-Za-z\s]+$/.test(institutionData.state))
      formErrors.state = "State is required and should contain only letters";

    if (
      !institutionData.founderName ||
      !/^[A-Za-z\s]+$/.test(institutionData.founderName)
    )
      formErrors.founderName =
        "Founder Name is required and should contain only letters and spaces";

    if (
      !institutionData.founderEmail ||
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(institutionData.founderEmail)
    )
      formErrors.founderEmail = "Valid Founder Email is required";

    if (
      !institutionData.founderContactNumber ||
      !/^\d{10}$/.test(institutionData.founderContactNumber)
    )
      formErrors.founderContactNumber =
        "Founder Contact Number is required and should be 10 digits";

    if (!institutionData.address || institutionData.address.length < 5)
      formErrors.address =
        "Address is required and should be at least 5 characters";

    if (!institutionData.contact1 || !/^\d{10}$/.test(institutionData.contact1))
      formErrors.contact1 = "Contact 1 is required and should be 10 digits";

    if (institutionData.contact2 && !/^\d{10}$/.test(institutionData.contact2))
      formErrors.contact2 = "Contact 2 should be 10 digits";

    if (
      !institutionData.emailDomain ||
      !/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(institutionData.emailDomain)
    )
      formErrors.emailDomain =
        "Valid Email Domain is required, e.g., example.com";

    return formErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInstitutionData({ ...institutionData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    console.log("Form Errors:", formErrors); // Log errors for debugging
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      console.log("Institution Data:", institutionData);
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
      <form onSubmit={handleSubmit}>
        <div className="add-institution-form-grid">
          <FormInput
            id="institutionName"
            name="institutionName"
            type="text"
            value={institutionData.institutionName}
            placeholder="Institution Name"
            error={errors.institutionName}
            onChange={handleInputChange}
          />
          <FormInput
            id="state"
            name="state"
            type="text"
            value={institutionData.state}
            placeholder="State"
            error={errors.state}
            onChange={handleInputChange}
          />
          <FormInput
            id="founderName"
            name="founderName"
            type="text"
            value={institutionData.founderName}
            placeholder="Founder Name"
            error={errors.founderName}
            onChange={handleInputChange}
          />
          <FormInput
            id="founderEmail"
            name="founderEmail"
            type="email"
            value={institutionData.founderEmail}
            placeholder="Founder Email"
            error={errors.founderEmail}
            onChange={handleInputChange}
          />
          <FormInput
            id="founderContactNumber"
            name="founderContactNumber"
            type="tel"
            value={institutionData.founderContactNumber}
            placeholder="Founder Contact Number"
            error={errors.founderContactNumber}
            onChange={handleInputChange}
          />
          <div className="full-width">
            <FormInput
              id="address"
              name="address"
              type="textarea"
              value={institutionData.address}
              placeholder="Address"
              error={errors.address}
              onChange={handleInputChange}
            />
          </div>
          <FormInput
            id="contact1"
            name="contact1"
            type="tel"
            value={institutionData.contact1}
            placeholder="Contact 1"
            error={errors.contact1}
            onChange={handleInputChange}
          />
          <FormInput
            id="contact2"
            name="contact2"
            type="tel"
            value={institutionData.contact2}
            placeholder="Contact 2 (Optional)"
            onChange={handleInputChange}
          />
          <FormInput
            id="emailDomain"
            name="emailDomain"
            type="text"
            value={institutionData.emailDomain}
            placeholder="Email Domain"
            error={errors.emailDomain}
            onChange={handleInputChange}
          />
        </div>
        <ActionButtons
          onCancel={handleBack}
          onSubmit={handleSubmit}
          submitText="Save Institution & Next"
          cancelText="Back"
        />
      </form>
    </div>
  );
};

export default AddInstitutionForm;
