import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./ViewFuelRecords.css";
import Button from "../../../../components/Shared/Button/Button";
import AddFuelRecord from "../AddFuelRecord/AddFuelRecord";
import TopBar from "../../../../components/Shared/TopBar/TopBar"; // Assuming the correct path
import SearchBar from "../../../../components/Shared/SearchBar/SearchBar";
import TableContainer from "../../../../components/Shared/TableContainer/TableContainer";
import Pagination from "../../../../components/Shared/Pagination/Pagination";
import ConfirmationModal from "../../../../components/Shared/ConfirmationModal/ConfirmationModal";
import ToastNotification, {
  showToast,
} from "../../../../components/Shared/ToastNotification/ToastNotification";

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

  const [selectedRecords, setSelectedRecords] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showAddFuelRecord, setShowAddFuelRecord] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setSelectedRecords([]);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const filteredRecords = fuelRecords.filter(
    (record) =>
      record.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.route.toString().includes(searchTerm)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRecords.slice(indexOfFirstItem, indexOfLastItem);

  const handleEdit = () => {
    if (selectedRecords.length === 1) {
      const recordToEdit = fuelRecords.find(
        (record) => record.route === selectedRecords[0]
      );
      setEditingRecord(recordToEdit);
      setShowAddFuelRecord(true);
    } else {
      showToast("warn", "Please select a single record to edit.");
    }
  };

  const handleDelete = () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    try {
      // Update the fuel records by removing the selected ones
      const updatedRecords = fuelRecords.filter(
        (record) => !selectedRecords.includes(record.route)
      );
      setFuelRecords(updatedRecords);

      // Reset selected records and close the confirmation modal
      setSelectedRecords([]);
      setShowDeleteConfirmation(false);

      // Show success toast
      showToast("success", "Selected record(s) deleted successfully!");
    } catch (error) {
      console.error("Error deleting records:", error);
      showToast("error", "Failed to delete records. Please try again.");
    }
  };

  const handleAddOrEditComplete = async (fuelRecord) => {
    if (fuelRecord) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setFuelRecords((prevRecords) => {
          if (editingRecord) {
            return prevRecords.map((record) =>
              record.route === editingRecord.route ? fuelRecord : record
            );
          }
          return [...prevRecords, fuelRecord];
        });
        setShowAddFuelRecord(false);
        setEditingRecord(null);
        setSelectedRecords([]);
      } catch (error) {
        console.error("Error saving fuel record:", error);
      }
    }
  };

  const handleRowClick = (recordId) => {
    setSelectedRecords((prevSelected) =>
      prevSelected.includes(recordId)
        ? prevSelected.filter((id) => id !== recordId)
        : [...prevSelected, recordId]
    );
  };

  const handleSelectAll = () => {
    if (selectedRecords.length === currentItems.length) {
      setSelectedRecords([]); // Deselect all
    } else {
      setSelectedRecords(currentItems.map((record) => record.route)); // Select all
    }
  };

  const isSelectAllChecked = selectedRecords.length === currentItems.length;
  const isSelectAllIndeterminate =
    selectedRecords.length > 0 && selectedRecords.length < currentItems.length;

  return (
    <div className="view-fuel-records-container" ref={containerRef}>
      <ToastNotification />
      {!showAddFuelRecord ? (
        <>
          <TopBar title="Fuel Records" onBack={onBack} backButton={true} />

          <main className="view-fuel-records-main-content">
            <div className="view-fuel-records-controls">
              <SearchBar
                placeholder="Search by Driver or Route"
                onSearch={(value) => setSearchTerm(value)}
              />
              <div className="view-fuel-records-action-buttons">
                <Button
                  label={
                    <>
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </>
                  }
                  onClick={handleEdit}
                  disabled={selectedRecords.length !== 1}
                />
                <Button
                  label={
                    <>
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </>
                  }
                  onClick={handleDelete}
                  disabled={selectedRecords.length === 0}
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

            <TableContainer
              headers={[
                <label className="custom-checkbox">
                  <input
                    type="checkbox"
                    checked={isSelectAllChecked}
                    ref={(el) =>
                      el && (el.indeterminate = isSelectAllIndeterminate)
                    }
                    onChange={handleSelectAll}
                  />
                  <span className="checkbox-checkmark"></span>
                </label>,
                "Route",
                "Driver",
                "Filled Liter",
                "Amount",
                "Date & Time",
                "Fuel Type",
                "Bill Number",
                "Price/Liter",
                "Fuel Station",
              ]}
              rows={currentItems.map((record) => ({
                id: record.route,
                data: {
                  select: (
                    <label className="custom-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedRecords.includes(record.route)}
                        onChange={() => handleRowClick(record.route)}
                      />
                      <span className="checkbox-checkmark"></span>
                    </label>
                  ),
                  route: record.route,
                  driver: record.driver,
                  filledLiter: record.filledLiter,
                  amount: record.amount,
                  dateTime: record.dateTime,
                  fuelType: record.fuelType,
                  billNumber: record.billNumber,
                  pricePerLiter: record.pricePerLiter,
                  fuelStation: record.fuelStationAddress,
                },
              }))}
              onRowClick={(row) => handleRowClick(row.id)}
              selectedRowId={selectedRecords}
            />

            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredRecords.length / itemsPerPage)}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </main>

          {showDeleteConfirmation && (
            <ConfirmationModal
              title="Confirm Deletion"
              message="Are you sure you want to delete the selected record(s)?"
              onCancel={() => setShowDeleteConfirmation(false)}
              onConfirm={confirmDelete}
            />
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
