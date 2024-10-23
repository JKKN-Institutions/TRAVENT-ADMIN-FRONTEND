import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./SpecificStockDetails.css";

const SpecificStockDetails = ({ stock, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // Match animation duration
  };

  if (!stock) return null;

  const details = [
    { label: "Inventory ID", value: stock.id },
    { label: "Item Name", value: stock.itemName },
    { label: "Item Category", value: "Mechanical" },
    { label: "Item Type", value: "Liquid" },
    { label: "Quantity in Stock", value: stock.quantityInStock },
    { label: "Reorder Level", value: stock.reorderLevel },
    { label: "Unit of Measure", value: "Litre" },
    { label: "Storage Location", value: "Warehouse" },
    { label: "Total Cost", value: "1250.00" },
    { label: "Supplier Name", value: "Kathirvelan J" },
    { label: "Supplier Contact", value: "9876543210" },
    { label: "Purchase Order No", value: "PO-12345" },
    { label: "Purchase Date", value: "01-07-2024" },
  ];

  return (
    <div className="specific-stock-details-overlay">
      <div
        className={`specific-stock-details-container ${
          isClosing ? "closing" : ""
        }`}
      >
        <FontAwesomeIcon
          icon={faXmark}
          className="specific-stock-details-close"
          onClick={handleClose}
        />
        <div className="specific-stock-details-content">
          {details.map((detail, index) => (
            <div key={index} className="specific-stock-details-row">
              <div className="specific-stock-details-label">{detail.label}</div>
              <div className="specific-stock-details-value">{detail.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecificStockDetails;
