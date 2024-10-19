import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faUser,
  faEdit,
  faExchangeAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./DriverDetails.css";

const DriverDetails = ({ driver, onBack, onEdit, onToggleCategory }) => {
  console.log(driver);

  // Sample route history data
  const routeHistory = [
    {
      sNo: 1,
      routeNo: "15",
      stopName: "Seelanayakkampatti Bypass",
      duration: "12 months",
    },
    { sNo: 2, routeNo: "1", stopName: "Erode", duration: "2 months" },
    { sNo: 3, routeNo: "4", stopName: "Pallipalayam", duration: "6 months" },
    { sNo: 4, routeNo: "12", stopName: "Sangariri", duration: "6 months" },
  ];

  const isMainOrSpare =
    driver.category === "main" || driver.category === "spare";

  // Define the label and logic for the category toggle button
  const toggleCategoryLabel =
    driver.category === "main" ? "Set as Spare Driver" : "Set as Main Driver";

  return (
    <div className="driver-details-container">
      <header className="driver-details-top-bar">
        <button className="driver-details-back-button" onClick={onBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h1>Profile</h1>
      </header>

      <main className="driver-details-main-content">
        <div className="driver-details-header">
          <div className="driver-details-avatar">
            <FontAwesomeIcon
              icon={faUser}
              className="driver-details-avatar-icon"
            />
          </div>
          <h2 className="driver-details-name">{driver.name}</h2>
          <div className="driver-details-actions">
            {isMainOrSpare && (
              <button
                className="driver-details-toggle-category-button"
                onClick={() => onToggleCategory(driver)}
              >
                <FontAwesomeIcon icon={faExchangeAlt} />
                {toggleCategoryLabel}
              </button>
            )}
            <button className="driver-details-edit-button" onClick={onEdit}>
              <FontAwesomeIcon icon={faEdit} /> Edit
            </button>
          </div>
        </div>

        <div className="driver-details-info">
          <h3 className="driver-details-section-title">Driver Details</h3>
          <div className="driver-details-table-container">
            <div className="driver-details-table-wrapper">
              <table className="driver-details-table">
                <tbody>
                  <tr>
                    <th>Assigned Route</th>
                    <td>{driver.routeAssigned || "1"}</td>
                  </tr>
                  <tr>
                    <th>Route Name</th>
                    <td>{driver.routeName || "Thiruvagowndanoor Bypass"}</td>
                  </tr>
                  <tr>
                    <th>Driver Category</th>
                    <td>{driver.category || "Spare Driver"}</td>
                  </tr>
                  <tr>
                    <th>License Number</th>
                    <td>{driver.licenseNumber || "9876543210"}</td>
                  </tr>
                  <tr>
                    <th>Aadhar Number</th>
                    <td>{driver.aadharNumber || "9876 5432 1012"}</td>
                  </tr>
                  <tr>
                    <th>Experience</th>
                    <td>{driver.experience || "10 Years"}</td>
                  </tr>
                  <tr>
                    <th>Referral Employee</th>
                    <td>{driver.referralEmployee || "Murugan S"}</td>
                  </tr>
                  <tr>
                    <th>Attendance</th>
                    <td>{driver.attendance || "78/109"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="driver-details-route-history">
          <h3 className="driver-details-section-title">Route History</h3>
          <div className="driver-details-table-container">
            <div className="driver-details-table-wrapper">
              <table className="driver-details-table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Route No</th>
                    <th>Stop Name</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {routeHistory.map((route) => (
                    <tr key={route.sNo}>
                      <td>{route.sNo}</td>
                      <td>{route.routeNo}</td>
                      <td>{route.stopName}</td>
                      <td>{route.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DriverDetails;
