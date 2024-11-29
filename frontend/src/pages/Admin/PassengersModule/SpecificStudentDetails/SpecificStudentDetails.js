import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "../../AdminDashboard/SpecificPassengerDetails/SpecificPassengerDetails.css"; // Add styling for this component

const SpecificStudentDetails = ({ user, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // Match animation duration
  };

  if (!user) return null;

  // Define the details based on the user type
  const details =
    user.type === "student"
      ? [
          { label: "Student Name", value: user.basicDetails.name },
          { label: "Gender", value: user.basicDetails.gender },
          { label: "Date of Birth", value: user.basicDetails.dob },
          { label: "Email", value: user.basicDetails.email },
          { label: "Mobile", value: user.basicDetails.mobile },
          { label: "Address", value: user.basicDetails.address },
          {
            label: "Emergency Contact Name",
            value: user.basicDetails.emergencyContact.name,
          },
          {
            label: "Emergency Contact Relationship",
            value: user.basicDetails.emergencyContact.relationship,
          },
          {
            label: "Emergency Contact Phone",
            value: user.basicDetails.emergencyContact.phone,
          },
          { label: "Reg No", value: user.studentDetails.regNo },
          { label: "Roll No", value: user.studentDetails.rollNo },
          { label: "Year", value: user.studentDetails.year },
          { label: "Department", value: user.studentDetails.department },
          { label: "Section", value: user.studentDetails.section },
          { label: "Institute Name", value: user.studentDetails.instituteName },
          { label: "Route No", value: user.locationDetails.routeNo },
          { label: "Stop Name", value: user.locationDetails.stopName },
          { label: "Pending Fee", value: user.pendingFee },
          { label: "Remaining Amulets", value: user.remainingAmulets },
          { label: "Refilled Amulets", value: user.refilledAmulets },
          { label: "Status", value: user.status },
          { label: "Account Status", value: user.accountStatus },
        ]
      : [
          { label: "Staff Name", value: user.basicDetails.name },
          { label: "Gender", value: user.basicDetails.gender },
          { label: "Date of Birth", value: user.basicDetails.dob },
          { label: "Email", value: user.basicDetails.email },
          { label: "Mobile", value: user.basicDetails.mobile },
          { label: "Address", value: user.basicDetails.address },
          {
            label: "Emergency Contact Name",
            value: user.basicDetails.emergencyContact.name,
          },
          {
            label: "Emergency Contact Relationship",
            value: user.basicDetails.emergencyContact.relationship,
          },
          {
            label: "Emergency Contact Phone",
            value: user.basicDetails.emergencyContact.phone,
          },
          { label: "Staff ID", value: user.staffDetails.staffId },
          { label: "Department", value: user.staffDetails.department },
          { label: "Designation", value: user.staffDetails.designation },
          { label: "Institute Name", value: user.staffDetails.instituteName },
          { label: "Route No", value: user.locationDetails.routeNo },
          { label: "Stop Name", value: user.locationDetails.stopName },
          { label: "Pending Fee", value: user.pendingFee },
          { label: "Remaining Amulets", value: user.remainingAmulets },
          { label: "Refilled Amulets", value: user.refilledAmulets },
          { label: "Status", value: user.status },
          { label: "Account Status", value: user.accountStatus },
        ];

  return (
    <div className="specific-user-details-overlay">
      <div
        className={`specific-user-details-container ${
          isClosing ? "closing" : ""
        }`}
      >
        <FontAwesomeIcon
          icon={faXmark}
          className="specific-user-details-close"
          onClick={handleClose}
        />
        <div className="specific-user-details-content">
          {details.map((detail, index) => (
            <div key={index} className="specific-user-details-row">
              <div className="specific-user-details-label">{detail.label}</div>
              <div className="specific-user-details-value">
                {detail.value || "No data"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecificStudentDetails;
