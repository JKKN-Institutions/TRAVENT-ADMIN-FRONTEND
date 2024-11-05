import React, { useState } from "react";
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
import "./SpecificRouteGeneratedPlan.css";
import Button from "../../../../components/Shared/Button/Button";

const SpecificRouteGeneratedPlan = ({ onBack, routeData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPageStudent, setCurrentPageStudent] = useState(1);
  const [currentPageStaff, setCurrentPageStaff] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    year: "",
    department: "",
    section: "",
    instituteName: "",
    designation: "",
  });

  const specificRouteData = [
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
      stopName: "Seelanayakkampatti Bypass",
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
      stopName: "Kakapalayam",
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
      stopName: "Thiruvagowndanoor Bypass",
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
      stopName: "Kakapalayam",
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
      stopName: "Seelanayakkampatti Bypass",
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
      stopName: "Kanthampatti Bypass",
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
      stopName: "Ariyanoor",
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
      stopName: "Kanthampatti Bypass",
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
      stopName: "Kondalampatty Bypass",
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
      stopName: "Gowndanoor",
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
      stopName: "Magundanjavadi",
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
      stopName: "Kakapalayam",
    },
  ];

  const specificRouteStaffData = [
    {
      "S.No": 1,
      staffName: "Aishu J",
      staffID: "2k24AHS157",
      scheduledFor: "Both",
      department: "AHS",
      designation: "Professor",
      instituteName: "JKKN College of Allied Health Sciences",
      boardingPoint: "Seelanayakkampatti Bypass",
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
    },
  ];

  const filteredStudentData = specificRouteData.filter((item) => {
    const matchesSearch = Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const matchesFilters = Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      return item[key]?.toLowerCase().includes(value.toLowerCase());
    });

    return matchesSearch && matchesFilters;
  });

  const filteredStaffData = specificRouteStaffData.filter((item) => {
    const matchesSearch = Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const matchesFilters = Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      return item[key]?.toLowerCase().includes(value.toLowerCase());
    });

    return matchesSearch && matchesFilters;
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const getUniqueValues = (data, key) => {
    return [...new Set(data.map((item) => item[key]))];
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
    { key: "stopName", label: "Stop Name" },
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
  ];

  const renderTable = (data, columns, currentPage) => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    if (data.length === 0) {
      return (
        <div className="specific-route-table-container">
          <div className="specific-route-table-wrapper">
            <table className="specific-route-table">
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

    return (
      <div className="specific-route-table-container">
        <div className="specific-route-table-wrapper">
          <table className="specific-route-table">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.key}>{column.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item["S.No"]}>
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

  const renderPagination = (currentPage, totalItems, setCurrentPage) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="specific-route-pagination">
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
          className="specific-route-pagination-button"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`specific-route-pagination-button ${
              currentPage === number ? "active" : ""
            }`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === pageNumbers.length}
          className="specific-route-pagination-button"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    );
  };

  return (
    <div className="specific-route-container">
      <header className="specific-route-top-bar">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="specific-route-back-icon"
          onClick={onBack}
        />
        <h2>Route {routeData?.route || "1"} Scheduled Passengers</h2>
      </header>

      <main className="specific-route-main-content">
        <div className="specific-route-actions">
          <div className="specific-route-search-container">
            <div className="specific-route-search-input-wrapper">
              <FontAwesomeIcon
                icon={faSearch}
                className="specific-route-search-icon"
              />
              <input
                type="text"
                className="specific-route-search-bar"
                placeholder="Search by Route No or Passenger Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="specific-route-action-button-container">
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
          <div className="specific-route-filters">
            {[
              "year",
              "department",
              "section",
              "instituteName",
              "designation",
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
                {getUniqueValues(
                  filter === "designation"
                    ? specificRouteStaffData
                    : specificRouteData,
                  filter
                ).map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            ))}
          </div>
        )}

        <div className="specific-route-tables-container">
          <div className="specific-route-table-section">
            <div className="specific-route-table-sub-section">
              <h3>
                <FontAwesomeIcon
                  icon={faUserGraduate}
                  className="students-schedule-icon"
                />
                Students Scheduled
              </h3>
              <p className="total-count">
                Total of {filteredStudentData.length}
              </p>
            </div>
            {renderTable(
              filteredStudentData,
              studentColumns,
              currentPageStudent
            )}
            {filteredStudentData.length > 0 &&
              renderPagination(
                currentPageStudent,
                filteredStudentData.length,
                setCurrentPageStudent
              )}
          </div>

          <div className="specific-route-table-section">
            <div className="specific-route-table-sub-section">
              <h3>
                <FontAwesomeIcon
                  icon={faUserTie}
                  className="staff-schedule-icon"
                />
                Staff Scheduled
              </h3>
              <p className="total-count">Total of {filteredStaffData.length}</p>
            </div>
            {renderTable(filteredStaffData, staffColumns, currentPageStaff)}
            {filteredStaffData.length > 0 &&
              renderPagination(
                currentPageStaff,
                filteredStaffData.length,
                setCurrentPageStaff
              )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SpecificRouteGeneratedPlan;
