import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faArrowLeft,
  faPlus,
  faEdit,
  faTrash,
  faChevronLeft,
  faChevronRight,
  faUserGraduate,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import "./Passengers.css";
import Button from "../../../../components/Shared/Button/Button";

const Passengers = ({ route, onBack }) => {
  const [searchTermStudent, setSearchTermStudent] = useState("");
  const [searchTermStaff, setSearchTermStaff] = useState("");
  const [selectedPassenger, setSelectedPassenger] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [currentPageStudent, setCurrentPageStudent] = useState(1);
  const [currentPageStaff, setCurrentPageStaff] = useState(1);
  const [itemsPerPage] = useState(10);
  const containerRef = useRef(null);

  const studentsData = [
    {
      id: 1,

      studentName: "Aishu J",

      regNo: "611220104123",

      rollNo: "2k24AHS157",

      year: "I",

      department: "AHS",

      section: "A",

      instituteName: "JKKN College of Allied Health Sciences",

      stopping: "Seelanayakkampatti Bypass",

      pendingFee: 4500,

      remainingAmulets: 40,

      refilledAmulets: 0,

      status: "Active",
    },

    {
      id: 2,

      studentName: "Arun S",

      regNo: "611220104145",

      rollNo: "2k22BP135",

      year: "III",

      department: "B.PHARM",

      section: "A",

      instituteName: "JKKN College of Pharmacy",

      stopping: "Kakapalayam",

      pendingFee: 4500,

      remainingAmulets: 50,

      refilledAmulets: 0,

      status: "Active",
    },

    {
      id: 3,

      studentName: "Balagi G",

      regNo: "611220104134",

      rollNo: "2k20PD159",

      year: "V",

      department: "PHARM D",

      section: "B",

      instituteName: "JKKN College of Pharmacy",

      stopping: "Thiruvagowndanoor Bypass",

      pendingFee: 4500,

      remainingAmulets: 50,

      refilledAmulets: 0,

      status: "Active",
    },

    {
      id: 4,

      studentName: "Gobi U",

      regNo: "611220104185",

      rollNo: "2k21CSE152",

      year: "IV",

      department: "CSE",

      section: "B",

      instituteName: "JKKN College of Engineering & Technology",

      stopping: "Kakapalayam",

      pendingFee: 4500,

      remainingAmulets: 60,

      refilledAmulets: 100,

      status: "Active",
    },

    {
      id: 5,

      studentName: "Gopal O",

      regNo: "611220104198",

      rollNo: "2k24EEE165",

      year: "I",

      department: "EEE",

      section: "C",

      instituteName: "JKKN College of Engineering & Technology",

      stopping: "Seelanayakkampatti Bypass",

      pendingFee: 3000,

      remainingAmulets: 60,

      refilledAmulets: 0,

      status: "Active",
    },

    {
      id: 6,

      studentName: "Gowtham R",

      regNo: "611220104165",

      rollNo: "2k24AHS155",

      year: "I",

      department: "AHS",

      section: "A",

      instituteName: "JKKN College of Allied Health Sciences",

      stopping: "Kanthampatti Bypass",

      pendingFee: 1500,

      remainingAmulets: 100,

      refilledAmulets: 100,

      status: "Active",
    },

    {
      id: 7,

      studentName: "Jaya V",

      regNo: "611220104176",

      rollNo: "2k24ECE163",

      year: "I",

      department: "ECE",

      section: "B",

      instituteName: "JKKN College of Engineering & Technology",

      stopping: "Ariyanoor",

      pendingFee: 1500,

      remainingAmulets: 80,

      refilledAmulets: 0,

      status: "Active",
    },

    {
      id: 8,

      studentName: "Karthik L",

      regNo: "611220104187",

      rollNo: "2k23IT151",

      year: "II",

      department: "IT",

      section: "B",

      instituteName: "JKKN College of Engineering & Technology",

      stopping: "Kanthampatti Bypass",

      pendingFee: 1500,

      remainingAmulets: 30,

      refilledAmulets: 0,

      status: "Active",
    },

    {
      id: 9,

      studentName: "Keerthi S",

      regNo: "611220104182",

      rollNo: "2k21IT111",

      year: "IV",

      department: "IT",

      section: "A",

      instituteName: "JKKN College of Engineering & Technology",

      stopping: "Kondalampatty Bypass",

      pendingFee: 4500,

      remainingAmulets: 100,

      refilledAmulets: 0,

      status: "Active",
    },

    {
      id: 10,

      studentName: "Kumar S",

      regNo: "611220104194",

      rollNo: "2k23CSE134",

      year: "II",

      department: "CSE",

      section: "A",

      instituteName: "JKKN College of Engineering & Technology",

      stopping: "Gowndanoor",

      pendingFee: 3000,

      remainingAmulets: 0,

      refilledAmulets: 0,

      status: "Inactive",
    },

    {
      id: 11,

      studentName: "Prem K",

      regNo: "611220104113",

      rollNo: "2k22BP132",

      year: "III",

      department: "B.PHARM",

      section: "A",

      instituteName: "JKKN College of Pharmacy",

      stopping: "Magundanjavadi",

      pendingFee: 3000,

      remainingAmulets: 50,

      refilledAmulets: 100,

      status: "Active",
    },

    {
      id: 12,

      studentName: "Sanjay J",

      regNo: "611220104157",

      rollNo: "2k23EEE162",

      year: "II",

      department: "EEE",

      section: "C",

      instituteName: "JKKN College of Engineering & Technology",

      stopping: "Kakapalayam",

      pendingFee: 3000,

      remainingAmulets: 20,

      refilledAmulets: 0,

      status: "Active",
    },

    {
      id: 13,

      studentName: "Senthil S",

      regNo: "611220104119",

      rollNo: "2k24AHS124",

      year: "I",

      department: "AHS",

      section: "A",

      instituteName: "JKKN College of Allied Health Sciences",

      stopping: "Thiruvagowndanoor Bypass",

      pendingFee: 4500,

      remainingAmulets: 60,

      refilledAmulets: 100,

      status: "Active",
    },

    {
      id: 14,

      studentName: "Snekha H",

      regNo: "611220104196",

      rollNo: "2k20PD155",

      year: "V",

      department: "PHARM D",

      section: "B",

      instituteName: "JKKN College of Pharmacy",

      stopping: "Seelanayakkampatti Bypass",

      pendingFee: 3000,

      remainingAmulets: 20,

      refilledAmulets: 0,

      status: "Active",
    },
  ];

  const staffData = [
    {
      id: 1,

      staffName: "Aishu J",

      staffID: "2k24AHS157",

      department: "AHS",

      designation: "Professor",

      instituteName: "JKKN College of Allied Health Sciences",

      boardingPoint: "Seelanayakkampatti Bypass",

      pendingFee: "Nil",

      remainingAmulets: 40,

      refilledAmulets: 0,

      status: "Active",
    },

    {
      id: 2,

      staffName: "Arun S",

      staffID: "2k22BP135",

      department: "B.PHARM",

      designation: "Assistant Professor",

      instituteName: "JKKN College of Pharmacy",

      boardingPoint: "Kakapalayam",

      pendingFee: "Nil",

      remainingAmulets: 50,

      refilledAmulets: 0,

      status: "Active",
    },

    {
      id: 3,

      staffName: "Balagi G",

      staffID: "2k20PD159",

      department: "PHARM D",

      designation: "Professor",

      instituteName: "JKKN College of Pharmacy",

      boardingPoint: "Thiruvagowndanoor Bypass",

      pendingFee: "Nil",

      remainingAmulets: 50,

      refilledAmulets: 0,

      status: "Active",
    },

    {
      id: 4,

      staffName: "Gobi U",

      staffID: "2k21CSE152",

      department: "CSE",

      designation: "Associate Professor",

      instituteName: "JKKN College of Engineering & Technology",

      boardingPoint: "Kakapalayam",

      pendingFee: 1000,

      remainingAmulets: 60,

      refilledAmulets: 100,

      status: "Active",
    },

    {
      id: 5,

      staffName: "Gopal O",

      staffID: "2k24EEE165",

      department: "EEE",

      designation: "Associate Professor",

      instituteName: "JKKN College of Engineering & Technology",

      boardingPoint: "Seelanayakkampatti Bypass",

      pendingFee: "Nil",

      remainingAmulets: 60,

      refilledAmulets: 0,

      status: "Active",
    },

    {
      id: 6,

      staffName: "Gowtham R",

      staffID: "2k24AHS155",

      department: "AHS",

      designation: "Lab Technician",

      instituteName: "JKKN College of Allied Health Sciences",

      boardingPoint: "Kanthampatti Bypass",

      pendingFee: 1000,

      remainingAmulets: 100,

      refilledAmulets: 100,

      status: "Active",
    },

    {
      id: 7,

      staffName: "Jaya V",

      staffID: "2k24ECE163",

      department: "ECE",

      designation: "Assistant Professor",

      instituteName: "JKKN College of Engineering & Technology",

      boardingPoint: "Ariyanoor",

      pendingFee: "Nil",

      remainingAmulets: 80,

      refilledAmulets: 0,

      status: "Active",
    },

    {
      id: 8,

      staffName: "Karthik L",

      staffID: "2k23IT151",

      department: "IT",

      designation: "Assistant Professor",

      instituteName: "JKKN College of Engineering & Technology",

      boardingPoint: "Kanthampatti Bypass",

      pendingFee: "Nil",

      remainingAmulets: 30,

      refilledAmulets: 0,

      status: "Active",
    },

    {
      id: 9,

      staffName: "Keerthi S",

      staffID: "2k21IT111",

      department: "IT",

      designation: "Lab Technician",

      instituteName: "JKKN College of Engineering & Technology",

      boardingPoint: "Kondalampatty Bypass",

      pendingFee: "Nil",

      remainingAmulets: 100,

      refilledAmulets: 0,

      status: "Active",
    },

    {
      id: 10,

      staffName: "Kumar S",

      staffID: "2k23CSE134",

      department: "CSE",

      designation: "Associate Professor",

      instituteName: "JKKN College of Engineering & Technology",

      boardingPoint: "Gowndanoor",

      pendingFee: "Nil",

      remainingAmulets: 0,

      refilledAmulets: 0,

      status: "Inactive",
    },

    {
      id: 11,

      staffName: "Prem K",

      staffID: "2k22BP132",

      department: "B.PHARM",

      designation: "Assistant Professor",

      instituteName: "JKKN College of Pharmacy",

      boardingPoint: "Magundanjavadi",

      pendingFee: 1000,

      remainingAmulets: 50,

      refilledAmulets: 100,

      status: "Active",
    },

    {
      id: 12,

      staffName: "Sanjay J",

      staffID: "2k23EEE162",

      department: "EEE",

      designation: "Assistant Professor",

      instituteName: "JKKN College of Engineering & Technology",

      boardingPoint: "Kakapalayam",

      pendingFee: "Nil",

      remainingAmulets: 20,

      refilledAmulets: 0,

      status: "Active",
    },

    {
      id: 13,

      staffName: "Senthil S",

      staffID: "2k24AHS124",

      department: "AHS",

      designation: "Professor",

      instituteName: "JKKN College of Allied Health Sciences",

      boardingPoint: "Thiruvagowndanoor Bypass",

      pendingFee: 1000,

      remainingAmulets: 60,

      refilledAmulets: 100,

      status: "Active",
    },

    {
      id: 14,

      staffName: "Snekha H",

      staffID: "2k20PD155",

      department: "PHARM D",

      designation: "Lab Technician",

      instituteName: "JKKN College of Pharmacy",

      boardingPoint: "Seelanayakkampatti Bypass",

      pendingFee: "Nil",

      remainingAmulets: 20,

      refilledAmulets: 0,

      status: "Active",
    },
  ];

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleOutsideClick = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setSelectedPassenger(null);
    }
  };

  const handlePassengerClick = (passenger, type) => {
    setSelectedPassenger(
      selectedPassenger?.id === passenger.id && selectedPassenger?.type === type
        ? null
        : { ...passenger, type }
    );
  };

  const handleDeletePassenger = () => {
    // Implement delete logic here
    setShowDeleteConfirmation(false);
    setSelectedPassenger(null);
  };

  const handleEditPassenger = () => {
    // Implement edit logic here
  };

  const handleAddNewPassenger = () => {
    // Implement add new passenger logic here
  };

  const filteredStudents = studentsData.filter(
    (student) =>
      student.studentName
        ?.toLowerCase()
        .includes(searchTermStudent.toLowerCase()) ||
      student.regNo?.toLowerCase().includes(searchTermStudent.toLowerCase())
  );

  const filteredStaff = staffData.filter(
    (staff) =>
      staff.staffName?.toLowerCase().includes(searchTermStaff.toLowerCase()) ||
      staff.staffID?.toLowerCase().includes(searchTermStaff.toLowerCase())
  );

  const indexOfLastItemStudent = currentPageStudent * itemsPerPage;
  const indexOfFirstItemStudent = indexOfLastItemStudent - itemsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstItemStudent,
    indexOfLastItemStudent
  );

  const indexOfLastItemStaff = currentPageStaff * itemsPerPage;
  const indexOfFirstItemStaff = indexOfLastItemStaff - itemsPerPage;
  const currentStaff = filteredStaff.slice(
    indexOfFirstItemStaff,
    indexOfLastItemStaff
  );

  const paginateStudent = (pageNumber) => setCurrentPageStudent(pageNumber);
  const paginateStaff = (pageNumber) => setCurrentPageStaff(pageNumber);

  const renderPagination = (currentPage, totalItems, paginate) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="passengers-pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="passengers-pagination-button"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`passengers-pagination-button ${
              currentPage === number ? "active" : ""
            }`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === pageNumbers.length}
          className="passengers-pagination-button"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    );
  };

  const renderTable = (data, columns, currentPage, itemsPerPage, type) => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    return (
      <div className="passengers-table-container">
        <div className="passengers-table-wrapper">
          <table className="passengers-table">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.key}>{column.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr
                  key={item.id}
                  onClick={() => handlePassengerClick(item, type)}
                  className={
                    selectedPassenger?.id === item.id &&
                    selectedPassenger?.type === type
                      ? "selected"
                      : ""
                  }
                >
                  {columns.map((column) => (
                    <td key={column.key} data-label={column.label}>
                      {column.key === "serialNumber"
                        ? indexOfFirstItem + index + 1
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

  const studentColumns = [
    { key: "serialNumber", label: "S No" },
    { key: "studentName", label: "Student Name" },
    { key: "regNo", label: "Reg No" },
    { key: "rollNo", label: "Roll No" },
    { key: "department", label: "Department" },
    { key: "instituteName", label: "Institute Name" },
    { key: "stopping", label: "Stopping" },
    { key: "pendingFee", label: "Pending Fee" },
    { key: "remainingAmulets", label: "Remaining Amulets" },
    { key: "refilledAmulets", label: "Refilled Amulets" },
    { key: "status", label: "Status" },
  ];

  const staffColumns = [
    { key: "serialNumber", label: "S No" },
    { key: "staffName", label: "Staff Name" },
    { key: "staffID", label: "Staff ID" },
    { key: "department", label: "Department" },
    { key: "instituteName", label: "Institute Name" },
    { key: "designation", label: "Designation" },
    { key: "boardingPoint", label: "Boarding Point" },
    { key: "pendingFee", label: "Pending Fee" },
    { key: "remainingAmulets", label: "Remaining Amulets" },
    { key: "refilledAmulets", label: "Refilled Amulets" },
    { key: "status", label: "Status" },
  ];

  return (
    <div className="passengers-container" ref={containerRef}>
      <header className="passengers-top-bar">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="passengers-menu-icon"
          onClick={onBack}
        />
        <h2>Passengers for Route {route.routeNumber}</h2>
      </header>

      <main className="passengers-main-content">
        <div className="passengers-actions">
          <div className="passengers-search-container">
            <div className="search-input-wrapper">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input
                type="text"
                className="passengers-search-bar"
                placeholder="Search passengers..."
                value={searchTermStudent}
                onChange={(e) => {
                  setSearchTermStudent(e.target.value);
                  setSearchTermStaff(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="action-buttons-container">
            {/* Delete Button */}
            <Button
              label={
                <>
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </>
              }
              onClick={() => setShowDeleteConfirmation(true)}
              disabled={!selectedPassenger} // Disable button if no passenger is selected
            />

            {/* Edit Button */}
            <Button
              label={
                <>
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </>
              }
              onClick={handleEditPassenger}
              disabled={!selectedPassenger} // Disable button if no passenger is selected
            />
          </div>
        </div>

        <div className="passengers-tables-container">
          <div className="passengers-table-section">
            <h3>
              <FontAwesomeIcon icon={faUserGraduate} /> Students
            </h3>
            {renderTable(
              filteredStudents,
              studentColumns,
              currentPageStudent,
              itemsPerPage,
              "student"
            )}
            {renderPagination(
              currentPageStudent,
              filteredStudents.length,
              paginateStudent
            )}
          </div>
          <div className="passengers-table-section">
            <h3>
              <FontAwesomeIcon icon={faUserTie} /> Staff
            </h3>
            {renderTable(
              filteredStaff,
              staffColumns,
              currentPageStaff,
              itemsPerPage,
              "staff"
            )}
            {renderPagination(
              currentPageStaff,
              filteredStaff.length,
              paginateStaff
            )}
          </div>
        </div>
      </main>

      {showDeleteConfirmation && (
        <div className="passengers-delete-confirmation-modal">
          <div className="passengers-delete-confirmation-content">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this passenger?</p>
            <div className="passengers-delete-confirmation-buttons">
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="passengers-cancel-delete"
              >
                Cancel
              </button>
              <button
                onClick={handleDeletePassenger}
                className="passengers-confirm-delete"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Passengers;
