import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import "./AmuletsRefilledList.css";
import Button from "../../../../components/Shared/Button/Button";
import TopBar from "../../../../components/Shared/TopBar/TopBar";
import TableContainer from "../../../../components/Shared/TableContainer/TableContainer";
import Pagination from "../../../../components/Shared/Pagination/Pagination";
import SearchBar from "../../../../components/Shared/SearchBar/SearchBar";

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
  // Add more student data as required...
];

const AmuletsRefilledFilters = ({
  filters,
  setFilters,
  data,
  filterFields,
}) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const getUniqueValues = (key) => {
    return [...new Set(data.map((item) => item[key]))].filter(Boolean);
  };

  return (
    <div className="amulets-refilled-filters">
      {filterFields.map((field) => (
        <select
          key={field.key}
          name={field.key}
          value={filters[field.key] || ""}
          onChange={handleFilterChange}
        >
          <option value="">{field.label}</option>
          {getUniqueValues(field.key).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      ))}
    </div>
  );
};

const AmuletsRefilledList = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filters, setFilters] = useState({});
  const [filteredStudents, setFilteredStudents] = useState(amuletsRefilledData);

  useEffect(() => {
    const filteredData = amuletsRefilledData.filter((student) => {
      const matchesSearch =
        searchTerm === "" ||
        Object.values(student).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return (
          student[key] &&
          student[key].toString().toLowerCase().includes(value.toLowerCase())
        );
      });

      return matchesSearch && matchesFilters;
    });

    setFilteredStudents(filteredData);
    setCurrentPage(1);
  }, [searchTerm, filters]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStudents.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const headers = [
    "S.No",
    "Student Name",
    "Reg No",
    "Roll No",
    "Year",
    "Department",
    "Section",
    "Institute Name",
    "Route No",
    "Stop Name",
    "Academic Year",
    "Amulets Fee",
    "Refilled Count",
    "Refilled Amulets",
  ];

  const rows = currentItems.map((student, index) => ({
    id: student.regNo,
    data: {
      "S.No": indexOfFirstItem + index + 1,
      "Student Name": student.studentName,
      "Reg No": student.regNo,
      "Roll No": student.rollNo,
      Year: student.year,
      Department: student.department,
      Section: student.section,
      "Institute Name": student.instituteName,
      "Route No": student.routeNo,
      "Stop Name": student.stopName,
      "Academic Year": student.academicYear,
      "Amulets Fee": `₹${student.amuletsFee}`,
      "Refilled Count": student.refilledCount,
      "Refilled Amulets": student.refilledAmulets,
    },
  }));

  const filterFields = [
    { key: "routeNo", label: "Route" },
    { key: "year", label: "Year" },
    { key: "department", label: "Department" },
  ];

  return (
    <div className="amulets-refilled-container">
      <TopBar title="Amulets Refilled List" onBack={onBack} backButton={true} />
      <main className="amulets-refilled-main-content">
        <div className="amulets-refilled-search-filter">
          <SearchBar
            placeholder="Search by Name or Reg No"
            onSearch={setSearchTerm}
          />
          <div className="amulets-refilled-action-button-container">
            <Button
              label={
                <>
                  <FontAwesomeIcon icon={faFilter} /> Filter
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
            filterFields={filterFields}
          />
        )}

        <TableContainer headers={headers} rows={rows} />

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredStudents.length / itemsPerPage)}
          onPageChange={paginate}
        />
      </main>
    </div>
  );
};

export default AmuletsRefilledList;
