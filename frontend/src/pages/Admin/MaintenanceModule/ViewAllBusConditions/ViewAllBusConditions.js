import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEdit,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "./ViewAllBusConditions.css";
import Button from "../../../../components/Shared/Button/Button";
import AddBusCondition from "../AddBusCondition/AddBusCondition";
import SpecificBusCondition from "../SpecificBusCondition/SpecificBusCondition";
import TopBar from "../../../../components/Shared/TopBar/TopBar";
import SearchBar from "../../../../components/Shared/SearchBar/SearchBar";
import TableContainer from "../../../../components/Shared/TableContainer/TableContainer";
import Pagination from "../../../../components/Shared/Pagination/Pagination";
import ConfirmationModal from "../../../../components/Shared/ConfirmationModal/ConfirmationModal";
import ToastNotification, {
  showToast,
} from "../../../../components/Shared/ToastNotification/ToastNotification";

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
    status: "Good",
    problem: "Battery Expired",
  },
  {
    route: "5",
    number: "TN34 AZ789",
    status: "Good",
    problem: "Battery Expired",
  },
  {
    route: "6",
    number: "TN34 AZ789",
    status: "Good",
    problem: "Battery Expired",
  },
  {
    route: "7",
    number: "TN34 AZ789",
    status: "Good",
    problem: "Battery Expired",
  },
  {
    route: "8",
    number: "TN34 AZ789",
    status: "Good",
    problem: "Battery Expired",
  },
  {
    route: "9",
    number: "TN34 AZ789",
    status: "Good",
    problem: "Battery Expired",
  },
  {
    route: "10",
    number: "TN34 AZ789",
    status: "Good",
    problem: "Battery Expired",
  },
];

// Function to get a colored dot based on status
const getStatusDot = (status) => {
  const statusColors = {
    Good: "#4caf50", // Green
    Satisfactory: "#ff9800", // Orange
    Critical: "#f44336", // Red
  };
  return (
    <span
      className="status-dot"
      style={{
        backgroundColor: statusColors[status] || "#000",
        marginRight: "8px",
      }}
    ></span>
  );
};

const ViewAllBusConditions = ({ onBack }) => {
  const [buses, setBuses] = useState(busConditionsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedBuses, setSelectedBuses] = useState([]);
  const [viewingBus, setViewingBus] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
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
      setSelectedBuses([]);
    }
  };

  const handleDelete = () => {
    if (selectedBuses.length > 0) {
      setShowDeleteConfirmation(true);
    } else {
      showToast("warn", "Please select at least one bus to delete.");
    }
  };

  const confirmDelete = () => {
    const remainingBuses = buses.filter(
      (bus) => !selectedBuses.includes(bus.route)
    );
    setBuses(remainingBuses);
    setSelectedBuses([]);
    setShowDeleteConfirmation(false);
    showToast("success", "Selected bus record(s) deleted successfully.");
  };

  const handleEdit = () => {
    if (selectedBuses.length === 1) {
      const busToEdit = buses.find((bus) => bus.route === selectedBuses[0]);
      setEditingBus(busToEdit);
      setShowAddForm(true);
    } else {
      showToast("warn", "Please select a single bus to edit.");
    }
  };

  const handleAddClick = () => {
    setShowAddForm(true);
    setEditingBus(null);
  };

  const handleAddOrEditComplete = async (busData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (editingBus) {
        setBuses((prevBuses) =>
          prevBuses.map((bus) =>
            bus.route === editingBus.route ? busData : bus
          )
        );
        showToast("success", "Bus updated successfully.");
      } else {
        setBuses((prevBuses) => [...prevBuses, busData]);
        showToast("success", "New bus added successfully.");
      }

      setShowAddForm(false);
      setEditingBus(null);
      setSelectedBuses([]);
    } catch (error) {
      console.error("Error saving bus condition:", error);
      showToast("error", "Failed to save bus condition. Please try again.");
    }
  };

  const handleRowClick = (busId) => {
    setSelectedBuses((prevSelected) =>
      prevSelected.includes(busId)
        ? prevSelected.filter((id) => id !== busId)
        : [...prevSelected, busId]
    );
  };

  const handleViewBus = (bus) => {
    setViewingBus(bus);
  };

  const handleSelectAll = () => {
    if (selectedBuses.length === currentItems.length) {
      setSelectedBuses([]); // Deselect all
    } else {
      setSelectedBuses(currentItems.map((bus) => bus.route)); // Select all
    }
  };

  const filteredBuses = buses.filter(
    (bus) =>
      bus.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bus.problem.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bus.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBuses.slice(indexOfFirstItem, indexOfLastItem);

  const isSelectAllChecked = selectedBuses.length === currentItems.length;
  const isSelectAllIndeterminate =
    selectedBuses.length > 0 && selectedBuses.length < currentItems.length;

  const headers = [
    <label className="custom-checkbox">
      <input
        type="checkbox"
        checked={isSelectAllChecked}
        ref={(el) => el && (el.indeterminate = isSelectAllIndeterminate)}
        onChange={handleSelectAll}
      />
      <span className="checkbox-checkmark"></span>
    </label>,
    "Route",
    "Number",
    "Status",
    "Problem",
    "View",
  ];

  const rows = currentItems.map((bus) => ({
    id: bus.route,
    data: {
      select: (
        <label className="custom-checkbox">
          <input
            type="checkbox"
            checked={selectedBuses.includes(bus.route)}
            onChange={() => handleRowClick(bus.route)}
          />
          <span className="checkbox-checkmark"></span>
        </label>
      ),
      route: bus.route,
      number: bus.number,
      status: (
        <>
          {getStatusDot(bus.status)} {bus.status}
        </>
      ),
      problem: bus.problem,
      view: (
        <FontAwesomeIcon
          icon={faEye}
          className="view-icon"
          onClick={(e) => {
            e.stopPropagation();
            handleViewBus(bus);
          }}
        />
      ),
    },
  }));

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
    <div className="bus-conditions-container" ref={containerRef}>
      <ToastNotification />
      <TopBar title="All Bus Conditions" onBack={onBack} backButton={true} />

      <main className="bus-conditions-main-content">
        <div className="bus-conditions-controls">
          <SearchBar
            placeholder="Search by Bus Number, Status or Problem"
            onSearch={setSearchTerm}
          />
          <div className="bus-conditions-action-buttons">
            <Button
              label={
                <>
                  <FontAwesomeIcon icon={faPlus} /> Add
                </>
              }
              onClick={handleAddClick}
            />
            <Button
              label={
                <>
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </>
              }
              onClick={handleEdit}
              disabled={selectedBuses.length !== 1}
            />
            <Button
              label={
                <>
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </>
              }
              onClick={handleDelete}
              disabled={selectedBuses.length === 0}
            />
          </div>
        </div>

        <TableContainer
          headers={headers}
          rows={rows}
          onRowClick={(row) => handleRowClick(row.id)}
          selectedRowId={selectedBuses}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredBuses.length / itemsPerPage)}
          onPageChange={setCurrentPage}
        />
      </main>

      {showDeleteConfirmation && (
        <ConfirmationModal
          title="Confirm Deletion"
          message="Are you sure you want to delete the selected bus record(s)?"
          onCancel={() => setShowDeleteConfirmation(false)}
          onConfirm={confirmDelete}
        />
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

export default ViewAllBusConditions;
