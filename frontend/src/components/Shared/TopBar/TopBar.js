import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./TopBar.css";

const TopBar = ({
  title,
  toggleSidebar,
  onBack,
  additionalIcons = [],
  backButton,
}) => (
  <header className="top-bar">
    <div className="top-bar-icon">
      {backButton ? (
        <FontAwesomeIcon icon={faArrowLeft} onClick={onBack} />
      ) : (
        <FontAwesomeIcon icon={faBars} onClick={toggleSidebar} />
      )}
    </div>
    <div className="header-title">
      <h1>{title}</h1>
    </div>
    <div className="top-bar-icons">
      {additionalIcons.map(({ icon, onClick }, idx) => (
        <FontAwesomeIcon
          key={idx}
          icon={icon}
          className="top-bar-icon"
          onClick={onClick}
        />
      ))}
    </div>
  </header>
);

export default TopBar;
