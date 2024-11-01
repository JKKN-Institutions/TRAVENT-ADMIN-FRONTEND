import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./SpecificBusCondition.css";

const SpecificBusCondition = ({ bus, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!bus) return null;

  const details = [
    { label: "Route", value: bus.route },
    { label: "Number", value: bus.number },
    { label: "Problem", value: bus.problem || "-" },
    { label: "Problem Start Date", value: bus.problemStartDate || "-" },
    { label: "Solving Start Date", value: bus.solvingStartDate || "-" },
    { label: "Completed Date", value: bus.completedDate || "-" },
    { label: "Status", value: bus.status },
    { label: "Mechanic Shop", value: bus.mechanicShop || "-" },
    {
      label: "Spares Used From Inventory",
      value: bus.sparesUsedFromInventory || "-",
    },
    { label: "Spares Purchased", value: bus.sparesPurchased || "-" },
    { label: "External Spare Amount", value: bus.externalSpareAmount || "-" },
    { label: "External Spare Bill No.", value: bus.externalSpareBillNo || "-" },
    { label: "Mechanic Charge", value: bus.mechanicCharge || "-" },
    { label: "Total Amount", value: bus.totalAmount || "-" },
  ];

  return (
    <div className="specific-bus-condition-overlay">
      <div
        className={`specific-bus-condition-container ${
          isClosing ? "closing" : ""
        }`}
      >
        <FontAwesomeIcon
          icon={faXmark}
          className="specific-bus-condition-close"
          onClick={handleClose}
        />
        <div className="specific-bus-condition-content">
          {details.map((detail, index) => (
            <div key={index} className="specific-bus-condition-row">
              <div className="specific-bus-condition-label">{detail.label}</div>
              <div className="specific-bus-condition-value">{detail.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecificBusCondition;
