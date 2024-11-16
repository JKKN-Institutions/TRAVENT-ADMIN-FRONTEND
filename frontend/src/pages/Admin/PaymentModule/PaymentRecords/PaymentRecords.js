import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faEye } from "@fortawesome/free-solid-svg-icons";
import "./PaymentRecords.css";
import PaymentHistory from "../PaymentHistory/PaymentHistory";
import Button from "../../../../components/Shared/Button/Button";
import TopBar from "../../../../components/Shared/TopBar/TopBar";
import SearchBar from "../../../../components/Shared/SearchBar/SearchBar";
import TableContainer from "../../../../components/Shared/TableContainer/TableContainer";
import Pagination from "../../../../components/Shared/Pagination/Pagination";

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
    const filterRecords = () => {
      const filteredBySearch = paymentRecordsData.filter(
        (record) =>
          record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.regNo.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const filteredByFilters = filteredBySearch.filter((record) =>
        Object.entries(filters).every(([key, value]) =>
          !value
            ? true
            : record[key]?.toLowerCase().includes(value.toLowerCase())
        )
      );

      setFilteredRecords(filteredByFilters);
      setCurrentPage(1);
    };

    filterRecords();
  }, [searchTerm, filters]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const currentItems = filteredRecords.slice(
    indexOfLastItem - itemsPerPage,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getUniqueValues = (key) =>
    [...new Set(paymentRecordsData.map((record) => record[key]))].filter(
      (val) => val
    );

  const handleFilterChange = ({ target: { name, value } }) =>
    setFilters((prev) => ({ ...prev, [name]: value }));

  const columns = [
    { key: "S.No", label: "S.No" },
    { key: "studentName", label: "Student Name" },
    { key: "regNo", label: "Reg No" },
    { key: "rollNo", label: "Roll No" },
    { key: "year", label: "Year" },
    { key: "department", label: "Department" },
    { key: "section", label: "Section" },
    { key: "instituteName", label: "Institute Name" },
    { key: "routeNo", label: "Route No" },
    { key: "stopName", label: "Stop Name" },
    { key: "academicYear", label: "Academic Year" },
    { key: "actualFee", label: "Actual Fee" },
    { key: "amuletsFee", label: "Amulets Fee" },
    { key: "added", label: "Added" },
    { key: "term1", label: "Term 1" },
    { key: "term2", label: "Term 2" },
    { key: "term3", label: "Term 3" },
    { key: "amulets", label: "Amulets" },
    { key: "total", label: "Total" },
    { key: "pendingFee", label: "Pending Fee" },
    { key: "status", label: "Status" },
    {
      key: "view",
      label: "View History",
      render: (record) => (
        <FontAwesomeIcon
          icon={faEye}
          className="view-history-link"
          onClick={() => setSelectedStudent(record)}
        />
      ),
    },
  ];

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
      <TopBar title="Payment Records" onBack={onBack} backButton />

      <main className="payment-records-main-content">
        <div className="payment-records-actions">
          <SearchBar
            placeholder="Search by Name or Reg No"
            onSearch={setSearchTerm}
          />
          <div className="payment-records-action-buttons">
            <Button
              label={
                <>
                  <FontAwesomeIcon icon={faFilter} /> Filter by
                </>
              }
              onClick={() => setShowFilters((prev) => !prev)}
              className="payment-records-filter-button"
            />
          </div>
        </div>

        {showFilters && (
          <div className="payment-records-filters">
            {["route", "year", "department", "status"].map((filterKey) => (
              <select
                key={filterKey}
                name={filterKey}
                value={filters[filterKey]}
                onChange={handleFilterChange}
              >
                <option value="">
                  {filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}
                </option>
                {getUniqueValues(filterKey).map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            ))}
          </div>
        )}

        <TableContainer
          headers={columns.map((col) => col.label)}
          rows={currentItems.map((record) => ({
            id: record["S.No"],
            data: columns.reduce((data, col) => {
              data[col.label] = col.render
                ? col.render(record)
                : record[col.key];
              return data;
            }, {}),
          }))}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredRecords.length / itemsPerPage)}
          onPageChange={paginate}
        />
      </main>
    </div>
  );
};

export default PaymentRecords;
