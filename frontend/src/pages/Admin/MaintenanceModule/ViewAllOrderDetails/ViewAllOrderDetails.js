import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import "./ViewAllOrderDetails.css";
import { format } from "date-fns";
import Button from "../../../../components/Shared/Button/Button";
import TopBar from "../../../../components/Shared/TopBar/TopBar";
import SearchBar from "../../../../components/Shared/SearchBar/SearchBar";
import TableContainer from "../../../../components/Shared/TableContainer/TableContainer";
import Pagination from "../../../../components/Shared/Pagination/Pagination";
import ConfirmationModal from "../../../../components/Shared/ConfirmationModal/ConfirmationModal";
import ToastNotification, {
  showToast,
} from "../../../../components/Shared/ToastNotification/ToastNotification";
import AddNewOrder from "../AddNewOrder/AddNewOrder";
import SpecificOrderDetails from "../SpecificOrderDetails/SpecificOrderDetails";

const initialOrderData = [
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
  const [orderData, setOrderData] = useState(initialOrderData);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showEditOrder, setShowEditOrder] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
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
      setSelectedOrders([]);
    }
  };

  const handleEdit = () => {
    if (selectedOrders.length === 1) {
      const orderToEdit = orderData.find(
        (order) => order.orderId === selectedOrders[0]
      );
      setEditingOrder(orderToEdit);
      setShowEditOrder(true);
    } else {
      showToast("warn", "Please select a single order to edit.");
    }
  };

  const handleEditComplete = async (updatedOrder) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

      setOrderData((prevData) =>
        prevData.map((order) =>
          order.orderId === updatedOrder.orderId ? updatedOrder : order
        )
      );

      setShowEditOrder(false);
      setEditingOrder(null);
      showToast("success", "Order updated successfully.");
    } catch (error) {
      showToast("error", "Failed to update the order. Please try again.");
    }
  };

  const handleDelete = () => {
    if (selectedOrders.length > 0) {
      setShowDeleteConfirmation(true);
    } else {
      showToast("warn", "Please select at least one order to delete.");
    }
  };

  const confirmDelete = () => {
    const remainingOrders = orderData.filter(
      (order) => !selectedOrders.includes(order.orderId)
    );
    setOrderData(remainingOrders);
    setSelectedOrders([]);
    setShowDeleteConfirmation(false);
    showToast("success", "Selected order(s) deleted successfully.");
  };

  const handleRowClick = (orderId) => {
    setSelectedOrders((prevSelected) =>
      prevSelected.includes(orderId)
        ? prevSelected.filter((id) => id !== orderId)
        : [...prevSelected, orderId]
    );
  };

  const filteredOrders = orderData.filter(
    (order) =>
      order.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const handleSelectAll = () => {
    if (selectedOrders.length === currentItems.length) {
      setSelectedOrders([]); // Deselect all
    } else {
      setSelectedOrders(currentItems.map((order) => order.orderId)); // Select all
    }
  };

  const isSelectAllChecked = selectedOrders.length === currentItems.length;
  const isSelectAllIndeterminate =
    selectedOrders.length > 0 && selectedOrders.length < currentItems.length;

  if (showEditOrder) {
    return (
      <AddNewOrder
        order={editingOrder}
        onBack={() => setShowEditOrder(false)}
        onSave={handleEditComplete}
      />
    );
  }

  return (
    <div className="order-details-container" ref={containerRef}>
      <ToastNotification />
      <TopBar title="Order Details" onBack={onBack} backButton={true} />

      <main className="order-details-main-content">
        <div className="order-details-controls">
          <SearchBar
            placeholder="Search by Order Id or Item Name"
            onSearch={setSearchTerm}
          />
          <div className="order-details-action-buttons">
            <Button
              label={
                <>
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </>
              }
              onClick={handleEdit}
              disabled={selectedOrders.length !== 1}
            />
            <Button
              label={
                <>
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </>
              }
              onClick={handleDelete}
              disabled={selectedOrders.length === 0}
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

        <TableContainer
          headers={[
            <label className="custom-checkbox">
              <input
                type="checkbox"
                checked={isSelectAllChecked}
                ref={(el) =>
                  el && (el.indeterminate = isSelectAllIndeterminate)
                }
                onChange={handleSelectAll}
              />
              <span className="checkbox-checkmark"></span>
            </label>,
            "Order ID",
            "Inventory ID",
            "Item Name",
            "Quantity Ordered",
            "View",
          ]}
          rows={currentItems.map((order) => ({
            id: order.orderId,
            data: {
              select: (
                <label className="custom-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedOrders.includes(order.orderId)}
                    onChange={() => handleRowClick(order.orderId)}
                  />
                  <span className="checkbox-checkmark"></span>
                </label>
              ),
              "Order ID": order.orderId,
              "Inventory ID": order.inventoryId,
              "Item Name": order.itemName,
              "Quantity Ordered": order.quantityOrdered,
              View: (
                <FontAwesomeIcon
                  icon={faEye}
                  className="view-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    setViewingOrder(order);
                  }}
                />
              ),
            },
          }))}
          onRowClick={(row) => handleRowClick(row.id)}
          selectedRowId={selectedOrders}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredOrders.length / itemsPerPage)}
          onPageChange={setCurrentPage}
        />
      </main>

      {showDeleteConfirmation && (
        <ConfirmationModal
          title="Confirm Deletion"
          message="Are you sure you want to delete the selected order record(s)?"
          onCancel={() => setShowDeleteConfirmation(false)}
          onConfirm={confirmDelete}
        />
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
