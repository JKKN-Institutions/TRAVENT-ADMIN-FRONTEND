import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faChevronDown,
  faEdit,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./UpdateBusFee.css";
import AddBusFee from "../AddBusFee/AddBusFee";
import Button from "../../../../components/Shared/Button/Button";

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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleRowSelect = (index) => {
    setSelectedRow(index === selectedRow ? null : index);
  };

  const handleEditClick = () => {
    if (selectedRow !== null) {
      setShowAddBusFee(true);
    }
  };

  const handleSave = (updatedData) => {
    if (selectedRow !== null) {
      const updatedBusFeeData = [...busFeeData];
      updatedBusFeeData[selectedRow] = updatedData;
      setBusFeeData(updatedBusFeeData);
    } else {
      setBusFeeData([...busFeeData, updatedData]);
    }
    setShowAddBusFee(false);
    setSelectedRow(null);
  };

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
      <header className="update-bus-fee-top-bar">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="update-bus-fee-back-icon"
          onClick={onBack}
        />
        <h2>Update Bus Fee</h2>
      </header>

      <main className="update-bus-fee-main-content">
        <div className="update-bus-fee-controls">
          <div className="update-bus-fee-institute-selector">
            <label>Select Institute</label>
            <div className="select-wrapper">
              <select
                value={selectedInstitute}
                onChange={(e) => setSelectedInstitute(e.target.value)}
              >
                <option value="JKKN Arts and Science">
                  JKKN Arts and Science
                </option>
                {/* Add more institute options here */}
              </select>
              <FontAwesomeIcon icon={faChevronDown} className="select-icon" />
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

        <div className="update-bus-fee-table-container">
          <div className="update-bus-fee-table-wrapper">
            <table className="update-bus-fee-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Academic Year</th>
                  <th>Institute</th>
                  <th>Total Bus Fee</th>
                  <th>Term Selection</th>
                  <th>Duration</th>
                  <th>Term-wise Payment</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr
                    key={index}
                    onClick={() => handleRowSelect(indexOfFirstItem + index)}
                    className={
                      selectedRow === indexOfFirstItem + index ? "selected" : ""
                    }
                  >
                    <td>{indexOfFirstItem + index + 1}</td>
                    <td>{item.academicYear}</td>
                    <td>{item.institute}</td>
                    <td>₹{item.totalBusFee}</td>
                    <td>
                      <div className="term-selection">
                        {Object.entries(item.termSelection).map(
                          ([term, selected]) => (
                            <span
                              key={term}
                              className={`term-badge ${
                                selected ? "selected" : ""
                              }`}
                            >
                              {term.charAt(0).toUpperCase() + term.slice(1)}
                            </span>
                          )
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="duration-info">
                        {Object.entries(item.duration).map(
                          ([term, { start, end }]) => (
                            <div key={term} className="duration-item">
                              <span className="duration-term">
                                {term.charAt(0).toUpperCase() + term.slice(1)}:
                              </span>
                              <span className="duration-dates">
                                {start} to {end}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="payment-info">
                        {Object.entries(item.termWisePayment).map(
                          ([term, { amount, dueDate }]) => (
                            <div key={term} className="payment-item">
                              <span className="payment-term">
                                {term.charAt(0).toUpperCase() + term.slice(1)}:
                              </span>
                              <span className="payment-amount">₹{amount}</span>
                              <span className="payment-due-date">
                                Due: {dueDate}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="update-bus-fee-pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="update-bus-fee-pagination-button"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          {Array.from({
            length: Math.ceil(busFeeData.length / itemsPerPage),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`update-bus-fee-pagination-button ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(busFeeData.length / itemsPerPage)
            }
            className="update-bus-fee-pagination-button"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </main>
    </div>
  );
};

export default UpdateBusFee;
