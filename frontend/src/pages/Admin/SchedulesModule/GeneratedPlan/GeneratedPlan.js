import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faEye } from "@fortawesome/free-solid-svg-icons";
import "./GeneratedPlan.css";
import Button from "../../../../components/Shared/Button/Button";
import SpecificRouteGeneratedPlan from "../SpecificRouteGeneratedPlan/SpecificRouteGeneratedPlan";
import TopBar from "../../../../components/Shared/TopBar/TopBar";
import SearchBar from "../../../../components/Shared/SearchBar/SearchBar";
import TableContainer from "../../../../components/Shared/TableContainer/TableContainer";
import Pagination from "../../../../components/Shared/Pagination/Pagination";

const GeneratedPlan = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ route: "" });
  const [selectedRoute, setSelectedRoute] = useState(null);

  const itemsPerPage = 10;

  const generatedPlanData = [
    { route: 1, driver: "Murugan S", scheduled: 60 },
    { route: 2, driver: "Murugan S", scheduled: 56 },
    { route: 3, driver: "Kumar S", scheduled: 55 },
    { route: 4, driver: "Murugan S", scheduled: 43 },
    { route: 5, driver: "Murugan S", scheduled: 54 },
    { route: 6, driver: "Kumar S", scheduled: 66 },
    { route: 7, driver: "Murugan S", scheduled: 44 },
    { route: 8, driver: "Vel K", scheduled: 51 },
    { route: 9, driver: "Raju S", scheduled: 80 },
    { route: 10, driver: "Gokul K", scheduled: 40 },
  ];

  const filteredPlan = generatedPlanData.filter(
    (item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      ) &&
      (filters.route === "" || item.route.toString() === filters.route)
  );

  const currentItems = filteredPlan.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const uniqueRoutes = [
    ...new Set(generatedPlanData.map((item) => item.route)),
  ];

  if (selectedRoute) {
    return (
      <SpecificRouteGeneratedPlan
        onBack={() => setSelectedRoute(null)}
        routeData={selectedRoute}
      />
    );
  }

  return (
    <div className="generated-plan-container">
      <TopBar title="Generated Plan" backButton onBack={onBack} />
      <main className="generated-plan-main-content">
        <div className="generated-plan-search-filter">
          <SearchBar
            placeholder="Search by Route No or Driver Name"
            onSearch={setSearchTerm}
          />
          <div className="generated-plan-action-button-container">
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
          <div className="generated-plan-filters">
            <select
              name="route"
              value={filters.route}
              onChange={handleFilterChange}
            >
              <option value="">Route</option>
              {uniqueRoutes.map((route) => (
                <option key={route} value={route.toString()}>
                  {route}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="generated-plan-info">
          <h3>Plan for 27/07/24</h3>
          <span className="total-buses">
            Total of {filteredPlan.length} buses
          </span>
        </div>

        {filteredPlan.length > 0 ? (
          <>
            <TableContainer
              headers={["Route", "Driver", "Scheduled", "Details"]}
              rows={currentItems.map((item) => ({
                id: item.route,
                data: {
                  Route: item.route,
                  Driver: item.driver,
                  Scheduled: item.scheduled,
                  Details: (
                    <FontAwesomeIcon
                      icon={faEye}
                      className="generated-plan-view-icon"
                      onClick={() => setSelectedRoute(item)}
                    />
                  ),
                },
              }))}
            />

            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredPlan.length / itemsPerPage)}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <p className="no-data-message">No data available</p>
        )}
      </main>
    </div>
  );
};

export default GeneratedPlan;
