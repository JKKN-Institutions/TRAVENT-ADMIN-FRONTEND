import React, { useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import ToastNotification, {
  showToast,
} from "../../components/Shared/ToastNotification/ToastNotification";
import "./ForgetPassword.css";

const ForgetPassword = ({ handlePasswordReset }) => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Memoize the password toggle functions
  const toggleNewPasswordVisibility = useCallback(() => {
    setShowNewPassword((prev) => !prev);
  }, []);

  const toggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword((prev) => !prev);
  }, []);

  const handleSubmit = () => {
    if (newPassword !== confirmPassword) {
      showToast("error", "Passwords do not match. Please try again.");
      return;
    }
    handlePasswordReset(email, newPassword);
  };

  return (
    <div className="page-container">
      <ToastNotification />
      <div className="page-header">
        <img
          src="./uploads/splash-image.png"
          alt="Key Icon"
          className="key-icon"
          loading="lazy"
        />
      </div>
      <div className="page-content">
        <h1 className="sign-in-h1">
          Reset Your Password.
          <br />
          Start Fresh Today.
        </h1>
        <div className="forget-password-container">
          <input
            type="email"
            placeholder="Enter Your Email"
            className="forget-password-input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="password-container">
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="New Password"
              className="forget-password-input-field password-input"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              type="button"
              className="forget-toggle-password"
              onClick={toggleNewPasswordVisibility}
              aria-label="Toggle new password visibility"
            >
              <FontAwesomeIcon icon={showNewPassword ? faEye : faEyeSlash} />
            </button>
          </div>

          <div className="password-container">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="forget-password-input-field password-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              className="forget-toggle-password"
              onClick={toggleConfirmPasswordVisibility}
              aria-label="Toggle confirm password visibility"
            >
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEye : faEyeSlash}
              />
            </button>
          </div>
        </div>
        <button className="sign-in-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default React.memo(ForgetPassword);
