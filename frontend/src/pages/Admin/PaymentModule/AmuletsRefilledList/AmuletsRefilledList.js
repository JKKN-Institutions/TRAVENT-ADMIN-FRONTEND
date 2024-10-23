import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faSearch,
  faFilter,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./AmuletsRefilledList.css";
import Button from "../../../../components/Shared/Button/Button";

const amuletsRefilledData = [
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
    academicYear: "2024-25",
    amuletsFee: 1000,
    refilledCount: 1,
    refilledAmulets: 100,
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
    academicYear: "2024-25",
    amuletsFee: 1000,
    refilledCount: 1,
    refilledAmulets: 100,
  },
  // ... Add the rest of the student data here
];

const AmuletsRefilledFilters = ({ filters, setFilters, data }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const getUniqueValues = (key) => {
    return [...new Set(data.map((student) => student[key]))];
  };

  return (
    <div className="amulets-refilled-filters">
      <select name="route" value={filters.route} onChange={handleFilterChange}>
        <option value="">Route</option>
        {getUniqueValues("routeNo").map((route) => (
          <option key={route} value={route}>
            {route}
          </option>
        ))}
      </select>

      <select name="year" value={filters.year} onChange={handleFilterChange}>
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
        name="instituteName"
        value={filters.instituteName}
        onChange={handleFilterChange}
      >
        <option value="">Institute Name</option>
        {getUniqueValues("instituteName").map((institute) => (
          <option key={institute} value={institute}>
            {institute}
          </option>
        ))}
      </select>
    </div>
  );
};

const AmuletsRefilledTable = ({
  currentItems,
  filteredStudents,
  itemsPerPage,
  paginate,
  currentPage,
}) => {
  return (
    <>
      <div className="amulets-refilled-table-container">
        <div className="amulets-refilled-table-wrapper">
          <table className="amulets-refilled-table">
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
                <th>Amulets Fee</th>
                <th>Refilled Count</th>
                <th>Refilled Amulets</th>
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
                  <td>{student.academicYear}</td>
                  <td>{student.amuletsFee}</td>
                  <td>{student.refilledCount}</td>
                  <td>{student.refilledAmulets}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="amulets-refilled-pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="amulets-refilled-pagination-button"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        {Array.from({
          length: Math.ceil(filteredStudents.length / itemsPerPage),
        }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`amulets-refilled-pagination-button ${
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
          className="amulets-refilled-pagination-button"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </>
  );
};

const AmuletsRefilledList = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filteredStudents, setFilteredStudents] = useState(amuletsRefilledData);
  const [filters, setFilters] = useState({
    route: "",
    year: "",
    department: "",
    section: "",
    instituteName: "",
  });

  useEffect(() => {
    const results = amuletsRefilledData.filter((student) =>
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
    const results = amuletsRefilledData.filter((student) => {
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

  return (
    <div className="amulets-refilled-container">
      <header className="amulets-refilled-top-bar">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="amulets-refilled-back-icon"
          onClick={onBack}
        />
        <h2>Amulets Refilled List</h2>
      </header>

      <main className="amulets-refilled-main-content">
        <div className="amulets-refilled-search-filter">
          <div className="amulets-refilled-search-input-wrapper">
            <FontAwesomeIcon
              icon={faSearch}
              className="amulets-refilled-search-icon"
            />
            <input
              type="text"
              className="amulets-refilled-search-bar"
              placeholder="Search by Name or Reg No"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="amulets-refilled-action-button-container">
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
          <AmuletsRefilledFilters
            filters={filters}
            setFilters={setFilters}
            data={amuletsRefilledData}
          />
        )}

        <AmuletsRefilledTable
          currentItems={currentItems}
          filteredStudents={filteredStudents}
          itemsPerPage={itemsPerPage}
          paginate={paginate}
          currentPage={currentPage}
        />
      </main>
    </div>
  );
};

export default AmuletsRefilledList;
