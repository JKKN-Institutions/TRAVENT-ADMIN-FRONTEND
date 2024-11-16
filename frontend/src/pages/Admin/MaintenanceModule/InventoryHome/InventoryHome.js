import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch, faEye } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "./InventoryHome.css";
import Button from "../../../../components/Shared/Button/Button";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const stockData = [
  { week: "Week 1", stocks: 2500 },
  { week: "Week 2", stocks: 3000 },
  { week: "Week 3", stocks: 3500 },
  { week: "Week 4", stocks: 3000 },
];

const inventoryData = [
  {
    id: "INV-001",
    itemName: "Engine Oil",
    quantityInStock: 50,
    reorderLevel: 10,
  },
  {
    id: "INV-002",
    itemName: "Brake Pads",
    quantityInStock: 100,
    reorderLevel: 20,
  },
  { id: "INV-003", itemName: "Battery", quantityInStock: 25, reorderLevel: 5 },
  {
    id: "INV-004",
    itemName: "Windshield Wipers",
    quantityInStock: 200,
    reorderLevel: 50,
  },
  {
    id: "INV-005",
    itemName: "Radiator Hose",
    quantityInStock: 75,
    reorderLevel: 15,
  },
];

const orderData = [
  {
    orderId: "ORD-001",
    inventoryId: "INV-001",
    itemName: "Engine Oil",
    quantityOrdered: 50,
  },
  {
    orderId: "ORD-002",
    inventoryId: "INV-003",
    itemName: "Battery",
    quantityOrdered: 100,
  },
  {
    orderId: "ORD-003",
    inventoryId: "INV-005",
    itemName: "Radiator Hose",
    quantityOrdered: 25,
  },
  {
    orderId: "ORD-004",
    inventoryId: "INV-007",
    itemName: "Fan Belt",
    quantityOrdered: 200,
  },
  {
    orderId: "ORD-005",
    inventoryId: "INV-009",
    itemName: "Oil Filter",
    quantityOrdered: 75,
  },
];

const usageData = [
  {
    orderId: "ORD-001",
    inventoryId: "INV-001",
    itemName: "Engine Oil",
    quantity: 3,
    usedOn: 3,
    vehicleNo: "TN01AB1234",
    driverName: "John Doe",
    usageDate: "2024-03-01",
    usageTime: "09:30 AM",
  },
  {
    orderId: "ORD-002",
    inventoryId: "INV-003",
    itemName: "Battery",
    quantity: 100,
    usedOn: 5,
    vehicleNo: "TN02CD5678",
    driverName: "Jane Smith",
    usageDate: "2024-03-02",
    usageTime: "10:15 AM",
  },
  {
    orderId: "ORD-003",
    inventoryId: "INV-005",
    itemName: "Radiator Hose",
    quantity: 25,
    usedOn: 1,
    vehicleNo: "TN03EF9012",
    driverName: "Mike Johnson",
    usageDate: "2024-03-03",
    usageTime: "11:45 AM",
  },
  {
    orderId: "ORD-004",
    inventoryId: "INV-007",
    itemName: "Fan Belt",
    quantity: 200,
    usedOn: 18,
    vehicleNo: "TN04GH3456",
    driverName: "Sarah Wilson",
    usageDate: "2024-03-04",
    usageTime: "02:20 PM",
  },
  {
    orderId: "ORD-005",
    inventoryId: "INV-009",
    itemName: "Oil Filter",
    quantity: 75,
    usedOn: 5,
    vehicleNo: "TN05IJ7890",
    driverName: "David Brown",
    usageDate: "2024-03-05",
    usageTime: "03:10 PM",
  },
];

const InventoryHome = ({
  setShowViewAllStockDetails,
  handleViewStock,
  setShowAddNewStock,
  setShowViewAllOrderDetails,
  setShowAddNewOrder,
  handleViewOrder,
  setShowViewAllUsedSpares,
  handleViewSpares,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [inventorySearch, setInventorySearch] = useState("");
  const [orderSearch, setOrderSearch] = useState("");
  const [usageSearch, setUsageSearch] = useState("");

  const handleDateChange = (event) => {
    const [year, month] = event.target.value.split("-");
    setSelectedDate(new Date(year, month - 1));
  };

  // Chart.js configuration
  const chartData = {
    labels: stockData.map((data) => data.week),
    datasets: [
      {
        data: stockData.map((data) => data.stocks),
        borderColor: "#11a8fd",
        backgroundColor: "rgba(17, 168, 253, 0.1)",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#11a8fd",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        titleColor: "#fff",
        bodyColor: "#fff",
        bodyFont: {
          size: 14,
        },
        callbacks: {
          label: function (context) {
            return `${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#fff",
          font: {
            size: 14,
          },
        },
      },
      y: {
        grid: {
          display: true,
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          stepSize: 300,
          color: "#fff",
          font: {
            size: 14,
          },
        },
      },
    },
  };

  const filteredInventory = inventoryData.filter(
    (item) =>
      item.itemName.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      item.id.toLowerCase().includes(inventorySearch.toLowerCase())
  );

  const filteredOrders = orderData.filter(
    (order) =>
      order.itemName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      order.orderId.toLowerCase().includes(orderSearch.toLowerCase())
  );

  const filteredUsage = usageData.filter(
    (usage) =>
      usage.itemName.toLowerCase().includes(usageSearch.toLowerCase()) ||
      usage.orderId.toLowerCase().includes(usageSearch.toLowerCase()) ||
      usage.inventoryId.toLowerCase().includes(usageSearch.toLowerCase())
  );

  return (
    <div className="inventory-home">
      <div className="inventory-grid">
        <div className="inventory-chart-container">
          <div className="inventory-chart-header">
            <h2>No. of Stocks</h2>
            <div className="inventory-chart-controls">
              <input
                type="month"
                value={format(selectedDate, "yyyy-MM")}
                onChange={handleDateChange}
                className="inventory-month-picker"
              />
            </div>
          </div>
          <div className="inventory-chart-responsive-container">
            <div style={{ height: "275px", width: "100%" }}>
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
        <div className="inventory-table-container stock-details">
          <div className="inventory-table-header">
            <h2>Stock Details</h2>
            <a
              href="#"
              className="view-all"
              onClick={() => setShowViewAllStockDetails(true)}
            >
              view all -&gt;
            </a>
          </div>
          <div className="inventory-search-controls">
            <div className="inventory-search-bar-container">
              <div className="inventory-search-input-wrapper">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="inventory-search-icon"
                />
                <input
                  type="text"
                  className="inventory-search-bar"
                  placeholder="Search by Item Name or ID"
                  value={inventorySearch}
                  onChange={(e) => setInventorySearch(e.target.value)}
                />
              </div>
            </div>
            <div className="inventory-action-buttons-container">
              <Button
                label={
                  <>
                    <FontAwesomeIcon icon={faPlus} /> Add New Stock
                  </>
                }
                onClick={() => setShowAddNewStock(true)}
              />
            </div>
          </div>
          <div className="inventory-table-wrapper">
            <table className="inventory-table">
              <thead>
                <tr>
                  <th>Inventory ID</th>
                  <th>Item Name</th>
                  <th>Quantity In Stock</th>
                  <th>Reorder Level</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.itemName}</td>
                    <td>{item.quantityInStock}</td>
                    <td>{item.reorderLevel}</td>
                    <td>
                      <FontAwesomeIcon
                        icon={faEye}
                        className="view-icon"
                        onClick={() => handleViewStock(item)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="inventory-table-container order-details">
          <div className="inventory-table-header">
            <h2>Order Details</h2>
            <a
              href="#"
              className="view-all"
              onClick={() => setShowViewAllOrderDetails(true)}
            >
              view all -&gt;
            </a>
          </div>
          <div className="inventory-search-controls">
            <div className="inventory-search-bar-container">
              <div className="inventory-search-input-wrapper">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="inventory-search-icon"
                />
                <input
                  type="text"
                  className="inventory-search-bar"
                  placeholder="Search by Order ID or Item Name"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="inventory-action-buttons-container">
              <Button
                label={
                  <>
                    <FontAwesomeIcon icon={faPlus} /> Add New Order
                  </>
                }
                onClick={() => setShowAddNewOrder(true)}
              />
            </div>
          </div>
          <div className="inventory-table-wrapper">
            <table className="inventory-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Inventory ID</th>
                  <th>Item Name</th>
                  <th>Quantity Ordered</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.orderId}>
                    <td>{order.orderId}</td>
                    <td>{order.inventoryId}</td>
                    <td>{order.itemName}</td>
                    <td>{order.quantityOrdered}</td>
                    <td>
                      <FontAwesomeIcon
                        icon={faEye}
                        className="view-icon"
                        onClick={() => handleViewOrder(order)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="inventory-table-container usage-details">
          <div className="inventory-table-header">
            <h2>Used Spares</h2>
            <a
              href="#"
              className="view-all"
              onClick={() => setShowViewAllUsedSpares(true)}
            >
              view all -&gt;
            </a>
          </div>
          <div className="inventory-search-controls">
            <div className="inventory-search-bar-container">
              <div className="inventory-search-input-wrapper">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="inventory-search-icon"
                />
                <input
                  type="text"
                  className="inventory-search-bar"
                  placeholder="Search by Order ID, Inventory ID, or Item Name"
                  value={usageSearch}
                  onChange={(e) => setUsageSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="inventory-table-wrapper">
            <table className="inventory-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Inventory ID</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Used On</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsage.map((usage) => (
                  <tr key={usage.orderId}>
                    <td>{usage.orderId}</td>
                    <td>{usage.inventoryId}</td>
                    <td>{usage.itemName}</td>
                    <td>{usage.quantity}</td>
                    <td>{usage.usedOn}</td>
                    <td>
                      <FontAwesomeIcon
                        icon={faEye}
                        className="view-icon"
                        onClick={() => handleViewSpares(usage)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryHome;
