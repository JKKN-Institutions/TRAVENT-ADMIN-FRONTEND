// Loading.js
import React from "react";
import "./Loading.css";

const Loading = React.memo(({ message }) => {
  return (
    <div className="menu-loading-container">
      <div className="menu-loading-spinner"></div>
      <p>{message}</p>
    </div>
  );
});

export default Loading;
