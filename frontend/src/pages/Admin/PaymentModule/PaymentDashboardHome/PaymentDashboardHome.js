import React, { useState, useEffect } from "react";
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
import Loading from "../../../../components/Shared/Loading/Loading";
import TopBar from "../../../../components/Shared/TopBar/TopBar";

const PaymentsDashboardHome = ({ toggleSidebar }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeView, setActiveView] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleDateChange = (e) => {
    const [year, month] = e.target.value.split("-");
    setSelectedDate(new Date(year, month - 1));
  };

  const handleAddBusFee = async (busFee) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("New Bus Fee:", busFee);
      return busFee;
    } catch (error) {
      throw error;
    }
  };

  const views = {
    ViewTransactions: <ViewTransactions onBack={() => setActiveView(null)} />,
    PaymentRecords: <PaymentRecords onBack={() => setActiveView(null)} />,
    AddBusFee: (
      <AddBusFee onBack={() => setActiveView(null)} onSave={handleAddBusFee} />
    ),
    UpdateBusFee: (
      <UpdateBusFee
        onBack={() => setActiveView(null)}
        onSave={() => setActiveView(null)}
      />
    ),
    AddAmuletsFee: (
      <AddAmuletsFee
        onBack={() => setActiveView(null)}
        onSave={() => setActiveView(null)}
      />
    ),
    AmuletsRefilledList: (
      <AmuletsRefilledList
        onBack={() => setActiveView(null)}
        onSave={() => setActiveView(null)}
      />
    ),
  };

  if (isLoading) return <Loading message="Loading Payments..." />;
  if (activeView) return views[activeView];

  return (
    <div className="payments-dashboard-container">
      <TopBar title="Payments" toggleSidebar={toggleSidebar} />
      <main className="payments-dashboard-main-content">
        <div className="payments-dashboard-tabs">
          {["Dashboard", "Bus fee", "Amulets Fee"].map((tab) => (
            <button
              key={tab}
              className={`tab-button ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        {activeTab === "Dashboard" && (
          <PaymentDashboard
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
            setShowPaymentRecords={() => setActiveView("PaymentRecords")}
            setShowViewTransactions={() => setActiveView("ViewTransactions")}
          />
        )}
        {activeTab === "Bus fee" && (
          <BusFeeHome
            setShowAddBusFee={() => setActiveView("AddBusFee")}
            setShowUpdateBusFee={() => setActiveView("UpdateBusFee")}
          />
        )}
        {activeTab === "Amulets Fee" && (
          <AmuletsFeeHome
            setShowAddAmuletsFee={() => setActiveView("AddAmuletsFee")}
            setShowAmuletsRefilledList={() =>
              setActiveView("AmuletsRefilledList")
            }
          />
        )}
      </main>
    </div>
  );
};

export default PaymentsDashboardHome;
