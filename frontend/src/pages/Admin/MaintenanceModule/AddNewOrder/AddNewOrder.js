import React, { useState, useEffect } from "react";
import ToastNotification, {
  showToast,
} from "../../../../components/Shared/ToastNotification/ToastNotification";
import TopBar from "../../../../components/Shared/TopBar/TopBar";
import FormInput from "../../../../components/Shared/FormInput/FormInput";
import ActionButtons from "../../../../components/Shared/ActionButtons/ActionButtons";
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
      showToast("error", "Please fill in all required fields");
    } else {
      const loadingToastId = showToast(
        "loading",
        order ? "Updating order..." : "Adding new order..."
      );

      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Show success toast with a delay to ensure visibility
        showToast(
          "success",
          `Successfully ${order ? "updated" : "added"} order.`,
          loadingToastId
        );

        setTimeout(() => onSave(orderData), 3100);
      } catch (error) {
        showToast(
          "error",
          `Failed to ${order ? "update" : "add"} order. Please try again.`,
          loadingToastId
        );
        console.error("Error saving order:", error);
      }
    }
  };

  return (
    <div className="add-new-order-container">
      <ToastNotification />
      <TopBar
        title={order ? "Edit Order" : "Add New Order"}
        onBack={onBack}
        backButton={true}
      />
      <main className="add-new-order-main-content">
        <form onSubmit={handleSubmit}>
          <div className="add-new-order-form-grid">
            {Object.keys(orderData).map((key) => (
              <div key={key} className="add-new-order-form-group">
                <FormInput
                  id={key}
                  name={key}
                  type={
                    key.includes("quantity")
                      ? "number"
                      : key.includes("Date")
                      ? "date"
                      : key.includes("Time")
                      ? "time"
                      : "text"
                  }
                  value={orderData[key]}
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
            submitText={order ? "Update Order" : "Add Order"}
          />
        </form>
      </main>
    </div>
  );
};

export default AddNewOrder;
