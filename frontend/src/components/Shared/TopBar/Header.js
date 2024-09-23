import React from "react";
import "./Header.css";

const Header = ({ toggleMenu, isSubMenuOpen }) => {
  return (
    <header className="ERPHome-header container">
      <div className="erp-title">JKKN Group of Institutions</div>
      <div className="wrap-side-erp">
        <a href="" className="header-links">
          <i className="bx bxs-bell"></i>
        </a>
        <a className="header-links pro-link">
          <div className="dropdown">
            <div className="profile-hero">
              <i className="bx bx-user-circle" onClick={toggleMenu}></i>
              <div
                className={`profile-sub-menu-wrap ${
                  isSubMenuOpen ? "open-profile-menu" : ""
                }`}
                id="profileSubMenu"
              >
                <div className="profile-sub-menu">
                  <div className="user-profile-info">
                    <i className="bx bx-user-circle"></i>
                    <h2>Staff Name</h2>
                  </div>
                  <hr />
                  <a href="#" className="profile-sub-menu-link">
                    <i className="bx bx-log-out"></i>
                    <p>Logout</p>
                    <span>{">"}</span>
                  </a>
                  <p>Last Login: May 20 2024 12:10 PM</p>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </header>
  );
};

export default Header;
