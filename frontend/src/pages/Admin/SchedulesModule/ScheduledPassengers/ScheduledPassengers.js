import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faUserGraduate,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import "./ScheduledPassengers.css";
import Button from "../../../../components/Shared/Button/Button";
import TopBar from "../../../../components/Shared/TopBar/TopBar";
import SearchBar from "../../../../components/Shared/SearchBar/SearchBar";
import TableContainer from "../../../../components/Shared/TableContainer/TableContainer";
import Pagination from "../../../../components/Shared/Pagination/Pagination";

const studentsScheduledData = [
  {
    "S.No": 1,

    studentName: "Aishu J",

    regNo: "611220104123",

    scheduledFor: "Both",

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
    "S.No": 2,

    studentName: "Arun S",

    regNo: "611220104145",

    scheduledFor: "Both",

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
    "S.No": 3,

    studentName: "Balagi G",

    regNo: "611220104134",

    scheduledFor: "Both",

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
    "S.No": 4,

    studentName: "Gobi U",

    regNo: "611220104185",

    scheduledFor: "Morning",

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
    "S.No": 5,

    studentName: "Gopal O",

    regNo: "611220104198",

    scheduledFor: "Both",

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
    "S.No": 6,

    studentName: "Gowtham R",

    regNo: "611220104165",

    scheduledFor: "Evening",

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
    "S.No": 7,

    studentName: "Jaya V",

    regNo: "611220104176",

    scheduledFor: "Morning",

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
    "S.No": 8,

    studentName: "Karthik L",

    regNo: "611220104187",

    scheduledFor: "Evening",

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
    "S.No": 9,

    studentName: "Keerthi S",

    regNo: "611220104182",

    scheduledFor: "Both",

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
    "S.No": 10,

    studentName: "Kumar S",

    regNo: "611220104194",

    scheduledFor: "Both",

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
    "S.No": 11,

    studentName: "Prem K",

    regNo: "611220104113",

    scheduledFor: "Evening",

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
    "S.No": 12,

    studentName: "Sanjay J",

    regNo: "611220104157",

    scheduledFor: "Both",

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
    "S.No": 13,

    studentName: "Senthil S",

    regNo: "611220104119",

    scheduledFor: "Both",

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
    "S.No": 14,

    studentName: "Snekha H",

    regNo: "611220104196",

    scheduledFor: "Morning",

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

const staffScheduledData = [
  {
    "S.No": 1,

    staffName: "Aishu J",

    staffID: "2k24AHS157",

    scheduledFor: "Both",

    department: "AHS",

    designation: "Professor",

    instituteName: "JKKN College of Allied Health Sciences",

    boardingPoint: "Seelanayakkampatti Bypass",

    scannedTime: "07:55 AM",

    status: "Scanned",
  },

  {
    "S.No": 2,

    staffName: "Arun S",

    staffID: "2k22BP135",

    scheduledFor: "Morning",

    department: "B.PHARM",

    designation: "Assistant Professor",

    instituteName: "JKKN College of Pharmacy",

    boardingPoint: "Kakapalayam",

    scannedTime: "-",

    status: "Not Scanned",
  },

  {
    "S.No": 3,

    staffName: "Balagi G",

    staffID: "2k20PD159",

    scheduledFor: "Both",

    department: "PHARM D",

    designation: "Professor",

    instituteName: "JKKN College of Pharmacy",

    boardingPoint: "Thiruvagowndanoor Bypass",

    scannedTime: "07:40 AM",

    status: "Scanned",
  },

  {
    "S.No": 4,

    staffName: "Gobi U",

    staffID: "2k21CSE152",

    scheduledFor: "Both",

    department: "CSE",

    designation: "Associate Professor",

    instituteName: "JKKN College of Engineering & Technology",

    boardingPoint: "Kakapalayam",

    scannedTime: "07:55 AM",

    status: "Scanned",
  },

  {
    "S.No": 5,

    staffName: "Gopal O",

    staffID: "2k24EEE165",

    scheduledFor: "Evening",

    department: "EEE",

    designation: "Associate Professor",

    instituteName: "JKKN College of Engineering & Technology",

    boardingPoint: "Seelanayakkampatti Bypass",

    scannedTime: "-",

    status: "Not Scanned",
  },

  {
    "S.No": 6,

    staffName: "Gowtham R",

    staffID: "2k24AHS155",

    scheduledFor: "Both",

    department: "AHS",

    designation: "Lab Technician",

    instituteName: "JKKN College of Allied Health Sciences",

    boardingPoint: "Kanthampatti Bypass",

    scannedTime: "08:00 AM",

    status: "Scanned",
  },

  {
    "S.No": 7,

    staffName: "Jaya V",

    staffID: "2k24ECE163",

    scheduledFor: "Both",

    department: "ECE",

    designation: "Assistant Professor",

    instituteName: "JKKN College of Engineering & Technology",

    boardingPoint: "Ariyanoor",

    scannedTime: "07:55 AM",

    status: "Scanned",
  },

  {
    "S.No": 8,

    staffName: "Karthik L",

    staffID: "2k23IT151",

    scheduledFor: "Morning",

    department: "IT",

    designation: "Assistant Professor",

    instituteName: "JKKN College of Engineering & Technology",

    boardingPoint: "Kanthampatti Bypass",

    scannedTime: "08:01 AM",

    status: "Scanned",
  },

  {
    "S.No": 9,

    staffName: "Keerthi S",

    staffID: "2k21IT111",

    scheduledFor: "Both",

    department: "IT",

    designation: "Lab Technician",

    instituteName: "JKKN College of Engineering & Technology",

    boardingPoint: "Kondalampatty Bypass",

    scannedTime: "-",

    status: "Not Scanned",
  },

  {
    "S.No": 10,

    staffName: "Kumar S",

    staffID: "2k23CSE134",

    scheduledFor: "Evening",

    department: "CSE",

    designation: "Associate Professor",

    instituteName: "JKKN College of Engineering & Technology",

    boardingPoint: "Gowndanoor",

    scannedTime: "-",

    status: "Not Scanned",
  },

  {
    "S.No": 11,

    staffName: "Prem K",

    staffID: "2k22BP132",

    scheduledFor: "Both",

    department: "B.PHARM",

    designation: "Assistant Professor",

    instituteName: "JKKN College of Pharmacy",

    boardingPoint: "Magundanjavadi",

    scannedTime: "-",

    status: "Not Scanned",
  },

  {
    "S.No": 12,

    staffName: "Sanjay J",

    staffID: "2k23EEE162",

    scheduledFor: "Both",

    department: "EEE",

    designation: "Assistant Professor",

    instituteName: "JKKN College of Engineering & Technology",

    boardingPoint: "Kakapalayam",

    scannedTime: "08:15 AM",

    status: "Scanned",
  },

  {
    "S.No": 13,

    staffName: "Senthil S",

    staffID: "2k24AHS124",

    scheduledFor: "Both",

    department: "AHS",

    designation: "Professor",

    instituteName: "JKKN College of Allied Health Sciences",

    boardingPoint: "Thiruvagowndanoor Bypass",

    scannedTime: "07:39 AM",

    status: "Scanned",
  },

  {
    "S.No": 14,

    staffName: "Snekha H",

    staffID: "2k20PD155",

    scheduledFor: "Evening",

    department: "PHARM D",

    designation: "Lab Technician",

    instituteName: "JKKN College of Pharmacy",

    boardingPoint: "Seelanayakkampatti Bypass",

    scannedTime: "07:52 AM",

    status: "Scanned",
  },
];

const ScheduledPassengers = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState({ student: 1, staff: 1 });
  const [filteredData, setFilteredData] = useState({
    students: studentsScheduledData,
    staff: staffScheduledData,
  });
  const [filters, setFilters] = useState({
    scheduledFor: "",
    year: "",
    department: "",
    section: "",
    instituteName: "",
    routeNo: "",
    status: "",
    designation: "",
  });

  const itemsPerPage = 5;

  // Filter and search combined function
  const applyFiltersAndSearch = () => {
    const filterData = (data) =>
      data.filter((entry) =>
        Object.entries({ ...filters, searchTerm }).every(([key, value]) => {
          if (!value) return true;
          return entry[key]
            ?.toString()
            .toLowerCase()
            .includes(value.toString().toLowerCase());
        })
      );

    setFilteredData({
      students: filterData(studentsScheduledData),
      staff: filterData(staffScheduledData),
    });
    setCurrentPage({ student: 1, staff: 1 });
  };

  useEffect(applyFiltersAndSearch, [filters, searchTerm]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const tableData = [
    {
      label: "Students Scheduled",
      icon: faUserGraduate,
      data: filteredData.students,
      columns: [
        "S.No",
        "studentName",
        "regNo",
        "scheduledFor",
        "rollNo",
        "year",
        "department",
        "section",
        "instituteName",
        "routeNo",
        "stopName",
        "pendingFee",
        "remainingAmulets",
        "refilledAmulets",
        "status",
      ],
      pageKey: "student",
    },
    {
      label: "Staff Scheduled",
      icon: faUserTie,
      data: filteredData.staff,
      columns: [
        "S.No",
        "staffName",
        "staffID",
        "scheduledFor",
        "department",
        "designation",
        "instituteName",
        "boardingPoint",
        "scannedTime",
        "status",
      ],
      pageKey: "staff",
    },
  ];

  return (
    <div className="scheduled-passengers-container">
      <TopBar title="Scheduled Passengers" backButton onBack={onBack} />

      <main className="scheduled-passengers-main-content">
        <div className="scheduled-passengers-actions">
          <SearchBar
            placeholder="Search by Route No or Passenger Name"
            onSearch={setSearchTerm}
          />
          <div className="scheduled-passengers-action-button-container">
            <Button
              label={
                <>
                  <FontAwesomeIcon icon={faFilter} /> Filter by
                </>
              }
              onClick={() => setShowFilters((prev) => !prev)}
            />
          </div>
        </div>

        {showFilters && (
          <div className="scheduled-passengers-filters">
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
                    [...studentsScheduledData, ...staffScheduledData]
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

        <div className="scheduled-passengers-tables-container">
          {tableData.map(({ label, icon, data, columns, pageKey }) => (
            <div key={label} className="scheduled-passengers-table-section">
              <div className="scheduled-passengers-table-sub-section">
                <h3>
                  <FontAwesomeIcon
                    icon={icon}
                    className={`${pageKey}-schedule-icon`}
                  />{" "}
                  {label}
                </h3>
                <p className="total-count">Total of {data.length}</p>
              </div>
              <TableContainer
                headers={columns.map((col) => col)}
                rows={
                  data.length > 0
                    ? data
                        .slice(
                          (currentPage[pageKey] - 1) * itemsPerPage,
                          currentPage[pageKey] * itemsPerPage
                        )
                        .map((item) => ({ id: item["S.No"], data: item }))
                    : [
                        {
                          id: "no-data",
                          data: { message: "No data available" },
                        },
                      ]
                }
              />

              <Pagination
                currentPage={currentPage[pageKey]}
                totalPages={Math.ceil(data.length / itemsPerPage)}
                onPageChange={(page) =>
                  setCurrentPage((prev) => ({ ...prev, [pageKey]: page }))
                }
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ScheduledPassengers;
