import React, { useState, useEffect } from "react";
import "./AddYearForm.css";

const AddYearForm = ({ onBack, onSave, initialData, departmentData }) => {
  const [yearCount, setYearCount] = useState(initialData || 1);
  const yearOptions = [1, 2, 3, 4];

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!initialData) {
      setYearCount(1);
    }
  }, [initialData]);

  const validateForm = () => {
    let formErrors = {};
    if (yearCount < 1 || yearCount > 4) {
      formErrors.yearCount = "Year count must be between 1 and 4";
    }
    return formErrors;
  };

  const handleYearCountChange = (e) => {
    const count = parseInt(e.target.value);
    const years = Array.from({ length: count }, (_, index) => index + 1);
    setYearCount({ yearCount: count, years });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      onSave(yearCount);
    }
  };

  const handleBackClick = () => {
    setYearCount(initialData);
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
          <form>
            <div className="year-form-grid">
              <div className="year-form-group full-width">
                <label htmlFor="yearCount">Select Number of Years:</label>
                <select
                  id="yearCount"
                  value={yearCount}
                  onChange={(e) => setYearCount(parseInt(e.target.value))}
                  className="form-select"
                >
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year} Year{year > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="year-buttons-container">
        <button
          type="button"
          className="year-submit-button"
          onClick={handleBackClick}
        >
          Previous
        </button>
        <button
          type="submit"
          className="year-submit-button"
          onClick={handleSubmit}
        >
          Save Years & Next
        </button>
      </div>
    </div>
  );
};

export default AddYearForm;
