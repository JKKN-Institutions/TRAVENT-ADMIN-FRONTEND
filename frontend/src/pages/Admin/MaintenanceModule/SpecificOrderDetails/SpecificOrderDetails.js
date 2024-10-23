import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./SpecificOrderDetails.css";

const SpecificOrderDetails = ({ order, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // Match animation duration
  };

  if (!order) return null;

  const details = [
    { label: "Order ID", value: order.orderId },
    { label: "Inventory ID", value: order.inventoryId },
    { label: "Item Name", value: order.itemName },
    { label: "Quantity Ordered", value: order.quantityOrdered },
    { label: "Supplier Name", value: "Kathirvelan J" },
    { label: "Supplier Contact", value: "9876543210" },
    { label: "Order Date", value: "01-07-2024" },
    { label: "Order Time", value: "10:00 AM" },
    { label: "Delivery Date", value: "05-07-2024" },
    { label: "Delivery Time", value: "10:00 AM" },
  ];

  return (
    <div
      className="specific-order-details-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        className={`specific-order-details-container ${
          isClosing ? "closing" : ""
        }`}
      >
        <FontAwesomeIcon
          icon={faXmark}
          className="specific-order-details-close"
          onClick={handleClose}
        />
        <div className="specific-order-details-content">
          {details.map((detail, index) => (
            <div key={index} className="specific-order-details-row">
              <div className="specific-order-details-label">{detail.label}</div>
              <div className="specific-order-details-value">{detail.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecificOrderDetails;
