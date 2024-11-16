// ConfirmationModal.js
import React from "react";
import "./ConfirmationModal.css";

const ConfirmationModal = ({
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="confirmation-modal-overlay">
      <div className="confirmation-modal">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="confirmation-modal-buttons">
          <button className="confirmation-cancel-button" onClick={onCancel}>
            {cancelText}
          </button>
          <button className="confirmation-confirm-button" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
