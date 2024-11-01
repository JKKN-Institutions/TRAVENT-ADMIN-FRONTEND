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
import "./ViewGoodConditionBuses.css";
import { format } from "date-fns";
import Button from "../../../../components/Shared/Button/Button";
import AddBusCondition from "../AddBusCondition/AddBusCondition";
import SpecificBusCondition from "../SpecificBusCondition/SpecificBusCondition";

const goodBusesData = [
  {
    route: "11",
    number: "TN34 KP456",
    status: "Operational",
    lastService: "2024-03-01",
    nextService: "2024-04-01",
    driverName: "John Doe",
    mileage: "45,000 km",
    lastInspection: "2024-02-15",
    condition: "Excellent",
    notes: "Regular maintenance up to date",
  },
  {
    route: "12",
    number: "TN34 LO123",
    status: "Operational",
    lastService: "2024-02-28",
    nextService: "2024-03-28",
    driverName: "Jane Smith",
    mileage: "38,500 km",
    lastInspection: "2024-02-10",
    condition: "Good",
    notes: "Minor wear and tear",
  },
  {
    route: "13",
    number: "TN34 MN789",
    status: "Operational",
    lastService: "2024-02-25",
    nextService: "2024-03-25",
    driverName: "Mike Johnson",
    mileage: "42,300 km",
    lastInspection: "2024-02-05",
    condition: "Excellent",
    notes: "New tires installed",
  },
  {
    route: "14",
    number: "TN34 NM456",
    status: "Operational",
    lastService: "2024-02-20",
    nextService: "2024-03-20",
    driverName: "Sarah Wilson",
    mileage: "36,800 km",
    lastInspection: "2024-02-01",
    condition: "Good",
    notes: "AC serviced recently",
  },
  {
    route: "15",
    number: "TN34 OL123",
    status: "Operational",
    lastService: "2024-02-15",
    nextService: "2024-03-15",
    driverName: "David Brown",
    mileage: "40,200 km",
    lastInspection: "2024-01-25",
    condition: "Excellent",
    notes: "Engine tuned up",
  },
  {
    route: "16",
    number: "TN34 PK789",
    status: "Operational",
    lastService: "2024-02-10",
    nextService: "2024-03-10",
    driverName: "Emma Davis",
    mileage: "37,500 km",
    lastInspection: "2024-01-20",
    condition: "Good",
    notes: "Brakes checked",
  },
  {
    route: "17",
    number: "TN34 QJ456",
    status: "Operational",
    lastService: "2024-02-05",
    nextService: "2024-03-05",
    driverName: "Chris Taylor",
    mileage: "43,100 km",
    lastInspection: "2024-01-15",
    condition: "Excellent",
    notes: "Full inspection completed",
  },
  {
    route: "18",
    number: "TN34 RH123",
    status: "Operational",
    lastService: "2024-01-31",
    nextService: "2024-03-01",
    driverName: "Lisa Anderson",
    mileage: "39,800 km",
    lastInspection: "2024-01-10",
    condition: "Good",
    notes: "Regular maintenance done",
  },
  {
    route: "19",
    number: "TN34 SG789",
    status: "Operational",
    lastService: "2024-01-25",
    nextService: "2024-02-25",
    driverName: "Tom Wilson",
    mileage: "41,500 km",
    lastInspection: "2024-01-05",
    condition: "Excellent",
    notes: "All systems checked",
  },
  {
    route: "20",
    number: "TN34 TF456",
    status: "Operational",
    lastService: "2024-01-20",
    nextService: "2024-02-20",
    driverName: "Amy Martin",
    mileage: "35,900 km",
    lastInspection: "2024-01-01",
    condition: "Good",
    notes: "Regular checkup done",
  },
];

const ViewGoodConditionBuses = ({ onBack }) => {
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

  const filteredBuses = goodBusesData.filter(
    (bus) =>
      bus.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bus.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bus.route.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className="good-buses-container" ref={containerRef}>
      <header className="good-buses-top-bar">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="good-buses-back-icon"
          onClick={onBack}
        />
        <h2>Buses in Good Condition</h2>
      </header>

      <main className="good-buses-main-content">
        <div className="good-buses-controls">
          <div className="good-buses-search-bar-container">
            <div className="good-buses-search-input-wrapper">
              <FontAwesomeIcon
                icon={faSearch}
                className="good-buses-search-icon"
              />
              <input
                type="text"
                className="good-buses-search-bar"
                placeholder="Search by Bus Number, Route or Driver Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="good-buses-action-buttons">
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
          <div className="good-buses-date">
            <input
              type="month"
              value={format(selectedDate, "yyyy-MM")}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
            />
          </div>
        </div>

        <div className="good-buses-table-container">
          <div className="good-buses-table-wrapper">
            <table className="good-buses-table">
              <thead>
                <tr>
                  <th>Route</th>
                  <th>Bus Number</th>
                  <th>Driver Name</th>
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
                    <td>{bus.lastService}</td>
                    <td>{bus.nextService}</td>
                    <td>
                      <FontAwesomeIcon
                        icon={faEye}
                        className="good-view-icon"
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

        <div className="good-buses-pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="good-buses-pagination-button"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          {Array.from({
            length: Math.ceil(filteredBuses.length / itemsPerPage),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`good-buses-pagination-button ${
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
            className="good-buses-pagination-button"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </main>

      {showDeleteConfirmation && (
        <div className="good-buses-delete-confirmation-modal">
          <div className="good-buses-delete-confirmation-content">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this bus record?</p>
            <div className="good-buses-delete-confirmation-buttons">
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="good-buses-cancel-delete"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="good-buses-confirm-delete"
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

export default ViewGoodConditionBuses;
