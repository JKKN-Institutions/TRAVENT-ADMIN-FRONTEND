import React, { useState } from "react";
import "./ViewTransactions.css";
import TopBar from "../../../../components/Shared/TopBar/TopBar";
import SearchBar from "../../../../components/Shared/SearchBar/SearchBar";
import TableContainer from "../../../../components/Shared/TableContainer/TableContainer";
import Pagination from "../../../../components/Shared/Pagination/Pagination";

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
  const itemsPerPage = 10;
  const [selectedDate, setSelectedDate] = useState(new Date());

  const filteredTransactions = transactionsData.filter(
    ({ studentName, regNo, rollNo }) =>
      [studentName, regNo, rollNo].some((field) =>
        field.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const currentItems = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const columns = [
    { key: "sNo", label: "S.No" },
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
    { key: "paidAmount", label: "Paid Amount" },
    { key: "balanceAmount", label: "Balance Amount" },
  ];

  const rows = currentItems.map((transaction, index) => ({
    id: transaction.sNo,
    data: {
      ...transaction,
      sNo: (currentPage - 1) * itemsPerPage + index + 1,
      paidAmount: `₹${transaction.paidAmount}`,
      balanceAmount: `₹${transaction.balanceAmount}`,
    },
  }));

  return (
    <div className="view-transactions-container">
      <TopBar title="View Transactions" onBack={onBack} backButton />

      <main className="view-transactions-main-content">
        <div className="view-transactions-controls">
          <SearchBar
            placeholder="Search by Student Name, Reg No, or Roll No"
            onSearch={setSearchTerm}
          />
          <div className="view-transactions-date">
            <input
              type="date"
              value={selectedDate.toISOString().split("T")[0]}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              className="view-transactions-date"
            />
          </div>
        </div>

        <TableContainer
          headers={columns.map(({ label }) => label)}
          rows={rows}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredTransactions.length / itemsPerPage)}
          onPageChange={paginate}
        />
      </main>
    </div>
  );
};

export default ViewTransactions;
