import React, { useState } from 'react';
import './FormStyles.css'

const AddInstitutionForm = ({ onSave }) => {
  const [institutionData, setInstitutionData] = useState({
    institutionName: '',
    state: '',
    founderName: '',
    founderEmail: '',
    founderContactNumber: '',
    address: '',
    contact1: '',
    contact2: '',
    emailDomain: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};
    if (!institutionData.institutionName) formErrors.institutionName = 'Institution Name is required';
    if (!institutionData.state) formErrors.state = 'State is required';
    if (!institutionData.founderName) formErrors.founderName = 'Founder Name is required';
    if (!institutionData.founderEmail) formErrors.founderEmail = 'Founder Email is required';
    if (!institutionData.founderContactNumber) formErrors.founderContactNumber = 'Founder Contact Number is required';
    if (!institutionData.address) formErrors.address = 'Address is required';
    if (!institutionData.contact1) formErrors.contact1 = 'Contact 1 is required';
    if (!institutionData.emailDomain) formErrors.emailDomain = 'Email Domain is required';
    return formErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInstitutionData({ ...institutionData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      onSave(institutionData);
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Institution</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="institutionName"
          placeholder="Institution Name"
          onChange={handleInputChange}
          className={errors.institutionName ? 'input-error' : ''}
        />
        {errors.institutionName && <p className="error">{errors.institutionName}</p>}
        <input
          name="state"
          placeholder="State"
          onChange={handleInputChange}
          className={errors.state ? 'input-error' : ''}
        />
        {errors.state && <p className="error">{errors.state}</p>}
        <input
          name="founderName"
          placeholder="Founder Name"
          onChange={handleInputChange}
          className={errors.founderName ? 'input-error' : ''}
        />
        {errors.founderName && <p className="error">{errors.founderName}</p>}
        <input
          name="founderEmail"
          placeholder="Founder Email"
          onChange={handleInputChange}
          className={errors.founderEmail ? 'input-error' : ''}
        />
        {errors.founderEmail && <p className="error">{errors.founderEmail}</p>}
        <input
          name="founderContactNumber"
          placeholder="Founder Contact Number"
          onChange={handleInputChange}
          className={errors.founderContactNumber ? 'input-error' : ''}
        />
        {errors.founderContactNumber && <p className="error">{errors.founderContactNumber}</p>}
        <input
          name="address"
          placeholder="Address"
          onChange={handleInputChange}
          className={errors.address ? 'input-error' : ''}
        />
        {errors.address && <p className="error">{errors.address}</p>}
        <input
          name="contact1"
          placeholder="Contact 1"
          onChange={handleInputChange}
          className={errors.contact1 ? 'input-error' : ''}
        />
        {errors.contact1 && <p className="error">{errors.contact1}</p>}
        <input
          name="contact2"
          placeholder="Contact 2"
          onChange={handleInputChange}
        />
        <input
          name="emailDomain"
          placeholder="Email Domain"
          onChange={handleInputChange}
          className={errors.emailDomain ? 'input-error' : ''}
        />
        {errors.emailDomain && <p className="error">{errors.emailDomain}</p>}
        <button type="submit" className="form-button">Save Institution</button>
      </form>
    </div>
  );
};

export default AddInstitutionForm;
