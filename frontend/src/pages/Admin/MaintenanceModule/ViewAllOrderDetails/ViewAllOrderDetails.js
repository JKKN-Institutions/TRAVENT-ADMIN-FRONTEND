import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faArrowLeft,
  faChevronLeft,
  faChevronRight,
  faEye,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ViewAllOrderDetails.css";
import { format } from "date-fns";
import Button from "../../../../components/Shared/Button/Button";
import AddNewOrder from "../AddNewOrder/AddNewOrder";
import SpecificOrderDetails from "../SpecificOrderDetails/SpecificOrderDetails";

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
  {
    orderId: "ORD-006",
    inventoryId: "INV-002",
    itemName: "Brake Pads",
    quantityOrdered: 30,
  },
  {
    orderId: "ORD-007",
    inventoryId: "INV-004",
    itemName: "Windshield Wipers",
    quantityOrdered: 50,
  },
  {
    orderId: "ORD-008",
    inventoryId: "INV-006",
    itemName: "Fuel Pump",
    quantityOrdered: 120,
  },
  {
    orderId: "ORD-009",
    inventoryId: "INV-008",
    itemName: "Spark Plugs",
    quantityOrdered: 90,
  },
  {
    orderId: "ORD-010",
    inventoryId: "INV-010",
    itemName: "Headlight Bulbs",
    quantityOrdered: 60,
  },
];

const ViewAllOrderDetails = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showEditOrder, setShowEditOrder] = useState(false);
  const [viewingOrder, setViewingOrder] = useState(null);

  const containerRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setSelectedOrder(null);
    }
  };

  const handleEdit = () => {
    if (selectedOrder) {
      setShowEditOrder(true);
    }
  };

  const handleEditComplete = async (orderData) => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update the order data
      console.log("Updated order data:", orderData);

      setShowEditOrder(false);
      setSelectedOrder(null);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const handleDelete = () => {
    if (selectedOrder) {
      setShowDeleteConfirmation(true);
    }
  };

  const confirmDelete = () => {
    console.log("Deleting order:", selectedOrder);
    setShowDeleteConfirmation(false);
    setSelectedOrder(null);
  };

  const handleRowClick = (order) => {
    setSelectedOrder(selectedOrder === order ? null : order);
  };

  const handleViewOrder = (order) => {
    setViewingOrder(order);
  };

  const filteredOrders = orderData.filter(
    (order) =>
      order.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (showEditOrder) {
    return (
      <AddNewOrder
        order={selectedOrder}
        onBack={() => setShowEditOrder(false)}
        onSave={handleEditComplete}
      />
    );
  }

  const OrderDetailsTable = ({ currentItems }) => (
    <div className="order-details-table-container">
      <div className="order-details-table-wrapper">
        <table className="order-details-table">
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
            {currentItems.map((order) => (
              <tr
                key={order.orderId}
                onClick={() => handleRowClick(order)}
                className={selectedOrder === order ? "selected" : ""}
              >
                <td>{order.orderId}</td>
                <td>{order.inventoryId}</td>
                <td>{order.itemName}</td>
                <td>{order.quantityOrdered}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faEye}
                    className="view-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewOrder(order);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="order-details-pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="order-details-pagination-button"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`order-details-pagination-button ${
              currentPage === number ? "active" : ""
            }`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === pageNumbers.length}
          className="order-details-pagination-button"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    );
  };

  return (
    <div className="order-details-container" ref={containerRef}>
      <header className="order-details-top-bar">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="order-details-back-icon"
          onClick={onBack}
        />
        <h2>Order Details</h2>
      </header>

      <main className="order-details-main-content">
        <div className="order-details-controls">
          <div className="order-details-search-bar-container">
            <div className="order-details-search-input-wrapper">
              <FontAwesomeIcon
                icon={faSearch}
                className="order-details-search-icon"
              />
              <input
                type="text"
                className="order-details-search-bar"
                placeholder="Search by Order Id or Item Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="order-details-action-buttons">
            <Button
              label={
                <>
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </>
              }
              onClick={handleEdit}
              disabled={!selectedOrder}
            />
            <Button
              label={
                <>
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </>
              }
              onClick={handleDelete}
              disabled={!selectedOrder}
            />
          </div>
          <div className="order-details-date">
            <input
              type="month"
              value={format(selectedDate, "yyyy-MM")}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
            />
          </div>
        </div>

        <OrderDetailsTable currentItems={currentItems} />

        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={filteredOrders.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </main>

      {showDeleteConfirmation && (
        <div className="order-details-delete-confirmation-modal">
          <div className="order-details-delete-confirmation-content">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this order record?</p>
            <div className="order-details-delete-confirmation-buttons">
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="order-details-cancel-delete"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="order-details-confirm-delete"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {viewingOrder && (
        <SpecificOrderDetails
          order={viewingOrder}
          onClose={() => setViewingOrder(null)}
        />
      )}
    </div>
  );
};

export default ViewAllOrderDetails;
