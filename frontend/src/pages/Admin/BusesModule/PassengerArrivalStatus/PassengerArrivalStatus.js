import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faUserGraduate,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import "./PassengerArrivalStatus.css";

const PassengerArrivalStatus = ({ onBack }) => {
  const [studentView, setStudentView] = useState("All");
  const [staffView, setStaffView] = useState("All");
  const [currentPageStudent, setCurrentPageStudent] = useState(1);
  const [currentPageStaff, setCurrentPageStaff] = useState(1);
  const [itemsPerPage] = useState(10);

  const studentsData = [
    {
      id: 1,
      name: "Aishu J",
      regNo: "611220104123",
      rollNo: "2k24AHS157",
      year: "I",
      department: "AHS",
      section: "A",
      instituteName: "JKKN College of Allied Health Sciences",
      boardingPoint: "Seelanayakkampatti Bypass",
      scannedTime: "07:55 AM",
      status: "Scanned",
    },
    {
      id: 2,
      name: "Arun S",
      regNo: "611220104145",
      rollNo: "2k22BP135",
      year: "III",
      department: "B.PHARM",
      section: "A",
      instituteName: "JKKN College of Pharmacy",
      boardingPoint: "Kakapalayam",
      scannedTime: "-",
      status: "Not Scanned",
    },
    {
      id: 3,
      name: "Balagi G",
      regNo: "611220104134",
      rollNo: "2k20PD159",
      year: "V",
      department: "PHARM D",
      section: "B",
      instituteName: "JKKN College of Pharmacy",
      boardingPoint: "Thiruvagowndanoor Bypass",
      scannedTime: "07:40 AM",
      status: "Scanned",
    },
  ];

  const staffData = [
    {
      id: 1,
      name: "Aishu J",
      staffId: "2k24AHS157",
      department: "AHS",
      designation: "Professor",
      instituteName: "JKKN College of Allied Health Sciences",
      boardingPoint: "Seelanayakkampatti Bypass",
      scannedTime: "07:55 AM",
      status: "Scanned",
    },
    {
      id: 2,
      name: "Arun S",
      staffId: "2k22BP135",
      department: "B.PHARM",
      designation: "Assistant Professor",
      instituteName: "JKKN College of Pharmacy",
      boardingPoint: "Kakapalayam",
      scannedTime: "-",
      status: "Not Scanned",
    },
    {
      id: 3,
      name: "Balagi G",
      staffId: "2k20PD159",
      department: "PHARM D",
      designation: "Professor",
      instituteName: "JKKN College of Pharmacy",
      boardingPoint: "Thiruvagowndanoor Bypass",
      scannedTime: "07:40 AM",
      status: "Scanned",
    },
  ];

  const paginateStudent = (pageNumber) => setCurrentPageStudent(pageNumber);
  const paginateStaff = (pageNumber) => setCurrentPageStaff(pageNumber);

  const renderPagination = (currentPage, totalItems, paginate) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="passenger-arrival-status-pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="passenger-arrival-status-pagination-button"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`passenger-arrival-status-pagination-button ${
              currentPage === number ? "active" : ""
            }`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === pageNumbers.length}
          className="passenger-arrival-status-pagination-button"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    );
  };

  const indexOfLastItemStudent = currentPageStudent * itemsPerPage;
  const indexOfFirstItemStudent = indexOfLastItemStudent - itemsPerPage;
  const currentStudents = studentsData.slice(
    indexOfFirstItemStudent,
    indexOfLastItemStudent
  );

  const indexOfLastItemStaff = currentPageStaff * itemsPerPage;
  const indexOfFirstItemStaff = indexOfLastItemStaff - itemsPerPage;
  const currentStaff = staffData.slice(
    indexOfFirstItemStaff,
    indexOfLastItemStaff
  );

  return (
    <div className="passenger-arrival-status-container">
      <header className="passenger-arrival-status-header">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="passenger-arrival-status-back-icon"
          onClick={onBack}
        />
        <h1>Passenger Arrival Status</h1>
      </header>

      <main className="passenger-arrival-status-main">
        <div className="passenger-arrival-status-route-info">
          <h2>Route 1</h2>
        </div>

        <div className="passenger-arrival-status-status-circles">
          <div className="passenger-arrival-status-status-circle-container">
            <div className="passenger-arrival-status-status-circle">
              <svg
                viewBox="0 0 36 36"
                className="passenger-arrival-status-circular-chart"
              >
                <path
                  className="passenger-arrival-status-circle-bg"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="passenger-arrival-status-circle"
                  strokeDasharray="94, 100"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text
                  x="18"
                  y="20.35"
                  className="passenger-arrival-status-percentage"
                >
                  52/55
                </text>
              </svg>
              <span>Students</span>
            </div>
          </div>

          <div className="passenger-arrival-status-status-circle-container">
            <div className="passenger-arrival-status-status-circle">
              <svg
                viewBox="0 0 36 36"
                className="passenger-arrival-status-circular-chart"
              >
                <path
                  className="passenger-arrival-status-circle-bg"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="passenger-arrival-status-circle"
                  strokeDasharray="60, 100"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text
                  x="18"
                  y="20.35"
                  className="passenger-arrival-status-percentage"
                >
                  3/5
                </text>
              </svg>
              <span>Staffs</span>
            </div>
          </div>
        </div>

        <div className="passenger-arrival-status-passenger-tables">
          <div className="passenger-arrival-status-table-section">
            <div className="passenger-arrival-status-table-header">
              <h3>
                <FontAwesomeIcon icon={faUserGraduate} /> Students
              </h3>
              <div className="passenger-arrival-status-view-selector">
                <span>View: </span>
                <select
                  value={studentView}
                  onChange={(e) => setStudentView(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Scanned">Scanned</option>
                  <option value="Not Scanned">Not Scanned</option>
                </select>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="passenger-arrival-status-select-icon"
                />
              </div>
            </div>
            <div className="passenger-arrival-status-table-container">
              <div className="passenger-arrival-status-table-wrapper">
                <table className="passenger-arrival-status-table">
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
                      <th>Boarding Point</th>
                      <th>Scanned Time</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentStudents.map((student, index) => (
                      <tr key={student.id}>
                        <td>{indexOfFirstItemStudent + index + 1}</td>
                        <td>{student.name}</td>
                        <td>{student.regNo}</td>
                        <td>{student.rollNo}</td>
                        <td>{student.year}</td>
                        <td>{student.department}</td>
                        <td>{student.section}</td>
                        <td>{student.instituteName}</td>
                        <td>{student.boardingPoint}</td>
                        <td>{student.scannedTime}</td>
                        <td>{student.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {renderPagination(
              currentPageStudent,
              studentsData.length,
              paginateStudent
            )}
          </div>

          <div className="passenger-arrival-status-table-section">
            <div className="passenger-arrival-status-table-header">
              <h3>
                <FontAwesomeIcon icon={faUserTie} /> Staffs
              </h3>
              <div className="passenger-arrival-status-view-selector">
                <span>View: </span>
                <select
                  value={staffView}
                  onChange={(e) => setStaffView(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Scanned">Scanned</option>
                  <option value="Not Scanned">Not Scanned</option>
                </select>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="passenger-arrival-status-select-icon"
                />
              </div>
            </div>
            <div className="passenger-arrival-status-table-container">
              <div className="passenger-arrival-status-table-wrapper">
                <table className="passenger-arrival-status-table">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Staff Name</th>
                      <th>Staff ID</th>
                      <th>Department</th>
                      <th>Designation</th>
                      <th>Institute Name</th>
                      <th>Boarding Point</th>
                      <th>Scanned Time</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentStaff.map((staff, index) => (
                      <tr key={staff.id}>
                        <td>{indexOfFirstItemStaff + index + 1}</td>
                        <td>{staff.name}</td>
                        <td>{staff.staffId}</td>
                        <td>{staff.department}</td>
                        <td>{staff.designation}</td>
                        <td>{staff.instituteName}</td>
                        <td>{staff.boardingPoint}</td>
                        <td>{staff.scannedTime}</td>
                        <td>{staff.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {renderPagination(
              currentPageStaff,
              staffData.length,
              paginateStaff
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PassengerArrivalStatus;
