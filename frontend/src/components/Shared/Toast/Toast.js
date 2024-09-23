import React from 'react';

const Toast = ({ showNetworkErrorToast, handleToastClose }) => {
  return (
    showNetworkErrorToast && (
      <div className="toast toast-active">
        <div className="toast-content">
          <i className="bx bx-window-close"></i>
          <div className="toast-message">
            <span className="toast-text toast-text-2">Please check your network!</span>
          </div>
          <div className="toast-close-image" onClick={handleToastClose}>
            <i className="bx bx-window-close"></i>
          </div>
        </div>
        <div className="toast-error-progress toast-active"></div>
      </div>
    )
  );
};

export default Toast;
