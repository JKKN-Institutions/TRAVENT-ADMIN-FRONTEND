import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faEye } from "@fortawesome/free-solid-svg-icons";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "./ServicesHome.css";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

const busesCondition = [
  { label: "Good", value: 24, percentage: 68, color: "#4caf50" },
  { label: "Satisfactory", value: 9, percentage: 42, color: "#ff9800" },
  { label: "Critical", value: 3, percentage: 8, color: "#f44336" },
];

const criticalBusesData = [
  {
    route: "1",
    number: "TN34 AZ789",
    status: "In Progress",
    problem: "Engine Oil Leak",
  },
  {
    route: "2",
    number: "TN34 BY456",
    status: "In Progress",
    problem: "Broken Tyre",
  },
  {
    route: "3",
    number: "TN34 CX123",
    status: "Yet to start",
    problem: "Battery Expired",
  },
  {
    route: "4",
    number: "TN34 DW789",
    status: "In Progress",
    problem: "Transmission Issue",
  },
  {
    route: "5",
    number: "TN34 EV456",
    status: "Yet to start",
    problem: "Brake Failure",
  },
];

const satisfactoryBusesData = [
  {
    route: "6",
    number: "TN34 FU123",
    status: "Yet to Solve",
    problem: "Side Mirror",
  },
  {
    route: "7",
    number: "TN34 GT789",
    status: "Yet to Solve",
    problem: "Headlight Malfunction",
  },
  {
    route: "8",
    number: "TN34 HS456",
    status: "Yet to Solve",
    problem: "AC Not Working",
  },
  {
    route: "9",
    number: "TN34 IR123",
    status: "Yet to Solve",
    problem: "Window Broken",
  },
  {
    route: "10",
    number: "TN34 JQ789",
    status: "Yet to Solve",
    problem: "Seat Repair",
  },
];

const goodBusesData = [
  {
    route: "11",
    number: "TN34 KP456",
    status: "Operational",
    lastService: "2023-07-15",
  },
  {
    route: "12",
    number: "TN34 LO123",
    status: "Operational",
    lastService: "2023-07-18",
  },
  {
    route: "13",
    number: "TN34 MN789",
    status: "Operational",
    lastService: "2023-07-20",
  },
  {
    route: "14",
    number: "TN34 NM456",
    status: "Operational",
    lastService: "2023-07-22",
  },
  {
    route: "15",
    number: "TN34 OL123",
    status: "Operational",
    lastService: "2023-07-25",
  },
];

const BusesConditionChart = ({ condition }) => {
  const totalBuses = condition.reduce((acc, curr) => acc + curr.value, 0);

  const chartData = {
    labels: condition.map((item) => item.label),
    datasets: [
      {
        data: condition.map((item) => item.value),
        backgroundColor: condition.map((item) => item.color),
        borderColor: ["rgba(255, 255, 255, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#fff",
          padding: 10,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const condition = busesCondition[context.dataIndex];
            return `${condition.value} buses`;
          },
        },
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 10,
        displayColors: false,
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "200px", position: "relative" }}>
      <Doughnut data={chartData} options={options} />
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "24px", fontWeight: "bold", color: "#fff" }}>
          {totalBuses}
        </div>
        <div style={{ fontSize: "14px", color: "#ccc" }}>Total Buses</div>
      </div>
    </div>
  );
};

const ServicesHome = ({
  setShowViewAllBusConditions,
  setShowViewGoodConditionBuses,
  setShowViewSatisfactoryConditionBuses,
  setShowViewCriticalConditionBuses,
  handleViewBus,
}) => {
  const [criticalSearch, setCriticalSearch] = useState("");
  const [satisfactorySearch, setSatisfactorySearch] = useState("");
  const [goodSearch, setGoodSearch] = useState("");

  const filteredCriticalBuses = criticalBusesData.filter(
    (bus) =>
      bus.number.toLowerCase().includes(criticalSearch.toLowerCase()) ||
      bus.problem.toLowerCase().includes(criticalSearch.toLowerCase())
  );

  const filteredSatisfactoryBuses = satisfactoryBusesData.filter(
    (bus) =>
      bus.number.toLowerCase().includes(satisfactorySearch.toLowerCase()) ||
      bus.problem.toLowerCase().includes(satisfactorySearch.toLowerCase())
  );

  const filteredGoodBuses = goodBusesData.filter(
    (bus) =>
      bus.number.toLowerCase().includes(goodSearch.toLowerCase()) ||
      bus.lastService.toLowerCase().includes(goodSearch.toLowerCase())
  );

  return (
    <div className="services-home">
      <div className="services-grid">
        <div className="services-buses-condition-container">
          <div className="services-table-header">
            <h2>Buses Condition</h2>
            <a
              href="#"
              className="view-all"
              onClick={() => setShowViewAllBusConditions(true)}
            >
              view all -&gt;
            </a>
          </div>
          <h2></h2>
          <div className="services-buses-condition-grid">
            <BusesConditionChart condition={busesCondition} />
          </div>
        </div>
        <div className="services-table-container good-buses">
          <div className="services-table-header">
            <h2>Buses in Good Condition</h2>
            <a
              href="#"
              className="good-view-all"
              onClick={() => setShowViewGoodConditionBuses(true)}
            >
              view all -&gt;
            </a>
          </div>
          <div className="services-search-controls">
            <div className="services-search-bar-container">
              <div className="services-search-input-wrapper">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="services-search-icon"
                />
                <input
                  type="text"
                  className="services-search-bar"
                  placeholder="Search by Bus Number or Last Service Date"
                  value={goodSearch}
                  onChange={(e) => setGoodSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="services-table-wrapper">
            <table className="services-table">
              <thead>
                <tr>
                  <th>Route</th>
                  <th>Number</th>
                  <th>Status</th>
                  <th>Last Service</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {filteredGoodBuses.map((bus, index) => (
                  <tr key={index}>
                    <td>{bus.route}</td>
                    <td>{bus.number}</td>
                    <td>{bus.status}</td>
                    <td>{bus.lastService}</td>
                    <td>
                      <FontAwesomeIcon
                        icon={faEye}
                        className="good-view-icon"
                        onClick={() => handleViewBus(bus)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="services-table-container satisfactory-buses">
          <div className="services-table-header">
            <h2>Buses in Satisfactory Condition</h2>
            <a
              href="#"
              className="satisfactory-view-all"
              onClick={() => setShowViewSatisfactoryConditionBuses(true)}
            >
              view all -&gt;
            </a>
          </div>
          <div className="services-search-controls">
            <div className="services-search-bar-container">
              <div className="services-search-input-wrapper">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="services-search-icon"
                />
                <input
                  type="text"
                  className="services-search-bar"
                  placeholder="Search by Bus Number or Problem"
                  value={satisfactorySearch}
                  onChange={(e) => setSatisfactorySearch(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="services-table-wrapper">
            <table className="services-table">
              <thead>
                <tr>
                  <th>Route</th>
                  <th>Number</th>
                  <th>Status</th>
                  <th>Problem</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {filteredSatisfactoryBuses.map((bus, index) => (
                  <tr key={index}>
                    <td>{bus.route}</td>
                    <td>{bus.number}</td>
                    <td>{bus.status}</td>
                    <td>{bus.problem}</td>
                    <td>
                      <FontAwesomeIcon
                        icon={faEye}
                        className="satisfactory-view-icon"
                        onClick={() => handleViewBus(bus)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="services-table-container critical-buses">
          <div className="services-table-header">
            <h2>Buses in Critical Condition</h2>
            <a
              href="#"
              className="critical-view-all"
              onClick={() => setShowViewCriticalConditionBuses(true)}
            >
              view all -&gt;
            </a>
          </div>
          <div className="services-search-controls">
            <div className="services-search-bar-container">
              <div className="services-search-input-wrapper">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="services-search-icon"
                />
                <input
                  type="text"
                  className="services-search-bar"
                  placeholder="Search by Bus Number or Problem"
                  value={criticalSearch}
                  onChange={(e) => setCriticalSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="services-table-wrapper">
            <table className="services-table">
              <thead>
                <tr>
                  <th>Route</th>
                  <th>Number</th>
                  <th>Status</th>
                  <th>Problem</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {filteredCriticalBuses.map((bus, index) => (
                  <tr key={index}>
                    <td>{bus.route}</td>
                    <td>{bus.number}</td>
                    <td>{bus.status}</td>
                    <td>{bus.problem}</td>
                    <td>
                      <FontAwesomeIcon
                        icon={faEye}
                        className="critical-view-icon"
                        onClick={() => handleViewBus(bus)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesHome;
