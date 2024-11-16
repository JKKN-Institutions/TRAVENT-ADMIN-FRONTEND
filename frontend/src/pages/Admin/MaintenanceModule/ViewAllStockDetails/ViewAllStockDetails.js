import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./ViewAllStockDetails.css";
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
  const [selectedStocks, setSelectedStocks] = useState([]);
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
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (editingStock) {
        setStockData((prevStockData) =>
          prevStockData.map((stock) =>
            stock.id === editingStock.id ? stockData : stock
          )
        );
        showToast("success", "Stock updated successfully.");
      } else {
        setStockData((prevStockData) => [...prevStockData, stockData]);
        showToast("success", "New stock added successfully.");
      }

      setShowAddNewStock(false);
      setEditingStock(null);
      setSelectedStocks([]);

      return stockData;
    } catch (error) {
      console.error("Error saving stock data:", error);
      showToast("error", "Failed to save stock data. Please try again.");
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
    if (selectedStocks.length > 0) {
      setShowDeleteConfirmation(true);
    } else {
      showToast("warn", "Please select at least one stock to delete.");
    }
  };

  const confirmDelete = () => {
    const remainingStocks = stockData.filter(
      (stock) => !selectedStocks.includes(stock.id)
    );
    setStockData(remainingStocks);
    setSelectedStocks([]);
    setShowDeleteConfirmation(false);
    showToast("success", "Selected stock(s) deleted successfully.");
  };

  const handleViewStock = (stock) => {
    setViewingStock(stock);
  };

  const filteredStocks = stockData.filter(
    (stock) =>
      stock.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (stock.lastUpdated &&
        format(new Date(stock.lastUpdated), "yyyy-MM") ===
          format(selectedDate, "yyyy-MM"))
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStocks.slice(indexOfFirstItem, indexOfLastItem);

  const handleSelectAll = () => {
    if (selectedStocks.length === currentItems.length) {
      setSelectedStocks([]); // Deselect all
    } else {
      setSelectedStocks(currentItems.map((stock) => stock.id)); // Select all
    }
  };

  const handleRowClick = (stockId) => {
    setSelectedStocks((prevSelected) => {
      const updatedSelection = prevSelected.includes(stockId)
        ? prevSelected.filter((id) => id !== stockId)
        : [...prevSelected, stockId];

      // Update the selectedStock state when only one stock is selected
      if (updatedSelection.length === 1) {
        const stock = stockData.find((s) => s.id === updatedSelection[0]);
        setSelectedStock(stock);
      } else {
        setSelectedStock(null); // Clear selectedStock if multiple or no rows are selected
      }

      return updatedSelection;
    });
  };

  const isSelectAllChecked = selectedStocks.length === currentItems.length;
  const isSelectAllIndeterminate =
    selectedStocks.length > 0 && selectedStocks.length < currentItems.length;

  return (
    <div className="stock-details-container">
      <ToastNotification />
      <TopBar title="Stock Details" onBack={onBack} backButton={true} />

      <main className="stock-details-main-content">
        <div className="stock-details-controls">
          <SearchBar
            placeholder="Search by Inventory Id or Item Name"
            onSearch={setSearchTerm}
          />

          <div className="stock-details-action-buttons">
            <Button
              label={
                <>
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </>
              }
              onClick={handleEdit}
              disabled={selectedStocks.length !== 1}
            />
            <Button
              label={
                <>
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </>
              }
              onClick={handleDelete}
              disabled={selectedStocks.length === 0}
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
            "Inventory ID",
            "Item Name",
            "Quantity In Stock",
            "Reorder Level",
            "Last Updated",
            "View",
          ]}
          rows={currentItems.map((stock) => ({
            id: stock.id,
            data: {
              select: (
                <label className="custom-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedStocks.includes(stock.id)}
                    onChange={() => handleRowClick(stock.id)}
                  />
                  <span className="checkbox-checkmark"></span>
                </label>
              ),
              "Inventory ID": stock.id,
              "Item Name": stock.itemName,
              "Quantity In Stock": stock.quantityInStock,
              "Reorder Level": stock.reorderLevel,
              "Last Updated": stock.lastUpdated
                ? format(new Date(stock.lastUpdated), "yyyy-MM-dd")
                : "N/A", // Fallback for invalid or missing dates
              View: (
                <FontAwesomeIcon
                  icon={faEye}
                  className="view-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewStock(stock);
                  }}
                />
              ),
            },
          }))}
          onRowClick={(row) => handleRowClick(row.id)}
          selectedRowId={selectedStocks}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredStocks.length / itemsPerPage)}
          onPageChange={setCurrentPage}
        />
      </main>

      {showDeleteConfirmation && (
        <ConfirmationModal
          title="Confirm Deletion"
          message="Are you sure you want to delete the selected stock record(s)?"
          onCancel={() => setShowDeleteConfirmation(false)}
          onConfirm={confirmDelete}
        />
      )}

      {viewingStock && (
        <SpecificStockDetails
          stock={viewingStock}
          onClose={() => setViewingStock(null)}
        />
      )}

      {showAddNewStock && (
        <AddNewStock
          stock={editingStock}
          onBack={() => {
            setShowAddNewStock(false);
            setEditingStock(null);
          }}
          onSave={handleAddOrEditComplete}
        />
      )}
    </div>
  );
};

export default ViewAllStockDetails;
