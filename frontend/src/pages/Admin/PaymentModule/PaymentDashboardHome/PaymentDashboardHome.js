import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import "./PaymentDashboardHome.css";
import ViewTransactions from "../ViewTransactions/ViewTransactions";
import PaymentRecords from "../PaymentRecords/PaymentRecords";
import BusFeeHome from "../BusFeeHome/BusFeeHome";
import AmuletsFeeHome from "../AmuletsFeeHome/AmuletsFeeHome";
import AddBusFee from "../AddBusFee/AddBusFee";
import UpdateBusFee from "../UpdateBusFee/UpdateBusFee";
import AddAmuletsFee from "../AddAmuletsFee/AddAmuletsFee";
import AmuletsRefilledList from "../AmuletsRefilledList/AmuletsRefilledList";
import PaymentDashboard from "../PaymentDashboard/PaymentDashboard";

const PaymentsDashboardHome = ({ toggleSidebar }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showViewTransactions, setShowViewTransactions] = useState(false);
  const [showPaymentRecords, setShowPaymentRecords] = useState(false);
  const [showAddBusFee, setShowAddBusFee] = useState(false);
  const [showUpdateBusFee, setShowUpdateBusFee] = useState(false);
  const [showAddAmuletsFee, setShowAddAmuletsFee] = useState(false);
  const [showAmuletsRefilledList, setShowAmuletsRefilledList] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleDateChange = (event) => {
    const [year, month] = event.target.value.split("-");
    setSelectedDate(new Date(year, month - 1));
  };

  if (showViewTransactions) {
    return <ViewTransactions onBack={() => setShowViewTransactions(false)} />;
  }

  if (showPaymentRecords) {
    return <PaymentRecords onBack={() => setShowPaymentRecords(false)} />;
  }

  if (showAddBusFee) {
    return (
      <AddBusFee
        onBack={() => setShowAddBusFee(false)}
        onSave={() => setShowAddBusFee(false)}
      />
    );
  }

  if (showUpdateBusFee) {
    return (
      <UpdateBusFee
        onBack={() => setShowUpdateBusFee(false)}
        onSave={() => setShowUpdateBusFee(false)}
      />
    );
  }

  if (showAddAmuletsFee) {
    return (
      <AddAmuletsFee
        onBack={() => setShowAddAmuletsFee(false)}
        onSave={() => setShowAddAmuletsFee(false)}
      />
    );
  }

  if (showAmuletsRefilledList) {
    return (
      <AmuletsRefilledList
        onBack={() => setShowAmuletsRefilledList(false)}
        onSave={() => setShowAmuletsRefilledList(false)}
      />
    );
  }

  return (
    <>
      {isLoading ? (
        <div className="schedules-loading-container">
          <div className="loading-spinner"></div>
          <p>Loading Payments...</p>
        </div>
      ) : (
        <div className="payments-dashboard-container">
          <header className="payments-dashboard-top-bar">
            <div
              className="payments-dashboard-menu-icon"
              onClick={toggleSidebar}
            >
              <FontAwesomeIcon icon={faBars} />
            </div>
            <h1>Payments</h1>
          </header>

          <main className="payments-dashboard-main-content">
            <div className="payments-dashboard-tabs">
              <button
                className={`tab-button ${
                  activeTab === "Dashboard" ? "active" : ""
                }`}
                onClick={() => setActiveTab("Dashboard")}
              >
                Dashboard
              </button>
              <button
                className={`tab-button ${
                  activeTab === "Bus fee" ? "active" : ""
                }`}
                onClick={() => setActiveTab("Bus fee")}
              >
                Bus fee
              </button>
              <button
                className={`tab-button ${
                  activeTab === "Amulets Fee" ? "active" : ""
                }`}
                onClick={() => setActiveTab("Amulets Fee")}
              >
                Amulets Fee
              </button>
            </div>

            {activeTab === "Dashboard" && (
              <PaymentDashboard
                selectedDate={selectedDate}
                handleDateChange={handleDateChange}
                setShowPaymentRecords={setShowPaymentRecords}
                setShowViewTransactions={setShowViewTransactions}
              />
            )}

            {activeTab === "Bus fee" && (
              <BusFeeHome
                setShowAddBusFee={setShowAddBusFee}
                setShowUpdateBusFee={setShowUpdateBusFee}
              />
            )}

            {activeTab === "Amulets Fee" && (
              <AmuletsFeeHome
                setShowAddAmuletsFee={setShowAddAmuletsFee}
                setShowAmuletsRefilledList={setShowAmuletsRefilledList}
              />
            )}
          </main>
        </div>
      )}
    </>
  );
};

export default PaymentsDashboardHome;
