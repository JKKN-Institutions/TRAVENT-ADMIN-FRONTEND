import React, { useState, useEffect } from "react";
import "./AddSectionForm.css";

const AddSectionForm = ({ year, onSave, onBack, initialData, yearData }) => {
  const sectionOptions = ["A", "B", "C", "D", "E", "F"]; // Available sections
  const [selectedSection, setSelectedSection] = useState(""); // Default to no selection
  const [errors, setErrors] = useState({}); // Track validation errors

  useEffect(() => {
    // Reset the selected section when the year changes or on initial render
    if (initialData) {
      const savedSection = initialData.find(
        (data) => data.year === year
      )?.sections;
      if (savedSection) {
        setSelectedSection(savedSection[savedSection.length - 1]); // Set the last section from the saved list
      } else {
        setSelectedSection(""); // No saved section for this year
      }
    } else {
      setSelectedSection(""); // Reset to default when switching years
    }
  }, [year, initialData]);

  const validateForm = () => {
    let formErrors = {};
    if (!selectedSection) {
      formErrors.section = "Please select a section."; // Validation error if no section is selected
    }
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors); // Display errors if validation fails
    } else {
      // Generate sections up to the selected one
      const selectedSections = sectionOptions.slice(
        0,
        sectionOptions.indexOf(selectedSection) + 1
      );
      onSave(selectedSections); // Save the selected sections as an array
    }
  };

  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
    setErrors({}); // Clear any previous errors when user changes selection
  };

  const handleBackToPreviousYear = () => {
    if (year > 1) {
      onBack(year - 1); // Call onBack with the previous year
    }
  };

  return (
    <div className="section-form-container">
      <div className="section-form-content">
        <div className="section-left-side">
          <h3>Year Details</h3>
          {yearData && yearData.yearCount ? (
            <ul className="year-details">
              <li>
                <strong>Year Count:</strong> {yearData.yearCount}
              </li>
              <li>
                <strong>Years:</strong> {yearData.years.join(", ")}
              </li>
            </ul>
          ) : (
            <p>No year details available.</p>
          )}
        </div>
        <div className="section-vertical-line"></div>
        <div className="section-right-side">
          <div className="section-form-header">
            <h2>Select Section for Year {year}</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="section-form-grid">
              <div className="section-form-group full-width">
                <label>Select Section:</label>
                <select
                  value={selectedSection}
                  onChange={handleSectionChange}
                  className={`form-select ${
                    errors.section ? "input-error" : ""
                  }`} // Add error class if validation fails
                >
                  <option value="">Select Section</option>{" "}
                  {/* Default option */}
                  {sectionOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.section && (
                  <p className="error-message">{errors.section}</p>
                )}{" "}
                {/* Display error message */}
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="section-button-group">
        {/* Existing "Previous" button */}
        <button type="button" onClick={onBack} className="form-button">
          Previous
        </button>

        {/* "Select Section for Previous Year" button with dynamic label */}
        {year > 1 && (
          <button
            type="button"
            onClick={handleBackToPreviousYear}
            className="form-button"
          >
            Select Section for Year {year - 1}
          </button>
        )}

        {/* Submit button */}
        <button
          type="submit"
          className="form-button primary"
          onClick={handleSubmit}
        >
          Save Section for Year {year}
        </button>
      </div>
    </div>
  );
};

export default AddSectionForm;
