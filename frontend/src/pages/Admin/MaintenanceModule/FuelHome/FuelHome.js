import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEye } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "./FuelHome.css";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

  // Chart.js configuration
  const chartData = {
    labels: fuelPurchaseData.map((data) => data.week),
    datasets: [
      {
        data: fuelPurchaseData.map((data) => data.purchase),
        borderColor: "#11a8fd",
        backgroundColor: "rgba(17, 168, 253, 0.1)",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#11a8fd",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        titleColor: "#fff",
        bodyColor: "#fff",
        bodyFont: {
          size: 14,
        },
        callbacks: {
          label: function (context) {
            return `${context.parsed.y} L`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#fff",
          font: {
            size: 14,
          },
        },
      },
      y: {
        grid: {
          display: true,
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#fff",
          font: {
            size: 14,
          },
        },
        min: 0,
        max: 2.5,
        stepSize: 0.5,
      },
    },
  };

  return (
    <div className="fuel-home">
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
                  className="fuel-home-month-picker"
                />
              </div>
            </div>
            <div style={{ height: "275px", width: "100%" }}>
              <Line data={chartData} options={chartOptions} />
            </div>
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
    </div>
  );
};

export default FuelHome;
