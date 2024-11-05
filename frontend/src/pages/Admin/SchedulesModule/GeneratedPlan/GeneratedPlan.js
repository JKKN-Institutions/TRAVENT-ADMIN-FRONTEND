import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faSearch,
  faFilter,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import "./GeneratedPlan.css";
import Button from "../../../../components/Shared/Button/Button";
import SpecificRouteGeneratedPlan from "../SpecificRouteGeneratedPlan/SpecificRouteGeneratedPlan";

const GeneratedPlan = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedRoute, setSelectedRoute] = useState(null);

  const [filters, setFilters] = useState({
    route: "",
  });

  // Mock data for the generated plan
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
    // Add more mock data as needed
  ];

  const filteredPlan = generatedPlanData.filter(
    (item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      ) &&
      (filters.route === "" || item.route.toString() === filters.route)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPlan.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const getUniqueRoutes = () => {
    return [...new Set(generatedPlanData.map((item) => item.route))];
  };

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
      <header className="generated-plan-top-bar">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="generated-plan-back-icon"
          onClick={onBack}
        />
        <h2>Generated Plan</h2>
      </header>

      <main className="generated-plan-main-content">
        <div className="generated-plan-search-filter">
          <div className="generated-plan-search-input-wrapper">
            <FontAwesomeIcon
              icon={faSearch}
              className="generated-plan-search-icon"
            />
            <input
              type="text"
              className="generated-plan-search-bar"
              placeholder="Search by Route No or Driver Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="generated-plan-action-button-container">
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
          <div className="generated-plan-filters">
            <select
              name="route"
              value={filters.route}
              onChange={handleFilterChange}
            >
              <option value="">Route</option>
              {getUniqueRoutes().map((route) => (
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

        <div className="generated-plan-table-container">
          <div className="generated-plan-table-wrapper">
            <table className="generated-plan-table">
              <thead>
                <tr>
                  <th>Route</th>
                  <th>Driver</th>
                  <th>Scheduled</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.route}</td>
                    <td>{item.driver}</td>
                    <td>{item.scheduled}</td>
                    <td>
                      <button
                        className="view-details-button"
                        onClick={() => setSelectedRoute(item)}
                      >
                        View <FontAwesomeIcon icon={faChevronRight} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="generated-plan-pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="generated-plan-pagination-button"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          {Array.from({
            length: Math.ceil(filteredPlan.length / itemsPerPage),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`generated-plan-pagination-button ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(filteredPlan.length / itemsPerPage)
            }
            className="generated-plan-pagination-button"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </main>
    </div>
  );
};

export default GeneratedPlan;
