import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./ViewAllUsedSpares.css";
import { format } from "date-fns";
import ToastNotification, {
  showToast,
} from "../../../../components/Shared/ToastNotification/ToastNotification";
import SpecificUsedSpareDetails from "../SpecificUsedSpareDetails/SpecificUsedSpareDetails";
import TopBar from "../../../../components/Shared/TopBar/TopBar";
import SearchBar from "../../../../components/Shared/SearchBar/SearchBar";
import TableContainer from "../../../../components/Shared/TableContainer/TableContainer";
import Pagination from "../../../../components/Shared/Pagination/Pagination";
import Button from "../../../../components/Shared/Button/Button";
import ConfirmationModal from "../../../../components/Shared/ConfirmationModal/ConfirmationModal";

const usedSparesData = [
  {
    orderId: "ORD-001",
    inventoryId: "INV-001",
    itemName: "Engine Oil",
    quantity: 3,
    usedOn: 3,
    vehicleNo: "TN01AB1234",
    driverName: "John Doe",
    usageDate: "2024-03-01",
    usageTime: "09:30 AM",
  },
  {
    orderId: "ORD-002",
    inventoryId: "INV-003",
    itemName: "Battery",
    quantity: 2,
    usedOn: 5,
    vehicleNo: "TN02CD5678",
    driverName: "Jane Smith",
    usageDate: "2024-03-02",
    usageTime: "10:15 AM",
  },
  {
    orderId: "ORD-003",
    inventoryId: "INV-005",
    itemName: "Radiator Hose",
    quantity: 1,
    usedOn: 1,
    vehicleNo: "TN03EF9012",
    driverName: "Mike Johnson",
    usageDate: "2024-03-03",
    usageTime: "11:45 AM",
  },
  {
    orderId: "ORD-004",
    inventoryId: "INV-007",
    itemName: "Fan Belt",
    quantity: 4,
    usedOn: 18,
    vehicleNo: "TN04GH3456",
    driverName: "Sarah Wilson",
    usageDate: "2024-03-04",
    usageTime: "02:20 PM",
  },
  {
    orderId: "ORD-005",
    inventoryId: "INV-009",
    itemName: "Oil Filter",
    quantity: 2,
    usedOn: 5,
    vehicleNo: "TN05IJ7890",
    driverName: "David Brown",
    usageDate: "2024-03-05",
    usageTime: "03:10 PM",
  },
  {
    orderId: "ORD-006",
    inventoryId: "INV-002",
    itemName: "Brake Pads",
    quantity: 4,
    usedOn: 8,
    vehicleNo: "TN06KL1234",
    driverName: "Emma Davis",
    usageDate: "2024-03-06",
    usageTime: "04:30 PM",
  },
  {
    orderId: "ORD-007",
    inventoryId: "INV-004",
    itemName: "Windshield Wipers",
    quantity: 2,
    usedOn: 4,
    vehicleNo: "TN07MN5678",
    driverName: "Chris Taylor",
    usageDate: "2024-03-07",
    usageTime: "09:45 AM",
  },
  {
    orderId: "ORD-008",
    inventoryId: "INV-006",
    itemName: "Fuel Pump",
    quantity: 1,
    usedOn: 2,
    vehicleNo: "TN08OP9012",
    driverName: "Lisa Anderson",
    usageDate: "2024-03-08",
    usageTime: "11:20 AM",
  },
  {
    orderId: "ORD-009",
    inventoryId: "INV-008",
    itemName: "Spark Plugs",
    quantity: 6,
    usedOn: 12,
    vehicleNo: "TN09QR3456",
    driverName: "Tom Wilson",
    usageDate: "2024-03-09",
    usageTime: "02:15 PM",
  },
  {
    orderId: "ORD-010",
    inventoryId: "INV-010",
    itemName: "Headlight Bulbs",
    quantity: 2,
    usedOn: 4,
    vehicleNo: "TN10ST7890",
    driverName: "Amy Martin",
    usageDate: "2024-03-10",
    usageTime: "04:45 PM",
  },
];

const ViewAllUsedSpares = ({ onBack }) => {
  const [usedSpares, setUsedSpares] = useState(usedSparesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSpares, setSelectedSpares] = useState([]);
  const [viewingSpare, setViewingSpare] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setSelectedSpares([]);
    }
  };

  const handleViewSpare = (spare) => {
    setViewingSpare(spare);
  };

  const handleDelete = () => {
    if (selectedSpares.length > 0) {
      setShowDeleteConfirmation(true);
    } else {
      showToast("warn", "Please select at least one spare to delete.");
    }
  };

  const confirmDelete = () => {
    const remainingSpares = usedSpares.filter(
      (spare) => !selectedSpares.includes(spare.orderId)
    );
    setUsedSpares(remainingSpares);
    setSelectedSpares([]);
    setShowDeleteConfirmation(false);
    showToast("success", "Selected spare(s) deleted successfully.");
  };

  const handleEdit = () => {
    if (selectedSpares.length === 1) {
      showToast(
        "info",
        "Edit functionality can be added or linked as required."
      );
    } else {
      showToast("warn", "Please select exactly one spare to edit.");
    }
  };

  const filteredSpares = usedSpares.filter(
    (spare) =>
      spare.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      spare.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      spare.inventoryId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      spare.vehicleNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      spare.driverName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSpares.slice(indexOfFirstItem, indexOfLastItem);

  const handleSelectAll = () => {
    if (selectedSpares.length === currentItems.length) {
      setSelectedSpares([]); // Deselect all
    } else {
      setSelectedSpares(currentItems.map((spare) => spare.orderId)); // Select all
    }
  };

  const handleRowClick = (spareId) => {
    setSelectedSpares((prevSelected) =>
      prevSelected.includes(spareId)
        ? prevSelected.filter((id) => id !== spareId)
        : [...prevSelected, spareId]
    );
  };

  const isSelectAllChecked = selectedSpares.length === currentItems.length;
  const isSelectAllIndeterminate =
    selectedSpares.length > 0 && selectedSpares.length < currentItems.length;

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
    "Order ID",
    "Inventory ID",
    "Item Name",
    "Quantity",
    "Used On",
    "Vehicle No",
    "Driver Name",
    "View",
  ];

  const rows = currentItems.map((spare) => ({
    id: spare.orderId,
    data: {
      select: (
        <label className="custom-checkbox">
          <input
            type="checkbox"
            checked={selectedSpares.includes(spare.orderId)}
            onChange={() => handleRowClick(spare.orderId)}
          />
          <span className="checkbox-checkmark"></span>
        </label>
      ),
      orderId: spare.orderId,
      inventoryId: spare.inventoryId,
      itemName: spare.itemName,
      quantity: spare.quantity,
      usedOn: spare.usedOn,
      vehicleNo: spare.vehicleNo,
      driverName: spare.driverName,
      view: (
        <FontAwesomeIcon
          icon={faEye}
          className="view-icon"
          onClick={() => handleViewSpare(spare)}
        />
      ),
    },
  }));

  return (
    <div className="used-spares-container" ref={containerRef}>
      <ToastNotification />
      <TopBar title="Used Spares Details" onBack={onBack} backButton={true} />

      <main className="used-spares-main-content">
        <div className="used-spares-controls">
          <SearchBar
            placeholder="Search by Order ID, Item Name, Vehicle No, or Driver Name"
            onSearch={setSearchTerm}
          />

          <div className="used-spares-action-buttons">
            <Button
              label={
                <>
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </>
              }
              onClick={handleEdit}
              disabled={selectedSpares.length !== 1}
            />
            <Button
              label={
                <>
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </>
              }
              onClick={handleDelete}
              disabled={selectedSpares.length === 0}
            />
          </div>
          <div className="used-spares-date">
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
          selectedRowId={selectedSpares}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredSpares.length / itemsPerPage)}
          onPageChange={setCurrentPage}
        />
      </main>

      {showDeleteConfirmation && (
        <ConfirmationModal
          title="Confirm Deletion"
          message="Are you sure you want to delete the selected spare record(s)?"
          onCancel={() => setShowDeleteConfirmation(false)}
          onConfirm={confirmDelete}
        />
      )}

      {viewingSpare && (
        <SpecificUsedSpareDetails
          spare={viewingSpare}
          onClose={() => setViewingSpare(null)}
        />
      )}
    </div>
  );
};

export default ViewAllUsedSpares;
