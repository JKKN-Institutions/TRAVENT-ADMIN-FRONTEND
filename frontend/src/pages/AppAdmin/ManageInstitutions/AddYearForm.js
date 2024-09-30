import React, { useState, useEffect } from "react";
import "./AddYearForm.css";

const AddYearForm = ({ onBack, onSave, initialData, departmentData }) => {
  const [yearData, setYearData] = useState(
    initialData || { yearCount: "", years: [] } // Default to empty
  );
  const yearOptions = [1, 2, 3, 4];

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!initialData) {
      setYearData({ yearCount: "", years: [] }); // Reset if no initial data
    }
  }, [initialData]);

  const validateForm = () => {
    let formErrors = {};
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
      const years = Array.from({ length: count }, (_, index) => index + 1); // Generate array of years
      setYearData({ yearCount: count, years }); // Update the yearData with the count and years array
    } else {
      setYearData({ yearCount: "", years: [] }); // Reset if no valid selection
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      onSave(yearData); // Pass the yearData object to the parent component
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
              <div className="year-form-group full-width">
                <label htmlFor="yearCount">Select Number of Years:</label>
                <select
                  id="yearCount"
                  value={yearData.yearCount} // Bind to yearData.yearCount
                  onChange={handleYearCountChange}
                  className="form-select"
                >
                  <option value="">Select Year</option> {/* Default option */}
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year} Year{year > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
                {errors.yearCount && (
                  <p className="error">{errors.yearCount}</p>
                )}
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
