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
import "./ViewSatisfactoryConditionBuses.css";
import { format } from "date-fns";
import Button from "../../../../components/Shared/Button/Button";
import AddBusCondition from "../AddBusCondition/AddBusCondition";
import SpecificBusCondition from "../SpecificBusCondition/SpecificBusCondition";

const satisfactoryBusesData = [
  {
    route: "21",
    number: "TN34 UV123",
    status: "Maintenance Due",
    lastService: "2024-02-15",
    nextService: "2024-03-15",
    driverName: "Robert Clark",
    mileage: "52,000 km",
    lastInspection: "2024-02-01",
    condition: "Satisfactory",
    problem: "Side Mirror Adjustment",
    notes: "Minor repairs needed",
  },
  {
    route: "22",
    number: "TN34 WX456",
    status: "Under Observation",
    lastService: "2024-02-10",
    nextService: "2024-03-10",
    driverName: "Patricia Lee",
    mileage: "48,700 km",
    lastInspection: "2024-01-25",
    condition: "Satisfactory",
    problem: "Headlight Alignment",
    notes: "Scheduled for adjustment",
  },
  {
    route: "23",
    number: "TN34 YZ789",
    status: "Maintenance Due",
    lastService: "2024-02-05",
    nextService: "2024-03-05",
    driverName: "Michael White",
    mileage: "55,300 km",
    lastInspection: "2024-01-20",
    condition: "Satisfactory",
    problem: "AC Performance",
    notes: "Needs servicing",
  },
  {
    route: "24",
    number: "TN34 AB012",
    status: "Under Observation",
    lastService: "2024-01-31",
    nextService: "2024-03-01",
    driverName: "Susan Miller",
    mileage: "49,800 km",
    lastInspection: "2024-01-15",
    condition: "Satisfactory",
    problem: "Brake Pad Wear",
    notes: "Monitor condition",
  },
  {
    route: "25",
    number: "TN34 CD345",
    status: "Maintenance Due",
    lastService: "2024-01-25",
    nextService: "2024-02-25",
    driverName: "James Wilson",
    mileage: "51,500 km",
    lastInspection: "2024-01-10",
    condition: "Satisfactory",
    problem: "Tire Pressure",
    notes: "Regular checks needed",
  },
  {
    route: "26",
    number: "TN34 EF678",
    status: "Under Observation",
    lastService: "2024-01-20",
    nextService: "2024-02-20",
    driverName: "Linda Brown",
    mileage: "47,900 km",
    lastInspection: "2024-01-05",
    condition: "Satisfactory",
    problem: "Windshield Wiper",
    notes: "Replacement scheduled",
  },
  {
    route: "27",
    number: "TN34 GH901",
    status: "Maintenance Due",
    lastService: "2024-01-15",
    nextService: "2024-02-15",
    driverName: "William Davis",
    mileage: "53,100 km",
    lastInspection: "2024-01-01",
    condition: "Satisfactory",
    problem: "Door Mechanism",
    notes: "Needs adjustment",
  },
  {
    route: "28",
    number: "TN34 IJ234",
    status: "Under Observation",
    lastService: "2024-01-10",
    nextService: "2024-02-10",
    driverName: "Karen Taylor",
    mileage: "50,800 km",
    lastInspection: "2023-12-25",
    condition: "Satisfactory",
    problem: "Seat Repair",
    notes: "Minor repairs pending",
  },
  {
    route: "29",
    number: "TN34 KL567",
    status: "Maintenance Due",
    lastService: "2024-01-05",
    nextService: "2024-02-05",
    driverName: "Richard Moore",
    mileage: "54,500 km",
    lastInspection: "2023-12-20",
    condition: "Satisfactory",
    problem: "Horn System",
    notes: "Check required",
  },
  {
    route: "30",
    number: "TN34 MN890",
    status: "Under Observation",
    lastService: "2024-01-01",
    nextService: "2024-02-01",
    driverName: "Mary Johnson",
    mileage: "46,900 km",
    lastInspection: "2023-12-15",
    condition: "Satisfactory",
    problem: "Battery Check",
    notes: "Monitor voltage",
  },
];

const ViewSatisfactoryConditionBuses = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedBus, setSelectedBus] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [viewingBus, setViewingBus] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBus, setEditingBus] = useState(null);

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

  const handleEdit = () => {
    if (selectedBus) {
      setEditingBus(selectedBus);
      setShowAddForm(true);
    }
  };

  const handleAddOrEditComplete = (busData) => {
    if (editingBus) {
      console.log("Updating bus:", busData);
    } else {
      console.log("Adding new bus:", busData);
    }
    setShowAddForm(false);
    setEditingBus(null);
    setSelectedBus(null);
  };

  const confirmDelete = () => {
    console.log("Deleting bus:", selectedBus);
    setShowDeleteConfirmation(false);
    setSelectedBus(null);
  };

  const handleViewBus = (bus) => {
    setViewingBus(bus);
  };

  const filteredBuses = satisfactoryBusesData.filter(
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

  if (showAddForm) {
    return (
      <AddBusCondition
        bus={editingBus}
        onBack={() => {
          setShowAddForm(false);
          setEditingBus(null);
        }}
        onSave={handleAddOrEditComplete}
      />
    );
  }

  return (
    <div className="satisfactory-buses-container" ref={containerRef}>
      <header className="satisfactory-buses-top-bar">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="satisfactory-buses-back-icon"
          onClick={onBack}
        />
        <h2>Satisfactory Condition Buses</h2>
      </header>

      <main className="satisfactory-buses-main-content">
        <div className="satisfactory-buses-controls">
          <div className="satisfactory-buses-search-bar-container">
            <div className="satisfactory-buses-search-input-wrapper">
              <FontAwesomeIcon
                icon={faSearch}
                className="satisfactory-buses-search-icon"
              />
              <input
                type="text"
                className="satisfactory-buses-search-bar"
                placeholder="Search by Bus Number, Route, Driver Name or Problem"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="satisfactory-buses-action-buttons">
            <Button
              label={
                <>
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </>
              }
              onClick={handleEdit}
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
          <div className="satisfactory-buses-date">
            <input
              type="month"
              value={format(selectedDate, "yyyy-MM")}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
            />
          </div>
        </div>

        <div className="satisfactory-buses-table-container">
          <div className="satisfactory-buses-table-wrapper">
            <table className="satisfactory-buses-table">
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
                        className="satisfactory-view-icon"
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

        <div className="satisfactory-buses-pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="satisfactory-buses-pagination-button"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          {Array.from({
            length: Math.ceil(filteredBuses.length / itemsPerPage),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`satisfactory-buses-pagination-button ${
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
            className="satisfactory-buses-pagination-button"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </main>

      {showDeleteConfirmation && (
        <div className="satisfactory-buses-delete-confirmation-modal">
          <div className="satisfactory-buses-delete-confirmation-content">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this bus record?</p>
            <div className="satisfactory-buses-delete-confirmation-buttons">
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="satisfactory-buses-cancel-delete"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="satisfactory-buses-confirm-delete"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {viewingBus && (
        <SpecificBusCondition
          bus={viewingBus}
          onClose={() => setViewingBus(null)}
        />
      )}
    </div>
  );
};

export default ViewSatisfactoryConditionBuses;
