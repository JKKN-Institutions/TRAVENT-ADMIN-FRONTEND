import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Font Awesome import
import "./AboutApp.css";

function AboutApp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);
  const [newCurrentPage, setNewCurrentPage] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [institutionDetails, setInstitutionDetails] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);

    setTimeout(() => {
      setShowSplash(false);
    }, 4000);
  }, []);

  const nextPage = () => {
    setNewCurrentPage((prevPage) => (prevPage < 4 ? prevPage + 1 : 1));
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://travent-admin-server.vercel.app/api/auth/login",
        { email, password }
      );

      if (response.data.token) {
        const { token, institutionDetails } = response.data;
        const decodedToken = jwtDecode(token);

        localStorage.setItem("authToken", token);
        setInstitutionDetails(institutionDetails);

        if (decodedToken.role === "appadmin") {
          navigate("/app-admin", { state: { institutionDetails } });
        } else if (decodedToken.role === "admin") {
          navigate("/admin/dashboard", { state: { institutionDetails } });
        } else if (decodedToken.role === "student") {
          navigate("/student/dashboard", { state: { institutionDetails } });
        } else if (decodedToken.role === "staff") {
          navigate("/staff/dashboard", { state: { institutionDetails } });
        }
      }
    } catch (error) {
      console.error(
        "Error logging in:",
        error.response?.data?.message || error.message
      );
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (showSplash) {
    return (
      <div className={`splash-screen ${loading ? "" : "slide-up"}`}>
        <img
          src="./uploads/splash-image.png"
          alt="Loading..."
          className="splash-image"
        />
        <div className="splash-text">
          <p>Travent</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {newCurrentPage === 1 && (
        <div className="page-container">
          <div className="page-header">
            <img
              src="./uploads/splash-image.png"
              alt="Travent Logo"
              className="logo"
            />
            <div className="splash-text">
              <p>Travent</p>
            </div>
          </div>
          <div className="page-content">
            <img src="./uploads/bus.png" alt="Bus Icon" className="bus-icon" />
            <h1>
              Your Commute
              <br />
              Your Way
              <br />
              Your Schedule
            </h1>
            <p>
              Schedule your arrival and experience an instant attendance and
              ticketing with a quick QR code scan.
            </p>
            <button className="about-next-button" onClick={nextPage}>
              Next
            </button>
          </div>
        </div>
      )}
      {newCurrentPage === 2 && (
        <div className="page-container">
          <div className="page-header">
            <img
              src="./uploads/splash-image.png"
              alt="Travent Logo"
              className="logo"
            />
            <div className="splash-text">
              <p>Travent</p>
            </div>
          </div>
          <div className="page-content">
            <img src="./uploads/bus.png" alt="Bus Icon" className="bus-icon" />
            <h1>
              Navigate Your
              <br />
              Journey Every
              <br />
              Step of the Way
            </h1>
            <p>
              Track your bus live, stay informed, and arrive on time, every
              time.
            </p>
            <button className="about-next-button" onClick={nextPage}>
              Next
            </button>
          </div>
        </div>
      )}
      {newCurrentPage === 3 && (
        <div className="page-container">
          <div className="page-header">
            <img
              src="./uploads/splash-image.png"
              alt="Travent Logo"
              className="logo"
            />
            <div className="splash-text">
              <p>Travent</p>
            </div>
          </div>
          <div className="page-content">
            <img src="./uploads/bus.png" alt="Bus Icon" className="bus-icon" />
            <h1>
              Stay on Track
              <br />
              with Effortless
              <br />
              Payments
            </h1>
            <p>
              Simplify payments and stay on top of due dates with personalized
              notifications.
            </p>
            <button className="about-next-button" onClick={nextPage}>
              Next
            </button>
          </div>
        </div>
      )}
      {newCurrentPage === 4 && (
        <div className="page-container">
          <div className="page-header">
            <img
              src="./uploads/splash-image.png"
              alt="Key Icon"
              className="key-icon"
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
              <span
                className="toggle-password"
                onClick={togglePasswordVisibility}
              >
                <i
                  className={`fa ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
                ></i>
              </span>
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
              />
            </button>
            {/* <p className="new-user">
              New user? <a href="/new-user-form">Click here</a>
            </p> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default AboutApp;
