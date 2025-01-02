import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faUser,
  faEdit,
  faExchangeAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./DriverDetails.css";
import TopBar from "../../../../components/Shared/TopBar/TopBar";

const DriverDetails = ({ driver, onBack, onEdit, onToggleCategory }) => {
  // Sample route history data
  const routeHistory = [
    {
      sNo: 1,
      routeNo: "15",
      routeName: "Seelanayakkampatti Bypass",
      duration: "12 months",
    },
    { sNo: 2, routeNo: "1", routeName: "Erode", duration: "2 months" },
    { sNo: 3, routeNo: "4", routeName: "Pallipalayam", duration: "6 months" },
    { sNo: 4, routeNo: "12", routeName: "Sangariri", duration: "6 months" },
  ];

  // Define category toggle label dynamically
  const toggleCategoryLabel =
    driver.category === "main" ? "Set as Spare Driver" : "Set as Main Driver";

  // Utility function to render table rows
  const renderTableRows = (data) => {
    return Object.entries(data).map(([key, value]) => (
      <tr key={key}>
        <th>{key.replace(/([A-Z])/g, " $1").toUpperCase()}</th>
        <td>{value || "N/A"}</td>
      </tr>
    ));
  };

  return (
    <div className="driver-details-container">
      <TopBar title="Profile" onBack={onBack} backButton={true} />
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
            {(driver.category === "main" || driver.category === "spare") && (
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
                  {renderTableRows({
                    "Assigned Route": driver.routeAssigned,
                    "Route Name": driver.routeName,
                    "Driver Category": driver.category,
                    "License Number": driver.licenseNumber,
                    "Aadhar Number": driver.aadharNumber,
                    "Experience In Years": driver.experienceInYears,

                    "Attendance In Days": driver.attendanceDays,
                  })}
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
                    <th>Route Name</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {routeHistory.map((route) => (
                    <tr key={route.sNo}>
                      <td>{route.sNo}</td>
                      <td>{route.routeNo}</td>
                      <td>{route.routeName}</td>
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
