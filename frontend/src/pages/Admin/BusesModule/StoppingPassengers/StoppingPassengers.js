import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faArrowLeft,
  faUserGraduate,
  faUserTie,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./StoppingPassengers.css";

const StoppingPassengers = ({ stop, onBack, institutionId }) => {
  const [searchTermStudent, setSearchTermStudent] = useState("");
  const [searchTermStaff, setSearchTermStaff] = useState("");
  const [currentPageStudent, setCurrentPageStudent] = useState(1);
  const [currentPageStaff, setCurrentPageStaff] = useState(1);
  const [itemsPerPage] = useState(10);

  // Mock data for students and staff
  const studentsData = [
    {
      id: 1,
      studentName: "Senthil S",
      regNo: "611220104123",
      rollNo: "2K24AHS157",
      year: "I",
      department: "AHS",
      section: "A",
      instituteName: "JKKN AHS",
      pendingFee: 4500,
      amulets: { remaining: 60, refilled: 0 },
      status: "Active",
    },
    {
      id: 2,
      studentName: "Balagi G",
      regNo: "611220103233",
      rollNo: "2K22BP135",
      year: "III",
      department: "B.PHARM",
      section: "A",
      instituteName: "JKKN Pharmacy",
      pendingFee: 4500,
      amulets: { remaining: 50, refilled: 0 },
      status: "Active",
    },
  ];

  const staffData = [
    {
      id: 1,
      staffName: "Balagi G",
      staffID: "2K20PD159",
      department: "PHARM D",
      designation: "Professor",
      instituteName: "JKKN College of Pharmacy",
      pendingFee: "Nil",
      amulets: { remaining: 50, refilled: 0 },
      status: "Active",
    },
    {
      id: 2,
      staffName: "Senthil S",
      staffID: "2K24AHS174",
      department: "AHS",
      designation: "Professor",
      instituteName: "JKKN College of Allied Health Sciences",
      pendingFee: 1000,
      amulets: { remaining: 60, refilled: 100 },
      status: "Active",
    },
  ];

  const filteredStudents = studentsData.filter(
    (student) =>
      student.studentName
        .toLowerCase()
        .includes(searchTermStudent.toLowerCase()) ||
      student.regNo.toLowerCase().includes(searchTermStudent.toLowerCase())
  );

  const filteredStaff = staffData.filter(
    (staff) =>
      staff.staffName.toLowerCase().includes(searchTermStaff.toLowerCase()) ||
      staff.staffID.toLowerCase().includes(searchTermStaff.toLowerCase())
  );

  const renderTable = (data, columns, currentPage, itemsPerPage) => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    return (
      <div className="stopping-passengers-table-container">
        <div className="stopping-passengers-table-wrapper">
          <table className="stopping-passengers-table">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.key}>{column.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={item.id}>
                  {columns.map((column) => (
                    <td key={column.key}>
                      {column.key === "serialNumber"
                        ? indexOfFirstItem + index + 1
                        : column.key === "amulets"
                        ? `${item.amulets.remaining} / ${item.amulets.refilled}`
                        : item[column.key]}
                    </td>
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
      <div className="stopping-passengers-pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="stopping-passengers-pagination-button"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`stopping-passengers-pagination-button ${
              currentPage === number ? "active" : ""
            }`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === pageNumbers.length}
          className="stopping-passengers-pagination-button"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    );
  };

  const studentColumns = [
    { key: "serialNumber", label: "S.No" },
    { key: "studentName", label: "Student Name" },
    { key: "regNo", label: "Reg No" },
    { key: "rollNo", label: "Roll No" },
    { key: "year", label: "Year" },
    { key: "department", label: "Department" },
    { key: "section", label: "Section" },
    { key: "instituteName", label: "Institute Name" },
    { key: "pendingFee", label: "Pending Fee" },
    { key: "amulets", label: "Amulets (Remaining / Refilled)" },
    { key: "status", label: "Status" },
  ];

  const staffColumns = [
    { key: "serialNumber", label: "S.No" },
    { key: "staffName", label: "Staff Name" },
    { key: "staffID", label: "Staff ID" },
    { key: "department", label: "Department" },
    { key: "designation", label: "Designation" },
    { key: "instituteName", label: "Institute Name" },
    { key: "pendingFee", label: "Pending Fee" },
    { key: "amulets", label: "Amulets (Remaining / Refilled)" },
    { key: "status", label: "Status" },
  ];

  return (
    <div className="stopping-passengers-container">
      <header className="stopping-passengers-top-bar">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="stopping-passengers-menu-icon"
          onClick={onBack}
        />
        <h2>Passengers for Stop: {stop.stopName}</h2>
      </header>

      <main className="stopping-passengers-main-content">
        <div className="stopping-passengers-search-container">
          <div className="search-input-wrapper">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              className="stopping-passengers-search-bar"
              placeholder="Search passengers..."
              value={searchTermStudent}
              onChange={(e) => {
                setSearchTermStudent(e.target.value);
                setSearchTermStaff(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="stopping-passengers-tables-container">
          <div className="stopping-passengers-table-section">
            <h3>
              <FontAwesomeIcon icon={faUserGraduate} /> Students
            </h3>
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
          <div className="stopping-passengers-table-section">
            <h3>
              <FontAwesomeIcon icon={faUserTie} /> Staff
            </h3>
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

export default StoppingPassengers;
