import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faArrowLeft,
  faChevronLeft,
  faChevronRight,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "./ViewFuelRecords.css";
import Button from "../../../../components/Shared/Button/Button";
import AddFuelRecord from "../AddFuelRecord/AddFuelRecord";

const initialFuelRecordsData = [
  {
    route: 1,
    driver: "Murugan S",
    filledLiter: 60,
    amount: 6254.0,
    dateTime: "25/07/2024 - 18:06:58",
    fuelType: "Petrol",
    billNumber: "BILL001",
    pricePerLiter: 104.23,
    fuelStationAddress: "123 Main St, City",
    vehicleId: "TN01AB1234",
    odometerReading: 45678,
    notes: "Regular refill",
  },
  {
    route: 2,
    driver: "Murugan S",
    filledLiter: 56,
    amount: 5801.0,
    dateTime: "26/07/2024 - 09:15:30",
    fuelType: "Diesel",
    billNumber: "BILL002",
    pricePerLiter: 103.59,
    fuelStationAddress: "456 Oak Rd, Town",
    vehicleId: "TN02CD5678",
    odometerReading: 78901,
    notes: "Filled up before long trip",
  },
  {
    route: 3,
    driver: "Kumar S",
    filledLiter: 55,
    amount: 5354.7,
    dateTime: "27/07/2024 - 14:30:45",
    fuelType: "Diesel",
    billNumber: "BILL003",
    pricePerLiter: 97.36,
    fuelStationAddress: "789 Pine Ave, Village",
    vehicleId: "TN03EF9012",
    odometerReading: 23456,
    notes: "Maintenance check done",
  },
  {
    route: 4,
    driver: "Murugan S",
    filledLiter: 43,
    amount: 3989.3,
    dateTime: "28/07/2024 - 11:45:22",
    fuelType: "Diesel",
    billNumber: "BILL004",
    pricePerLiter: 92.77,
    fuelStationAddress: "101 Elm St, Suburb",
    vehicleId: "TN04GH3456",
    odometerReading: 67890,
    notes: "Low fuel warning",
  },
  {
    route: 5,
    driver: "Murugan S",
    filledLiter: 54,
    amount: 5836.36,
    dateTime: "29/07/2024 - 16:20:10",
    fuelType: "Diesel",
    billNumber: "BILL005",
    pricePerLiter: 108.08,
    fuelStationAddress: "202 Maple Dr, District",
    vehicleId: "TN05IJ7890",
    odometerReading: 12345,
    notes: "Price hike noticed",
  },
  {
    route: 6,
    driver: "Kumar S",
    filledLiter: 66,
    amount: 6582.5,
    dateTime: "30/07/2024 - 08:30:15",
    fuelType: "Diesel",
    billNumber: "BILL006",
    pricePerLiter: 99.73,
    fuelStationAddress: "303 Birch Ln, County",
    vehicleId: "TN06KL1234",
    odometerReading: 56789,
    notes: "Full tank refill",
  },
  {
    route: 7,
    driver: "Murugan S",
    filledLiter: 44,
    amount: 4589.3,
    dateTime: "31/07/2024 - 13:40:50",
    fuelType: "Diesel",
    billNumber: "BILL007",
    pricePerLiter: 104.3,
    fuelStationAddress: "404 Cedar St, Borough",
    vehicleId: "TN07MN5678",
    odometerReading: 90123,
    notes: "Regular maintenance due",
  },
  {
    route: 8,
    driver: "Vel K",
    filledLiter: 51,
    amount: 5856.3,
    dateTime: "01/08/2024 - 10:55:30",
    fuelType: "Diesel",
    billNumber: "BILL008",
    pricePerLiter: 114.83,
    fuelStationAddress: "505 Walnut Ave, Township",
    vehicleId: "TN08OP9012",
    odometerReading: 34567,
    notes: "New driver assigned",
  },
  {
    route: 9,
    driver: "Raju S",
    filledLiter: 80,
    amount: 9856.3,
    dateTime: "02/08/2024 - 17:10:05",
    fuelType: "Diesel",
    billNumber: "BILL009",
    pricePerLiter: 123.2,
    fuelStationAddress: "606 Spruce Rd, Hamlet",
    vehicleId: "TN09QR3456",
    odometerReading: 78901,
    notes: "Long-distance trip completed",
  },
  {
    route: 10,
    driver: "Gokul K",
    filledLiter: 40,
    amount: 4586.3,
    dateTime: "03/08/2024 - 07:25:40",
    fuelType: "Diesel",
    billNumber: "BILL010",
    pricePerLiter: 114.66,
    fuelStationAddress: "707 Ash St, Village",
    vehicleId: "TN10ST7890",
    odometerReading: 23456,
    notes: "Partial fill-up",
  },
];

const ViewFuelRecords = ({ onBack }) => {
  const [fuelRecords, setFuelRecords] = useState(initialFuelRecordsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showAddFuelRecord, setShowAddFuelRecord] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setSelectedRecord(null);
    }
  };

  const filteredRecords = fuelRecords.filter(
    (record) =>
      record.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.route.toString().includes(searchTerm)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRecords.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEdit = () => {
    if (selectedRecord) {
      setEditingRecord(selectedRecord);
      setShowAddFuelRecord(true);
    }
  };

  const handleDelete = () => {
    if (selectedRecord) {
      setShowDeleteConfirmation(true);
    }
  };

  const confirmDelete = () => {
    setFuelRecords(fuelRecords.filter((record) => record !== selectedRecord));
    setShowDeleteConfirmation(false);
    setSelectedRecord(null);
  };

  const handleAddOrEditComplete = async (fuelRecord) => {
    if (fuelRecord) {
      try {
        // Simulate API call with a delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // If editing, update the existing record
        if (editingRecord) {
          // Here you would typically make an API call to update the record
          console.log("Updating record:", fuelRecord);
        } else {
          // Here you would typically make an API call to create a new record
          console.log("Creating new record:", fuelRecord);
        }

        // Return the saved/updated record to trigger the success toast
        return fuelRecord;
      } catch (error) {
        console.error("Error saving fuel record:", error);
        throw error; // Throw error to trigger error toast
      }
    }
    setShowAddFuelRecord(false);
    setEditingRecord(null);
    setSelectedRecord(null);
  };

  const handleRowClick = (record) => {
    setSelectedRecord(selectedRecord === record ? null : record);
  };

  const FuelRecordsTable = ({ currentItems }) => (
    <div className="view-fuel-records-table-container">
      <div className="view-fuel-records-table-wrapper">
        <table className="view-fuel-records-table">
          <thead>
            <tr>
              <th>Route</th>
              <th>Driver</th>
              <th>Filled Liter</th>
              <th>Amount</th>
              <th>Date & Time</th>
              <th>Fuel Type</th>
              <th>Bill Number</th>
              <th>Price/Liter</th>
              <th>Fuel Station</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((record, index) => (
              <tr
                key={index}
                onClick={() => handleRowClick(record)}
                className={selectedRecord === record ? "selected" : ""}
              >
                <td>{record.route}</td>
                <td>{record.driver}</td>
                <td>{record.filledLiter}</td>
                <td>{record.amount}</td>
                <td>{record.dateTime}</td>
                <td>{record.fuelType}</td>
                <td>{record.billNumber}</td>
                <td>{record.pricePerLiter}</td>
                <td>{record.fuelStationAddress}</td>
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
      <div className="view-fuel-records-pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="view-fuel-records-pagination-button"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`view-fuel-records-pagination-button ${
              currentPage === number ? "active" : ""
            }`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === pageNumbers.length}
          className="view-fuel-records-pagination-button"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    );
  };

  return (
    <div className="view-fuel-records-container" ref={containerRef}>
      {!showAddFuelRecord ? (
        <>
          <header className="view-fuel-records-top-bar">
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="view-fuel-records-back-icon"
              onClick={onBack}
            />
            <h2>Fuel Records</h2>
          </header>

          <main className="view-fuel-records-main-content">
            <div className="view-fuel-records-controls">
              <div className="view-fuel-records-search-bar-container">
                <div className="view-fuel-records-search-input-wrapper">
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="view-fuel-records-search-icon"
                  />
                  <input
                    type="text"
                    className="view-fuel-records-search-bar"
                    placeholder="Search by Driver or Route"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="view-fuel-records-action-buttons">
                <Button
                  label={
                    <>
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </>
                  }
                  onClick={handleEdit}
                  disabled={!selectedRecord}
                />
                <Button
                  label={
                    <>
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </>
                  }
                  onClick={handleDelete}
                  disabled={!selectedRecord}
                />
              </div>
              <div className="view-fuel-records-date">
                <input
                  type="month"
                  value={selectedDate.toISOString().slice(0, 7)}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                />
              </div>
            </div>

            <FuelRecordsTable currentItems={currentItems} />

            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={filteredRecords.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </main>

          {showDeleteConfirmation && (
            <div className="view-fuel-records-delete-confirmation-modal">
              <div className="view-fuel-records-delete-confirmation-content">
                <h3>Confirm Deletion</h3>
                <p>Are you sure you want to delete this fuel record?</p>
                <div className="view-fuel-records-delete-confirmation-buttons">
                  <button
                    onClick={() => setShowDeleteConfirmation(false)}
                    className="view-fuel-records-cancel-delete"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="view-fuel-records-confirm-delete"
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <AddFuelRecord
          onBack={() => {
            setShowAddFuelRecord(false);
            setEditingRecord(null);
          }}
          onSave={handleAddOrEditComplete}
          editingRecord={editingRecord}
        />
      )}
    </div>
  );
};

export default ViewFuelRecords;
