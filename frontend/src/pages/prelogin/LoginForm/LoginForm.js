import React, { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./LoginForm.css";

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  handleLogin,
}) => {
  // Memoize the password toggle to prevent unnecessary re-renders
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, [setShowPassword]);

  return (
    <div className="page-container">
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

        <a href="#" className="forgot-password">
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
        <button className="google-sign-in-button">
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
