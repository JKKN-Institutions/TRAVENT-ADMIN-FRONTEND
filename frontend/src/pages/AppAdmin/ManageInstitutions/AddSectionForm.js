import React, { useState, useEffect } from "react";
import "./AddSectionForm.css";

const AddSectionForm = ({ year, onSave, onBack, initialData, yearData }) => {
  const [sectionList, setSectionList] = useState(["A"]); // Default to section A
  const sectionOptions = ["A", "B", "C", "D", "E", "F"]; // Sections from A to F

  useEffect(() => {
    if (initialData) {
      setSectionList(initialData);
    } else {
      setSectionList(["A"]); // Reset to default when switching years
    }
  }, [year, initialData]);

  const handleSectionChange = (index, value) => {
    const updatedList = [...sectionList];
    updatedList[index] = value;
    setSectionList(updatedList);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(sectionList);
  };

  const addSection = () => {
    if (sectionList.length < sectionOptions.length) {
      setSectionList([...sectionList, sectionOptions[sectionList.length]]);
    }
  };

  const removeSection = () => {
    if (sectionList.length > 1) {
      setSectionList(sectionList.slice(0, -1));
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
          <h2>Select Sections for Year {year}</h2>
          <form onSubmit={handleSubmit}>
            {sectionList.map((section, index) => (
              <div key={index} className="form-group">
                <label>Section {index + 1}:</label>
                <select
                  value={section}
                  onChange={(e) => handleSectionChange(index, e.target.value)}
                  className="form-select"
                >
                  {sectionOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            <div className="section-button-group">
              <button
                type="button"
                onClick={addSection}
                className="form-button secondary"
              >
                Add Section
              </button>
              <button
                type="button"
                onClick={removeSection}
                className="form-button secondary"
              >
                Remove Section
              </button>
            </div>
            <div className="section-button-group">
              <button type="button" onClick={onBack} className="form-button">
                Previous
              </button>
              <button type="submit" className="form-button primary">
                Save Sections for Year {year}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSectionForm;
