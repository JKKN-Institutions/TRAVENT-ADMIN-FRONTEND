import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faArrowLeft,
  faFilter,
  faChevronLeft,
  faChevronRight,
  faEye,
  faUserGraduate,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import "./ReceivedFeedback.css";
import Button from "../../../../components/Shared/Button/Button";
import SpecificFeedbackReceived from "../SpecificFeedbackReceived/SpecificFeedbackReceived";

// Student Feedback Data (14 entries)

const studentsFeedbackData = [
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

    feedbackDate: "15-07-2024",

    feedbackTime: "10.00 AM",
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

    feedbackDate: "15-07-2024",

    feedbackTime: "10.00 AM",
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

    feedbackDate: "15-07-2024",

    feedbackTime: "10.00 AM",
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

    feedbackDate: "15-07-2024",

    feedbackTime: "10.00 AM",
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

    feedbackDate: "15-07-2024",

    feedbackTime: "10.00 AM",
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

    feedbackDate: "15-07-2024",

    feedbackTime: "10.00 AM",
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

    feedbackDate: "15-07-2024",

    feedbackTime: "10.00 AM",
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

    feedbackDate: "15-07-2024",

    feedbackTime: "10.00 AM",
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

    feedbackDate: "15-07-2024",

    feedbackTime: "10.00 AM",
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

    feedbackDate: "15-07-2024",

    feedbackTime: "10.00 AM",
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

    feedbackDate: "15-07-2024",

    feedbackTime: "10.00 AM",
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

    feedbackDate: "15-07-2024",

    feedbackTime: "10.00 AM",
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

    feedbackDate: "15-07-2024",

    feedbackTime: "10.00 AM",
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

    feedbackDate: "15-07-2024",

    feedbackTime: "10.00 AM",
  },
];

// Staff Feedback Data (14 entries)

const staffsFeedbackData = [
  {
    sNo: 1,

    staffName: "Aishu J",

    staffId: "2k24AHS157",

    department: "AHS",

    designation: "Professor",

    instituteName: "JKKN College of Allied Health Sciences",

    routeNo: "15",

    feedbackDate: "15-07-2024",

    feedbackTime: "10.00 AM",
  },

  {
    sNo: 2,

    staffName: "Arun S",

    staffId: "2k22BP135",

    department: "B.PHARM",

    designation: "Assistant Professor",

    instituteName: "JKKN College of Pharmacy",

    routeNo: "15",

    feedbackDate: "15-07-2024",

    feedbackTime: "10.00 AM",
  },

  {
    sNo: 3,

    staffName: "Balagi G",

    staffId: "2k20PD159",

    department: "PHARM D",

    designation: "Professor",

    instituteName: "JKKN College of Pharmacy",

    routeNo: "1",

    feedbackDate: "15-07-2024",

    feedbackTime: "10.00 AM",
  },

  {
    sNo: 4,

    staffName: "Gobi U",

    staffId: "2k21CSE152",

    department: "CSE",

    designation: "Associate Professor",

    instituteName: "JKKN College of Engineering & Technology",

    routeNo: "5",

    feedbackDate: "15-07-2024",

    feedbackTime: "10.00 AM",
  },

  {
    sNo: 5,

    staffName: "Gopal O",

    staffId: "2k24EEE165",

    department: "EEE",

    designation: "Associate Professor",

    instituteName: "JKKN College of Engineering & Technology",

    routeNo: "7",

    feedbackDate: "15-07-2024",

    feedbackTime: "10.00 AM",
  },

  {
    sNo: 6,

    staffName: "Gowtham R",

    staffId: "2k24AHS155",

    department: "AHS",

    designation: "Lab Technician",

    instituteName: "JKKN College of Allied Health Sciences",

    routeNo: "15",

    feedbackDate: "15-07-2024",

    feedbackTime: "10.00 AM",
  },

  {
    sNo: 7,

    staffName: "Jaya V",

    staffId: "2k24ECE163",

    department: "ECE",

    designation: "Assistant Professor",

    instituteName: "JKKN College of Engineering & Technology",

    routeNo: "15",

    feedbackDate: "15-07-2024",

    feedbackTime: "10.00 AM",
  },

  {
    sNo: 8,

    staffName: "Karthik L",

    staffId: "2k23IT151",

    department: "IT",

    designation: "Assistant Professor",

    instituteName: "JKKN College of Engineering & Technology",

    routeNo: "9",

    feedbackDate: "15-07-2024",

    feedbackTime: "10.00 AM",
  },

  {
    sNo: 9,

    staffName: "Keerthi S",

    staffId: "2k21IT111",

    department: "IT",

    designation: "Lab Technician",

    instituteName: "JKKN College of Engineering & Technology",

    routeNo: "8",

    feedbackDate: "15-07-2024",

    feedbackTime: "10.00 AM",
  },

  {
    sNo: 10,

    staffName: "Kumar S",

    staffId: "2k23CSE134",

    department: "CSE",

    designation: "Associate Professor",

    instituteName: "JKKN College of Engineering & Technology",

    routeNo: "17",

    feedbackDate: "15-07-2024",

    feedbackTime: "10.00 AM",
  },

  {
    sNo: 11,

    staffName: "Prem K",

    staffId: "2k22BP132",

    department: "B.PHARM",

    designation: "Assistant Professor",

    instituteName: "JKKN College of Pharmacy",

    routeNo: "24",

    feedbackDate: "15-07-2024",

    feedbackTime: "10.00 AM",
  },

  {
    sNo: 12,

    staffName: "Sanjay J",

    staffId: "2k23EEE162",

    department: "EEE",

    designation: "Assistant Professor",

    instituteName: "JKKN College of Engineering & Technology",

    routeNo: "17",

    feedbackDate: "15-07-2024",

    feedbackTime: "10.00 AM",
  },

  {
    sNo: 13,

    staffName: "Senthil S",

    staffId: "2k24AHS124",

    department: "AHS",

    designation: "Professor",

    instituteName: "JKKN College of Allied Health Sciences",

    routeNo: "8",

    feedbackDate: "15-07-2024",

    feedbackTime: "10.00 AM",
  },

  {
    sNo: 14,

    staffName: "Snekha H",

    staffId: "2k20PD155",

    department: "PHARM D",

    designation: "Lab Technician",

    instituteName: "JKKN College of Pharmacy",

    routeNo: "15",

    feedbackDate: "15-07-2024",

    feedbackTime: "10.00 AM",
  },
];

const studentColumns = [
  { key: "serialNumber", label: "S.No" },
  { key: "studentName", label: "Student Name" },
  { key: "regNo", label: "Reg No" },
  { key: "year", label: "Year" },
  { key: "department", label: "Department" },
  { key: "section", label: "Section" },
  { key: "instituteName", label: "Institute Name" },
  { key: "routeNo", label: "Route No" },
  { key: "feedbackDate", label: "Feedback Date" },
  { key: "feedbackTime", label: "Feedback Time" },
  { key: "view", label: "View Feedback" }, // New column for view icon
];

const staffColumns = [
  { key: "serialNumber", label: "S.No" },
  { key: "staffName", label: "Staff Name" },
  { key: "staffId", label: "Staff ID" },
  { key: "department", label: "Department" },
  { key: "designation", label: "Designation" },
  { key: "instituteName", label: "Institute Name" },
  { key: "routeNo", label: "Route No" },
  { key: "feedbackDate", label: "Feedback Date" },
  { key: "feedbackTime", label: "Feedback Time" },
  { key: "view", label: "View Feedback" }, // New column for view icon
];

const ReceivedFeedback = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPageStudent, setCurrentPageStudent] = useState(1);
  const [currentPageStaff, setCurrentPageStaff] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filteredStudents, setFilteredStudents] =
    useState(studentsFeedbackData);
  const [filteredStaffs, setFilteredStaffs] = useState(staffsFeedbackData);
  const [selectedFeedback, setSelectedFeedback] = useState(null); // Track selected feedback
  const [viewingFeedback, setViewingFeedback] = useState(null); // Display specific feedback details

  const containerRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleOutsideClick = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setSelectedFeedback(null);
    }
  };

  const handleRowClick = (item) => {
    setSelectedFeedback(selectedFeedback === item ? null : item);
  };

  const handleViewFeedback = (feedback) => {
    setViewingFeedback(feedback);
  };

  const renderTable = (data, columns, currentPage, itemsPerPage) => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    return (
      <div className="received-feedback-table-container">
        <div className="received-feedback-table-wrapper">
          <table className="received-feedback-table">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.key}>{column.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr
                  key={item.sNo}
                  onClick={() => handleRowClick(item)}
                  className={selectedFeedback === item ? "selected" : ""}
                >
                  {columns.map((column) => (
                    <td key={column.key}>
                      {column.key === "view" ? (
                        <FontAwesomeIcon
                          icon={faEye}
                          className="feedback-view-icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewFeedback(item);
                          }}
                        />
                      ) : (
                        item[column.key]
                      )}
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
      <div className="received-feedback-pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="received-feedback-pagination-button"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`received-feedback-pagination-button ${
              currentPage === number ? "active" : ""
            }`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === pageNumbers.length}
          className="received-feedback-pagination-button"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    );
  };

  return (
    <div className="received-feedback-container" ref={containerRef}>
      <header className="received-feedback-top-bar">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="received-feedback-back-icon"
          onClick={onBack}
        />
        <h2>Feedbacks Received</h2>
      </header>

      <main className="received-feedback-main-content">
        <div className="received-feedback-actions">
          <div className="received-feedback-search-container">
            <div className="search-input-wrapper">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input
                type="text"
                className="received-feedback-search-bar"
                placeholder="Search feedback..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="action-buttons-container">
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
          <div className="received-feedback-filters">
            {/* Filter options */}
          </div>
        )}

        <div className="received-feedback-tables-container">
          <div className="received-feedback-table-section">
            <h3>
              <FontAwesomeIcon icon={faUserGraduate} /> Students Feedback
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
              (pageNumber) => setCurrentPageStudent(pageNumber)
            )}
          </div>

          <div className="received-feedback-table-section">
            <h3>
              <FontAwesomeIcon icon={faUserTie} /> Staff Feedback
            </h3>
            {renderTable(
              filteredStaffs,
              staffColumns,
              currentPageStaff,
              itemsPerPage
            )}
            {renderPagination(
              currentPageStaff,
              filteredStaffs.length,
              (pageNumber) => setCurrentPageStaff(pageNumber)
            )}
          </div>
        </div>

        {viewingFeedback && (
          <SpecificFeedbackReceived
            feedback={viewingFeedback}
            onClose={() => setViewingFeedback(null)}
          />
        )}
      </main>
    </div>
  );
};

export default ReceivedFeedback;
