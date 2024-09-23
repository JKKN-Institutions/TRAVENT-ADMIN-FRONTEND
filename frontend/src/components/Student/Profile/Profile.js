import React, { useState } from 'react';
import './Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faComments, faSignOutAlt, faArrowLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import YourProfile from './YourProfile/YourProfile';
import BottomNav from "../../Shared/BottomNav/BottomNav";  // Import the new BottomNav component


const Profile = ({ setShowYourProfile, goDashboard, activeComponent, setActiveComponent }) => {
  const [showYourProfileComponent, setShowYourProfileComponent] = useState(false);

  if (showYourProfileComponent) {
    return <YourProfile goBack={() => setShowYourProfileComponent(false)} />;
  }

  return (
    <div className="profile-page">
      <header className="profile-header">
        <FontAwesomeIcon icon={faArrowLeft} className="back-icon" onClick={goDashboard} />
        <h1>Profile</h1>
      </header>
      <div className="profile-info">
        <div className="profile-pic">
          <FontAwesomeIcon icon={faUser} className="user-icon" />
        </div>
        <h2 className="profile-name">Student Name</h2>
      </div>
      <div className="profile-options">
        <div className="profile-option" onClick={() => setShowYourProfile(true)}>
          <img src='./uploads/your-profile.png' />
          <span>Your profile</span>
          <FontAwesomeIcon icon={faChevronRight} className="right-arrow" />
        </div>
        <div className="profile-option">
        <img src='./uploads/feedback.png' />
          <span>Feedback</span>
          <FontAwesomeIcon icon={faChevronRight} className="right-arrow" />
        </div>
        <div className="profile-option">
        <img src='./uploads/logout.png' />
          <span>Logout</span>
          <FontAwesomeIcon icon={faChevronRight} className="right-arrow" />
        </div>
      </div>
      <BottomNav activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
    </div>
  );
};

export default Profile;
