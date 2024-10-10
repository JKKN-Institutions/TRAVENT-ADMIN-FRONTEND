import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faSearch,
  faFilter,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./ViewStaffs.css";

const staffsData = [
  {
    sNo: 1,
    staffName: "John Doe",
    empId: "EMP001",
    department: "Computer Science",
    designation: "Professor",
    instituteName: "JKKN College of Engineering & Technology",
    routeNo: "15",
    stopName: "Seelanayakkampatti Bypass",
    pendingFee: 0,
    remainingAmulets: 100,
    refilledAmulets: 0,
    status: "Active",
  },
  {
    sNo: 2,
    staffName: "Jane Smith",
    empId: "EMP002",
    department: "Pharmacy",
    designation: "Associate Professor",
    instituteName: "JKKN College of Pharmacy",
    routeNo: "7",
    stopName: "Kakapalayam",
    pendingFee: 1500,
    remainingAmulets: 80,
    refilledAmulets: 50,
    status: "Active",
  },
  {
    sNo: 3,
    staffName: "Robert Johnson",
    empId: "EMP003",
    department: "Allied Health Sciences",
    designation: "Assistant Professor",
    instituteName: "JKKN College of Allied Health Sciences",
    routeNo: "9",
    stopName: "Thiruvagowndanoor Bypass",
    pendingFee: 0,
    remainingAmulets: 60,
    refilledAmulets: 100,
    status: "Active",
  },
  {
    sNo: 4,
    staffName: "Emily Brown",
    empId: "EMP004",
    department: "Engineering",
    designation: "Lab Assistant",
    instituteName: "JKKN College of Engineering & Technology",
    routeNo: "12",
    stopName: "Ariyanoor",
    pendingFee: 3000,
    remainingAmulets: 40,
    refilledAmulets: 0,
    status: "Active",
  },
  {
    sNo: 5,
    staffName: "Michael Wilson",
    empId: "EMP005",
    department: "Arts & Science",
    designation: "Lecturer",
    instituteName: "JKKN College of Arts & Science",
    routeNo: "5",
    stopName: "Kanthampatti Bypass",
    pendingFee: 1500,
    remainingAmulets: 70,
    refilledAmulets: 50,
    status: "Active",
  },
  {
    sNo: 6,
    staffName: "Sarah Davis",
    empId: "EMP006",
    department: "Dental",
    designation: "Senior Lecturer",
    instituteName: "JKKN Dental College & Hospital",
    routeNo: "3",
    stopName: "Kondalampatty Bypass",
    pendingFee: 0,
    remainingAmulets: 90,
    refilledAmulets: 0,
    status: "Active",
  },
  {
    sNo: 7,
    staffName: "David Miller",
    empId: "EMP007",
    department: "Education",
    designation: "Professor",
    instituteName: "JKKN College of Education",
    routeNo: "8",
    stopName: "Gowndanoor",
    pendingFee: 4500,
    remainingAmulets: 20,
    refilledAmulets: 0,
    status: "Inactive",
  },
  // ... Add more staff data here
];

const ViewStaffs = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filteredStaffs, setFilteredStaffs] = useState(staffsData);

  const [filters, setFilters] = useState({
    route: "",
    department: "",
    designation: "",
    instituteName: "",
    status: "",
  });

  useEffect(() => {
    const results = staffsData.filter((staff) =>
      Object.values(staff).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredStaffs(results);
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    const results = staffsData.filter((staff) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return staff[key].toLowerCase().includes(value.toLowerCase());
      });
    });
    setFilteredStaffs(results);
    setCurrentPage(1);
  }, [filters]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStaffs.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const getUniqueValues = (data, key) => {
    return [...new Set(data.map((item) => item[key]))];
  };

  const filterData = (data, filters) => {
    return data.filter((item) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return item[key].toLowerCase().includes(value.toLowerCase());
      });
    });
  };

  return (
    <div className="view-staffs-container">
      <header className="view-staffs-top-bar">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="view-staffs-back-icon"
          onClick={onBack}
        />
        <h2>View Staffs</h2>
      </header>

      <main className="view-staffs-main-content">
        <div className="view-staffs-search-filter">
          <div className="view-staffs-search-input-wrapper">
            <FontAwesomeIcon
              icon={faSearch}
              className="view-staffs-search-icon"
            />
            <input
              type="text"
              className="view-staffs-search-bar"
              placeholder="Search by Route No or Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="view-staffs-action-button-container">
            <button
              className="view-staffs-filter-button"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FontAwesomeIcon icon={faFilter} /> Filter by
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="view-staffs-filters">
            <select
              name="routeNo"
              value={filters.routeNo}
              onChange={handleFilterChange}
            >
              <option value="">Route</option>
              {getUniqueValues(staffsData, "routeNo").map((route) => (
                <option key={route} value={route}>
                  {route}
                </option>
              ))}
            </select>
            <select
              name="department"
              value={filters.department}
              onChange={handleFilterChange}
            >
              <option value="">Department</option>
              {getUniqueValues(staffsData, "department").map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            <select
              name="designation"
              value={filters.designation}
              onChange={handleFilterChange}
            >
              <option value="">Designation</option>
              {getUniqueValues(staffsData, "designation").map((desig) => (
                <option key={desig} value={desig}>
                  {desig}
                </option>
              ))}
            </select>
            <select
              name="instituteName"
              value={filters.instituteName}
              onChange={handleFilterChange}
            >
              <option value="">Institute Name</option>
              {getUniqueValues(staffsData, "instituteName").map((inst) => (
                <option key={inst} value={inst}>
                  {inst}
                </option>
              ))}
            </select>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="">Status</option>
              {getUniqueValues(staffsData, "status").map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="view-staffs-table-container">
          <div className="view-staffs-table-wrapper">
            <table className="view-staffs-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Staff Name</th>
                  <th>Emp ID</th>
                  <th>Department</th>
                  <th>Designation</th>
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
                {currentItems.map((staff) => (
                  <tr key={staff.empId}>
                    <td>{staff.sNo}</td>
                    <td>{staff.staffName}</td>
                    <td>{staff.empId}</td>
                    <td>{staff.department}</td>
                    <td>{staff.designation}</td>
                    <td>{staff.instituteName}</td>
                    <td>{staff.routeNo}</td>
                    <td>{staff.stopName}</td>
                    <td>{staff.pendingFee}</td>
                    <td>{staff.remainingAmulets}</td>
                    <td>{staff.refilledAmulets}</td>
                    <td>{staff.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="view-staffs-pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="view-staffs-pagination-button"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          {Array.from({
            length: Math.ceil(filteredStaffs.length / itemsPerPage),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`view-staffs-pagination-button ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(filteredStaffs.length / itemsPerPage)
            }
            className="view-staffs-pagination-button"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </main>
    </div>
  );
};

export default ViewStaffs;
