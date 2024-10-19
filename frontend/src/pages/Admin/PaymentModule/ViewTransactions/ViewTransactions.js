import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faArrowLeft,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./ViewTransactions.css";

const transactionsData = [
  {
    sNo: 1,
    studentName: "Aishu J",
    regNo: "611220104123",
    rollNo: "2k24AHS157",
    year: "I",
    department: "AHS",
    section: "A",
    instituteName: "JKKN College of Allied Health Sciences",
    routeNo: "15",
    stopName: "Seelanayakkampatti Bypass",
    academicYear: "2024-25",
    paidAmount: 3000,
    balanceAmount: 3000,
  },
  {
    sNo: 2,
    studentName: "Arun S",
    regNo: "611220104145",
    rollNo: "2k22BP135",
    year: "III",
    department: "B.PHARM",
    section: "A",
    instituteName: "JKKN College of Pharmacy",
    routeNo: "15",
    stopName: "Kakapalayam",
    academicYear: "2024-25",
    paidAmount: 3000,
    balanceAmount: 3000,
  },
  {
    sNo: 3,
    studentName: "Balagi G",
    regNo: "611220104134",
    rollNo: "2k20PD159",
    year: "V",
    department: "PHARM D",
    section: "B",
    instituteName: "JKKN College of Pharmacy",
    routeNo: "1",
    stopName: "Thiruvagowndanoor Bypass",
    academicYear: "2024-25",
    paidAmount: 3000,
    balanceAmount: 3000,
  },
  {
    sNo: 4,
    studentName: "Gobi U",
    regNo: "611220104185",
    rollNo: "2k21CSE152",
    year: "IV",
    department: "CSE",
    section: "B",
    instituteName: "JKKN College of Engineering & Technology",
    routeNo: "5",
    stopName: "Kakapalayam",
    academicYear: "2024-25",
    paidAmount: 3000,
    balanceAmount: 3000,
  },
  {
    sNo: 5,
    studentName: "Gopal O",
    regNo: "611220104198",
    rollNo: "2k24EEE165",
    year: "I",
    department: "EEE",
    section: "C",
    instituteName: "JKKN College of Engineering & Technology",
    routeNo: "7",
    stopName: "Seelanayakkampatti Bypass",
    academicYear: "2024-25",
    paidAmount: 3000,
    balanceAmount: 3000,
  },
  {
    sNo: 6,
    studentName: "Gowtham R",
    regNo: "611220104165",
    rollNo: "2k24AHS155",
    year: "I",
    department: "AHS",
    section: "A",
    instituteName: "JKKN College of Allied Health Sciences",
    routeNo: "15",
    stopName: "Kanthampatti Bypass",
    academicYear: "2024-25",
    paidAmount: 3000,
    balanceAmount: 3000,
  },
  {
    sNo: 7,
    studentName: "Jaya V",
    regNo: "611220104176",
    rollNo: "2k24ECE163",
    year: "I",
    department: "ECE",
    section: "B",
    instituteName: "JKKN College of Engineering & Technology",
    routeNo: "15",
    stopName: "Ariyanoor",
    academicYear: "2024-25",
    paidAmount: 3000,
    balanceAmount: 3000,
  },
  {
    sNo: 8,
    studentName: "Karthik L",
    regNo: "611220104187",
    rollNo: "2k23IT151",
    year: "II",
    department: "IT",
    section: "B",
    instituteName: "JKKN College of Engineering & Technology",
    routeNo: "9",
    stopName: "Kanthampatti Bypass",
    academicYear: "2024-25",
    paidAmount: 3000,
    balanceAmount: 3000,
  },
  {
    sNo: 9,
    studentName: "Keerthi S",
    regNo: "611220104182",
    rollNo: "2k21IT111",
    year: "IV",
    department: "IT",
    section: "A",
    instituteName: "JKKN College of Engineering & Technology",
    routeNo: "8",
    stopName: "Kondalampatty Bypass",
    academicYear: "2024-25",
    paidAmount: 3000,
    balanceAmount: 3000,
  },
  {
    sNo: 10,
    studentName: "Kumar S",
    regNo: "611220104194",
    rollNo: "2k23CSE134",
    year: "II",
    department: "CSE",
    section: "A",
    instituteName: "JKKN College of Engineering & Technology",
    routeNo: "17",
    stopName: "Gowndanoor",
    academicYear: "2024-25",
    paidAmount: 3000,
    balanceAmount: 3000,
  },
  {
    sNo: 11,
    studentName: "Prem K",
    regNo: "611220104113",
    rollNo: "2k22BP132",
    year: "III",
    department: "B.PHARM",
    section: "A",
    instituteName: "JKKN College of Pharmacy",
    routeNo: "24",
    stopName: "Magundanjavadi",
    academicYear: "2024-25",
    paidAmount: 3000,
    balanceAmount: 3000,
  },
  {
    sNo: 12,
    studentName: "Sanjay J",
    regNo: "611220104157",
    rollNo: "2k23EEE162",
    year: "II",
    department: "EEE",
    section: "C",
    instituteName: "JKKN College of Engineering & Technology",
    routeNo: "17",
    stopName: "Kakapalayam",
    academicYear: "2024-25",
    paidAmount: 3000,
    balanceAmount: 3000,
  },
  {
    sNo: 13,
    studentName: "Senthil S",
    regNo: "611220104119",
    rollNo: "2k24AHS124",
    year: "I",
    department: "AHS",
    section: "A",
    instituteName: "JKKN College of Allied Health Sciences",
    routeNo: "8",
    stopName: "Thiruvagowndanoor Bypass",
    academicYear: "2024-25",
    paidAmount: 3000,
    balanceAmount: 3000,
  },
  {
    sNo: 14,
    studentName: "Snekha H",
    regNo: "611220104196",
    rollNo: "2k20PD155",
    year: "V",
    department: "PHARM D",
    section: "B",
    instituteName: "JKKN College of Pharmacy",
    routeNo: "15",
    stopName: "Seelanayakkampatti Bypass",
    academicYear: "2024-25",
    paidAmount: 3000,
    balanceAmount: 3000,
  },
];

const ViewTransactions = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const filteredTransactions = transactionsData.filter(
    (transaction) =>
      transaction.studentName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.regNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTransactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredTransactions.length / itemsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <div className="view-transactions-container">
      <header className="view-transactions-top-bar">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="view-transactions-back-icon"
          onClick={onBack}
        />
        <h2>View Transactions</h2>
      </header>

      <main className="view-transactions-main-content">
        <div className="view-transactions-controls">
          <div className="view-transactions-search-bar-container">
            <div className="view-transactions-search-input-wrapper">
              <FontAwesomeIcon
                icon={faSearch}
                className="view-transactions-search-icon"
              />
              <input
                type="text"
                className="view-transactions-search-bar"
                placeholder="Search by Student Name, Reg No, or Roll No"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="view-transactions-date">
            <input
              type="date"
              value={selectedDate.toISOString().split("T")[0]}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
            />
          </div>
        </div>
        <div className="view-transactions-table-container">
          <div className="view-transactions-table-wrapper">
            <table className="view-transactions-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Student Name</th>
                  <th>Reg No</th>
                  <th>Roll No</th>
                  <th>Year</th>
                  <th>Department</th>
                  <th>Section</th>
                  <th>Institute Name</th>
                  <th>Route No</th>
                  <th>Stop Name</th>
                  <th>Academic Year</th>
                  <th>Paid Amount</th>
                  <th>Balance Amount</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((transaction, index) => (
                  <tr key={transaction.sNo}>
                    <td>{indexOfFirstItem + index + 1}</td>
                    <td>{transaction.studentName}</td>
                    <td>{transaction.regNo}</td>
                    <td>{transaction.rollNo}</td>
                    <td>{transaction.year}</td>
                    <td>{transaction.department}</td>
                    <td>{transaction.section}</td>
                    <td>{transaction.instituteName}</td>
                    <td>{transaction.routeNo}</td>
                    <td>{transaction.stopName}</td>
                    <td>{transaction.academicYear}</td>
                    <td>{transaction.paidAmount}</td>
                    <td>{transaction.balanceAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="view-transactions-pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="view-transactions-pagination-button"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`view-transactions-pagination-button ${
                currentPage === number ? "active" : ""
              }`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === pageNumbers.length}
            className="view-transactions-pagination-button"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </main>
    </div>
  );
};

export default ViewTransactions;
