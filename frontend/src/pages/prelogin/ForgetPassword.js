import React, { useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import ToastNotification, {
  showToast,
} from "../../components/Shared/ToastNotification/ToastNotification";
import "./ForgetPassword.css";

const ForgetPassword = ({ handlePasswordReset }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false); // Tracks if OTP is sent
  const [isOtpVerified, setIsOtpVerified] = useState(false); // Tracks if OTP is verified

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
    handlePasswordReset(email, newPassword, otp); // Include OTP in the reset
  };

  const handleOtpSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        showToast("success", data.message);
        setIsOtpSent(true); // OTP sent successfully
      } else {
        showToast("error", data.message);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      showToast("Something went wrong. Please try again later.", "error");
    }
  };

  const handleOtpVerification = () => {
    setIsOtpVerified(true); // OTP verified successfully
    showToast("success", "OTP successfully verified.");
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
        <h1 className="sign-in-h1">Reset Your Password.</h1>

        <div className="forget-password-container">
          {!isOtpSent && (
            <>
              <input
                type="email"
                placeholder="Enter Your Email"
                className="forget-password-input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="sign-in-button" onClick={handleOtpSubmit}>
                Send OTP
              </button>
            </>
          )}

          {isOtpSent && !isOtpVerified && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                className="forget-password-input-field"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                className="sign-in-button"
                onClick={handleOtpVerification}
              >
                Verify OTP
              </button>
            </>
          )}

          {isOtpVerified && (
            <>
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
                  <FontAwesomeIcon
                    icon={showNewPassword ? faEye : faEyeSlash}
                  />
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

              <button className="sign-in-button" onClick={handleSubmit}>
                Submit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ForgetPassword);
