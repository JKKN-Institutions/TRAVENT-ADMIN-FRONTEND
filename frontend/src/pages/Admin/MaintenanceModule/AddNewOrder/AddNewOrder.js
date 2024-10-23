import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./AddNewOrder.css";

const AddNewOrder = ({ order, onBack, onSave }) => {
  const [orderData, setOrderData] = useState({
    inventoryId: "",
    itemName: "",
    quantityOrdered: "",
    supplierName: "",
    supplierContact: "",
    orderDate: "",
    orderTime: "",
    deliveryDate: "",
    deliveryTime: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (order) {
      const completeOrderData = {
        inventoryId: order.inventoryId || "",
        itemName: order.itemName || "",
        quantityOrdered: order.quantityOrdered || "",
        supplierName: order.supplierName || "",
        supplierContact: order.supplierContact || "",
        orderDate: order.orderDate || "",
        orderTime: order.orderTime || "",
        deliveryDate: order.deliveryDate || "",
        deliveryTime: order.deliveryTime || "",
      };
      setOrderData(completeOrderData);
    }
  }, [order]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    let formErrors = {};
    Object.keys(orderData).forEach((key) => {
      if (!orderData[key]) {
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
      onSave(orderData);
    }
  };

  return (
    <div className="add-new-order-container">
      <header className="add-new-order-top-bar">
        <button className="add-new-order-back-button" onClick={onBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className="add-new-order-header">
          <h2>{order ? "Edit Order" : "Add New Order"}</h2>
        </div>
      </header>

      <main className="add-new-order-main-content">
        <form onSubmit={handleSubmit}>
          <div className="add-new-order-form-grid">
            {Object.keys(orderData).map((key) => (
              <div key={key} className="add-new-order-form-group">
                <input
                  type={
                    key.includes("quantity")
                      ? "number"
                      : key.includes("Date")
                      ? "date"
                      : key.includes("Time")
                      ? "time"
                      : "text"
                  }
                  id={key}
                  name={key}
                  value={orderData[key]}
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
          <div className="add-new-order-buttons-container">
            <button
              type="button"
              className="add-new-order-cancel-button"
              onClick={onBack}
            >
              Cancel
            </button>
            <button type="submit" className="add-new-order-save-button">
              {order ? "Update Order" : "Add Order"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddNewOrder;
