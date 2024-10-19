import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faDownload,
  faPrint,
  faCheckCircle,
  faTimesCircle,
  faExclamationCircle,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./PaymentHistory.css";

const PaymentHistory = ({ student, onBack }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const paymentHistory = [
    {
      academicYear: "2024-25",
      totalFee: 5500,
      paidFee: 3000,
      pendingFee: 2500,
      term1: { amount: 1500, status: "Paid", date: "2024-01-15" },
      term2: { amount: 1500, status: "Paid", date: "2024-02-20" },
      term3: { amount: 1500, status: "Pending", date: "-" },
      amuletsFee: { amount: 1000, status: "Pending", date: "-" },
    },
    {
      academicYear: "2023-24",
      totalFee: 5500,
      paidFee: 5500,
      pendingFee: 0,
      term1: { amount: 1500, status: "Paid", date: "2023-01-10" },
      term2: { amount: 1500, status: "Paid", date: "2023-02-15" },
      term3: { amount: 1500, status: "Paid", date: "2023-03-20" },
      amuletsFee: { amount: 1000, status: "Paid", date: "2023-04-05" },
    },
    {
      academicYear: "2022-23",
      totalFee: 5000,
      paidFee: 5000,
      pendingFee: 0,
      term1: { amount: 1400, status: "Paid", date: "2022-01-05" },
      term2: { amount: 1400, status: "Paid", date: "2022-02-10" },
      term3: { amount: 1400, status: "Paid", date: "2022-03-15" },
      amuletsFee: { amount: 800, status: "Paid", date: "2022-04-01" },
    },
    {
      academicYear: "2021-22",
      totalFee: 4700,
      paidFee: 4700,
      pendingFee: 0,
      term1: { amount: 1350, status: "Paid", date: "2021-01-08" },
      term2: { amount: 1350, status: "Paid", date: "2021-02-12" },
      term3: { amount: 1300, status: "Paid", date: "2021-03-18" },
      amuletsFee: { amount: 700, status: "Paid", date: "2021-04-03" },
    },
  ];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = paymentHistory.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Paid":
        return (
          <FontAwesomeIcon icon={faCheckCircle} className="status-icon paid" />
        );
      case "Pending":
        return (
          <FontAwesomeIcon
            icon={faExclamationCircle}
            className="status-icon pending"
          />
        );
      default:
        return (
          <FontAwesomeIcon
            icon={faTimesCircle}
            className="status-icon unpaid"
          />
        );
    }
  };

  return (
    <div className="view-history-container">
      <header className="view-history-top-bar">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="view-history-back-button"
          onClick={onBack}
        />
        <h2>Payment History</h2>
      </header>

      <main className="view-history-main-content">
        <div className="view-history-actions">
          <button className="view-history-action-button">
            <FontAwesomeIcon icon={faDownload} /> Download
          </button>
          <button className="view-history-action-button">
            <FontAwesomeIcon icon={faPrint} /> Print
          </button>
        </div>
        <section className="view-history-student-info">
          <h2>{student.studentName}</h2>
          <p>
            Reg No: <span>{student.regNo}</span> | Roll No:{" "}
            <span>{student.rollNo}</span>
          </p>
          <p>
            Year/Department/Section:{" "}
            <span>
              {student.year} / {student.department} / {student.section}
            </span>
          </p>
          <p>
            Institute: <span>{student.instituteName}</span>
          </p>
        </section>

        <section className="view-history-payment-details">
          <div className="view-history-table-container">
            <div className="view-history-table-wrapper">
              <table className="view-history-table">
                <thead>
                  <tr>
                    <th>Academic Year</th>
                    <th>Total Fee</th>
                    <th>Paid Fee</th>
                    <th>Pending Fee</th>
                    <th>Term 1</th>
                    <th>Term 2</th>
                    <th>Term 3</th>
                    <th>Amulets Fee</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((year) => (
                    <tr key={year.academicYear}>
                      <td>{year.academicYear}</td>
                      <td>₹{year.totalFee}</td>
                      <td>₹{year.paidFee}</td>
                      <td>₹{year.pendingFee}</td>
                      <td>
                        <div className="term-status">
                          <span>₹{year.term1.amount}</span>
                          <span
                            className={`payment-status ${year.term1.status.toLowerCase()}`}
                          >
                            {getStatusIcon(year.term1.status)}{" "}
                            {year.term1.status}
                          </span>
                          <span>{year.term1.date}</span>
                        </div>
                      </td>
                      <td>
                        <div className="term-status">
                          <span>₹{year.term2.amount}</span>
                          <span
                            className={`payment-status ${year.term2.status.toLowerCase()}`}
                          >
                            {getStatusIcon(year.term2.status)}{" "}
                            {year.term2.status}
                          </span>
                          <span>{year.term2.date}</span>
                        </div>
                      </td>
                      <td>
                        <div className="term-status">
                          <span>₹{year.term3.amount}</span>
                          <span
                            className={`payment-status ${year.term3.status.toLowerCase()}`}
                          >
                            {getStatusIcon(year.term3.status)}{" "}
                            {year.term3.status}
                          </span>
                          <span>{year.term3.date}</span>
                        </div>
                      </td>
                      <td>
                        <div className="term-status">
                          <span>₹{year.amuletsFee.amount}</span>
                          <span
                            className={`payment-status ${year.amuletsFee.status.toLowerCase()}`}
                          >
                            {getStatusIcon(year.amuletsFee.status)}{" "}
                            {year.amuletsFee.status}
                          </span>
                          <span>{year.amuletsFee.date}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="view-history-pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="view-history-pagination-button"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            {Array.from({
              length: Math.ceil(paymentHistory.length / itemsPerPage),
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`view-history-pagination-button ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(paymentHistory.length / itemsPerPage)
              }
              className="view-history-pagination-button"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PaymentHistory;
