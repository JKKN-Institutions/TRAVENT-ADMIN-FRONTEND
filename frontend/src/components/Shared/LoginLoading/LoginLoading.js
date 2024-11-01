// Loading.js
import React from "react";
import "./LoginLoading.css";

const Loading = React.memo(() => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading Admin Home...</p>
    </div>
  );
});

export default Loading;
