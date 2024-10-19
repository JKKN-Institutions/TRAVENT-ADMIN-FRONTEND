import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import "./BusFeeHome.css";

const BusFeeHome = ({ setShowAddBusFee, setShowUpdateBusFee }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const transactionData = [
    { week: "Week 1", transactions: 100 },
    { week: "Week 2", transactions: 300 },
    { week: "Week 3", transactions: 800 },
    { week: "Week 4", transactions: 500 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} : ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  const handleDateChange = (event) => {
    const [year, month] = event.target.value.split("-");
    setSelectedDate(new Date(year, month - 1));
  };

  return (
    <div className="bus-fee-container">
      <div className="bus-fee-row">
        <div className="bus-fee-column">
          <div className="bus-fee-chart-card transactions-chart">
            <div className="chart-header">
              <h2>No. of Transactions</h2>
              <div className="chart-controls">
                <input
                  type="month"
                  value={format(selectedDate, "yyyy-MM")}
                  onChange={handleDateChange}
                  className="month-picker"
                />
              </div>
            </div>
            <ResponsiveContainer width="100%" height={275}>
              <LineChart data={transactionData}>
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="transactions"
                  stroke="#11a8fd"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bus-fee-column">
          <div
            className="bus-fee-action-card"
            onClick={() => setShowAddBusFee(true)}
          >
            <FontAwesomeIcon icon={faPlus} className="action-icon" />
            <h3>Add Bus Fee</h3>
            <p>Add Bus Fee for the next academic year</p>
          </div>
          <div
            className="bus-fee-action-card"
            onClick={() => setShowUpdateBusFee(true)}
          >
            <FontAwesomeIcon icon={faEdit} className="action-icon" />
            <h3>Update Bus Fee</h3>
            <p>Update modifications in the bus fee</p>
          </div>
        </div>
      </div>
      <div className="bus-fee-row">
        <div className="bus-fee-settings">
          <h2>Settings</h2>
          <div className="setting-item">
            <label htmlFor="enable-notification">Enable Due Notification</label>
            <div className="toggle-switch">
              <input type="checkbox" id="enable-notification" />
              <span className="slider"></span>
            </div>
          </div>
          <p className="setting-description">
            Enable or Disable payment due notification for each all terms.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BusFeeHome;
