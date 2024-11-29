import React, { useState, useEffect } from "react";
import "./AddDepartmentForm.css";
import FormInput from "../../../components/Shared/FormInput/FormInput";
import ActionButtons from "../../../components/Shared/ActionButtons/ActionButtons";

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

    // Department Code: Required, min length of 3
    if (
      !departmentData.departmentCode ||
      departmentData.departmentCode.length < 3
    )
      formErrors.departmentCode =
        "Department Code is required and should be at least 3 characters";

    // Department Name: Required, min length of 3
    if (
      !departmentData.departmentName ||
      departmentData.departmentName.length < 3
    )
      formErrors.departmentName =
        "Department Name is required and should be at least 3 characters";

    // HOD Name: Required, only letters and spaces
    if (
      !departmentData.hodName ||
      !/^[A-Za-z\s]+$/.test(departmentData.hodName)
    )
      formErrors.hodName =
        "HOD Name is required and should contain only letters and spaces";

    // HOD Email: Required, valid email format
    if (
      !departmentData.hodEmail ||
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(departmentData.hodEmail)
    )
      formErrors.hodEmail = "Valid HOD Email is required";

    // HOD Contact Number: Required, exactly 10 digits
    if (
      !departmentData.hodContactNumber ||
      !/^\d{10}$/.test(departmentData.hodContactNumber)
    )
      formErrors.hodContactNumber =
        "HOD Contact Number is required and should be 10 digits";

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
      console.log("Department Data Submitted:", departmentData);
      onSave(departmentData); // Pass form data back to parent
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
          <form onSubmit={handleSubmit}>
            <div className="department-form-grid">
              <FormInput
                id="departmentCode"
                name="departmentCode"
                type="text"
                placeholder="Department Code"
                value={departmentData.departmentCode}
                onChange={handleInputChange}
                error={errors.departmentCode}
              />
              <FormInput
                id="departmentName"
                name="departmentName"
                type="text"
                placeholder="Department Name"
                value={departmentData.departmentName}
                onChange={handleInputChange}
                error={errors.departmentName}
              />
              <FormInput
                id="hodName"
                name="hodName"
                type="text"
                placeholder="HOD Name"
                value={departmentData.hodName}
                onChange={handleInputChange}
                error={errors.hodName}
              />
              <FormInput
                id="hodEmail"
                name="hodEmail"
                type="email"
                placeholder="HOD Email"
                value={departmentData.hodEmail}
                onChange={handleInputChange}
                error={errors.hodEmail}
              />
              <FormInput
                id="hodContactNumber"
                name="hodContactNumber"
                type="tel"
                placeholder="HOD Contact Number"
                value={departmentData.hodContactNumber}
                onChange={handleInputChange}
                error={errors.hodContactNumber}
              />
            </div>
            <ActionButtons
              onCancel={handleBackClick}
              onSubmit={handleSubmit}
              submitText="Save Department & Next"
              cancelText="Previous"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDepartmentForm;
