import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faSearch,
  faFilter,
  faChevronLeft,
  faChevronRight,
  faUserGraduate,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import "./ScheduledPassengers.css";
import Button from "../../../../components/Shared/Button/Button";

// Add this to the top of your ScheduledPassengers.jsx file

const studentsScheduledData = [
  {
    "S.No": 1,

    studentName: "Aishu J",

    regNo: "611220104123",

    scheduledFor: "Both",

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
    "S.No": 2,

    studentName: "Arun S",

    regNo: "611220104145",

    scheduledFor: "Both",

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
    "S.No": 3,

    studentName: "Balagi G",

    regNo: "611220104134",

    scheduledFor: "Both",

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
    "S.No": 4,

    studentName: "Gobi U",

    regNo: "611220104185",

    scheduledFor: "Morning",

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
    "S.No": 5,

    studentName: "Gopal O",

    regNo: "611220104198",

    scheduledFor: "Both",

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
    "S.No": 6,

    studentName: "Gowtham R",

    regNo: "611220104165",

    scheduledFor: "Evening",

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
    "S.No": 7,

    studentName: "Jaya V",

    regNo: "611220104176",

    scheduledFor: "Morning",

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
    "S.No": 8,

    studentName: "Karthik L",

    regNo: "611220104187",

    scheduledFor: "Evening",

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
    "S.No": 9,

    studentName: "Keerthi S",

    regNo: "611220104182",

    scheduledFor: "Both",

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
    "S.No": 10,

    studentName: "Kumar S",

    regNo: "611220104194",

    scheduledFor: "Both",

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
    "S.No": 11,

    studentName: "Prem K",

    regNo: "611220104113",

    scheduledFor: "Evening",

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
    "S.No": 12,

    studentName: "Sanjay J",

    regNo: "611220104157",

    scheduledFor: "Both",

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
    "S.No": 13,

    studentName: "Senthil S",

    regNo: "611220104119",

    scheduledFor: "Both",

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
    "S.No": 14,

    studentName: "Snekha H",

    regNo: "611220104196",

    scheduledFor: "Morning",

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

const staffScheduledData = [
  {
    "S.No": 1,

    staffName: "Aishu J",

    staffID: "2k24AHS157",

    scheduledFor: "Both",

    department: "AHS",

    designation: "Professor",

    instituteName: "JKKN College of Allied Health Sciences",

    boardingPoint: "Seelanayakkampatti Bypass",

    scannedTime: "07:55 AM",

    status: "Scanned",
  },

  {
    "S.No": 2,

    staffName: "Arun S",

    staffID: "2k22BP135",

    scheduledFor: "Morning",

    department: "B.PHARM",

    designation: "Assistant Professor",

    instituteName: "JKKN College of Pharmacy",

    boardingPoint: "Kakapalayam",

    scannedTime: "-",

    status: "Not Scanned",
  },

  {
    "S.No": 3,

    staffName: "Balagi G",

    staffID: "2k20PD159",

    scheduledFor: "Both",

    department: "PHARM D",

    designation: "Professor",

    instituteName: "JKKN College of Pharmacy",

    boardingPoint: "Thiruvagowndanoor Bypass",

    scannedTime: "07:40 AM",

    status: "Scanned",
  },

  {
    "S.No": 4,

    staffName: "Gobi U",

    staffID: "2k21CSE152",

    scheduledFor: "Both",

    department: "CSE",

    designation: "Associate Professor",

    instituteName: "JKKN College of Engineering & Technology",

    boardingPoint: "Kakapalayam",

    scannedTime: "07:55 AM",

    status: "Scanned",
  },

  {
    "S.No": 5,

    staffName: "Gopal O",

    staffID: "2k24EEE165",

    scheduledFor: "Evening",

    department: "EEE",

    designation: "Associate Professor",

    instituteName: "JKKN College of Engineering & Technology",

    boardingPoint: "Seelanayakkampatti Bypass",

    scannedTime: "-",

    status: "Not Scanned",
  },

  {
    "S.No": 6,

    staffName: "Gowtham R",

    staffID: "2k24AHS155",

    scheduledFor: "Both",

    department: "AHS",

    designation: "Lab Technician",

    instituteName: "JKKN College of Allied Health Sciences",

    boardingPoint: "Kanthampatti Bypass",

    scannedTime: "08:00 AM",

    status: "Scanned",
  },

  {
    "S.No": 7,

    staffName: "Jaya V",

    staffID: "2k24ECE163",

    scheduledFor: "Both",

    department: "ECE",

    designation: "Assistant Professor",

    instituteName: "JKKN College of Engineering & Technology",

    boardingPoint: "Ariyanoor",

    scannedTime: "07:55 AM",

    status: "Scanned",
  },

  {
    "S.No": 8,

    staffName: "Karthik L",

    staffID: "2k23IT151",

    scheduledFor: "Morning",

    department: "IT",

    designation: "Assistant Professor",

    instituteName: "JKKN College of Engineering & Technology",

    boardingPoint: "Kanthampatti Bypass",

    scannedTime: "08:01 AM",

    status: "Scanned",
  },

  {
    "S.No": 9,

    staffName: "Keerthi S",

    staffID: "2k21IT111",

    scheduledFor: "Both",

    department: "IT",

    designation: "Lab Technician",

    instituteName: "JKKN College of Engineering & Technology",

    boardingPoint: "Kondalampatty Bypass",

    scannedTime: "-",

    status: "Not Scanned",
  },

  {
    "S.No": 10,

    staffName: "Kumar S",

    staffID: "2k23CSE134",

    scheduledFor: "Evening",

    department: "CSE",

    designation: "Associate Professor",

    instituteName: "JKKN College of Engineering & Technology",

    boardingPoint: "Gowndanoor",

    scannedTime: "-",

    status: "Not Scanned",
  },

  {
    "S.No": 11,

    staffName: "Prem K",

    staffID: "2k22BP132",

    scheduledFor: "Both",

    department: "B.PHARM",

    designation: "Assistant Professor",

    instituteName: "JKKN College of Pharmacy",

    boardingPoint: "Magundanjavadi",

    scannedTime: "-",

    status: "Not Scanned",
  },

  {
    "S.No": 12,

    staffName: "Sanjay J",

    staffID: "2k23EEE162",

    scheduledFor: "Both",

    department: "EEE",

    designation: "Assistant Professor",

    instituteName: "JKKN College of Engineering & Technology",

    boardingPoint: "Kakapalayam",

    scannedTime: "08:15 AM",

    status: "Scanned",
  },

  {
    "S.No": 13,

    staffName: "Senthil S",

    staffID: "2k24AHS124",

    scheduledFor: "Both",

    department: "AHS",

    designation: "Professor",

    instituteName: "JKKN College of Allied Health Sciences",

    boardingPoint: "Thiruvagowndanoor Bypass",

    scannedTime: "07:39 AM",

    status: "Scanned",
  },

  {
    "S.No": 14,

    staffName: "Snekha H",

    staffID: "2k20PD155",

    scheduledFor: "Evening",

    department: "PHARM D",

    designation: "Lab Technician",

    instituteName: "JKKN College of Pharmacy",

    boardingPoint: "Seelanayakkampatti Bypass",

    scannedTime: "07:52 AM",

    status: "Scanned",
  },
];

const ScheduledPassengers = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPageStudent, setCurrentPageStudent] = useState(1);
  const [currentPageStaff, setCurrentPageStaff] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filteredStudents, setFilteredStudents] = useState(
    studentsScheduledData
  );
  const [filteredStaff, setFilteredStaff] = useState(staffScheduledData);

  const [filters, setFilters] = useState({
    scheduledFor: "",
    year: "",
    department: "",
    section: "",
    instituteName: "",
    routeNo: "",
    status: "",
    designation: "",
  });

  useEffect(() => {
    const results = studentsScheduledData.filter((student) =>
      Object.values(student).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredStudents(results);
    setCurrentPageStudent(1);

    const staffResults = staffScheduledData.filter((staff) =>
      Object.values(staff).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredStaff(staffResults);
    setCurrentPageStaff(1);
  }, [searchTerm]);

  useEffect(() => {
    const results = studentsScheduledData.filter((student) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return (
          student[key] &&
          student[key].toLowerCase().includes(value.toLowerCase())
        );
      });
    });
    setFilteredStudents(results);
    setCurrentPageStudent(1);

    const staffResults = staffScheduledData.filter((staff) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return (
          staff[key] && staff[key].toLowerCase().includes(value.toLowerCase())
        );
      });
    });
    setFilteredStaff(staffResults);
    setCurrentPageStaff(1);
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const getUniqueValues = (data, key) => {
    return [...new Set(data.map((item) => item[key]))];
  };

  const renderTable = (data, columns, currentPage, itemsPerPage) => {
    if (data.length === 0) {
      return (
        <div className="scheduled-passengers-table-container">
          <div className="scheduled-passengers-table-wrapper">
            <table className="scheduled-passengers-table">
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column.key}>{column.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={columns.length} className="no-data-message">
                    No data available
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    return (
      <div className="scheduled-passengers-table-container">
        <div className="scheduled-passengers-table-wrapper">
          <table className="scheduled-passengers-table">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.key}>{column.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id || item["S.No"]}>
                  {columns.map((column) => (
                    <td key={column.key}>{item[column.key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderPagination = (currentPage, totalItems, paginate) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="scheduled-passengers-pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="scheduled-passengers-pagination-button"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`scheduled-passengers-pagination-button ${
              currentPage === number ? "active" : ""
            }`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === pageNumbers.length}
          className="scheduled-passengers-pagination-button"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    );
  };

  const studentColumns = [
    { key: "S.No", label: "S.No" },
    { key: "studentName", label: "Student Name" },
    { key: "regNo", label: "Reg No" },
    { key: "scheduledFor", label: "Scheduled For" },
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

  const staffColumns = [
    { key: "S.No", label: "S.No" },
    { key: "staffName", label: "Staff Name" },
    { key: "staffID", label: "Staff ID" },
    { key: "scheduledFor", label: "Scheduled For" },
    { key: "department", label: "Department" },
    { key: "designation", label: "Designation" },
    { key: "instituteName", label: "Institute Name" },
    { key: "boardingPoint", label: "Boarding Point" },
    { key: "scannedTime", label: "Scanned Time" },
    { key: "status", label: "Status" },
  ];

  return (
    <div className="scheduled-passengers-container">
      <header className="scheduled-passengers-top-bar">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="scheduled-passengers-back-icon"
          onClick={onBack}
        />
        <h2>Scheduled Passengers</h2>
      </header>

      <main className="scheduled-passengers-main-content">
        <div className="scheduled-passengers-actions">
          <div className="scheduled-passengers-search-container">
            <div className="scheduled-passengers-search-input-wrapper">
              <FontAwesomeIcon
                icon={faSearch}
                className="scheduled-passengers-search-icon"
              />
              <input
                type="text"
                className="scheduled-passengers-search-bar"
                placeholder="Search by Route No or Passenger Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="scheduled-passengers-action-button-container">
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
          <div className="scheduled-passengers-filters">
            <select
              name="scheduledFor"
              value={filters.scheduledFor}
              onChange={handleFilterChange}
            >
              <option value="">Scheduled For</option>
              {getUniqueValues(studentsScheduledData, "scheduledFor").map(
                (value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                )
              )}
            </select>
            <select
              name="year"
              value={filters.year}
              onChange={handleFilterChange}
            >
              <option value="">Year</option>
              {getUniqueValues(studentsScheduledData, "year").map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <select
              name="department"
              value={filters.department}
              onChange={handleFilterChange}
            >
              <option value="">Department</option>
              {getUniqueValues(studentsScheduledData, "department").map(
                (value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                )
              )}
            </select>
            <select
              name="section"
              value={filters.section}
              onChange={handleFilterChange}
            >
              <option value="">Section</option>
              {getUniqueValues(studentsScheduledData, "section").map(
                (value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                )
              )}
            </select>
            <select
              name="instituteName"
              value={filters.instituteName}
              onChange={handleFilterChange}
            >
              <option value="">Institute Name</option>
              {getUniqueValues(studentsScheduledData, "instituteName").map(
                (value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                )
              )}
            </select>
            <select
              name="routeNo"
              value={filters.routeNo}
              onChange={handleFilterChange}
            >
              <option value="">Route No</option>
              {getUniqueValues(studentsScheduledData, "routeNo").map(
                (value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                )
              )}
            </select>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="">Status</option>
              {getUniqueValues(studentsScheduledData, "status").map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <select
              name="designation"
              value={filters.designation}
              onChange={handleFilterChange}
            >
              <option value="">Designation</option>
              {getUniqueValues(staffScheduledData, "designation").map(
                (value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                )
              )}
            </select>
          </div>
        )}

        <div className="scheduled-passengers-tables-container">
          <div className="scheduled-passengers-table-section">
            <div className="scheduled-passengers-table-sub-section">
              <h3 className="students-schedule-title">
                {" "}
                <FontAwesomeIcon
                  icon={faUserGraduate}
                  className="students-schedule-icon"
                />
                Students Scheduled{" "}
              </h3>
              <p className="total-count">Total of {filteredStudents.length}</p>
            </div>
            {renderTable(
              filteredStudents,
              studentColumns,
              currentPageStudent,
              itemsPerPage
            )}
            {renderPagination(
              currentPageStudent,
              filteredStudents.length,
              setCurrentPageStudent
            )}
          </div>
          <div className="scheduled-passengers-table-section">
            <div className="scheduled-passengers-table-sub-section">
              <h3 className="staff-schedule-title">
                <FontAwesomeIcon
                  icon={faUserTie}
                  className="staff-schedule-icon"
                />
                Staffs Scheduled{" "}
              </h3>
              <p className="total-count">Total of {filteredStaff.length}</p>
            </div>
            {renderTable(
              filteredStaff,
              staffColumns,
              currentPageStaff,
              itemsPerPage
            )}
            {renderPagination(
              currentPageStaff,
              filteredStaff.length,
              setCurrentPageStaff
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ScheduledPassengers;
