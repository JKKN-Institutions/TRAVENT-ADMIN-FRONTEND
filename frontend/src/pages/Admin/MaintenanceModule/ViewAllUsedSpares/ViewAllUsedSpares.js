import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faArrowLeft,
  faChevronLeft,
  faChevronRight,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import "./ViewAllUsedSpares.css";
import { format } from "date-fns";
import SpecificUsedSpareDetails from "../SpecificUsedSpareDetails/SpecificUsedSpareDetails";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewingSpare, setViewingSpare] = useState(null);

  const containerRef = useRef(null);

  const handleViewSpare = (spare) => {
    setViewingSpare(spare);
  };

  const filteredSpares = usedSparesData.filter(
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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const UsedSparesTable = ({ currentItems }) => (
    <div className="used-spares-table-container">
      <div className="used-spares-table-wrapper">
        <table className="used-spares-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Inventory ID</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Used On</th>
              <th>Vehicle No</th>
              <th>Driver Name</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((spare) => (
              <tr key={spare.orderId}>
                <td>{spare.orderId}</td>
                <td>{spare.inventoryId}</td>
                <td>{spare.itemName}</td>
                <td>{spare.quantity}</td>
                <td>{spare.usedOn}</td>
                <td>{spare.vehicleNo}</td>
                <td>{spare.driverName}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faEye}
                    className="view-icon"
                    onClick={() => handleViewSpare(spare)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="used-spares-pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="used-spares-pagination-button"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`used-spares-pagination-button ${
              currentPage === number ? "active" : ""
            }`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === pageNumbers.length}
          className="used-spares-pagination-button"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    );
  };

  return (
    <div className="used-spares-container" ref={containerRef}>
      <header className="used-spares-top-bar">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="used-spares-back-icon"
          onClick={onBack}
        />
        <h2>Used Spares Details</h2>
      </header>

      <main className="used-spares-main-content">
        <div className="used-spares-controls">
          <div className="used-spares-search-bar-container">
            <div className="used-spares-search-input-wrapper">
              <FontAwesomeIcon
                icon={faSearch}
                className="used-spares-search-icon"
              />
              <input
                type="text"
                className="used-spares-search-bar"
                placeholder="Search by Order ID, Item Name, Vehicle No, or Driver Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="used-spares-date">
            <input
              type="month"
              value={format(selectedDate, "yyyy-MM")}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
            />
          </div>
        </div>

        <UsedSparesTable currentItems={currentItems} />

        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={filteredSpares.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </main>

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
