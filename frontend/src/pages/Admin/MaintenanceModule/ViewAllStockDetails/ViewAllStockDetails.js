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
import "./ViewAllStockDetails.css";
import { format } from "date-fns";
import Button from "../../../../components/Shared/Button/Button";
import SpecificStockDetails from "../SpecificStockDetails/SpecificStockDetails";
import AddNewStock from "../AddNewStock/AddNewStock";

const initialStockData = [
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
  {
    id: "INV-006",
    itemName: "Fuel Pump",
    quantityInStock: 30,
    reorderLevel: 10,
  },
  {
    id: "INV-007",
    itemName: "Fan Belt",
    quantityInStock: 50,
    reorderLevel: 20,
  },
  {
    id: "INV-008",
    itemName: "Spark Plugs",
    quantityInStock: 120,
    reorderLevel: 30,
  },
  {
    id: "INV-009",
    itemName: "Oil Filter",
    quantityInStock: 90,
    reorderLevel: 25,
  },
  {
    id: "INV-010",
    itemName: "Headlight Bulbs",
    quantityInStock: 60,
    reorderLevel: 15,
  },
];

const ViewAllStockDetails = ({ onBack }) => {
  const [stockData, setStockData] = useState(initialStockData);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedStock, setSelectedStock] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [viewingStock, setViewingStock] = useState(null);
  const [showAddNewStock, setShowAddNewStock] = useState(false);
  const [editingStock, setEditingStock] = useState(null);

  const containerRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setSelectedStock(null);
    }
  };

  const handleEdit = () => {
    if (selectedStock) {
      // Create a complete stock object with all fields for editing
      const stockForEdit = {
        ...selectedStock,
        itemCategory: selectedStock.itemCategory || "",
        itemType: selectedStock.itemType || "",
        unitOfMeasure: selectedStock.unitOfMeasure || "",
        storageLocation: selectedStock.storageLocation || "",
        totalCost: selectedStock.totalCost || "",
        supplierName: selectedStock.supplierName || "",
        supplierContact: selectedStock.supplierContact || "",
        purchaseOrderNo: selectedStock.purchaseOrderNo || "",
        purchaseDate: selectedStock.purchaseDate || "",
        purchaseTime: selectedStock.purchaseTime || "",
      };
      setEditingStock(stockForEdit);
      setShowAddNewStock(true);
    }
  };

  const handleAddOrEditComplete = async (stockData) => {
    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (editingStock) {
        // Handle edit save
        setStockData((prevStockData) =>
          prevStockData.map((stock) =>
            stock.id === editingStock.id ? stockData : stock
          )
        );
        console.log("Updating stock:", stockData);
      } else {
        // Handle new stock save
        setStockData((prevStockData) => [...prevStockData, stockData]);
        console.log("Adding new stock:", stockData);
      }

      // Reset form state
      setShowAddNewStock(false);
      setEditingStock(null);
      setSelectedStock(null);

      return stockData; // Return the saved or updated data to trigger success toast
    } catch (error) {
      console.error("Error saving stock data:", error);
      throw error; // Throw error to trigger error toast
    }
  };

  if (showAddNewStock) {
    return (
      <AddNewStock
        stock={editingStock}
        onBack={() => {
          setShowAddNewStock(false);
          setEditingStock(null);
        }}
        onSave={handleAddOrEditComplete}
      />
    );
  }

  const handleDelete = () => {
    if (selectedStock) {
      setShowDeleteConfirmation(true);
    }
  };

  const confirmDelete = () => {
    setStockData(stockData.filter((stock) => stock.id !== selectedStock.id));
    setShowDeleteConfirmation(false);
    setSelectedStock(null);
  };

  const handleViewStock = (stock) => {
    setViewingStock(stock);
  };

  const filteredStocks = stockData.filter(
    (stock) =>
      stock.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStocks.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleRowClick = (stock) => {
    setSelectedStock(selectedStock === stock ? null : stock);
  };

  const StockDetailsTable = ({ currentItems }) => (
    <div className="stock-details-table-container">
      <div className="stock-details-table-wrapper">
        <table className="stock-details-table">
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
            {currentItems.map((stock) => (
              <tr
                key={stock.id}
                onClick={() => handleRowClick(stock)}
                className={selectedStock === stock ? "selected" : ""}
              >
                <td>{stock.id}</td>
                <td>{stock.itemName}</td>
                <td>{stock.quantityInStock}</td>
                <td>{stock.reorderLevel}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faEye}
                    className="view-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewStock(stock);
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
      <div className="stock-details-pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="stock-details-pagination-button"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`stock-details-pagination-button ${
              currentPage === number ? "active" : ""
            }`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === pageNumbers.length}
          className="stock-details-pagination-button"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    );
  };

  return (
    <div className="stock-details-container" ref={containerRef}>
      <header className="stock-details-top-bar">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="stock-details-back-icon"
          onClick={onBack}
        />
        <h2>Stock Details</h2>
      </header>

      <main className="stock-details-main-content">
        <div className="stock-details-controls">
          <div className="stock-details-search-bar-container">
            <div className="stock-details-search-input-wrapper">
              <FontAwesomeIcon
                icon={faSearch}
                className="stock-details-search-icon"
              />
              <input
                type="text"
                className="stock-details-search-bar"
                placeholder="Search by Inventory Id or Item Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="stock-details-action-buttons">
            <Button
              label={
                <>
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </>
              }
              onClick={handleEdit}
              disabled={!selectedStock}
            />
            <Button
              label={
                <>
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </>
              }
              onClick={handleDelete}
              disabled={!selectedStock}
            />
          </div>
          <div className="stock-details-date">
            <input
              type="month"
              value={format(selectedDate, "yyyy-MM")}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
            />
          </div>
        </div>

        <StockDetailsTable currentItems={currentItems} />

        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={filteredStocks.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </main>
      {showDeleteConfirmation && (
        <div className="stock-details-delete-confirmation-modal">
          <div className="stock-details-delete-confirmation-content">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this stock record?</p>
            <div className="stock-details-delete-confirmation-buttons">
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="stock-details-cancel-delete"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="stock-details-confirm-delete"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {viewingStock && (
        <SpecificStockDetails
          stock={viewingStock}
          onClose={() => setViewingStock(null)}
        />
      )}
    </div>
  );
};

export default ViewAllStockDetails;
