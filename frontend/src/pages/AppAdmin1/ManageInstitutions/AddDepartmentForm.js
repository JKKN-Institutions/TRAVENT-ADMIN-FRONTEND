import React, { useState } from 'react';
import './FormStyles.css'; // Separate file for shared form styling

const AddDepartmentForm = ({ onSave }) => {
  const [departmentData, setDepartmentData] = useState({
    departmentName: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};
    if (!departmentData.departmentName) formErrors.departmentName = 'Department Name is required';
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
      onSave(departmentData);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Department</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="departmentName"
          placeholder="Department Name"
          onChange={handleInputChange}
          className={errors.departmentName ? 'input-error' : ''}
        />
        {errors.departmentName && <p className="error">{errors.departmentName}</p>}
        <button type="submit" className="form-button">Save Department</button>
      </form>
    </div>
  );
};

export default AddDepartmentForm;
