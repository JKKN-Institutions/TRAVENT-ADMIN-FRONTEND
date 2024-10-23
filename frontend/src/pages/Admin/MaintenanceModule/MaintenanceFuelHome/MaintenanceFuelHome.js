import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import "./MaintenanceFuelHome.css";
import InventoryHome from "../InventoryHome/InventoryHome";
import ServicesHome from "../ServicesHome/ServicesHome";
import FuelHome from "../FuelHome/FuelHome";
import AddFuelRecord from "../AddFuelRecord/AddFuelRecord";
import ViewFuelRecords from "../ViewFuelRecords/ViewFuelRecords";
import ViewAllStockDetails from "../ViewAllStockDetails/ViewAllStockDetails";
import SpecificStockDetails from "../SpecificStockDetails/SpecificStockDetails";
import AddNewStock from "../AddNewStock/AddNewStock";
import ViewAllOrderDetails from "../ViewAllOrderDetails/ViewAllOrderDetails";
import AddNewOrder from "../AddNewOrder/AddNewOrder";
import SpecificOrderDetails from "../SpecificOrderDetails/SpecificOrderDetails";

const MaintenanceFuelHome = ({ toggleSidebar }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Fuel");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewingStock, setViewingStock] = useState(null);
  const [viewingOrder, setViewingOrder] = useState(null);

  const [showAddFuelRecord, setShowAddFuelRecord] = useState(false);
  const [showViewFuelRecords, setShowViewFuelRecords] = useState(false);
  const [showViewAllStockDetails, setShowViewAllStockDetails] = useState(false);
  const [showAddNewStock, setShowAddNewStock] = useState(false);
  const [showViewAllOrderDetails, setShowViewAllOrderDetails] = useState(false);
  const [showAddNewOrder, setShowAddNewOrder] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleDateChange = (event) => {
    const [year, month] = event.target.value.split("-");
    setSelectedDate(new Date(year, month - 1));
  };

  const handleAddFuelRecord = (fuelData) => {
    console.log("New Fuel Record:", fuelData);
    setShowAddFuelRecord(false);
  };

  const handleViewStock = (stock) => {
    setViewingStock(stock);
  };

  const handleViewOrder = (order) => {
    setViewingOrder(order);
  };

  const handleAddNewStock = (stockData) => {
    console.log("New stock data:", stockData);
    setShowAddNewStock(false);
  };

  const handleAddNewOrder = (orderData) => {
    console.log("New order data:", orderData);
    setShowAddNewOrder(false);
  };

  if (showAddNewStock) {
    return (
      <AddNewStock
        onBack={() => setShowAddNewStock(false)}
        onSave={handleAddNewStock}
      />
    );
  }

  if (showAddFuelRecord) {
    return (
      <AddFuelRecord
        onBack={() => setShowAddFuelRecord(false)}
        onSave={handleAddFuelRecord}
      />
    );
  }

  if (showViewFuelRecords) {
    return <ViewFuelRecords onBack={() => setShowViewFuelRecords(false)} />;
  }

  if (showViewAllStockDetails) {
    return (
      <ViewAllStockDetails onBack={() => setShowViewAllStockDetails(false)} />
    );
  }

  if (showViewAllOrderDetails) {
    return (
      <ViewAllOrderDetails onBack={() => setShowViewAllOrderDetails(false)} />
    );
  }

  if (showAddNewOrder) {
    return (
      <AddNewOrder
        onBack={() => setShowAddNewOrder(false)}
        onSave={handleAddNewOrder}
      />
    );
  }

  return (
    <>
      {isLoading ? (
        <div className="schedules-loading-container">
          <div className="loading-spinner"></div>
          <p>Loading Maintenance...</p>
        </div>
      ) : (
        <div className="maintenance-fuel-container">
          <header className="maintenance-fuel-top-bar">
            <div className="maintenance-fuel-menu-icon" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faBars} />
            </div>
            <h1>Maintenance </h1>
          </header>

          <main className="maintenance-fuel-main-content">
            <div className="maintenance-fuel-tabs">
              <button
                className={`tab-button ${activeTab === "Fuel" ? "active" : ""}`}
                onClick={() => setActiveTab("Fuel")}
              >
                Fuel
              </button>
              <button
                className={`tab-button ${
                  activeTab === "Inventory" ? "active" : ""
                }`}
                onClick={() => setActiveTab("Inventory")}
              >
                Inventory
              </button>
              <button
                className={`tab-button ${
                  activeTab === "Services" ? "active" : ""
                }`}
                onClick={() => setActiveTab("Services")}
              >
                Services
              </button>
            </div>

            {activeTab === "Fuel" && (
              <FuelHome
                selectedDate={selectedDate}
                handleDateChange={handleDateChange}
                setShowAddFuelRecord={setShowAddFuelRecord}
                setShowViewFuelRecords={setShowViewFuelRecords}
              />
            )}

            {activeTab === "Inventory" && (
              <>
                <InventoryHome
                  setShowViewAllStockDetails={setShowViewAllStockDetails}
                  handleViewStock={handleViewStock}
                  setShowAddNewStock={setShowAddNewStock}
                  setShowViewAllOrderDetails={setShowViewAllOrderDetails}
                  setShowAddNewOrder={setShowAddNewOrder}
                  handleViewOrder={handleViewOrder}
                />
                {viewingStock && (
                  <SpecificStockDetails
                    stock={viewingStock}
                    onClose={() => setViewingStock(null)}
                  />
                )}
                {viewingOrder && (
                  <SpecificOrderDetails
                    order={viewingOrder}
                    onClose={() => setViewingOrder(null)}
                  />
                )}
              </>
            )}

            {activeTab === "Services" && <ServicesHome />}
          </main>
        </div>
      )}
    </>
  );
};

export default MaintenanceFuelHome;
