import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faDownload,
  faPrint,
  faCheckCircle,
  faTimesCircle,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./PaymentHistory.css";
import Button from "../../../../components/Shared/Button/Button";
import TopBar from "../../../../components/Shared/TopBar/TopBar";
import TableContainer from "../../../../components/Shared/TableContainer/TableContainer";
import Pagination from "../../../../components/Shared/Pagination/Pagination";

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

  const columns = [
    { key: "academicYear", label: "Academic Year" },
    { key: "totalFee", label: "Total Fee" },
    { key: "paidFee", label: "Paid Fee" },
    { key: "pendingFee", label: "Pending Fee" },
    { key: "term1", label: "Term 1" },
    { key: "term2", label: "Term 2" },
    { key: "term3", label: "Term 3" },
    { key: "amuletsFee", label: "Amulets Fee" },
  ];

  const rows = currentItems.map((year) => ({
    id: year.academicYear,
    data: {
      academicYear: year.academicYear,
      totalFee: `₹${year.totalFee}`,
      paidFee: `₹${year.paidFee}`,
      pendingFee: `₹${year.pendingFee}`,
      term1: (
        <div className="term-status">
          <span>₹{year.term1.amount}</span>
          <span className={`payment-status ${year.term1.status.toLowerCase()}`}>
            {getStatusIcon(year.term1.status)} {year.term1.status}
          </span>
          <span>{year.term1.date}</span>
        </div>
      ),
      term2: (
        <div className="term-status">
          <span>₹{year.term2.amount}</span>
          <span className={`payment-status ${year.term2.status.toLowerCase()}`}>
            {getStatusIcon(year.term2.status)} {year.term2.status}
          </span>
          <span>{year.term2.date}</span>
        </div>
      ),
      term3: (
        <div className="term-status">
          <span>₹{year.term3.amount}</span>
          <span className={`payment-status ${year.term3.status.toLowerCase()}`}>
            {getStatusIcon(year.term3.status)} {year.term3.status}
          </span>
          <span>{year.term3.date}</span>
        </div>
      ),
      amuletsFee: (
        <div className="term-status">
          <span>₹{year.amuletsFee.amount}</span>
          <span
            className={`payment-status ${year.amuletsFee.status.toLowerCase()}`}
          >
            {getStatusIcon(year.amuletsFee.status)} {year.amuletsFee.status}
          </span>
          <span>{year.amuletsFee.date}</span>
        </div>
      ),
    },
  }));

  return (
    <div className="view-history-container">
      <TopBar title="Payment History" onBack={onBack} backButton={true} />

      <main className="view-history-main-content">
        <div className="view-history-actions">
          <Button
            label={
              <>
                <FontAwesomeIcon icon={faDownload} /> Download
              </>
            }
            onClick={() => console.log("Download")}
            className="view-history-action-button"
          />
          <Button
            label={
              <>
                <FontAwesomeIcon icon={faPrint} /> Print
              </>
            }
            onClick={() => console.log("Print")}
            className="view-history-action-button"
          />
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

        <TableContainer headers={columns.map((col) => col.label)} rows={rows} />

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(paymentHistory.length / itemsPerPage)}
          onPageChange={paginate}
        />
      </main>
    </div>
  );
};

export default PaymentHistory;
