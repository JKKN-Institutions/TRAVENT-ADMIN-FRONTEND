import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faArrowLeft,
  faPlus,
  faTrash,
  faPencil,
  faChevronRight,
  faChevronLeft,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import "./ViewAllBusConditions.css";
import Button from "../../../../components/Shared/Button/Button";

const busConditionsData = [
  {
    route: "1",
    number: "TN34 AZ789",
    status: "Satisfactory",
    problem: "Engine Oil Leak",
  },
  {
    route: "2",
    number: "TN34 AZ789",
    status: "Satisfactory",
    problem: "Broken Tyre",
  },
  {
    route: "3",
    number: "TN34 AZ789",
    status: "Critical",
    problem: "Battery Expired",
  },
  {
    route: "4",
    number: "TN34 AZ789",
    status: "Completed",
    problem: "Battery Expired",
  },
  {
    route: "5",
    number: "TN34 AZ789",
    status: "Completed",
    problem: "Battery Expired",
  },
  {
    route: "6",
    number: "TN34 AZ789",
    status: "Completed",
    problem: "Battery Expired",
  },
  {
    route: "7",
    number: "TN34 AZ789",
    status: "Completed",
    problem: "Battery Expired",
  },
  {
    route: "8",
    number: "TN34 AZ789",
    status: "Completed",
    problem: "Battery Expired",
  },
  {
    route: "9",
    number: "TN34 AZ789",
    status: "Completed",
    problem: "Battery Expired",
  },
  {
    route: "10",
    number: "TN34 AZ789",
    status: "Completed",
    problem: "Battery Expired",
  },
];

const ViewAllBusConditions = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedBus, setSelectedBus] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const containerRef = useRef(null);

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

  const handleRowClick = (bus) => {
    setSelectedBus(selectedBus === bus ? null : bus);
  };

  const filteredBuses = busConditionsData.filter(
    (bus) =>
      bus.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bus.problem.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bus.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBuses.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getStatusDot = (status) => {
    const statusColors = {
      Completed: "#4caf50",
      Satisfactory: "#ff9800",
      Critical: "#f44336",
    };
    return (
      <span
        className="status-dot"
        style={{ backgroundColor: statusColors[status] }}
      ></span>
    );
  };

  return (
    <div className="bus-conditions-container" ref={containerRef}>
      <header className="bus-conditions-top-bar">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="bus-conditions-back-icon"
          onClick={onBack}
        />
        <h2>All Bus Conditions</h2>
      </header>

      <main className="bus-conditions-main-content">
        <div className="bus-conditions-controls">
          <div className="bus-conditions-search-bar-container">
            <div className="bus-conditions-search-input-wrapper">
              <FontAwesomeIcon
                icon={faSearch}
                className="bus-conditions-search-icon"
              />
              <input
                type="text"
                className="bus-conditions-search-bar"
                placeholder="Search by Bus Number, Status or Problem"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="bus-conditions-action-buttons">
            <Button
              label={
                <>
                  <FontAwesomeIcon icon={faPlus} /> Add
                </>
              }
            />
            <Button
              label={
                <>
                  <FontAwesomeIcon icon={faPencil} /> Edit
                </>
              }
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
        </div>

        <div className="bus-conditions-table-container">
          <div className="bus-conditions-table-wrapper">
            <table className="bus-conditions-table">
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
                {currentItems.map((bus, index) => (
                  <tr
                    key={index}
                    onClick={() => handleRowClick(bus)}
                    className={selectedBus === bus ? "selected" : ""}
                  >
                    <td>{bus.route}</td>
                    <td>{bus.number}</td>
                    <td>
                      {getStatusDot(bus.status)} {bus.status}
                    </td>
                    <td>{bus.problem}</td>
                    <td>
                      <FontAwesomeIcon
                        icon={faEye}
                        className="view-icon"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bus-conditions-pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="bus-conditions-pagination-button"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          {Array.from({
            length: Math.ceil(filteredBuses.length / itemsPerPage),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`bus-conditions-pagination-button ${
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
            className="bus-conditions-pagination-button"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </main>

      {showDeleteConfirmation && (
        <div className="bus-conditions-delete-confirmation-modal">
          <div className="bus-conditions-delete-confirmation-content">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this bus record?</p>
            <div className="bus-conditions-delete-confirmation-buttons">
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="bus-conditions-cancel-delete"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bus-conditions-confirm-delete"
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

export default ViewAllBusConditions;
