// AdminHome.js
import React, { useState } from "react";
import "./AdminHome.css";
import { useLocation } from "react-router-dom";
import NewUserRequest from "../AdminDashboard/NewUserRequest/NewUserRequest";

const AdminHome = () => {
  const [showNewUserRequests, setShowNewUserRequests] = useState(false);
  const location = useLocation();
  console.log(location.state);
  const institutionDetails = location.state?.institutionDetails;
  localStorage.setItem("institutionDetails", JSON.stringify(institutionDetails));

  const handleBack = () => {
    setShowNewUserRequests(false);
  };

  console.log("institution details1112  :", institutionDetails)

  return (
    <div className="admin-home-container">
      <div className="content">
        {!showNewUserRequests ? (
          <div>
            <h3>Real Time Data</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span>On Route</span>
                <h3>36</h3>
              </div>
              <div className="stat-item">
                <span>Available</span>
                <h3>4</h3>
              </div>
              <div className="stat-item">
                <span>Out of Service</span>
                <h3>4</h3>
              </div>
              <div className="stat-item">
                <span>Boarded</span>
                <div className="circle-container">
                  <div className="progress-circle">
                    <div className="circle">
                      <div className="mask full">
                        <div className="fill"></div>
                      </div>
                      <div className="mask half">
                        <div className="fill"></div>
                      </div>
                    </div>
                  </div>
                  <span className="percentage">65%</span>
                </div>
                <h3>1326 of 2024</h3>
              </div>
              <div className="stat-item">
                <span>Deviation In Route</span>
                <h3>4</h3>
              </div>
              <div className="stat-item">
                <span>Being Late</span>
                <h3>18</h3>
              </div>
              <div className="stat-item">
                <span>Traffic Jam</span>
                <h3>14</h3>
              </div>
              <div className="stat-item">
                <span>Accidents</span>
                <h3>0</h3>
              </div>
            </div>
            <div className="warnings">
              <h3>Warnings</h3>
              <div className="warning-item">
                <img
                  src="../uploads/splash-image.png"
                  alt="User"
                  className="warning-user-pic"
                />
                <div className="warning-item-content">
                  <h4>Kumar S, Route 19</h4>
                  <p>
                    Over Speeding in the Salem Highways. Speed was 70 kmph, he
                    went 80 kmph
                  </p>
                </div>
              </div>
              <div className="warning-item">
                <img
                  src="../uploads/splash-image.png"
                  alt="User"
                  className="warning-user-pic"
                />
                <div className="warning-item-content">
                  <h4>Velan K, Route 03</h4>
                  <p>
                    Staying in the Colony Hospital stop more than the allocated
                    time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <NewUserRequest onBack={handleBack} />
        )}
      </div>
    </div>
  );
};

export default AdminHome;
