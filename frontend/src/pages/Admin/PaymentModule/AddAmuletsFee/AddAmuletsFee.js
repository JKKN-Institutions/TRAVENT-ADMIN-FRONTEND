import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faArrowLeft,
  faChevronLeft,
  faChevronRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "./AddAmuletsFee.css";
import Button from "../../../../components/Shared/Button/Button";
import AddAmuletFees from "../AddAmuletFees/AddAmuletFees";

const AddAmuletsFee = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const containerRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setSelectedStudent(null);
    }
  };

  const students = [
    {
      id: 1,
      name: "Aishu J",
      regNo: "611220104123",
      rollNo: "2k24AHS157",
      year: "I",
      department: "AHS",
      section: "A",
      instituteName: "JKKN College of Allied Health Sciences",
      routeNo: "15",
      stopName: "Seelanayakkampatti Bypass",
      academicYear: "2024-25",
      pending: "0",
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
      routeNo: "15",
      stopName: "Kakapalayam",
      academicYear: "2024-25",
      pending: "0",
    },
    // ... Add the rest of the student data here
  ];

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.regNo.includes(searchTerm) ||
      student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStudents.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddClick = () => {
    if (selectedStudent) {
      setSelectedStudent(selectedStudent);
    }
  };

  const handleAddAmuletFee = async (feeData) => {
    try {
      // Simulate API call with setTimeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log(
        "Adding amulet fee for student:",
        selectedStudent,
        "Fee data:",
        feeData
      );
    } catch (error) {
      console.error("Error adding amulet fee:", error);
    }
  };

  const handleRowClick = (student) => {
    setSelectedStudent(selectedStudent === student ? null : student);
  };

  if (selectedStudent && selectedStudent.isBeingEdited) {
    return (
      <AddAmuletFees
        student={selectedStudent}
        onBack={() => setSelectedStudent(null)}
        onAdd={handleAddAmuletFee}
      />
    );
  }

  return (
    <div className="add-amulets-fee-container" ref={containerRef}>
      <header className="add-amulets-fee-top-bar">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="add-amulets-fee-back-icon"
          onClick={onBack}
        />
        <h2>Add Fee & Refill Amulets</h2>
      </header>

      <main className="add-amulets-fee-main-content">
        <div className="add-amulets-fee-controls">
          <div className="add-amulets-fee-search-bar-container">
            <div className="add-amulets-fee-search-input-wrapper">
              <FontAwesomeIcon
                icon={faSearch}
                className="add-amulets-fee-search-icon"
              />
              <input
                type="text"
                className="add-amulets-fee-search-bar"
                placeholder="Search by Name, Reg No, or Roll No"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="add-amulets-fee-action-buttons">
            <Button
              label={
                <>
                  <FontAwesomeIcon icon={faPlus} /> Add
                </>
              }
              onClick={() => {
                if (selectedStudent) {
                  setSelectedStudent({
                    ...selectedStudent,
                    isBeingEdited: true,
                  });
                }
              }}
              disabled={!selectedStudent}
            />
          </div>
        </div>

        <div className="add-amulets-fee-table-container">
          <div className="add-amulets-fee-table-wrapper">
            <table className="add-amulets-fee-table">
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
                  <th>Pending Amulets</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((student, index) => (
                  <tr
                    key={student.id}
                    onClick={() => handleRowClick(student)}
                    className={selectedStudent === student ? "selected" : ""}
                  >
                    <td>{indexOfFirstItem + index + 1}</td>
                    <td>{student.name}</td>
                    <td>{student.regNo}</td>
                    <td>{student.rollNo}</td>
                    <td>{student.year}</td>
                    <td>{student.department}</td>
                    <td>{student.section}</td>
                    <td>{student.instituteName}</td>
                    <td>{student.routeNo}</td>
                    <td>{student.stopName}</td>
                    <td>{student.academicYear}</td>
                    <td>{student.pending}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="add-amulets-fee-pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="add-amulets-fee-pagination-button"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          {Array.from({
            length: Math.ceil(filteredStudents.length / itemsPerPage),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`add-amulets-fee-pagination-button ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(filteredStudents.length / itemsPerPage)
            }
            className="add-amulets-fee-pagination-button"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </main>
    </div>
  );
};

export default AddAmuletsFee;
