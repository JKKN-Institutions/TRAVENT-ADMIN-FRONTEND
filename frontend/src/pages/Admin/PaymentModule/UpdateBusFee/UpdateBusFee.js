import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import "./UpdateBusFee.css";
import AddBusFee from "../AddBusFee/AddBusFee";
import Button from "../../../../components/Shared/Button/Button";
import TopBar from "../../../../components/Shared/TopBar/TopBar";
import TableContainer from "../../../../components/Shared/TableContainer/TableContainer";
import Pagination from "../../../../components/Shared/Pagination/Pagination";

const UpdateBusFee = ({ onBack }) => {
  const [selectedInstitute, setSelectedInstitute] = useState(
    "JKKN Arts and Science"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showAddBusFee, setShowAddBusFee] = useState(false);
  const [busFeeData, setBusFeeData] = useState([
    {
      academicYear: "2021-22",
      institute: "JKKN Arts and Science",
      totalBusFee: 4500,
      termSelection: { term1: true, term2: true, term3: true },
      duration: {
        term1: { start: "2021-06-01", end: "2021-09-30" },
        term2: { start: "2021-10-01", end: "2021-12-31" },
        term3: { start: "2022-01-01", end: "2022-03-31" },
      },
      termWisePayment: {
        term1: { amount: 1500, dueDate: "2021-06-15" },
        term2: { amount: 1500, dueDate: "2021-10-15" },
        term3: { amount: 1500, dueDate: "2022-01-15" },
      },
    },
    {
      academicYear: "2022-23",
      institute: "JKKN College of Engineering",
      totalBusFee: 5000,
      termSelection: { term1: true, term2: true, term3: false },
      duration: {
        term1: { start: "2022-06-01", end: "2022-09-30" },
        term2: { start: "2022-10-01", end: "2022-12-31" },
        term3: { start: "2023-01-01", end: "2023-03-31" },
      },
      termWisePayment: {
        term1: { amount: 2500, dueDate: "2022-06-15" },
        term2: { amount: 2500, dueDate: "2022-10-15" },
        term3: { amount: 0, dueDate: "" },
      },
    },
    {
      academicYear: "2023-24",
      institute: "JKKN School of Management",
      totalBusFee: 4800,
      termSelection: { term1: true, term2: true, term3: true },
      duration: {
        term1: { start: "2023-06-01", end: "2023-09-30" },
        term2: { start: "2023-10-01", end: "2023-12-31" },
        term3: { start: "2024-01-01", end: "2024-03-31" },
      },
      termWisePayment: {
        term1: { amount: 1600, dueDate: "2023-06-15" },
        term2: { amount: 1600, dueDate: "2023-10-15" },
        term3: { amount: 1600, dueDate: "2024-01-15" },
      },
    },
    {
      academicYear: "2024-25",
      institute: "JKKN Institute of Technology",
      totalBusFee: 5200,
      termSelection: { term1: true, term2: false, term3: true },
      duration: {
        term1: { start: "2024-06-01", end: "2024-09-30" },
        term2: { start: "2024-10-01", end: "2024-12-31" },
        term3: { start: "2025-01-01", end: "2025-03-31" },
      },
      termWisePayment: {
        term1: { amount: 2600, dueDate: "2024-06-15" },
        term2: { amount: 0, dueDate: "" },
        term3: { amount: 2600, dueDate: "2025-01-15" },
      },
    },
    {
      academicYear: "2025-26",
      institute: "JKKN Medical College",
      totalBusFee: 6000,
      termSelection: { term1: true, term2: true, term3: true },
      duration: {
        term1: { start: "2025-06-01", end: "2025-09-30" },
        term2: { start: "2025-10-01", end: "2025-12-31" },
        term3: { start: "2026-01-01", end: "2026-03-31" },
      },
      termWisePayment: {
        term1: { amount: 2000, dueDate: "2025-06-15" },
        term2: { amount: 2000, dueDate: "2025-10-15" },
        term3: { amount: 2000, dueDate: "2026-01-15" },
      },
    },
  ]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = busFeeData.slice(indexOfFirstItem, indexOfLastItem);

  const handleRowSelect = (row) => {
    setSelectedRow(selectedRow === row.id ? null : row.id);
  };

  const handleEditClick = () => {
    if (selectedRow !== null) {
      setShowAddBusFee(true);
    }
  };

  const handleSave = (updatedData) => {
    if (selectedRow !== null) {
      setBusFeeData((prevData) =>
        prevData.map((item, index) =>
          index === selectedRow ? updatedData : item
        )
      );
    } else {
      setBusFeeData([...busFeeData, updatedData]);
    }
    setShowAddBusFee(false);
    setSelectedRow(null);
  };

  const headers = [
    "S.No",
    "Academic Year",
    "Institute",
    "Total Bus Fee",
    "Term Selection",
    "Duration",
    "Term-wise Payment",
  ];

  const rows = currentItems.map((item, index) => ({
    id: indexOfFirstItem + index,
    data: {
      "S.No": indexOfFirstItem + index + 1,
      "Academic Year": item.academicYear,
      Institute: item.institute,
      "Total Bus Fee": `₹${item.totalBusFee}`,
      "Term Selection": (
        <div className="term-selection">
          {Object.entries(item.termSelection).map(([term, selected]) => (
            <span
              key={term}
              className={`term-badge ${selected ? "selected" : ""}`}
            >
              {term.charAt(0).toUpperCase() + term.slice(1)}
            </span>
          ))}
        </div>
      ),
      Duration: (
        <div className="duration-info">
          {Object.entries(item.duration).map(([term, { start, end }]) => (
            <div key={term} className="duration-item">
              <span className="duration-term">
                {term.charAt(0).toUpperCase() + term.slice(1)}:
              </span>
              <span className="duration-dates">
                {start} to {end}
              </span>
            </div>
          ))}
        </div>
      ),
      "Term-wise Payment": (
        <div className="payment-info">
          {Object.entries(item.termWisePayment).map(
            ([term, { amount, dueDate }]) => (
              <div key={term} className="payment-item">
                <span className="payment-term">
                  {term.charAt(0).toUpperCase() + term.slice(1)}:
                </span>
                <span className="payment-amount">₹{amount}</span>
                <span className="payment-due-date">Due: {dueDate}</span>
              </div>
            )
          )}
        </div>
      ),
    },
  }));

  if (showAddBusFee) {
    return (
      <AddBusFee
        busFeeData={selectedRow !== null ? busFeeData[selectedRow] : null}
        onBack={() => setShowAddBusFee(false)}
        onSave={handleSave}
      />
    );
  }

  return (
    <div className="update-bus-fee-container">
      <TopBar title="Update Bus Fee" onBack={onBack} backButton={true} />
      <main className="update-bus-fee-main-content">
        <div className="update-bus-fee-controls">
          <div className="update-bus-fee-institute-selector">
            <div className="update-bus-fee-select-wrapper">
              <select
                value={selectedInstitute}
                onChange={(e) => setSelectedInstitute(e.target.value)}
              >
                <option value="College Name">College Name</option>
                <option value="JKKN Arts and Science">
                  JKKN Arts and Science
                </option>
              </select>
            </div>
          </div>

          <Button
            label={
              <>
                <FontAwesomeIcon icon={faEdit} /> Edit
              </>
            }
            onClick={handleEditClick}
            disabled={selectedRow === null}
          />
        </div>

        <TableContainer
          headers={headers}
          rows={rows}
          onRowClick={handleRowSelect}
          selectedRowId={selectedRow}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(busFeeData.length / itemsPerPage)}
          onPageChange={setCurrentPage}
        />
      </main>
    </div>
  );
};

export default UpdateBusFee;
