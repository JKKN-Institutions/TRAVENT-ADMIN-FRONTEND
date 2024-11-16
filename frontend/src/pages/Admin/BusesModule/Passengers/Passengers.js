import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faUserGraduate,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import TopBar from "../../../../components/Shared/TopBar/TopBar";
import SearchBar from "../../../../components/Shared/SearchBar/SearchBar";
import TableContainer from "../../../../components/Shared/TableContainer/TableContainer";
import Pagination from "../../../../components/Shared/Pagination/Pagination";
import ConfirmationModal from "../../../../components/Shared/ConfirmationModal/ConfirmationModal";
import Button from "../../../../components/Shared/Button/Button";
import ToastNotification, {
  showToast,
} from "../../../../components/Shared/ToastNotification/ToastNotification";
import "./Passengers.css";

const Passengers = ({ route, onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPassengers, setSelectedPassengers] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [currentPageStudent, setCurrentPageStudent] = useState(1);
  const [currentPageStaff, setCurrentPageStaff] = useState(1);

  // State data
  // Define the state variables and their setter functions
  const [studentsData, setStudentsData] = useState([
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
  ]);
  const [staffData, setStaffData] = useState([
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
  ]);

  const itemsPerPage = 5;
  const containerRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setSelectedPassengers([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handlePassengerClick = (passenger) => {
    setSelectedPassengers((prev) =>
      prev.includes(passenger.id)
        ? prev.filter((id) => id !== passenger.id)
        : [...prev, passenger.id]
    );
  };

  const handleSelectAll = (type) => {
    const filteredPassengers = type === "student" ? studentsData : staffData;
    const allSelected = filteredPassengers.every((passenger) =>
      selectedPassengers.includes(passenger.id)
    );
    if (allSelected) {
      setSelectedPassengers([]); // Deselect all
    } else {
      setSelectedPassengers(
        filteredPassengers.map((passenger) => passenger.id) // Select all
      );
    }
  };

  const handleDeletePassenger = () => {
    try {
      // Separate delete logic for students and staff
      const updatedStudents = studentsData.filter(
        (student) => !selectedPassengers.includes(student.id)
      );
      const updatedStaff = staffData.filter(
        (staff) => !selectedPassengers.includes(staff.id)
      );

      // Update the state with the filtered data
      setStudentsData(updatedStudents);
      setStaffData(updatedStaff);

      // Recalculate S.No for both students and staff after deletion
      const updatedStudentRows = updatedStudents.map((student, index) => ({
        ...student,
        sNo: index + 1, // Adjust S.No based on index
      }));
      const updatedStaffRows = updatedStaff.map((staff, index) => ({
        ...staff,
        sNo: index + 1, // Adjust S.No based on index
      }));

      // Set the recalculated S.No values
      setStudentsData(updatedStudentRows);
      setStaffData(updatedStaffRows);

      // Display success message
      showToast("success", "Selected passengers deleted successfully!");

      // Clear selections and close confirmation modal
      setSelectedPassengers([]);
      setShowDeleteConfirmation(false);
    } catch (error) {
      showToast("error", "Failed to delete passengers.");
    }
  };

  const filteredStudents = studentsData.filter(
    (student) =>
      student.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.regNo?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStaff = staffData.filter(
    (staff) =>
      staff.staffName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.staffID?.toLowerCase().includes(searchTerm.toLowerCase())
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

  const studentColumns = [
    {
      key: "selectAll",
      label: (
        <label className="custom-checkbox">
          <input
            type="checkbox"
            checked={filteredStudents.every((student) =>
              selectedPassengers.includes(student.id)
            )}
            onChange={() => handleSelectAll("student")}
          />
          <span className="checkbox-checkmark"></span>
        </label>
      ),
    },
    { key: "serialNumber", label: "S No" },
    { key: "studentName", label: "Student Name" },
    { key: "regNo", label: "Reg No" },
    { key: "rollNo", label: "Roll No" },
    { key: "year", label: "Year" },
    { key: "department", label: "Department" },
    { key: "section", label: "Section" },
    { key: "instituteName", label: "Institute Name" },
    { key: "stopping", label: "Stopping" },
    { key: "pendingFee", label: "Pending Fee" },
    { key: "remainingAmulets", label: "Remaining Amulets" },
    { key: "refilledAmulets", label: "Refilled Amulets" },
    { key: "status", label: "Status" },
  ];

  const staffColumns = [
    {
      key: "selectAll",
      label: (
        <label className="custom-checkbox">
          <input
            type="checkbox"
            checked={filteredStaff.every((staff) =>
              selectedPassengers.includes(staff.id)
            )}
            onChange={() => handleSelectAll("staff")}
          />
          <span className="checkbox-checkmark"></span>
        </label>
      ),
    },
    { key: "serialNumber", label: "S No" },
    { key: "staffName", label: "Staff Name" },
    { key: "staffID", label: "Staff ID" },
    { key: "department", label: "Department" },
    { key: "designation", label: "Designation" },
    { key: "instituteName", label: "Institute Name" },
    { key: "boardingPoint", label: "Boarding Point" },
    { key: "pendingFee", label: "Pending Fee" },
    { key: "remainingAmulets", label: "Remaining Amulets" },
    { key: "refilledAmulets", label: "Refilled Amulets" },
    { key: "status", label: "Status" },
  ];

  const renderNoDataRow = (colSpan) => ({
    id: "no-data",
    data: { message: "No data available" },
    colSpan,
  });

  return (
    <div className="bus-passengers-container" ref={containerRef}>
      <ToastNotification />
      <TopBar
        title={`Passengers for Route ${route.routeNumber}`}
        onBack={onBack}
        backButton={true}
      />

      <main className="bus-passengers-main-content">
        <div className="bus-passengers-actions">
          <SearchBar
            placeholder="Search passengers..."
            onSearch={setSearchTerm}
          />
          <div className="bus-passengers-action-buttons-container">
            <Button
              label={
                <>
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </>
              }
              onClick={() => setShowDeleteConfirmation(true)}
              disabled={selectedPassengers.length === 0}
            />
          </div>
        </div>

        <div className="bus-passengers-tables-container">
          <div className="bus-passengers-table-section">
            <h3>
              <FontAwesomeIcon icon={faUserGraduate} /> Students
            </h3>
            <TableContainer
              headers={studentColumns.map((col) => col.label)}
              rows={
                currentStudents.length > 0
                  ? currentStudents.map((student, index) => ({
                      id: student.id,
                      data: {
                        select: (
                          <label className="custom-checkbox">
                            <input
                              type="checkbox"
                              checked={selectedPassengers.includes(student.id)}
                              onChange={() => handlePassengerClick(student)}
                            />
                            <span className="checkbox-checkmark"></span>
                          </label>
                        ),
                        ...student,
                      },
                    }))
                  : [renderNoDataRow(studentColumns.length)]
              }
              onRowClick={(row) => handlePassengerClick(row)}
              selectedRowId={selectedPassengers}
            />
            <Pagination
              currentPage={currentPageStudent}
              totalPages={Math.ceil(filteredStudents.length / itemsPerPage)}
              onPageChange={paginateStudent}
            />
          </div>

          <div className="bus-passengers-table-section">
            <h3>
              <FontAwesomeIcon icon={faUserTie} /> Staff
            </h3>
            <TableContainer
              headers={staffColumns.map((col) => col.label)}
              rows={
                currentStaff.length > 0
                  ? currentStaff.map((staff, index) => ({
                      id: staff.id,
                      data: {
                        select: (
                          <label className="custom-checkbox">
                            <input
                              type="checkbox"
                              checked={selectedPassengers.includes(staff.id)}
                              onChange={() => handlePassengerClick(staff)}
                            />
                            <span className="checkbox-checkmark"></span>
                          </label>
                        ),
                        ...staff,
                      },
                    }))
                  : [renderNoDataRow(staffColumns.length)]
              }
              onRowClick={(row) => handlePassengerClick(row)}
              selectedRowId={selectedPassengers}
            />
            <Pagination
              currentPage={currentPageStaff}
              totalPages={Math.ceil(filteredStaff.length / itemsPerPage)}
              onPageChange={paginateStaff}
            />
          </div>
        </div>
      </main>

      {showDeleteConfirmation && (
        <ConfirmationModal
          title="Confirm Deletion"
          message="Are you sure you want to delete this passenger?"
          confirmText="Yes, Delete"
          cancelText="Cancel"
          onConfirm={handleDeletePassenger}
          onCancel={() => setShowDeleteConfirmation(false)}
        />
      )}
    </div>
  );
};

export default Passengers;
