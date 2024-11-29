import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./SpecificPassengerDetails.css";

const SpecificPassengerDetails = ({ user, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // Match animation duration
  };

  if (!user) return null;

  const details = [
    { label: "Name", value: user.basicDetails.name },
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
    ...(user.type === "student"
      ? [
          { label: "Roll No", value: user.studentDetails.rollNo },
          { label: "Reg No", value: user.studentDetails.regNo },
          { label: "Institute Name", value: user.studentDetails.instituteName },
          { label: "Department", value: user.studentDetails.department },
          { label: "Year", value: user.studentDetails.year },
          { label: "Section", value: user.studentDetails.section },
        ]
      : [
          { label: "Staff ID", value: user.staffDetails.staffId },
          { label: "Institute Name", value: user.staffDetails.instituteName },
          { label: "Department", value: user.staffDetails.department },
          { label: "Designation", value: user.staffDetails.designation },
        ]),
    { label: "Stop Name", value: user.locationDetails.stopName },
    { label: "Route No", value: user.locationDetails.routeNo },
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
              <div className="specific-user-details-value">{detail.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecificPassengerDetails;
