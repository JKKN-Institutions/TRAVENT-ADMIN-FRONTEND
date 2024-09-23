import React, { useState } from 'react';
import './FormStyles.css'; // Separate file for shared form styling

const AddYearForm = ({ onSave }) => {
  const [yearCount, setYearCount] = useState(1); // Default selection is 1 year

  const yearOptions = [1, 2, 3, 4]; // Maximum of 4 years

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(yearCount);
  };

  return (
    <div className="form-container">
      <h2>Select Number of Years</h2>
      <form onSubmit={handleSubmit}>
        <label>Select Number of Years:</label>
        <select
          value={yearCount}
          onChange={(e) => setYearCount(parseInt(e.target.value))}
          className="form-select"
        >
          {yearOptions.map((year) => (
            <option key={year} value={year}>
              {year} Year{year > 1 ? 's' : ''}
            </option>
          ))}
        </select>
        <button type="submit" className="form-button">Save Years</button>
      </form>
    </div>
  );
};

export default AddYearForm;
