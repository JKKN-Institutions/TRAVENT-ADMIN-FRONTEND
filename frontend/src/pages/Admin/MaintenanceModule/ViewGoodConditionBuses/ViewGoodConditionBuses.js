import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import "./ViewGoodConditionBuses.css";
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
  const [buses, setBuses] = useState(goodBusesData);
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
      bus.route.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className="good-buses-container" ref={containerRef}>
      <ToastNotification />
      <TopBar
        title="Buses in Good Condition"
        onBack={onBack}
        backButton={true}
      />

      <main className="good-buses-main-content">
        <div className="good-buses-controls">
          <SearchBar
            placeholder="Search by Bus Number, Route or Driver Name"
            onSearch={setSearchTerm}
          />
          <div className="good-buses-action-buttons">
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
          <div className="good-buses-date">
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

export default ViewGoodConditionBuses;
