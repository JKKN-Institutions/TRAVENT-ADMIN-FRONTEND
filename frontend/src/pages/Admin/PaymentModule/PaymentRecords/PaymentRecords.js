import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faSearch,
  faFilter,
  faChevronLeft,
  faChevronRight,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import "./PaymentRecords.css";
import PaymentHistory from "../PaymentHistory/PaymentHistory";
import Button from "../../../../components/Shared/Button/Button";

const paymentRecordsData = [
  {
    "S.No": 1,
    studentName: "Aishu J",
    regNo: "611220104123",
    rollNo: "2k24AHS157",
    year: "IV",
    department: "AHS",
    section: "A",
    instituteName: "JKKN College of Allied Health Sciences",
    routeNo: "15",
    stopName: "Seelanayakkampatti Bypass",
    academicYear: "2024-25",
    actualFee: 4500,
    amuletsFee: 1000,
    added: "Not Paid",
    term1: "Not Paid",
    term2: "Not Paid",
    term3: "Not Paid",
    amulets: "Not Paid",
    total: 5500,
    pendingFee: 4500,
    status: "Unpaid",
  },
  {
    "S.No": 2,
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
    actualFee: 4500,
    amuletsFee: 1000,
    added: "Not Paid",
    term1: "Not Paid",
    term2: "Not Paid",
    term3: "Not Paid",
    amulets: "Not Paid",
    total: 5500,
    pendingFee: 4500,
    status: "Unpaid",
  },
  {
    "S.No": 3,
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
    actualFee: 4500,
    amuletsFee: 0,
    added: "Not Paid",
    term1: "Not Paid",
    term2: "Not Paid",
    term3: "Not Paid",
    amulets: "Not Paid",
    total: 4500,
    pendingFee: 4500,
    status: "Unpaid",
  },
  {
    "S.No": 4,
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
    actualFee: 4500,
    amuletsFee: 0,
    added: "Not Paid",
    term1: "Not Paid",
    term2: "Not Paid",
    term3: "Not Paid",
    amulets: "Not Paid",
    total: 4500,
    pendingFee: 4500,
    status: "Unpaid",
  },
  {
    "S.No": 5,
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
    actualFee: 4500,
    amuletsFee: 0,
    added: "Paid",
    term1: "Not Paid",
    term2: "Not Paid",
    term3: "Not Paid",
    amulets: "Not Paid",
    total: 4500,
    pendingFee: 3000,
    status: "Unpaid",
  },
  {
    "S.No": 6,
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
    actualFee: 4500,
    amuletsFee: 0,
    added: "Paid",
    term1: "Paid",
    term2: "Not Paid",
    term3: "Not Paid",
    amulets: "Not Paid",
    total: 4500,
    pendingFee: 1500,
    status: "Unpaid",
  },
  {
    "S.No": 7,
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
    actualFee: 4500,
    amuletsFee: 0,
    added: "Paid",
    term1: "Paid",
    term2: "Not Paid",
    term3: "Not Paid",
    amulets: "Not Paid",
    total: 4500,
    pendingFee: 1500,
    status: "Unpaid",
  },
  {
    "S.No": 8,
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
    actualFee: 4500,
    amuletsFee: 0,
    added: "Paid",
    term1: "Paid",
    term2: "Not Paid",
    term3: "Not Paid",
    amulets: "Not Paid",
    total: 4500,
    pendingFee: 1500,
    status: "Unpaid",
  },
  {
    "S.No": 9,
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
    actualFee: 4500,
    amuletsFee: 0,
    added: "Not Paid",
    term1: "Not Paid",
    term2: "Not Paid",
    term3: "Not Paid",
    amulets: "Not Paid",
    total: 4500,
    pendingFee: 4500,
    status: "Unpaid",
  },
  {
    "S.No": 10,
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
    actualFee: 4500,
    amuletsFee: 1000,
    added: "Paid",
    term1: "Not Paid",
    term2: "Not Paid",
    term3: "Not Paid",
    amulets: "Not Paid",
    total: 5500,
    pendingFee: 3000,
    status: "Unpaid",
  },
  {
    "S.No": 11,
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
    actualFee: 4500,
    amuletsFee: 0,
    added: "Paid",
    term1: "Not Paid",
    term2: "Not Paid",
    term3: "Not Paid",
    amulets: "Not Paid",
    total: 4500,
    pendingFee: 3000,
    status: "Unpaid",
  },
  {
    "S.No": 12,
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
    actualFee: 4500,
    amuletsFee: 1000,
    added: "Paid",
    term1: "Not Paid",
    term2: "Not Paid",
    term3: "Not Paid",
    amulets: "Not Paid",
    total: 5500,
    pendingFee: 3000,
    status: "Unpaid",
  },
  {
    "S.No": 13,
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
    actualFee: 4500,
    amuletsFee: 0,
    added: "Not Paid",
    term1: "Not Paid",
    term2: "Not Paid",
    term3: "Not Paid",
    amulets: "Not Paid",
    total: 4500,
    pendingFee: 4500,
    status: "Unpaid",
  },
  {
    "S.No": 14,
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
    actualFee: 4500,
    amuletsFee: 0,
    added: "Paid",
    term1: "Not Paid",
    term2: "Not Paid",
    term3: "Not Paid",
    amulets: "Not Paid",
    total: 4500,
    pendingFee: 3000,
    status: "Unpaid",
  },
];

const PaymentRecords = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filteredRecords, setFilteredRecords] = useState(paymentRecordsData);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [filters, setFilters] = useState({
    route: "",
    year: "",
    department: "",
    status: "",
  });

  useEffect(() => {
    const results = paymentRecordsData.filter(
      (record) =>
        record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.regNo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRecords(results);
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    const results = paymentRecordsData.filter((record) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return (
          record[key] && record[key].toLowerCase().includes(value.toLowerCase())
        );
      });
    });
    setFilteredRecords(results);
    setCurrentPage(1);
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRecords.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getUniqueValues = (key) => {
    return [...new Set(paymentRecordsData.map((record) => record[key]))];
  };

  const handleViewHistory = (student) => {
    setSelectedStudent(student);
  };

  if (selectedStudent) {
    return (
      <PaymentHistory
        student={selectedStudent}
        onBack={() => setSelectedStudent(null)}
      />
    );
  }

  return (
    <div className="payment-records-container">
      <header className="payment-records-top-bar">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="payment-records-back-icon"
          onClick={onBack}
        />
        <h2>Payment Records</h2>
      </header>

      <main className="payment-records-main-content">
        <div className="payment-records-actions">
          <div className="payment-records-search-container">
            <div className="payment-records-search-input-wrapper">
              <FontAwesomeIcon
                icon={faSearch}
                className="payment-records-search-icon"
              />
              <input
                type="text"
                className="payment-records-search-bar"
                placeholder="Search by Name or Reg No"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="payment-records-action-buttons">
            <Button
              label={
                <>
                  <FontAwesomeIcon icon={faFilter} /> Filter by
                </>
              }
              onClick={() => setShowFilters(!showFilters)}
              className="payment-records-filter-button"
            />
          </div>
        </div>

        {showFilters && (
          <div className="payment-records-filters">
            <select
              name="route"
              value={filters.route}
              onChange={handleFilterChange}
            >
              <option value="">Route</option>
              {getUniqueValues("routeNo").map((route) => (
                <option key={route} value={route}>
                  {route}
                </option>
              ))}
            </select>
            <select
              name="year"
              value={filters.year}
              onChange={handleFilterChange}
            >
              <option value="">Year</option>
              {getUniqueValues("year").map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <select
              name="department"
              value={filters.department}
              onChange={handleFilterChange}
            >
              <option value="">Department</option>
              {getUniqueValues("department").map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="">Status</option>
              {getUniqueValues("status").map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="payment-records-table-container">
          <div className="payment-records-table-wrapper">
            <table className="payment-records-table">
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
                  <th>Actual Fee</th>
                  <th>Amulets Fee</th>
                  <th>Added</th>
                  <th>Term 1</th>
                  <th>Term 2</th>
                  <th>Term 3</th>
                  <th>Amulets</th>
                  <th>Total</th>
                  <th>Pending Fee</th>
                  <th>Status</th>
                  <th>View History</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((record, index) => (
                  <tr key={record["S.No"]}>
                    <td>{indexOfFirstItem + index + 1}</td>
                    <td>{record.studentName}</td>
                    <td>{record.regNo}</td>
                    <td>{record.rollNo}</td>
                    <td>{record.year}</td>
                    <td>{record.department}</td>
                    <td>{record.section}</td>
                    <td>{record.instituteName}</td>
                    <td>{record.routeNo}</td>
                    <td>{record.stopName}</td>
                    <td>{record.academicYear}</td>
                    <td>{record.actualFee}</td>
                    <td>{record.amuletsFee}</td>
                    <td>{record.added}</td>
                    <td>{record.term1}</td>
                    <td>{record.term2}</td>
                    <td>{record.term3}</td>
                    <td>{record.amulets}</td>
                    <td>{record.total}</td>
                    <td>{record.pendingFee}</td>
                    <td>{record.status}</td>
                    <td>
                      <span
                        className="view-history-link"
                        onClick={() => handleViewHistory(record)}
                      >
                        <FontAwesomeIcon icon={faEye} /> View
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="payment-records-pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="payment-records-pagination-button"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          {Array.from({
            length: Math.ceil(filteredRecords.length / itemsPerPage),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`payment-records-pagination-button ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(filteredRecords.length / itemsPerPage)
            }
            className="payment-records-pagination-button"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </main>
    </div>
  );
};

export default PaymentRecords;
