import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGasPump,
  faRoad,
  faUsers,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import Stoppings from "../Stoppings/Stoppings";
import Passengers from "../Passengers/Passengers";
import AddNewRoute from "../AddNewRoute/AddNewRoute";
import SpecificRouteLiveTracking from "../../LiveTrackingModule/SpecificRouteLiveTracking/SpecificRouteLiveTracking";
import Button from "../../../../components/Shared/Button/Button";
import TopBar from "../../../../components/Shared/TopBar/TopBar";
import "./RouteDetails.css";

const RouteDetails = ({ route, onBack, institutionId, onRouteUpdate }) => {
  const [activeView, setActiveView] = useState(null); // To control which component to display

  // Handle changing active view
  const handleViewChange = (view) => setActiveView(view);

  // Handle back click, reset view to null to go back to the main RouteDetails page
  const handleBackClick = () => {
    if (activeView) {
      setActiveView(null); // Reset to RouteDetails page if we're on a sub-page
    } else {
      onBack(); // If we're already on RouteDetails, call onBack function to navigate back
    }
  };

  const handleRouteUpdate = (updatedRoute) => {
    onRouteUpdate(updatedRoute);
    setActiveView(null); // Reset view after updating route
  };

  // Render different views based on activeView state
  const renderView = () => {
    switch (activeView) {
      case "stoppings":
        return (
          <Stoppings
            route={route}
            onBack={handleBackClick}
            institutionId={institutionId}
          />
        );
      case "passengers":
        return (
          <Passengers
            route={route}
            onBack={handleBackClick}
            institutionId={institutionId}
          />
        );
      case "editRoute":
        return (
          <AddNewRoute
            route={route}
            onBack={handleBackClick}
            onSave={handleRouteUpdate}
            institutionId={institutionId}
          />
        );
      case "tracking":
        return (
          <SpecificRouteLiveTracking
            routeData={{
              routeNo: route.routeNumber,
              routeName: route.routeName,
            }}
            initialZoom={13}
            onBack={handleBackClick}
          />
        );
      default:
        return (
          <div className="route-details-container">
            <TopBar
              title={`Route ${route.routeNumber}`}
              onBack={onBack}
              backButton={true}
            />
            <main className="route-details-main-content">
              <div className="route-details-action-buttons">
                <Button
                  label={
                    <>
                      <FontAwesomeIcon icon={faRoad} /> Stoppings
                    </>
                  }
                  onClick={() => handleViewChange("stoppings")}
                />
                <Button
                  label={
                    <>
                      <FontAwesomeIcon icon={faUsers} /> Passengers
                    </>
                  }
                  onClick={() => handleViewChange("passengers")}
                />
                <Button
                  label={
                    <>
                      <FontAwesomeIcon icon={faGasPump} /> Track
                    </>
                  }
                  onClick={() => handleViewChange("tracking")}
                />
                <Button
                  label={
                    <>
                      <FontAwesomeIcon icon={faPencilAlt} /> Edit
                    </>
                  }
                  onClick={() => handleViewChange("editRoute")}
                />
              </div>
              <div className="route-details-info">
                {[
                  ["Route Name", route.routeName],
                  ["Main Driver", route.mainDriver],
                  ["Departure Time", route.departureFromHalt],
                  ["ETA", route.eta],
                  ["Seat Capacity", route.sittingCapacity],
                  ["Standing Capacity", route.standingCapacity],
                  ["Vehicle Registration No", route.vehicleRegistrationNumber],
                  ["Fuel", "60 / 80 litres"],
                ].map(([label, value], index) => (
                  <div key={index} className="route-details-info-item">
                    <span className="route-details-info-label">{label}:</span>
                    <span className="route-details-info-value">{value}</span>
                  </div>
                ))}
              </div>
            </main>
          </div>
        );
    }
  };

  return renderView(); // Renders the correct component based on the active view
};

export default RouteDetails;
