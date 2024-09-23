import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

import '../../components/Shared/Toast/Toast.css'

import { useNavigate } from "react-router-dom";
import ViewBusDetails from "./ViewBusDetails";

const BusDetails = () => {
  const [fileName, setFileName] = useState("");

  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const overlayClass = `loading-overlay${loading ? " visible" : ""}`;
  const [busExcelFile, setBusExcelFile] = useState(null);
  const [busData, setBusData] = useState(null);
  const [uploadMessage, setUploadMessage] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [busView, setBusView] = useState(false);
  const [busUpload, setBusUpload] = useState(false);
  const [
    showBusDetailsUploadedSuccessToast,
    setShowBusDetailsUploadedSuccessToast,
  ] = useState(false);
  const [
    showBusDetailsRevertedSuccessToast,
    setShowBusDetailsRevertedSuccessToast,
  ] = useState(false);
  const [showChooseFileToast, setShowChooseFileToast] = useState(false);
  const [showNetworkErrorToast, setShowNetworkErrorToast] = useState(false);
  const [showServerNetworkErrorToast, setShowServerNetworkErrorToast] =
    useState(false);
  const [showUnexpectedErrorToast, setShowUnexpectedErrorToast] =
    useState(false);
  const [showNoPlanErrorToast, setShowNoPlanErrorToast] = useState(false);

  const [showBusConfirmationPrompt, setShowBusConfirmationPrompt] =
    useState(false);
  const [showRevertConfirmationPrompt, setShowRevertConfirmationPrompt] =
    useState(false);

  useEffect(() => {
    setBusUpload(true);
  }, [busUpload]);

  const handleViewBusDetailsClick = () => {
    setBusView(true);
    setBusUpload(false);
  };
  const handleUpload = () => {
    if (busExcelFile) {
      readBusData();
      setUploadMessage(true);
    }
  };

  const readBusData = () => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
      setBusData(jsonData);
    };
    reader.readAsArrayBuffer(busExcelFile);
  };

  const handleRevertBusDetails = async () => {
    if (!navigator.onLine) {
      setShowNetworkErrorToast(true);
      setTimeout(() => {
        setShowNetworkErrorToast(false);
      }, 5300);
      return;
    }

    console.log("button pressed");

    setShowRevertConfirmationPrompt(false);
    setLoading(true); // Set loading state to true before making the request
    try {
      const response = await axios.post(
        `http://localhost:3000/api/revert_bus_details`
      );
      // Handle response if needed

      if (response.status === 200) {
        setShowBusDetailsRevertedSuccessToast(true);
        setTimeout(() => {
          setShowBusDetailsRevertedSuccessToast(false);
        }, 5300);
      } else if (response.status === 404) {
        setLoading(false);
        setShowNoPlanErrorToast(true);
        setTimeout(() => {
          setShowNoPlanErrorToast(false);
        }, 5300);

        console.log(response.data.message);
      } else if (response.status === 500) {
        setLoading(false);
        setShowServerNetworkErrorToast(true);
        setTimeout(() => {
          setShowServerNetworkErrorToast(false);
        }, 5300);

        console.log(response.data.message);
      }
      //setMessage(response.data.message); // revert the message state with the response from the server
    } catch (error) {
      setShowUnexpectedErrorToast(true);
      setTimeout(() => {
        setShowUnexpectedErrorToast(false);
      }, 5300);
      console.error("Error reverting bus details:", error);
      setMessage("Failed to revert bus details");
    } finally {
      setShowRevertConfirmationPrompt(false);
      setTimeout(() => {
        setLoading(false);
      }, 500);
      // Set loading state to false regardless of success or failure
    }
  };

  const handleUploadBusDetails = async () => {
    if (!navigator.onLine) {
      setShowNetworkErrorToast(true);
      setTimeout(() => {
        setShowNetworkErrorToast(false);
      }, 5300);
      return;
    }

    console.log("button pressed");

    setShowBusConfirmationPrompt(false);
    setLoading(true); // Set loading state to true before making the request

    const currentDate = new Date(); // Get current date
    const formattedDate = currentDate.toISOString().split("T")[0];

    console.log("busExcelFile", busExcelFile);

    if (busExcelFile === undefined || busExcelFile === null) {
      // alert("Choose File before uploading");
      setShowChooseFileToast(true);
      setTimeout(() => {
        setShowChooseFileToast(false);
      }, 5300);
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/api/update_bus_details`,
        {
          start_date: formattedDate,
          busData,
        }
      );
      // Handle response if needed

      if (response.status === 200) {
        setShowBusDetailsUploadedSuccessToast(true);
        setTimeout(() => {
          setShowBusDetailsUploadedSuccessToast(false);
        }, 5300);
      } else if (response.status === 500) {
        setShowServerNetworkErrorToast(true);
        setTimeout(() => {
          setShowServerNetworkErrorToast(false);
        }, 5300);
      }
      //setMessage(response.data.message); // Update the message state with the response from the server
    } catch (error) {
      setShowUnexpectedErrorToast(true);
      setTimeout(() => {
        setShowUnexpectedErrorToast(false);
      }, 5300);
      console.error("Error updating regular plan:", error);
      setMessage("Failed to update regular plan");
    } finally {
      setShowBusConfirmationPrompt(false);
      setTimeout(() => {
        setLoading(false);
      }, 500); // Set loading state to false regardless of success or failure
    }
  };

  const handleBusFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
    setBusExcelFile(event.target.files[0]);
  };

  const handleSetStartDate = (event) => {
    setStartDate(event.target.value);
  };
  const handleUploadBusDetailsClick = () => {
    setBusUpload(true);
    setBusView(false);
  };

  useEffect(() => {
    if (busExcelFile) {
      console.log("787877878");
      readBusData();
      setUploadMessage(true);
    }
  }, [handleBusFileChange]);

  const handleGoBack = () => {
    setBusUpload(false);
  };

  const handleToastClose = () => {
    if (showBusDetailsUploadedSuccessToast) {
      setShowBusDetailsUploadedSuccessToast(false);
    } else if (showBusDetailsRevertedSuccessToast) {
      setShowBusDetailsRevertedSuccessToast(false);
    } else if (showNetworkErrorToast) {
      setShowNetworkErrorToast(false);
    } else if (showUnexpectedErrorToast) {
      setShowUnexpectedErrorToast(false);
    } else if (showServerNetworkErrorToast) {
      setShowServerNetworkErrorToast(false);
    } else if (showChooseFileToast) {
      setShowChooseFileToast(false);
    } else if (showNoPlanErrorToast) {
      setShowNoPlanErrorToast(false);
    }
  };

  const handleShowBusDetails = (e) => {
    setShowBusConfirmationPrompt(true);
  };

  const handleShowRevertBusDetails = (e) => {
    setShowRevertConfirmationPrompt(true);
  };

  return (
    <div>
      {showBusConfirmationPrompt && (
        <div className="logout-overlay">
          <div className="confirmation-container">
            <p>Are you sure you want to upload the bus details?</p>
            <div className="confirm-buttons-container">
              <button
                className="confirm-button"
                onClick={handleUploadBusDetails}
              >
                Yes
              </button>
              <button
                className="cancel-button"
                onClick={() => setShowBusConfirmationPrompt(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      {showRevertConfirmationPrompt && (
        <div className="logout-overlay">
          <div className="confirmation-container">
            <p>Are you sure you want to revert the bus details?</p>
            <div className="confirm-buttons-container">
              <button
                className="confirm-button"
                onClick={handleRevertBusDetails}
              >
                Yes
              </button>
              <button
                className="cancel-button"
                onClick={() => setShowRevertConfirmationPrompt(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {(showBusDetailsUploadedSuccessToast ||
        showBusDetailsRevertedSuccessToast) && (
        <div className="toast toast-active">
          <div className="toast-content">
            <i class="bx bx-check toast-check"></i>
            <div className="toast-message">
              {showBusDetailsUploadedSuccessToast && (
                <>
                  <span className="toast-text toast-text-2">
                    Bus details uploaded successfully!
                  </span>
                </>
              )}
              {showBusDetailsRevertedSuccessToast && (
                <>
                  <span className="toast-text toast-text-2">
                    Bus details reverted successfully!
                  </span>
                </>
              )}
            </div>
            <div className="toast-close-image" onClick={handleToastClose}>
              <i class="bx bx-x bx-success"></i>
            </div>
          </div>
          <div className="toast-progress toast-active"></div>
        </div>
      )}

      {(showNetworkErrorToast ||
        showChooseFileToast ||
        showUnexpectedErrorToast ||
        showServerNetworkErrorToast ||
        showNoPlanErrorToast) && (
        <div className="toast toast-active">
          <div className="toast-content">
            <i class="bx bx-error toast-error-check"></i>
            <div className="toast-message">
              {showNetworkErrorToast && (
                <span className="toast-text toast-text-2">
                  Network disconnected. Please check your network!
                </span>
              )}

              {showChooseFileToast && (
                <span className="toast-text toast-text-2">
                  Choose file before uploading!
                </span>
              )}
              {showNoPlanErrorToast && (
                <span className="toast-text toast-text-2">
                  No plan available to revert!
                </span>
              )}
              {showServerNetworkErrorToast && (
                <span className="toast-text toast-text-2">
                  Internal Server Error! Try after some time.
                </span>
              )}
              {showUnexpectedErrorToast && (
                <span className="toast-text toast-text-2">
                  Unexpected Error Occurred.
                </span>
              )}
            </div>
            <div className="toast-close-image" onClick={handleToastClose}>
              <i class="bx bx-x"></i>
            </div>
          </div>
          <div className="toast-error-progress toast-active"></div>
        </div>
      )}
      <div className="do-wrap">
        {busUpload && (
          <>
            <div class="wrap-content-create-emp container">
              <a>
                <img src="./uploads/update-plan.png" />
                Update Bus Details
              </a>
            </div>
            <div className="wrap-body-container container">
              {loading && (
                <div className="skeleton-inner-container">
                  {/* <div className="skeleton skeleton-header"></div> */}
                  <div className="skeleton-wrap">
                    <div className="skeleton skeleton-bus-student-section"></div>
                    <div className="skeleton-bus-wrap-inside">
                      <div className="skeleton skeleton-sub-bus-section"></div>
                      <div className="skeleton skeleton-sub-bus-section"></div>
                    </div>
                  </div>
                </div>
              )}
              <h3>Read Bus data</h3>
              <div className="bus-choose-file">
                <label htmlFor="file-upload" className="custom-file-upload">
                  Choose File <i class="bx bx-file large-icon"></i>
                </label>

                <input
                  id="file-upload"
                  className="file-input"
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleBusFileChange}
                />
                {fileName && <span className="file-name">{fileName}</span>}
              </div>

              {/* <button className="upload-button" onClick={handleUpload}>
                        Read
                    </button> */}
              {/* date<input type='date' onChange={handleSetStartDate} /> */}
              <div className="buttons-container">
                <button
                  className="bus-previous-btn"
                  onClick={handleShowBusDetails}
                >
                  upload bus details <i class="bx bx-upload large-icon"></i>
                </button>
                <button
                  className="bus-nxt-btn"
                  onClick={handleShowRevertBusDetails}
                >
                  revert to previous bus data{" "}
                  <i class="bx bx-undo large-icon"></i>
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <p>{message}</p>
      {/* {busView &&
                <ViewBusDetails />
            } */}
    </div>
  );
};

export default BusDetails;
