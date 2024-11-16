import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import "./ViewStaffs.css";
import Button from "../../../../components/Shared/Button/Button";
import TopBar from "../../../../components/Shared/TopBar/TopBar"; // Import TopBar
import SearchBar from "../../../../components/Shared/SearchBar/SearchBar"; // Import SearchBar
import TableContainer from "../../../../components/Shared/TableContainer/TableContainer"; // Import TableContainer
import Pagination from "../../../../components/Shared/Pagination/Pagination"; // Import Pagination

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
  const [filters, setFilters] = useState({
    routeNo: "",
    department: "",
    designation: "",
    instituteName: "",
    status: "",
  });

  // Optimized filtering logic
  const filterData = (data, term, filters) => {
    return data
      .filter((staff) =>
        Object.values(staff).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(term.toLowerCase())
        )
      )
      .filter((staff) =>
        Object.entries(filters).every(([key, value]) =>
          value
            ? staff[key].toString().toLowerCase().includes(value.toLowerCase())
            : true
        )
      );
  };

  const [filteredStaffs, setFilteredStaffs] = useState(staffsData);

  useEffect(() => {
    setFilteredStaffs(filterData(staffsData, searchTerm, filters));
    setCurrentPage(1);
  }, [searchTerm, filters]);

  const handleSearchChange = (term) => setSearchTerm(term);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const getUniqueValues = (key) => [
    ...new Set(staffsData.map((staff) => staff[key])),
  ];

  const staffColumns = [
    { key: "sNo", label: "S.No" },
    { key: "staffName", label: "Staff Name" },
    { key: "empId", label: "Emp ID" },
    { key: "department", label: "Department" },
    { key: "designation", label: "Designation" },
    { key: "instituteName", label: "Institute Name" },
    { key: "routeNo", label: "Route No" },
    { key: "stopName", label: "Stop Name" },
    { key: "pendingFee", label: "Pending Fee" },
    { key: "remainingAmulets", label: "Remaining Amulets" },
    { key: "refilledAmulets", label: "Refilled Amulets" },
    { key: "status", label: "Status" },
  ];

  const currentItems = filteredStaffs.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );

  return (
    <div className="view-staffs-container">
      <TopBar title="View Staffs" onBack={onBack} backButton={true} />
      <main className="view-staffs-main-content">
        <div className="view-staffs-search-filter">
          <SearchBar
            placeholder="Search by Route No or Name"
            onSearch={handleSearchChange}
          />
          <div className="view-staffs-action-button-container">
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
          <div className="view-staffs-filters">
            {[
              "routeNo",
              "department",
              "designation",
              "instituteName",
              "status",
            ].map((filter) => (
              <select
                key={filter}
                name={filter}
                value={filters[filter]}
                onChange={handleFilterChange}
              >
                <option value="">
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </option>
                {getUniqueValues(filter).map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            ))}
          </div>
        )}

        <TableContainer
          headers={staffColumns.map((col) => col.label)}
          rows={
            currentItems.length > 0
              ? currentItems.map((staff) => ({ id: staff.empId, data: staff }))
              : [
                  {
                    id: "no-data",
                    data: { message: "No data available" },
                    colSpan: staffColumns.length,
                  },
                ]
          }
        />

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredStaffs.length / 10)}
          onPageChange={setCurrentPage}
        />
      </main>
    </div>
  );
};

export default ViewStaffs;
