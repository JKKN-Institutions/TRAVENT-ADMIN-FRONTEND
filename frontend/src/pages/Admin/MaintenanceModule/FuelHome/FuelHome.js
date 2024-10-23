import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEye } from "@fortawesome/free-solid-svg-icons";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import "./FuelHome.css";

const FuelHome = ({
  selectedDate,
  handleDateChange,
  setShowAddFuelRecord,
  setShowViewFuelRecords,
}) => {
  const fuelPurchaseData = [
    { week: "Week 1", purchase: 0.8 },
    { week: "Week 2", purchase: 1.2 },
    { week: "Week 3", purchase: 2.3 },
    { week: "Week 4", purchase: 1.8 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} : ${payload[0].value} L`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className="fuel-home-row">
        <div className="fuel-home-column">
          <div className="fuel-home-chart-card fuel-consumption-chart">
            <div className="fuel-home-chart-header">
              <h2>Fuel Purchase Records</h2>
              <div className="fuel-home-chart-controls">
                <input
                  type="month"
                  value={format(selectedDate, "yyyy-MM")}
                  onChange={handleDateChange}
                  className="month-picker"
                />
              </div>
            </div>
            <ResponsiveContainer width="100%" height={275}>
              <LineChart data={fuelPurchaseData}>
                <XAxis dataKey="week" />
                <YAxis domain={[0, 2.5]} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="purchase"
                  stroke="#11a8fd"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="fuel-home-column">
          <div
            className="fuel-home-action-card"
            onClick={() => setShowAddFuelRecord(true)}
          >
            <FontAwesomeIcon icon={faPlus} className="action-icon" />
            <h3>Add Fuel Record</h3>
            <p>Add the bill received from the fuel station.</p>
          </div>
          <div
            className="fuel-home-action-card"
            onClick={() => setShowViewFuelRecords(true)}
          >
            <FontAwesomeIcon icon={faEye} className="action-icon" />
            <h3>View Fuel Records</h3>
            <p>View all the fuel purchase records.</p>
          </div>
        </div>
      </div>
      <div className="fuel-home-row">
        <div className="fuel-home-info-card">
          <h2>680 ltr</h2>
          <p>Fuel Purchase Jul 24</p>
        </div>
        <div className="fuel-home-info-card">
          <h2>75,000 ₹</h2>
          <p>Billed Amount Jul 24</p>
        </div>
      </div>
    </>
  );
};

export default FuelHome;
