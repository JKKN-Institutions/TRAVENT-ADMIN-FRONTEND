import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewBusDetails = () => {
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const [busData, setBusData] = useState([]);
  const [showBusData, setShowBusData] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchBusData();
  }, []);

  useEffect(() => {
    setFilteredData(busData); // Set filteredData to busData initially
  }, [busData]);

  const fetchBusData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3000/api/fetch_bus_data"
      );
      if (response.status === 200) {
        setBusData(response.data.busData);
        setShowBusData(true);
      } else {
        console.error("Failed to fetch bus data");
      }
    } catch (error) {
      console.error("Error fetching bus data:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    // Convert search query to lowercase
    const searchInput = searchQuery.toLowerCase();

    // Filter the bus data based on the search query
    const filteredData = busData.filter((row) => {
      const routeNumber = row[0].toString().toLowerCase();
      const busStopName = row[2].toString().toLowerCase();
      return (
        routeNumber.includes(searchInput) || busStopName.includes(searchInput)
      );
    });

    // Update the bus data with filtered data
    setFilteredData(filteredData);
  }, [searchQuery]); // Dependency array with searchQuery

  return (
    <div className="current-bus-container">
      {/* <h4>Read Bus data</h4>
            <button onClick={fetchBusData}>View Data</button> */}

      {loading ? (
        <div className="skeleton-inner-container">
          {/* <div className="skeleton skeleton-header"></div> */}
          <div className="skeleton-wrap">
            <div className="skeleton skeleton-bus-section"></div>
            <div className="skeleton-wrap-inside">
              {/* <div className="skeleton-wrap-inside-1">
            <div className="skeleton skeleton-sub-section"></div>
            <div className="skeleton skeleton-sub-section"></div>
          </div> */}
              <div className="skeleton skeleton-sub-section"></div>
            </div>
          </div>
        </div>
      ) : showBusData ? (
        <>
          <div className="bus-details-table-container">
            <div class="search-container search-container1">
              <i class="bx bx-search"></i>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Route Number or Bus Stop Name"
              />
            </div>
            <div className="attendance-table-container">
              <table>
                <tbody>
                  {filteredData &&
                    filteredData.length > 0 &&
                    filteredData.map((row, index) => (
                      <tr key={index}>
                        <td>{row[0]}</td>
                        <td>{row[1]}</td>
                        <td>{row[2]}</td>
                        <td>{row[3]}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ViewBusDetails;
