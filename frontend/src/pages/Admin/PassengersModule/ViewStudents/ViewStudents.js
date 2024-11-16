import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import "./ViewStudents.css";
import Button from "../../../../components/Shared/Button/Button";
import TopBar from "../../../../components/Shared/TopBar/TopBar"; // Import TopBar
import SearchBar from "../../../../components/Shared/SearchBar/SearchBar"; // Import SearchBar
import TableContainer from "../../../../components/Shared/TableContainer/TableContainer"; // Import TableContainer
import Pagination from "../../../../components/Shared/Pagination/Pagination"; // Import Pagination

const studentsData = [
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
    pendingFee: 4500,
    remainingAmulets: 40,
    refilledAmulets: 0,
    status: "Active",
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
    pendingFee: 4500,
    remainingAmulets: 50,
    refilledAmulets: 0,
    status: "Active",
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
    pendingFee: 4500,
    remainingAmulets: 50,
    refilledAmulets: 0,
    status: "Active",
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
    pendingFee: 4500,
    remainingAmulets: 60,
    refilledAmulets: 100,
    status: "Active",
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
    pendingFee: 3000,
    remainingAmulets: 60,
    refilledAmulets: 0,
    status: "Active",
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
    pendingFee: 1500,
    remainingAmulets: 100,
    refilledAmulets: 100,
    status: "Active",
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
    pendingFee: 1500,
    remainingAmulets: 80,
    refilledAmulets: 0,
    status: "Active",
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
    pendingFee: 1500,
    remainingAmulets: 30,
    refilledAmulets: 0,
    status: "Active",
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
    pendingFee: 4500,
    remainingAmulets: 100,
    refilledAmulets: 0,
    status: "Active",
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
    pendingFee: 3000,
    remainingAmulets: 0,
    refilledAmulets: 0,
    status: "Inactive",
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
    pendingFee: 3000,
    remainingAmulets: 50,
    refilledAmulets: 100,
    status: "Active",
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
    pendingFee: 3000,
    remainingAmulets: 20,
    refilledAmulets: 0,
    status: "Active",
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
    pendingFee: 4500,
    remainingAmulets: 60,
    refilledAmulets: 100,
    status: "Active",
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
    pendingFee: 3000,
    remainingAmulets: 20,
    refilledAmulets: 0,
    status: "Active",
  },
];

const ViewStudents = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    routeNo: "",
    year: "",
    department: "",
    section: "",
    instituteName: "",
    status: "",
  });

  // Helper function to get unique filter values
  const getUniqueValues = (key) => {
    return [...new Set(studentsData.map((student) => student[key]))];
  };

  // Filter students based on search term
  const filteredBySearchTerm = studentsData.filter((student) =>
    Object.values(student).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Filter students based on selected filters
  const filteredStudents = filteredBySearchTerm.filter((student) =>
    Object.entries(filters).every(([key, value]) =>
      value
        ? student[key].toString().toLowerCase().includes(value.toLowerCase())
        : true
    )
  );

  const handleSearchChange = (term) => setSearchTerm(term);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const studentColumns = [
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
    { key: "pendingFee", label: "Pending Fee" },
    { key: "remainingAmulets", label: "Remaining Amulets" },
    { key: "refilledAmulets", label: "Refilled Amulets" },
    { key: "status", label: "Status" },
  ];

  const currentItems = filteredStudents.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );

  return (
    <div className="view-students-container">
      <TopBar title="View Students" onBack={onBack} backButton={true} />

      <main className="view-students-main-content">
        <div className="view-students-search-filter">
          <SearchBar
            placeholder="Search by Route No or Name"
            onSearch={handleSearchChange}
          />
          <div className="view-students-action-button-container">
            <Button
              label={
                <>
                  <FontAwesomeIcon icon={faFilter} /> Filter by
                </>
              }
              onClick={() => setShowFilters(!showFilters)}
            />
          </div>
        </div>

        {showFilters && (
          <div className="view-students-filters">
            {[
              "routeNo",
              "year",
              "department",
              "section",
              "instituteName",
              "status",
            ].map((filter) => (
              <select
                key={filter}
                name={filter}
                value={filters[filter]}
                onChange={handleFilterChange}
              >
                <option value="">
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </option>
                {getUniqueValues(filter).map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            ))}
          </div>
        )}

        <TableContainer
          headers={studentColumns.map((col) => col.label)}
          rows={
            currentItems.length > 0
              ? currentItems.map((student) => ({
                  id: student.regNo,
                  data: student,
                }))
              : [
                  {
                    id: "no-data",
                    data: { message: "No data available" },
                    colSpan: studentColumns.length,
                  },
                ]
          }
        />

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredStudents.length / 10)}
          onPageChange={setCurrentPage}
        />
      </main>
    </div>
  );
};

export default ViewStudents;
