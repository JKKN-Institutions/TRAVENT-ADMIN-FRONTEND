import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faSearch,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "./AddAmuletsFee.css";
import AddAmuletFees from "../AddAmuletFees/AddAmuletFees";

const AddAmuletsFee = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

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

  const handleAddClick = (student) => {
    setSelectedStudent(student);
  };

  const handleAddAmuletFee = (feeData) => {
    // Handle adding amulet fee logic here
    console.log(
      "Adding amulet fee for student:",
      selectedStudent,
      "Fee data:",
      feeData
    );
    setSelectedStudent(null);
  };

  if (selectedStudent) {
    return (
      <AddAmuletFees
        student={selectedStudent}
        onBack={() => setSelectedStudent(null)}
        onAdd={handleAddAmuletFee}
      />
    );
  }

  return (
    <div className="add-amulets-fee-container">
      <header className="add-amulets-fee-header">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="add-amulets-fee-back-icon"
          onClick={onBack}
        />
        <h2>Add Fee & Refill Amulets</h2>
      </header>

      <main className="add-amulets-fee-main-content">
        <div className="add-amulets-fee-search-container">
          <div className="add-amulets-fee-search-wrapper">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              className="add-amulets-fee-search-bar"
              placeholder="Search by Name, Reg No, or Roll No"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="add-amulets-fee-table-container">
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

                <th>Add and Refill</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr key={student.id}>
                  <td>{index + 1}</td>
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

                  <td>
                    <button
                      className="add-refill-button"
                      onClick={() => handleAddClick(student)}
                    >
                      <FontAwesomeIcon icon={faPlus} /> Add
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AddAmuletsFee;
