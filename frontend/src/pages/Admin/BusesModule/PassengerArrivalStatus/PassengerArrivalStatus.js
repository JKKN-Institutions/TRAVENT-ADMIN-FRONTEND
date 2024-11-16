import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faUserGraduate,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "./PassengerArrivalStatus.css";
import TopBar from "../../../../components/Shared/TopBar/TopBar";
import TableContainer from "../../../../components/Shared/TableContainer/TableContainer";
import Pagination from "../../../../components/Shared/Pagination/Pagination";

ChartJS.register(ArcElement, Tooltip, Legend);

const PassengerArrivalStatus = ({ onBack }) => {
  const [studentView, setStudentView] = useState("All");
  const [staffView, setStaffView] = useState("All");
  const [currentPageStudent, setCurrentPageStudent] = useState(1);
  const [currentPageStaff, setCurrentPageStaff] = useState(1);
  const itemsPerPage = 10;

  const passengerData = {
    students: [
      {
        id: 1,
        name: "Aishu J",
        regNo: "611220104123",
        rollNo: "2k24AHS157",
        year: "I",
        department: "AHS",
        section: "A",
        instituteName: "JKKN College of Allied Health Sciences",
        boardingPoint: "Seelanayakkampatti Bypass",
        scannedTime: "07:55 AM",
        status: "Scanned",
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
        boardingPoint: "Kakapalayam",
        scannedTime: "-",
        status: "Not Scanned",
      },
      {
        id: 3,
        name: "Balagi G",
        regNo: "611220104134",
        rollNo: "2k20PD159",
        year: "V",
        department: "PHARM D",
        section: "B",
        instituteName: "JKKN College of Pharmacy",
        boardingPoint: "Thiruvagowndanoor Bypass",
        scannedTime: "07:40 AM",
        status: "Scanned",
      },
    ],
    staff: [
      {
        id: 1,
        name: "Aishu J",
        staffId: "2k24AHS157",
        department: "AHS",
        designation: "Professor",
        instituteName: "JKKN College of Allied Health Sciences",
        boardingPoint: "Seelanayakkampatti Bypass",
        scannedTime: "07:55 AM",
        status: "Scanned",
      },
      {
        id: 2,
        name: "Arun S",
        staffId: "2k22BP135",
        department: "B.PHARM",
        designation: "Assistant Professor",
        instituteName: "JKKN College of Pharmacy",
        boardingPoint: "Kakapalayam",
        scannedTime: "-",
        status: "Not Scanned",
      },
      {
        id: 3,
        name: "Balagi G",
        staffId: "2k20PD159",
        department: "PHARM D",
        designation: "Professor",
        instituteName: "JKKN College of Pharmacy",
        boardingPoint: "Thiruvagowndanoor Bypass",
        scannedTime: "07:40 AM",
        status: "Scanned",
      },
    ],
  };

  const columns = {
    studentColumns: [
      { key: "serialNumber", label: "S.No" },
      { key: "name", label: "Student Name" },
      { key: "regNo", label: "Reg No" },
      { key: "rollNo", label: "Roll No" },
      { key: "year", label: "Year" },
      { key: "department", label: "Department" },
      { key: "section", label: "Section" },
      { key: "instituteName", label: "Institute Name" },
      { key: "boardingPoint", label: "Boarding Point" },
      { key: "scannedTime", label: "Scanned Time" },
      { key: "status", label: "Status" },
    ],
    staffColumns: [
      { key: "serialNumber", label: "S.No" },
      { key: "name", label: "Staff Name" },
      { key: "staffId", label: "Staff ID" },
      { key: "department", label: "Department" },
      { key: "designation", label: "Designation" },
      { key: "instituteName", label: "Institute Name" },
      { key: "boardingPoint", label: "Boarding Point" },
      { key: "scannedTime", label: "Scanned Time" },
      { key: "status", label: "Status" },
    ],
  };

  const paginateData = (data, page) =>
    data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const StatusChart = ({ current, total, label }) => {
    const data = {
      datasets: [
        {
          data: [current, total - current],
          backgroundColor: ["#4CAF50", "#2c2c2c"],
          borderColor: ["rgba(255, 255, 255, 1)"],
          borderWidth: 1,
          cutout: "70%",
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true },
      },
    };

    return (
      <div className="passenger-arrival-status-status-circle-container">
        <div className="passenger-arrival-status-status-circle">
          <div
            style={{ width: "100px", height: "100px", position: "relative" }}
          >
            <Doughnut data={data} options={options} />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
              }}
            >
              <div
                className="passenger-arrival-status-percentage"
                style={{ fontSize: "18px", fontWeight: "bold", color: "#fff" }}
              >
                {current}/{total}
              </div>
            </div>
          </div>
          <span>{label}</span>
        </div>
      </div>
    );
  };

  const PassengerTable = ({
    title,
    icon,
    view,
    setView,
    columns,
    data,
    page,
    setPage,
    totalData,
  }) => (
    <div className="passenger-arrival-status-table-section">
      <div className="passenger-arrival-status-table-header">
        <h3>
          <FontAwesomeIcon icon={icon} /> {title}
        </h3>
        <div className="passenger-arrival-status-view-selector">
          <span>View: </span>
          <select value={view} onChange={(e) => setView(e.target.value)}>
            <option value="All">All</option>
            <option value="Scanned">Scanned</option>
            <option value="Not Scanned">Not Scanned</option>
          </select>
          <FontAwesomeIcon
            icon={faChevronDown}
            className="passenger-arrival-status-select-icon"
          />
        </div>
      </div>
      <TableContainer
        headers={columns.map((col) => col.label)}
        rows={paginateData(data, page).map((item, index) => ({
          id: item.id,
          data: { ...item },
        }))}
      />
      <Pagination
        currentPage={page}
        totalPages={Math.ceil(totalData.length / itemsPerPage)}
        onPageChange={setPage}
      />
    </div>
  );

  return (
    <div className="passenger-arrival-status-container">
      <TopBar
        title="Passenger Arrival Status"
        onBack={onBack}
        backButton={true}
      />
      <main className="passenger-arrival-status-main">
        <div className="passenger-arrival-status-route-info">
          <h2>Route 1</h2>
        </div>
        <div className="passenger-arrival-status-status-circles">
          <StatusChart current={52} total={55} label="Students" />
          <StatusChart current={3} total={5} label="Staffs" />
        </div>
        <div className="passenger-arrival-status-passenger-tables">
          <PassengerTable
            title="Students"
            icon={faUserGraduate}
            view={studentView}
            setView={setStudentView}
            columns={columns.studentColumns}
            data={passengerData.students}
            page={currentPageStudent}
            setPage={setCurrentPageStudent}
            totalData={passengerData.students}
          />
          <PassengerTable
            title="Staffs"
            icon={faUserTie}
            view={staffView}
            setView={setStaffView}
            columns={columns.staffColumns}
            data={passengerData.staff}
            page={currentPageStaff}
            setPage={setCurrentPageStaff}
            totalData={passengerData.staff}
          />
        </div>
      </main>
    </div>
  );
};

export default PassengerArrivalStatus;
