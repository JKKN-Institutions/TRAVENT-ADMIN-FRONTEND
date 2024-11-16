import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import "./ViewSatisfactoryConditionBuses.css";
import { format } from "date-fns";
import Button from "../../../../components/Shared/Button/Button";
import TopBar from "../../../../components/Shared/TopBar/TopBar";
import SearchBar from "../../../../components/Shared/SearchBar/SearchBar";
import TableContainer from "../../../../components/Shared/TableContainer/TableContainer";
import Pagination from "../../../../components/Shared/Pagination/Pagination";
import ConfirmationModal from "../../../../components/Shared/ConfirmationModal/ConfirmationModal";
import ToastNotification, {
  showToast,
} from "../../../../components/Shared/ToastNotification/ToastNotification";
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
  const [buses, setBuses] = useState(satisfactoryBusesData);
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
      route: bus.route,
      "Bus Number": bus.number,
      "Driver Name": bus.driverName,
      Status: bus.status,
      Problem: bus.problem,
      "Last Service": bus.lastService,
      "Next Service": bus.nextService,
      View: (
        <FontAwesomeIcon
          icon={faEye}
          className="satisfactory-view-icon"
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
    <div className="satisfactory-buses-container" ref={containerRef}>
      <ToastNotification />
      <TopBar
        title="Satisfactory Condition Buses"
        onBack={onBack}
        backButton={true}
      />

      <main className="satisfactory-buses-main-content">
        <div className="satisfactory-buses-controls">
          <SearchBar
            placeholder="Search by Bus Number, Route, Driver Name or Problem"
            onSearch={setSearchTerm}
          />
          <div className="satisfactory-buses-action-buttons">
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
          <div className="satisfactory-buses-date">
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

export default ViewSatisfactoryConditionBuses;
