// ActionButtons.js
import React from "react";
import "./ActionButtons.css";

const ActionButtons = ({
  onCancel,
  onSubmit,
  submitText,
  cancelText = "Cancel",
}) => (
  <div className="buttons-container">
    <button type="button" className="cancel-button" onClick={onCancel}>
      {cancelText}
    </button>
    <button type="submit" className="save-button" onClick={onSubmit}>
      {submitText}
    </button>
  </div>
);

export default ActionButtons;
