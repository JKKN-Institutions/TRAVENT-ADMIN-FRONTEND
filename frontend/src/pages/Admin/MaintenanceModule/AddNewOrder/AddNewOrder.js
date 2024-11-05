import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      toast.error("Please fill in all required fields", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      try {
        const loadingToastId = toast.loading(
          order ? "Updating order..." : "Adding new order...",
          {
            position: "top-right",
          }
        );

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // First dismiss the loading toast
        toast.dismiss(loadingToastId);

        // Show success toast with a delay to ensure it's visible
        setTimeout(() => {
          toast.success(
            <div>
              Successfully {order ? "updated" : "added"} order.
              <br />
              <small>Order details have been saved.</small>
            </div>,
            {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            }
          );
        }, 100);

        // Delay the onSave and onBack calls to ensure toast is visible
        setTimeout(() => {
          onSave(orderData);
        }, 3100);
      } catch (error) {
        toast.dismiss();
        toast.error(
          `Failed to ${order ? "update" : "add"} order. Please try again.`,
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
        console.error("Error saving order:", error);
      }
    }
  };

  return (
    <div className="add-new-order-container">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        limit={3}
      />

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
