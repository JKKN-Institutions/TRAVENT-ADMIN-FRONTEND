import React, { useState } from 'react';
import './FormStyles.css'; // Separate file for shared form styling

const AddInstituteForm = ({ onSave }) => {
  const [instituteData, setInstituteData] = useState({
    instituteCode: '',
    instituteName: '',
    state: '',
    address: '',
    principalName: '',
    principalEmail: '',
    principalContactNumber: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};
    if (!instituteData.instituteCode) formErrors.instituteCode = 'Institute Code is required';
    if (!instituteData.instituteName) formErrors.instituteName = 'Institute Name is required';
    if (!instituteData.state) formErrors.state = 'State is required';
    if (!instituteData.address) formErrors.address = 'Address is required';
    if (!instituteData.principalName) formErrors.principalName = 'Principal Name is required';
    if (!instituteData.principalEmail) formErrors.principalEmail = 'Principal Email is required';
    if (!instituteData.principalContactNumber) formErrors.principalContactNumber = 'Principal Contact Number is required';
    return formErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInstituteData({ ...instituteData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      onSave(instituteData);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Institute</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="instituteCode"
          placeholder="Institute Code"
          onChange={handleInputChange}
          className={errors.instituteCode ? 'input-error' : ''}
        />
        {errors.instituteCode && <p className="error">{errors.instituteCode}</p>}
        <input
          name="instituteName"
          placeholder="Institute Name"
          onChange={handleInputChange}
          className={errors.instituteName ? 'input-error' : ''}
        />
        {errors.instituteName && <p className="error">{errors.instituteName}</p>}
        <input
          name="state"
          placeholder="State"
          onChange={handleInputChange}
          className={errors.state ? 'input-error' : ''}
        />
        {errors.state && <p className="error">{errors.state}</p>}
        <input
          name="address"
          placeholder="Address"
          onChange={handleInputChange}
          className={errors.address ? 'input-error' : ''}
        />
        {errors.address && <p className="error">{errors.address}</p>}
        <input
          name="principalName"
          placeholder="Principal Name"
          onChange={handleInputChange}
          className={errors.principalName ? 'input-error' : ''}
        />
        {errors.principalName && <p className="error">{errors.principalName}</p>}
        <input
          name="principalEmail"
          placeholder="Principal Email"
          onChange={handleInputChange}
          className={errors.principalEmail ? 'input-error' : ''}
        />
        {errors.principalEmail && <p className="error">{errors.principalEmail}</p>}
        <input
          name="principalContactNumber"
          placeholder="Principal Contact Number"
          onChange={handleInputChange}
          className={errors.principalContactNumber ? 'input-error' : ''}
        />
        {errors.principalContactNumber && <p className="error">{errors.principalContactNumber}</p>}
        <button type="submit" className="form-button">Save Institute</button>
      </form>
    </div>
  );
};

export default AddInstituteForm;
