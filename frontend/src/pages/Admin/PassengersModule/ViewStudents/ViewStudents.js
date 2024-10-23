import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faSearch,
  faFilter,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./ViewStudents.css";
import Button from "../../../../components/Shared/Button/Button";

const studentsData = [
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
    stopName: "Seelanayakkampatti Bypass",
    pendingFee: 4500,
    remainingAmulets: 40,
    refilledAmulets: 0,
    status: "Active",
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
    stopName: "Kakapalayam",
    pendingFee: 4500,
    remainingAmulets: 50,
    refilledAmulets: 0,
    status: "Active",
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
    stopName: "Thiruvagowndanoor Bypass",
    pendingFee: 4500,
    remainingAmulets: 50,
    refilledAmulets: 0,
    status: "Active",
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
    stopName: "Kakapalayam",
    pendingFee: 4500,
    remainingAmulets: 60,
    refilledAmulets: 100,
    status: "Active",
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
    stopName: "Seelanayakkampatti Bypass",
    pendingFee: 3000,
    remainingAmulets: 60,
    refilledAmulets: 0,
    status: "Active",
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
    stopName: "Kanthampatti Bypass",
    pendingFee: 1500,
    remainingAmulets: 100,
    refilledAmulets: 100,
    status: "Active",
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
    stopName: "Ariyanoor",
    pendingFee: 1500,
    remainingAmulets: 80,
    refilledAmulets: 0,
    status: "Active",
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
    stopName: "Kanthampatti Bypass",
    pendingFee: 1500,
    remainingAmulets: 30,
    refilledAmulets: 0,
    status: "Active",
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
    stopName: "Kondalampatty Bypass",
    pendingFee: 4500,
    remainingAmulets: 100,
    refilledAmulets: 0,
    status: "Active",
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
    stopName: "Gowndanoor",
    pendingFee: 3000,
    remainingAmulets: 0,
    refilledAmulets: 0,
    status: "Inactive",
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
    stopName: "Magundanjavadi",
    pendingFee: 3000,
    remainingAmulets: 50,
    refilledAmulets: 100,
    status: "Active",
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
    stopName: "Kakapalayam",
    pendingFee: 3000,
    remainingAmulets: 20,
    refilledAmulets: 0,
    status: "Active",
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
    stopName: "Thiruvagowndanoor Bypass",
    pendingFee: 4500,
    remainingAmulets: 60,
    refilledAmulets: 100,
    status: "Active",
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
    stopName: "Seelanayakkampatti Bypass",
    pendingFee: 3000,
    remainingAmulets: 20,
    refilledAmulets: 0,
    status: "Active",
  },
];

const ViewStudents = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filteredStudents, setFilteredStudents] = useState(studentsData);

  const [filters, setFilters] = useState({
    route: "",
    year: "",
    department: "",
    section: "",
    collegeName: "",
    status: "",
  });

  useEffect(() => {
    const results = studentsData.filter((student) =>
      Object.values(student).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredStudents(results);
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    const results = studentsData.filter((student) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return (
          student[key] &&
          student[key].toLowerCase().includes(value.toLowerCase())
        );
      });
    });
    setFilteredStudents(results);
    setCurrentPage(1);
  }, [filters]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStudents.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const getUniqueValues = (key) => {
    return [...new Set(studentsData.map((student) => student[key]))];
  };

  return (
    <div className="view-students-container">
      <header className="view-students-top-bar">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="view-students-back-icon"
          onClick={onBack}
        />
        <h2>View Students</h2>
      </header>

      <main className="view-students-main-content">
        <div className="view-students-search-filter">
          <div className="view-students-search-input-wrapper">
            <FontAwesomeIcon
              icon={faSearch}
              className="view-students-search-icon"
            />
            <input
              type="text"
              className="view-students-search-bar"
              placeholder="Search by Route No or Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="view-students-action-button-container">
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
          <div className="view-students-filters">
            <select
              name="route"
              value={filters.route}
              onChange={handleFilterChange}
            >
              <option value="">Route</option>

              {getUniqueValues("routeNo").map((route) => (
                <option key={route} value={route}>
                  {route}
                </option>
              ))}
            </select>

            <select
              name="year"
              value={filters.year}
              onChange={handleFilterChange}
            >
              <option value="">Year</option>

              {getUniqueValues("year").map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <select
              name="department"
              value={filters.department}
              onChange={handleFilterChange}
            >
              <option value="">Department</option>

              {getUniqueValues("department").map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>

            <select
              name="section"
              value={filters.section}
              onChange={handleFilterChange}
            >
              <option value="">Section</option>

              {getUniqueValues("section").map((section) => (
                <option key={section} value={section}>
                  {section}
                </option>
              ))}
            </select>

            <select
              name="collegeName"
              value={filters.collegeName}
              onChange={handleFilterChange}
            >
              <option value="">College Name</option>

              {getUniqueValues("instituteName").map((institute) => (
                <option key={institute} value={institute}>
                  {institute}
                </option>
              ))}
            </select>

            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="">Status</option>

              {getUniqueValues("status").map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="view-students-table-container">
          <div className="view-students-table-wrapper">
            <table className="view-students-table">
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

                  <th>Pending Fee</th>

                  <th>Remaining Amulets</th>

                  <th>Refilled Amulets</th>

                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((student) => (
                  <tr key={student.regNo}>
                    <td>{student.sNo}</td>

                    <td>{student.studentName}</td>

                    <td>{student.regNo}</td>

                    <td>{student.rollNo}</td>

                    <td>{student.year}</td>

                    <td>{student.department}</td>

                    <td>{student.section}</td>

                    <td>{student.instituteName}</td>

                    <td>{student.routeNo}</td>

                    <td>{student.stopName}</td>

                    <td>{student.pendingFee}</td>

                    <td>{student.remainingAmulets}</td>

                    <td>{student.refilledAmulets}</td>

                    <td>{student.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="view-students-pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="view-students-pagination-button"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          {Array.from({
            length: Math.ceil(filteredStudents.length / itemsPerPage),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`view-students-pagination-button ${
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
            className="view-students-pagination-button"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </main>
    </div>
  );
};

export default ViewStudents;
