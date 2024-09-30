import React from "react";
import { useNavigate } from "react-router-dom";
import "./Logout.css";

const Logout = ({ onCancel, onConfirm }) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    // Clear authentication token
    localStorage.removeItem("authToken");
    // Call the onConfirm prop
    onConfirm();
    // Redirect to login page
    navigate("/");
  };

  return (
    <div className="logout-overlay">
      <div className="logout-modal">
        <h2>Confirm Logout</h2>
        <p>Are you sure you want to log out?</p>
        <div className="logout-buttons">
          <button className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button className="confirm-button" onClick={handleConfirm}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
