import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faArrowLeft,
  faChevronLeft,
  faChevronRight,
  faEye,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "./ViewCriticalConditionBuses.css";
import { format } from "date-fns";
import Button from "../../../../components/Shared/Button/Button";

const criticalBusesData = [
  {
    route: "31",
    number: "TN34 OP123",
    status: "Critical",
    lastService: "2024-02-15",
    nextService: "2024-02-20",
    driverName: "Daniel Wilson",
    mileage: "62,000 km",
    lastInspection: "2024-02-14",
    condition: "Critical",
    problem: "Engine Failure",
    notes: "Immediate attention required",
  },
  {
    route: "32",
    number: "TN34 QR456",
    status: "Critical",
    lastService: "2024-02-10",
    nextService: "2024-02-18",
    driverName: "Emily Brown",
    mileage: "58,700 km",
    lastInspection: "2024-02-12",
    condition: "Critical",
    problem: "Transmission Issue",
    notes: "Major repair needed",
  },
  {
    route: "33",
    number: "TN34 ST789",
    status: "Critical",
    lastService: "2024-02-05",
    nextService: "2024-02-16",
    driverName: "George Davis",
    mileage: "65,300 km",
    lastInspection: "2024-02-10",
    condition: "Critical",
    problem: "Brake System Failure",
    notes: "Safety concern",
  },
  {
    route: "34",
    number: "TN34 UV012",
    status: "Critical",
    lastService: "2024-01-31",
    nextService: "2024-02-15",
    driverName: "Sarah Miller",
    mileage: "59,800 km",
    lastInspection: "2024-02-08",
    condition: "Critical",
    problem: "Steering Malfunction",
    notes: "Unsafe to operate",
  },
  {
    route: "35",
    number: "TN34 WX345",
    status: "Critical",
    lastService: "2024-01-25",
    nextService: "2024-02-14",
    driverName: "James Taylor",
    mileage: "61,500 km",
    lastInspection: "2024-02-06",
    condition: "Critical",
    problem: "Electrical System",
    notes: "Complete failure",
  },
  {
    route: "36",
    number: "TN34 YZ678",
    status: "Critical",
    lastService: "2024-01-20",
    nextService: "2024-02-12",
    driverName: "Linda White",
    mileage: "57,900 km",
    lastInspection: "2024-02-04",
    condition: "Critical",
    problem: "Fuel System",
    notes: "Major leak detected",
  },
  {
    route: "37",
    number: "TN34 AB901",
    status: "Critical",
    lastService: "2024-01-15",
    nextService: "2024-02-10",
    driverName: "William Clark",
    mileage: "63,100 km",
    lastInspection: "2024-02-02",
    condition: "Critical",
    problem: "Axle Damage",
    notes: "Structural issue",
  },
  {
    route: "38",
    number: "TN34 CD234",
    status: "Critical",
    lastService: "2024-01-10",
    nextService: "2024-02-08",
    driverName: "Karen Lee",
    mileage: "60,800 km",
    lastInspection: "2024-01-31",
    condition: "Critical",
    problem: "Radiator Failure",
    notes: "Overheating issue",
  },
  {
    route: "39",
    number: "TN34 EF567",
    status: "Critical",
    lastService: "2024-01-05",
    nextService: "2024-02-06",
    driverName: "Richard Moore",
    mileage: "64,500 km",
    lastInspection: "2024-01-29",
    condition: "Critical",
    problem: "Suspension System",
    notes: "Severe damage",
  },
  {
    route: "40",
    number: "TN34 GH890",
    status: "Critical",
    lastService: "2024-01-01",
    nextService: "2024-02-04",
    driverName: "Mary Johnson",
    mileage: "56,900 km",
    lastInspection: "2024-01-27",
    condition: "Critical",
    problem: "Clutch System",
    notes: "Complete replacement needed",
  },
];

const ViewCriticalConditionBuses = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedBus, setSelectedBus] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [viewingBus, setViewingBus] = useState(null);

  const containerRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setSelectedBus(null);
    }
  };

  const handleDelete = () => {
    if (selectedBus) {
      setShowDeleteConfirmation(true);
    }
  };

  const confirmDelete = () => {
    console.log("Deleting bus:", selectedBus);
    setShowDeleteConfirmation(false);
    setSelectedBus(null);
  };

  const handleViewBus = (bus) => {
    setViewingBus(bus);
  };

  const filteredBuses = criticalBusesData.filter(
    (bus) =>
      bus.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bus.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bus.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bus.problem.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBuses.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleRowClick = (bus) => {
    setSelectedBus(selectedBus === bus ? null : bus);
  };

  return (
    <div className="critical-buses-container" ref={containerRef}>
      <header className="critical-buses-top-bar">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="critical-buses-back-icon"
          onClick={onBack}
        />
        <h2>Critical Condition Buses</h2>
      </header>

      <main className="critical-buses-main-content">
        <div className="critical-buses-controls">
          <div className="critical-buses-search-bar-container">
            <div className="critical-buses-search-input-wrapper">
              <FontAwesomeIcon
                icon={faSearch}
                className="critical-buses-search-icon"
              />
              <input
                type="text"
                className="critical-buses-search-bar"
                placeholder="Search by Bus Number, Route, Driver Name or Problem"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="critical-buses-action-buttons">
            <Button
              label={
                <>
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </>
              }
              onClick={() => console.log("Edit clicked")}
              disabled={!selectedBus}
            />
            <Button
              label={
                <>
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </>
              }
              onClick={handleDelete}
              disabled={!selectedBus}
            />
          </div>
          <div className="critical-buses-date">
            <input
              type="month"
              value={format(selectedDate, "yyyy-MM")}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
            />
          </div>
        </div>

        <div className="critical-buses-table-container">
          <div className="critical-buses-table-wrapper">
            <table className="critical-buses-table">
              <thead>
                <tr>
                  <th>Route</th>
                  <th>Bus Number</th>
                  <th>Driver Name</th>
                  <th>Status</th>
                  <th>Problem</th>
                  <th>Last Service</th>
                  <th>Next Service</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((bus) => (
                  <tr
                    key={bus.route}
                    onClick={() => handleRowClick(bus)}
                    className={selectedBus === bus ? "selected" : ""}
                  >
                    <td>{bus.route}</td>
                    <td>{bus.number}</td>
                    <td>{bus.driverName}</td>
                    <td>{bus.status}</td>
                    <td>{bus.problem}</td>
                    <td>{bus.lastService}</td>
                    <td>{bus.nextService}</td>
                    <td>
                      <FontAwesomeIcon
                        icon={faEye}
                        className="critical-view-icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewBus(bus);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="critical-buses-pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="critical-buses-pagination-button"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          {Array.from({
            length: Math.ceil(filteredBuses.length / itemsPerPage),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`critical-buses-pagination-button ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(filteredBuses.length / itemsPerPage)
            }
            className="critical-buses-pagination-button"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </main>

      {showDeleteConfirmation && (
        <div className="critical-buses-delete-confirmation-modal">
          <div className="critical-buses-delete-confirmation-content">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this bus record?</p>
            <div className="critical-buses-delete-confirmation-buttons">
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="critical-buses-cancel-delete"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="critical-buses-confirm-delete"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCriticalConditionBuses;
