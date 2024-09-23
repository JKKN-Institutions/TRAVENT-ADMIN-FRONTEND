import React, { useState } from 'react';
import './FormStyles.css'; // Separate file for shared form styling

const AddSectionForm = ({ year, onSave }) => {
  const [sectionList, setSectionList] = useState(['A']); // Default to section A
  const sectionOptions = ['A', 'B', 'C', 'D', 'E', 'F']; // Sections from A to F

  const handleSectionChange = (index, value) => {
    const updatedList = [...sectionList];
    updatedList[index] = value;
    setSectionList(updatedList);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(sectionList);
  };

  return (
    <div className="form-container">
      <h2>Select Sections for Year {year}</h2>
      <form onSubmit={handleSubmit}>
        <label>Number of Sections:</label>
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
        <button type="submit" className="form-button">Save Sections for Year {year}</button>
      </form>
    </div>
  );
};

export default AddSectionForm;
