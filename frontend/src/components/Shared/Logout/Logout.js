// Logout.js
import React from "react";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";

const Logout = ({ onCancel, onConfirm }) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    localStorage.removeItem("authToken"); // Clear authentication token
    onConfirm(); // Execute onConfirm action
    navigate("/"); // Redirect to login page
  };

  return (
    <ConfirmationModal
      title="Confirm Logout"
      message="Are you sure you want to log out?"
      confirmText="Logout"
      cancelText="Cancel"
      onConfirm={handleConfirm}
      onCancel={onCancel}
    />
  );
};

export default Logout;
