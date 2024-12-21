import React, { useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import ForgetPassword from "../ForgetPassword";
import ToastNotification, {
  showToast,
} from "../../../components/Shared/ToastNotification/ToastNotification";
import "./LoginForm.css";

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  handleLogin,
  handleGoogleSignIn,
}) => {
  const [showForgetPassword, setShowForgetPassword] = useState(false);
  // Memoize the password toggle to prevent unnecessary re-renders
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, [setShowPassword]);

  const resetPassword = async (email, newPassword, otp) => {
    try {
      console.log("Sending request with payload:", { email, newPassword, otp });
      const response = await fetch(
        "http://localhost:3000/api/auth/update-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, newPassword, otp }), // Pass OTP here
        }
      );

      const data = await response.json();

      if (response.ok) {
        showToast("success", data.message);
        setTimeout(() => {
          setShowForgetPassword(false);
        }, 3000);
      } else {
        showToast("error", data.message);
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      showToast("Something went wrong. Please try again later.", "error");
    }
  };

  const handlePasswordReset = (email, newPassword, otp) => {
    resetPassword(email, newPassword, otp); // Ensure OTP is included
  };

  if (showForgetPassword) {
    return <ForgetPassword handlePasswordReset={handlePasswordReset} />;
  }

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
          Dive Into an Adventure.
          <br />
          Experience Authenticity.
        </h1>
        <input
          type="email"
          placeholder="Enter Your Email"
          className="login-input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="**********"
            className="login-input-field password-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={togglePasswordVisibility}
            aria-label="Toggle password visibility"
          >
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
          </button>
        </div>

        <a
          href="#"
          className="forgot-password"
          onClick={(e) => {
            e.preventDefault();
            setShowForgetPassword(true);
          }}
        >
          Forgot Password?
        </a>
        <button className="sign-in-button" onClick={handleLogin}>
          Sign In
        </button>
        <div className="divider">
          <span className="line"></span>
          <span className="or-sign-in">Or sign in with</span>
          <span className="line"></span>
        </div>
        <button className="google-sign-in-button" onClick={handleGoogleSignIn}>
          <img
            src="./uploads/google-icon.png"
            alt="Google Icon"
            className="google-icon"
            loading="lazy"
          />
        </button>
      </div>
    </div>
  );
};

export default React.memo(LoginForm);
