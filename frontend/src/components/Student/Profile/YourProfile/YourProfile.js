import React from 'react';
import './YourProfile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPen, faArrowLeft, faCalendarAlt, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const YourProfile = ({ goBack }) => {
  return (
    <div className="your-profile-page">
      <header className="profile-header">
        <FontAwesomeIcon icon={faArrowLeft} className="back-icon" onClick={goBack} />
        <h1>Profile</h1>
      </header>
      <div className="profile-info">
        <div className="profile-pic">
          <FontAwesomeIcon icon={faUser} className="user-icon" />
          <div className="edit-icon">
            <FontAwesomeIcon icon={faPen} />
          </div>
        </div>
      </div>
      <form className="profile-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Sample Name"/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="example.jicate@jkkn.ac.in"/>
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input type="text" id="phone" placeholder="1234567890"/>
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date Of Birth</label>
          <div className="input-with-icon">
            <input type="text" id="dob" placeholder="02/02/2000"/>
            <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <div className="input-with-icon">
            <input type="text" id="gender" placeholder="Female"/>
            <FontAwesomeIcon icon={faChevronDown} className="dropdown-icon" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input type="text" id="address" placeholder="17, Gandhi Nagar, Salem - 636010"/>
        </div>
        <button type="button" className="update-button">Update Profile</button>
      </form>
    </div>
  );
};

export default YourProfile;
