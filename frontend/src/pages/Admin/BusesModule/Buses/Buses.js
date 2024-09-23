import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Buses.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Buses = () => {
  const navigate = useNavigate(); // Define navigate

  const arrivalStatuses = [
    { status: "Early", count: 18, className: "early" },
    { status: "On Time", count: 9, className: "on-time" },
    { status: "Slightly Delay", count: 5, className: "slightly-delay" },
    { status: "Delay", count: 3, className: "delay" },
    { status: "Over Delay", count: 1, className: "over-delay" },
  ];

  const busesCondition = [
    { label: "Good", percentage: 68, count: 24, className: "good" },
    {
      label: "Satisfactory",
      percentage: 42,
      count: 9,
      className: "satisfactory",
    },
    { label: "Critical", percentage: 8, count: 3, className: "critical" },
  ];

  const arrivalStatusTable = [
    { route: 1, driver: "Murugan S", scheduled: 60, scanned: 55 },
    { route: 2, driver: "Murugan S", scheduled: 56, scanned: 54 },
    { route: 3, driver: "Kumar S", scheduled: 55, scanned: 30 },
    { route: 4, driver: "Murugan S", scheduled: 43, scanned: 43 },
    { route: 5, driver: "Murugan S", scheduled: 56, scanned: 44 },
    { route: 6, driver: "Kumar S", scheduled: 50, scanned: 40 },
    { route: 7, driver: "Murugan S", scheduled: 41, scanned: 34 },
    { route: 8, driver: "Vel K", scheduled: 42, scanned: 40 },
  ];

  return (
    <div className="buses-dashboard-container">
      <div className="boarding-status">
        <div className="header">
          <p>1326 of 2024 Boarded</p>
        </div>

        <div className="status-overview">
          <div className="buses-arrival-chart">
            <div className="pie-chart"></div>
            <div className="status-details">
              <div className="status-item">
                <h3>Arrival Status</h3>
                <ul>
                  {arrivalStatuses.map((status, index) => (
                    <li key={index}>
                      <span
                        className={`status-color ${status.className}`}
                      ></span>
                      {status.status}: {status.count}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bus-summary">
        <div className="summary-item">
          <h3>36</h3>
          <p>Buses Running</p>
        </div>
        <div className="summary-item">
          <h3>4</h3>
          <p>Spare Buses</p>
        </div>
        <div className="summary-item">
          <h3>4</h3>
          <p>Under Service</p>
        </div>
      </div>

      <div className="buses-condition-container">
        <h3 className="condition-heading">Buses Condition</h3>
        <div className="buses-condition">
          {busesCondition.map((condition, index) => (
            <div
              key={index}
              className={`condition-item ${condition.className}`}
            >
              <div
                className="donut-chart"
                style={{ "--percentage": condition.percentage }}
              ></div>
              <h3>{condition.label}</h3>
              <p>{condition.count} Buses</p>
            </div>
          ))}
        </div>
      </div>

      <div className="arrival-status-container">
        <div className="bus-view-routes">
          <h3>Arrival Status</h3>
          <div
            className="view-routes-link"
            onClick={() => navigate("/admin/view-routes")}
          >
            <p> View Routes</p>{" "}
            <div>
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
          </div>
        </div>
        <table className="arrival-status-table">
          <thead>
            <tr>
              <th>Route</th>
              <th>Driver</th>
              <th>Scheduled</th>
              <th>Scanned</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {arrivalStatusTable.map((row, index) => (
              <tr key={index}>
                <td>{row.route}</td>
                <td>{row.driver}</td>
                <td>{row.scheduled}</td>
                <td>{row.scanned}</td>
                <td>
                  <a href="#">View details</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Buses;
