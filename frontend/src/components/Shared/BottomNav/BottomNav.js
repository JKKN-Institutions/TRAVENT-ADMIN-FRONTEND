import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHome, faDollarSign, faQrcode, faUser } from '@fortawesome/free-solid-svg-icons';

const BottomNav = ({ activeComponent, setActiveComponent }) => {
  return (
    <nav className="bottom-nav">
      <div
        className={`nav-item ${activeComponent === "Home" ? "active" : ""}`}
        onClick={() => setActiveComponent("Home")}
      >
        <img
          src={
            activeComponent === "Home"
              ? "./uploads/home-active.png"
              : "./uploads/home.png"
          }
          alt="Home"
        />
        <p>Home</p>
      </div>
      <div
        className={`nav-item ${activeComponent === "Pay" ? "active" : ""}`}
        onClick={() => setActiveComponent("Pay")}
      >
        <img
          src={
            activeComponent === "Pay"
              ? "./uploads/pay-active.png"
              : "./uploads/pay.png"
          }
          alt="Pay"
        />
        <p>Pay</p>
      </div>
      <div
        className={`nav-item ${activeComponent === "Scan" ? "active" : ""}`}
        onClick={() => setActiveComponent("Scan")}
      >
        <img
          src={
            activeComponent === "Scan"
              ? "./uploads/scan-active.png"
              : "./uploads/scan.png"
          }
          alt="Scan"
        />
        <p>Scan</p>
      </div>
      <div
        className={`nav-item ${activeComponent === "Profile" ? "active" : ""}`}
        onClick={() => setActiveComponent("Profile")}
      >
        <img
          src={
            activeComponent === "Profile"
              ? "./uploads/profile-active.png"
              : "./uploads/profile.png"
          }
          alt="Profile"
        />
        <p>Profile</p>
      </div>
    </nav>
  );
};

export default BottomNav;
