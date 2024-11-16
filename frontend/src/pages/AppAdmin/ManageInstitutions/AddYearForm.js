import React, { useState, useEffect } from "react";
import "./AddYearForm.css";
import FormInput from "../../../components/Shared/FormInput/FormInput";
import ActionButtons from "../../../components/Shared/ActionButtons/ActionButtons";

const AddYearForm = ({ onBack, onSave, initialData, departmentData }) => {
  const [yearData, setYearData] = useState(
    initialData || { yearCount: "", years: [] }
  );
  const yearOptions = [1, 2, 3, 4];
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!initialData) {
      setYearData({ yearCount: "", years: [] });
    }
  }, [initialData]);

  const validateForm = () => {
    const formErrors = {};
    if (
      !yearData.yearCount ||
      yearData.yearCount < 1 ||
      yearData.yearCount > 4
    ) {
      formErrors.yearCount = "Please select a valid number of years (1-4)";
    }
    return formErrors;
  };

  const handleYearCountChange = (e) => {
    const count = parseInt(e.target.value);
    if (!isNaN(count)) {
      const years = Array.from({ length: count }, (_, index) => index + 1);
      setYearData({ yearCount: count, years });
    } else {
      setYearData({ yearCount: "", years: [] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      onSave(yearData);
    }
  };

  const handleBackClick = () => {
    setYearData(initialData);
    onBack();
  };

  return (
    <div className="add-year-form-container">
      <div className="year-form-content">
        <div className="year-left-side">
          <h3>Department Details</h3>
          {departmentData && Object.keys(departmentData).length > 0 ? (
            <ul className="department-details">
              <li>
                <strong>Department Code:</strong>{" "}
                {departmentData.departmentCode}
              </li>
              <li>
                <strong>Department Name:</strong>{" "}
                {departmentData.departmentName}
              </li>
              <li>
                <strong>HOD Name:</strong> {departmentData.hodName}
              </li>
              <li>
                <strong>HOD Email:</strong> {departmentData.hodEmail}
              </li>
              <li>
                <strong>HOD Contact:</strong> {departmentData.hodContactNumber}
              </li>
            </ul>
          ) : (
            <p>No department details available.</p>
          )}
        </div>
        <div className="year-vertical-line"></div>
        <div className="year-right-side">
          <div className="year-form-header">
            <h2>Select Number of Years</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="year-form-grid">
              <div className="full-width">
                <FormInput
                  id="yearCount"
                  name="yearCount"
                  type="select"
                  placeholder="Select Number of Years"
                  value={yearData.yearCount}
                  onChange={handleYearCountChange}
                  error={errors.yearCount}
                  options={yearOptions.map((year) => ({
                    value: year,
                    label: `${year} Year${year > 1 ? "s" : ""}`,
                  }))}
                />
              </div>
            </div>
            <ActionButtons
              onCancel={handleBackClick}
              onSubmit={handleSubmit}
              submitText="Save Years & Next"
              cancelText="Previous"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddYearForm;
