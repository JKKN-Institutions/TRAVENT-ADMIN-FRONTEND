import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faEye,
  faUserGraduate,
  faUserTie,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "./ReceivedFeedback.css";
import Button from "../../../../components/Shared/Button/Button";
import SpecificFeedbackReceived from "../SpecificFeedbackReceived/SpecificFeedbackReceived";
import TopBar from "../../../../components/Shared/TopBar/TopBar";
import SearchBar from "../../../../components/Shared/SearchBar/SearchBar";
import TableContainer from "../../../../components/Shared/TableContainer/TableContainer";
import Pagination from "../../../../components/Shared/Pagination/Pagination";
import ConfirmationModal from "../../../../components/Shared/ConfirmationModal/ConfirmationModal";
import ToastNotification, {
  showToast,
} from "../../../../components/Shared/ToastNotification/ToastNotification";

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

const ReceivedFeedback = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPageStudent, setCurrentPageStudent] = useState(1);
  const [currentPageStaff, setCurrentPageStaff] = useState(1);
  const [filteredStudents, setFilteredStudents] =
    useState(studentsFeedbackData);
  const [filteredStaffs, setFilteredStaffs] = useState(staffsFeedbackData);
  const [selectedStudentFeedback, setSelectedStudentFeedback] = useState([]);
  const [selectedStaffFeedback, setSelectedStaffFeedback] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [viewingFeedback, setViewingFeedback] = useState(null);
  const [filters, setFilters] = useState({
    year: "",
    department: "",
    section: "",
    routeNo: "",
  });

  const containerRef = useRef(null);

  // Filter and search combined function
  const applyFiltersAndSearch = () => {
    const filterData = (data) =>
      data.filter((entry) =>
        Object.entries({ ...filters, searchTerm }).every(([key, value]) => {
          if (!value) return true;
          return entry[key]
            ?.toString()
            .toLowerCase()
            .includes(value.toLowerCase());
        })
      );

    setFilteredStudents(filterData(studentsFeedbackData));
    setFilteredStaffs(filterData(staffsFeedbackData));
    setCurrentPageStudent(1);
    setCurrentPageStaff(1);
  };

  useEffect(applyFiltersAndSearch, [filters, searchTerm]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Handle row selection and deletion
  const handleRowClick = (id, selected, setSelected) => {
    setSelected((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    );
  };

  // Select all students/staff
  const handleSelectAll = (data, selected, setSelected) => {
    if (selected.length === data.length) {
      setSelected([]); // Deselect all
    } else {
      setSelected(data.map((item) => item.sNo)); // Select all
    }
  };

  // Handle Delete Feedback
  const handleDeleteFeedback = async () => {
    try {
      const updatedStudents = filteredStudents.filter(
        (student) => !selectedStudentFeedback.includes(student.sNo)
      );
      const updatedStaffs = filteredStaffs.filter(
        (staff) => !selectedStaffFeedback.includes(staff.sNo)
      );

      setFilteredStudents(updatedStudents);
      setFilteredStaffs(updatedStaffs);

      showToast("success", "Feedback deleted successfully!");

      setSelectedStudentFeedback([]);
      setSelectedStaffFeedback([]);
      setShowDeleteConfirmation(false);
    } catch (error) {
      showToast("error", "Failed to delete feedback.");
    }
  };

  return (
    <div className="received-feedback-container" ref={containerRef}>
      <TopBar title="Feedbacks Received" onBack={onBack} backButton={true} />
      <main className="received-feedback-main-content">
        <div className="received-feedback-actions">
          <SearchBar
            placeholder="Search feedback..."
            onSearch={(value) => setSearchTerm(value)}
          />
          <div className="received-feedback-action-buttons-container">
            <Button
              label={
                <>
                  <FontAwesomeIcon icon={faFilter} /> Filter by
                </>
              }
              onClick={() => setShowFilters(!showFilters)}
            />
            <Button
              label={
                <>
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </>
              }
              onClick={() => setShowDeleteConfirmation(true)}
              disabled={
                selectedStudentFeedback.length === 0 &&
                selectedStaffFeedback.length === 0
              }
            />
          </div>
        </div>

        {showFilters && (
          <div className="received-feedback-filters">
            {Object.keys(filters).map((filterKey) => (
              <select
                key={filterKey}
                name={filterKey}
                value={filters[filterKey]}
                onChange={handleFilterChange}
              >
                <option value="">{filterKey.replace(/([A-Z])/g, " $1")}</option>
                {Array.from(
                  new Set(
                    [...studentsFeedbackData, ...staffsFeedbackData]
                      .map((item) => item[filterKey])
                      .filter(Boolean)
                  )
                ).map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            ))}
          </div>
        )}

        {/* Student Table */}
        <div className="received-feedback-table-section">
          <h3>
            <FontAwesomeIcon icon={faUserGraduate} /> Students Feedback
          </h3>
          <TableContainer
            headers={[
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={
                    selectedStudentFeedback.length === filteredStudents.length
                  }
                  onChange={() =>
                    handleSelectAll(
                      filteredStudents,
                      selectedStudentFeedback,
                      setSelectedStudentFeedback
                    )
                  }
                />
                <span className="checkbox-checkmark"></span>
              </label>,
              "S.No",
              "Student Name",
              "Reg No",
              "Roll No",
              "Year",
              "Department",
              "Section",
              "Institute Name",
              "Route No",
              "Feedback Date",
              "Feedback Time",
              "View",
            ]}
            rows={filteredStudents
              .slice((currentPageStudent - 1) * 5, currentPageStudent * 5)
              .map((student, index) => ({
                id: student.sNo,
                data: {
                  select: (
                    <label className="custom-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedStudentFeedback.includes(student.sNo)}
                        onChange={() =>
                          handleRowClick(
                            student.sNo,
                            selectedStudentFeedback,
                            setSelectedStudentFeedback
                          )
                        }
                      />
                      <span className="checkbox-checkmark"></span>
                    </label>
                  ),
                  sNo: index + 1,
                  studentName: student.studentName,
                  regNo: student.regNo,
                  rollNo: student.rollNo,
                  year: student.year,
                  department: student.department,
                  section: student.section,
                  instituteName: student.instituteName,
                  routeNo: student.routeNo,
                  feedbackDate: student.feedbackDate,
                  feedbackTime: student.feedbackTime,
                  view: (
                    <FontAwesomeIcon
                      icon={faEye}
                      className="feedback-view-icon"
                      onClick={() => setViewingFeedback(student)}
                    />
                  ),
                },
              }))}
            onRowClick={(row) =>
              handleRowClick(
                row.id,
                selectedStudentFeedback,
                setSelectedStudentFeedback
              )
            }
            selectedRowId={selectedStudentFeedback}
          />
          <Pagination
            currentPage={currentPageStudent}
            totalPages={Math.ceil(filteredStudents.length / 5)}
            onPageChange={(pageNumber) => setCurrentPageStudent(pageNumber)}
          />
        </div>

        {/* Staff Table */}
        <div className="received-feedback-table-section">
          <h3>
            <FontAwesomeIcon icon={faUserTie} /> Staff Feedback
          </h3>
          <TableContainer
            headers={[
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={
                    selectedStaffFeedback.length === filteredStaffs.length
                  }
                  onChange={() =>
                    handleSelectAll(
                      filteredStaffs,
                      selectedStaffFeedback,
                      setSelectedStaffFeedback
                    )
                  }
                />
                <span className="checkbox-checkmark"></span>
              </label>,
              "S.No",
              "Staff Name",
              "Staff ID",
              "Department",
              "Designation",
              "Institute Name",
              "Route No",
              "Feedback Date",
              "Feedback Time",
              "View",
            ]}
            rows={filteredStaffs
              .slice((currentPageStaff - 1) * 5, currentPageStaff * 5)
              .map((staff, index) => ({
                id: staff.sNo,
                data: {
                  select: (
                    <label className="custom-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedStaffFeedback.includes(staff.sNo)}
                        onChange={() =>
                          handleRowClick(
                            staff.sNo,
                            selectedStaffFeedback,
                            setSelectedStaffFeedback
                          )
                        }
                      />
                      <span className="checkbox-checkmark"></span>
                    </label>
                  ),
                  sNo: index + 1,
                  staffName: staff.staffName,
                  staffId: staff.staffId,
                  department: staff.department,
                  designation: staff.designation,
                  instituteName: staff.instituteName,
                  routeNo: staff.routeNo,
                  feedbackDate: staff.feedbackDate,
                  feedbackTime: staff.feedbackTime,
                  view: (
                    <FontAwesomeIcon
                      icon={faEye}
                      className="feedback-view-icon"
                      onClick={() => setViewingFeedback(staff)}
                    />
                  ),
                },
              }))}
            onRowClick={(row) =>
              handleRowClick(
                row.id,
                selectedStaffFeedback,
                setSelectedStaffFeedback
              )
            }
            selectedRowId={selectedStaffFeedback}
          />
          <Pagination
            currentPage={currentPageStaff}
            totalPages={Math.ceil(filteredStaffs.length / 5)}
            onPageChange={(pageNumber) => setCurrentPageStaff(pageNumber)}
          />
        </div>

        {viewingFeedback && (
          <SpecificFeedbackReceived
            feedback={viewingFeedback}
            onClose={() => setViewingFeedback(null)}
          />
        )}
      </main>

      {showDeleteConfirmation && (
        <ConfirmationModal
          title="Confirm Deletion"
          message="Are you sure you want to delete the selected feedback?"
          confirmText="Yes, Delete"
          cancelText="Cancel"
          onConfirm={handleDeleteFeedback}
          onCancel={() => setShowDeleteConfirmation(false)}
        />
      )}

      <ToastNotification />
    </div>
  );
};

export default ReceivedFeedback;
