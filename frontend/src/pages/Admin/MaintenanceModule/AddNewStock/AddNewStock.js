import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./AddNewStock.css";

const AddNewStock = ({ stock, onBack, onSave }) => {
  const [stockData, setStockData] = useState({
    itemName: "",
    itemCategory: "",
    itemType: "",
    quantityInStock: "",
    reorderLevel: "",
    unitOfMeasure: "",
    storageLocation: "",
    totalCost: "",
    supplierName: "",
    supplierContact: "",
    purchaseOrderNo: "",
    purchaseDate: "",
    purchaseTime: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (stock) {
      // Create a complete stock object with all fields
      const completeStockData = {
        itemName: stock.itemName || "",
        itemCategory: stock.itemCategory || "",
        itemType: stock.itemType || "",
        quantityInStock: stock.quantityInStock || "",
        reorderLevel: stock.reorderLevel || "",
        unitOfMeasure: stock.unitOfMeasure || "",
        storageLocation: stock.storageLocation || "",
        totalCost: stock.totalCost || "",
        supplierName: stock.supplierName || "",
        supplierContact: stock.supplierContact || "",
        purchaseOrderNo: stock.purchaseOrderNo || "",
        purchaseDate: stock.purchaseDate || "",
        purchaseTime: stock.purchaseTime || "",
      };
      setStockData(completeStockData);
    }
  }, [stock]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStockData({ ...stockData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    let formErrors = {};
    Object.keys(stockData).forEach((key) => {
      if (!stockData[key]) {
        formErrors[key] = `${
          key.charAt(0).toUpperCase() +
          key
            .slice(1)
            .replace(/([A-Z])/g, " $1")
            .trim()
        } is required`;
      }
    });
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      onSave(stockData);
    }
  };

  return (
    <div className="add-new-stock-container">
      <header className="add-new-stock-top-bar">
        <button className="add-new-stock-back-button" onClick={onBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className="add-new-stock-header">
          <h2>{stock ? "Edit Stock" : "Add New Stock"}</h2>
        </div>
      </header>

      <main className="add-new-stock-main-content">
        <form onSubmit={handleSubmit}>
          <div className="add-new-stock-form-grid">
            {Object.keys(stockData).map((key) => (
              <div key={key} className="add-new-stock-form-group">
                <input
                  type={
                    key.includes("quantity") ||
                    key.includes("reorder") ||
                    key.includes("total")
                      ? "number"
                      : key.includes("Date")
                      ? "date"
                      : key.includes("Time")
                      ? "time"
                      : "text"
                  }
                  id={key}
                  name={key}
                  value={stockData[key]}
                  onChange={handleChange}
                  placeholder={
                    key.charAt(0).toUpperCase() +
                    key
                      .slice(1)
                      .replace(/([A-Z])/g, " $1")
                      .trim()
                  }
                  className={errors[key] ? "input-error" : ""}
                />
                {errors[key] && <p className="error">{errors[key]}</p>}
              </div>
            ))}
          </div>
          <div className="add-new-stock-buttons-container">
            <button
              type="button"
              className="add-new-stock-cancel-button"
              onClick={onBack}
            >
              Cancel
            </button>
            <button type="submit" className="add-new-stock-save-button">
              {stock ? "Update Stock" : "Add Stock"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddNewStock;
