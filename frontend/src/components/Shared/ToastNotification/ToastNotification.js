import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastNotification = ({ position = "top-right", theme = "dark" }) => {
  return (
    <ToastContainer
      position={position}
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={theme}
      limit={3}
    />
  );
};

// Function to display different types of toasts
export const showToast = (type, message, loadingId = null) => {
  // Dismiss loading toast if an ID is provided
  if (loadingId) toast.dismiss(loadingId);

  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "info":
      toast.info(message);
      break;
    case "warn":
      toast.warn(message);
      break;
    case "loading":
      // Return the toast ID for future dismissal
      return toast.loading(message); // This returns the loading toast ID
    default:
      toast(message);
  }
};

export default ToastNotification;
