import React, { useState, useEffect } from "react";
import ToastNotification, {
  showToast,
} from "../../../../components/Shared/ToastNotification/ToastNotification";
import TopBar from "../../../../components/Shared/TopBar/TopBar";
import FormInput from "../../../../components/Shared/FormInput/FormInput";
import ActionButtons from "../../../../components/Shared/ActionButtons/ActionButtons";
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
      setStockData(stock);
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
          key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")
        } is required`;
      }
    });
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      showToast("error", "Please fill in all required fields");
    } else {
      const loadingToastId = showToast(
        "loading",
        stock ? "Updating stock..." : "Adding new stock..."
      );
      try {
        const savedStock = await onSave(stockData);
        showToast(
          "success",
          `Successfully ${stock ? "updated" : "added"} stock.`,
          loadingToastId
        );
        setTimeout(() => onBack(savedStock), 3100);
      } catch (error) {
        showToast(
          "error",
          `Failed to ${stock ? "update" : "add"} stock. Please try again.`,
          loadingToastId
        );
        console.error("Error saving stock:", error);
      }
    }
  };

  return (
    <div className="add-new-stock-container">
      <ToastNotification />
      <TopBar
        title={stock ? "Edit Stock" : "Add New Stock"}
        onBack={onBack}
        backButton={true}
      />
      <main className="add-new-stock-main-content">
        <form onSubmit={handleSubmit}>
          <div className="add-new-stock-form-grid">
            {Object.keys(stockData).map((key) => (
              <div key={key} className="add-new-stock-form-group">
                <FormInput
                  id={key}
                  name={key}
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
                  value={stockData[key]}
                  placeholder={
                    key.charAt(0).toUpperCase() +
                    key
                      .slice(1)
                      .replace(/([A-Z])/g, " $1")
                      .trim()
                  }
                  error={errors[key]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
          <ActionButtons
            onCancel={onBack}
            onSubmit={handleSubmit}
            submitText={stock ? "Update Stock" : "Add Stock"}
          />
        </form>
      </main>
    </div>
  );
};

export default AddNewStock;
