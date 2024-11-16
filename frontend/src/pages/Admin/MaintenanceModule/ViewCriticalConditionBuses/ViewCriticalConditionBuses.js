import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import "./ViewCriticalConditionBuses.css";
import { format } from "date-fns";
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
  const [buses, setBuses] = useState(criticalBusesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedDate, setSelectedDate] = useState(new Date());
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

  const handleAddOrEditComplete = (busData) => {
    if (editingBus) {
      setBuses((prevBuses) =>
        prevBuses.map((bus) => (bus.route === editingBus.route ? busData : bus))
      );
      showToast("success", "Bus updated successfully.");
    } else {
      setBuses((prevBuses) => [...prevBuses, busData]);
      showToast("success", "New bus added successfully.");
    }
    setShowAddForm(false);
    setEditingBus(null);
    setSelectedBuses([]);
  };

  const handleViewBus = (bus) => {
    setViewingBus(bus);
  };

  const handleRowClick = (route) => {
    setSelectedBuses((prevSelected) =>
      prevSelected.includes(route)
        ? prevSelected.filter((id) => id !== route)
        : [...prevSelected, route]
    );
  };

  const handleSelectAll = () => {
    if (selectedBuses.length === currentItems.length) {
      setSelectedBuses([]);
    } else {
      setSelectedBuses(currentItems.map((bus) => bus.route));
    }
  };

  const filteredBuses = buses.filter(
    (bus) =>
      bus.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bus.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bus.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bus.problem.toLowerCase().includes(searchTerm.toLowerCase())
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
    "Bus Number",
    "Driver Name",
    "Status",
    "Problem",
    "Last Service",
    "Next Service",
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
      Route: bus.route,
      "Bus Number": bus.number,
      "Driver Name": bus.driverName,
      Status: bus.status,
      Problem: bus.problem,
      "Last Service": bus.lastService,
      "Next Service": bus.nextService,
      View: (
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
    <div className="critical-buses-container" ref={containerRef}>
      <ToastNotification />
      <TopBar
        title="Critical Condition Buses"
        onBack={onBack}
        backButton={true}
      />

      <main className="critical-buses-main-content">
        <div className="critical-buses-controls">
          <SearchBar
            placeholder="Search by Bus Number, Route, Driver Name or Problem"
            onSearch={setSearchTerm}
          />
          <div className="critical-buses-action-buttons">
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
          <div className="critical-buses-date">
            <input
              type="month"
              value={format(selectedDate, "yyyy-MM")}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
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
          onPageChange={(page) => setCurrentPage(page)}
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

export default ViewCriticalConditionBuses;
