import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

const Button = ({ label, onClick, disabled }) => {
  return (
    <button
      className={`custom-button ${disabled ? "disabled-button" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool, // Add the disabled prop type
};

export default Button;
