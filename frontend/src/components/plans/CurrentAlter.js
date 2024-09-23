import React, { useState, useEffect } from "react";
import axios from "axios";

const CurrentAlter = () => {
  const [alterPlan, setAlterPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchAlterPlan = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/current_alter_plan"
        );
        if (response.status === 200) {
          setAlterPlan(response.data.plan);
        } else {
          setErrorMessage(
            response.data.message || "Failed to fetchk alter plan"
          );
        }
      } catch (error) {
        console.error("Error fetching alter plan:", error);
        setErrorMessage("Failed to fetched alter plan");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };
    fetchAlterPlan();
  }, []);

  const calculateRemainingCapacity = (boardingCount) => {
    return 60 - boardingCount;
  };

  const mergeRoutes = (plans) => {
    const mergedRoutes = {};

    // Check if plans is an array and has elements
    if (Array.isArray(plans) && plans.length > 0) {
      plans.forEach((plan) => {
        const route = plan.route;
        const stopping = plan.stopping;
        const boardingCount = plan.boardingCount;

        if (!mergedRoutes[route]) {
          mergedRoutes[route] = {
            remainingCapacity: 60 - boardingCount,
            boardingCount: boardingCount,
            stops: {},
          };
        } else {
          mergedRoutes[route].remainingCapacity -= boardingCount;
          mergedRoutes[route].boardingCount += boardingCount;
        }

        if (!mergedRoutes[route].stops[stopping]) {
          mergedRoutes[route].stops[stopping] = [];
        }
        mergedRoutes[route].stops[stopping].push(...plan.regNo);
      });
    }

    return mergedRoutes;
  };

  return (
    <div className="current-alter-container">
      {loading ? (
        <div className="skeleton-inner-container">
          {/* <div className="skeleton skeleton-header"></div> */}
          <div className="skeleton-wrap">
            <div className="skeleton skeleton-section"></div>
            <div className="skeleton-wrap-inside">
              {/* <div className="skeleton-wrap-inside-1">
              <div className="skeleton skeleton-sub-section"></div>
              <div className="skeleton skeleton-sub-section"></div>
            </div> */}
              <div className="skeleton skeleton-sub-section"></div>
            </div>
          </div>
        </div>
      ) : errorMessage ? (
        <p>{errorMessage}</p>
      ) : alterPlan ? (
        <>
          <div className="alter-plan-container">
            <div className="alter-plan-details">
              <h3>Generated Plan:</h3>
              <p>
                Duration:{" "}
                {new Date(alterPlan.start_date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
                {" - "}
                {new Date(alterPlan.end_date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
              <div>
                {alterPlan.filterOptions.map((option, index) => (
                  <div key={index}>
                    {Object.entries(option).map(([key, values]) => (
                      <div key={key} className="view-filter">
                        <h3>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                          {" : "} {values.join(", ")}
                        </h3>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="regular-plan-table-container">
              <table className="main-table">
                <thead>
                  <tr>
                    <th>Route</th>
                    <th>Remaining Capacity</th>
                    <th>Boarding Count</th>
                    <th>Stopping</th>
                    <th>Time</th>
                    <th>Reg No(s)</th>
                  </tr>
                </thead>
                <tbody>
                  {alterPlan.plans.length > 0 &&
                    Object.entries(mergeRoutes(alterPlan.plans)).map(
                      ([route, details], index) => (
                        <tr key={index}>
                          <td>{route}</td>
                          <td>{details.remainingCapacity}</td>
                          <td>{details.boardingCount}</td>

                          <td>
                            {Object.entries(details.stops).map(
                              ([stop, regNos], stopIndex) => (
                                <tr key={stopIndex} className="center-align">
                                  <td
                                    className="nested-stop center-align"
                                    style={{ border: "none" }}
                                  >
                                    {stop}
                                  </td>
                                </tr>
                              )
                            )}
                          </td>
                          <td>
                            {Object.entries(details.stops).map(
                              ([stop, regNos], stopIndex) => (
                                <tr key={stopIndex} className="center-align">
                                  <td
                                    className="nested-time center-align"
                                    style={{ border: "none" }}
                                  >
                                    {
                                      alterPlan.plans.find(
                                        (plan) =>
                                          plan.route === route &&
                                          plan.stopping === stop
                                      ).time
                                    }
                                  </td>
                                </tr>
                              )
                            )}
                          </td>
                          <td>
                            {Object.entries(details.stops).map(
                              ([stop, regNos], stopIndex) => (
                                <tr key={stopIndex} className="center-align">
                                  <td
                                    className="nested-regnos center-align"
                                    style={{ border: "none" }}
                                  >
                                    {regNos.join(", ")}
                                  </td>
                                </tr>
                              )
                            )}
                          </td>
                        </tr>
                      )
                    )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <p>No active alter plan available</p>
      )}
    </div>
  );
};

export default CurrentAlter;
