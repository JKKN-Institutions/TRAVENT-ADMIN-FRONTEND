import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEye, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";

import "./AmuletsFeeHome.css";

const AmuletsFeeHome = ({
  setShowAddAmuletsFee,
  setShowAmuletsRefilledList,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const transactionData = [
    { week: "Week 1", transactions: 100 },
    { week: "Week 2", transactions: 800 },
    { week: "Week 3", transactions: 1200 },
    { week: "Week 4", transactions: 600 },
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
    <div className="amulets-fee-container">
      <div className="amulets-fee-row">
        <div className="amulets-fee-column">
          <div className="amulets-fee-chart-card transactions-chart">
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
        <div className="amulets-fee-column">
          <div
            className="amulets-fee-action-card"
            onClick={() => setShowAddAmuletsFee(true)}
          >
            <FontAwesomeIcon icon={faPlus} className="action-icon" />
            <h3>Add Amulets Fee</h3>
            <p>Add Amulets fee and refill amulets</p>
          </div>
          <div
            className="amulets-fee-action-card"
            onClick={() => setShowAmuletsRefilledList(true)}
          >
            <FontAwesomeIcon icon={faEye} className="action-icon" />
            <h3>Amulets Refilled List</h3>
            <p>View the list of students who has refilled</p>
          </div>
        </div>
      </div>
      <div className="amulets-fee-row">
        <div className="amulets-fee-settings">
          <h2>Settings</h2>
          <div className="setting-item">
            <label>Minimum Amulets</label>
            <div className="setting-value">
              <span>30</span>
              <a href="#" className="change-link">
                Change Minimum Amulets
              </a>
            </div>
          </div>
          <div className="setting-item">
            <label>Amulets Fee Added</label>
            <div className="setting-value">
              <span>10rs/1 amulet</span>
              <a href="#" className="change-link">
                Change Amulets Fee
              </a>
            </div>
          </div>
          <div className="setting-item">
            <label>Refill amulets for for all</label>
            <a href="#" className="refill-link">
              Refill
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmuletsFeeHome;
