import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./SpecificUsedSpareDetails.css";

const SpecificUsedSpareDetails = ({ spare, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!spare) return null;

  const details = [
    { label: "Order ID", value: spare.orderId },
    { label: "Inventory ID", value: spare.inventoryId },
    { label: "Item Name", value: spare.itemName },
    { label: "Quantity", value: spare.quantity },
    { label: "Used On", value: spare.usedOn },
    { label: "Vehicle No", value: spare.vehicleNo },
    { label: "Driver Name", value: spare.driverName },
    { label: "Usage Date", value: spare.usageDate },
    { label: "Usage Time", value: spare.usageTime },
  ];

  return (
    <div
      className="specific-used-spare-details-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        className={`specific-used-spare-details-container ${
          isClosing ? "closing" : ""
        }`}
      >
        <FontAwesomeIcon
          icon={faXmark}
          className="specific-used-spare-details-close"
          onClick={handleClose}
        />
        <div className="specific-used-spare-details-content">
          {details.map((detail, index) => (
            <div key={index} className="specific-used-spare-details-row">
              <div className="specific-used-spare-details-label">
                {detail.label}
              </div>
              <div className="specific-used-spare-details-value">
                {detail.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecificUsedSpareDetails;
