import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

import ViewStudentDetails from "./ViewStudentDetails";

const StudentDetails = () => {
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [StudentExcelFile, setStudentExcelFile] = useState(null);
  const [StudentData, setStudentData] = useState(null);
  const [StudentUpload, setStudentUpload] = useState(false);
  const [StudentView, setStudentView] = useState(false);
  const [
    showStudentDetailsUploadedSuccessToast,
    setShowStudentDetailsUploadedSuccessToast,
  ] = useState(false);
  const [
    showStudentDetailsRevertedSuccessToast,
    setShowStudentDetailsRevertedSuccessToast,
  ] = useState(false);
  const [showNetworkErrorToast, setShowNetworkErrorToast] = useState(false);
  const [showChooseFileToast, setShowChooseFileToast] = useState(false);
  const [showServerNetworkErrorToast, setShowServerNetworkErrorToast] =
    useState(false);
  const [showUnexpectedErrorToast, setShowUnexpectedErrorToast] =
    useState(false);
    const [showNoPlanErrorToast, setShowNoPlanErrorToast] = useState(false);
  const [showStudentConfirmationPrompt, setShowStudentConfirmationPrompt] =
    useState(false);
  const [showRevertConfirmationPrompt, setShowRevertConfirmationPrompt] =
    useState(false);

  useEffect(() => {
    setStudentUpload(true);
  }, [StudentUpload]);

  const handleViewStudentDetailsClick = () => {
    setStudentUpload(false);
    setStudentView(true);
  };

  const handleUpload = () => {
    if (StudentExcelFile) {
      readStudentData();
    }
  };

  const readStudentData = () => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
      // Skip the first element (header row) using slice(1)
      const formattedData = jsonData.slice(1).map((row) => ({
        reg_no: row[0],
        bus_user: row[1],
        bus_stopping: row[2],
        name: row[3],
        dob: row[4],
        department: row[5],
        year: row[6],
        section: row[7],
        scholar: row[8],
        placement_willing: row[9],
        placed: row[10],
      }));
      setStudentData(formattedData);
    };
    reader.readAsArrayBuffer(StudentExcelFile);
  };

  const handleRevertStudentDetails = async () => {
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
        `http://localhost:3000/api/revert_student_details`
      );
      // Handle response if needed

      console.log("response.status revert ", response.status);

      if (response.status === 200) {
        setShowStudentDetailsRevertedSuccessToast(true);
        setTimeout(() => {
          setShowStudentDetailsRevertedSuccessToast(false);
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

  const handleUploadStudentDetails = async () => {
    if (!navigator.onLine) {
      setShowNetworkErrorToast(true);
      setTimeout(() => {
        setShowNetworkErrorToast(false);
      }, 5300);
      return;
    }

    if (StudentExcelFile === undefined || StudentExcelFile === null) {
      // alert("Choose File before uploading");
      setShowChooseFileToast(true);
      setTimeout(() => {
        setShowChooseFileToast(false);
      }, 5300);
      return;
    }

    const currentDate = new Date(); // Get current date
    const formattedDate = currentDate.toISOString().split("T")[0];

    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:3000/api/update_student_details`,
        {
          start_date: formattedDate,
          StudentData
        }
      );

      if (response.status === 200) {
        setShowStudentDetailsUploadedSuccessToast(true);
        setTimeout(() => {
          setShowStudentDetailsUploadedSuccessToast(false);
        }, 5300);
      } else if (response.status === 500) {
        setLoading(false);
        setShowServerNetworkErrorToast(true);
        setTimeout(() => {
          setShowServerNetworkErrorToast(false);
        }, 5300);

        console.log(response.data.message);
      }
    } catch (error) {
      setShowUnexpectedErrorToast(true);
      setTimeout(() => {
        setShowUnexpectedErrorToast(false);
      }, 5300);
      console.error("Error uploading student details:", error);
      throw error;
    } finally {
      setShowStudentConfirmationPrompt(false);
    }
  };

  const uploadStudent = async (student) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/update_student_details`,
        {
          StudentData: student,
        }
      );

      if (response.status === 200) {
        setShowStudentDetailsUploadedSuccessToast(true);
        setTimeout(() => {
          setShowStudentDetailsUploadedSuccessToast(false);
        }, 5300);
      } else if (response.status === 500) {
        setLoading(false);
        setShowServerNetworkErrorToast(true);
        setTimeout(() => {
          setShowServerNetworkErrorToast(false);
        }, 5300);

        console.log(response.data.message);
      }
    } catch (error) {
      setShowUnexpectedErrorToast(true);
      setTimeout(() => {
        setShowUnexpectedErrorToast(false);
      }, 5300);
      console.error("Error uploading student details:", error);
      throw error;
    } finally {
      setShowStudentConfirmationPrompt(false);
    }
  };

  const handleStudentFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
    setStudentExcelFile(event.target.files[0]);
  };

  const handleUploadStudentDetailsClick = () => {
    setStudentUpload(true);
    setStudentView(false);
  };

  useEffect(() => {
    if (StudentExcelFile) {
      readStudentData();
    }
  }, [handleStudentFileChange]);

  const handleGoBack = () => {
    setStudentUpload(false);
  };

  const handleToastClose = () => {
    if (showStudentDetailsUploadedSuccessToast) {
      setShowStudentDetailsUploadedSuccessToast(false);
    } else if (showNetworkErrorToast) {
      setShowNetworkErrorToast(false);
    } else if (showUnexpectedErrorToast) {
      setShowUnexpectedErrorToast(false);
    } else if (showServerNetworkErrorToast) {
      setShowServerNetworkErrorToast(false);
    } else if (showChooseFileToast) {
      setShowChooseFileToast(false);
    }
  };

  const handleShowStudentDetails = (e) => {
    setShowStudentConfirmationPrompt(true);
  };

  const handleShowRevertStudentDetails = (e) => {
    setShowRevertConfirmationPrompt(true);
  };

  return (
    <div>
      {showStudentConfirmationPrompt && (
        <div className="logout-overlay">
          <div className="confirmation-container">
            <p>Are you sure you want to upload the student details?</p>
            <div className="confirm-buttons-container">
              <button
                className="confirm-button"
                onClick={handleUploadStudentDetails}
              >
                Yes
              </button>
              <button
                className="cancel-button"
                onClick={() => setShowStudentConfirmationPrompt(false)}
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
            <p>Are you sure you want to revert the student details?</p>
            <div className="confirm-buttons-container">
              <button
                className="confirm-button"
                onClick={handleRevertStudentDetails}
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

      {(showStudentDetailsUploadedSuccessToast ||
        showStudentDetailsRevertedSuccessToast) && (
        <div className="toast toast-active">
          <div className="toast-content">
            <i class="bx bx-check toast-check"></i>
            <div className="toast-message">
              {showStudentDetailsUploadedSuccessToast && (
                <>
                  <span className="toast-text toast-text-2">
                    Student details uploaded successfully!
                  </span>
                </>
              )}
              {showStudentDetailsRevertedSuccessToast && (
                <>
                  <span className="toast-text toast-text-2">
                    Student details reverted successfully!
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
        showServerNetworkErrorToast ||
        showUnexpectedErrorToast ||
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
        {StudentUpload && (
          <>
            <div class="wrap-content-create-emp container">
              <a>
                <img src="./uploads/update-plan.png" />
                Update Student Details
              </a>
            </div>
            <div className="wrap-body-container container">
              <h3>Read Student data</h3>
              <div>
                <label htmlFor="file-upload" className="custom-file-upload">
                  Choose File <i class="bx bx-file large-icon"></i>
                </label>
                <input
                  id="file-upload"
                  className="file-input"
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleStudentFileChange}
                />
                {fileName && <span className="file-name">{fileName}</span>}
              </div>
              <div className="buttons-container">
                <button
                  className="student-previous-btn"
                  onClick={handleShowStudentDetails}
                >
                  upload student details <i class="bx bx-upload large-icon"></i>
                </button>
                <button
                  className="student-nxt-btn"
                  onClick={handleShowRevertStudentDetails}
                >
                  revert to previous student data{" "}
                  <i class="bx bx-undo large-icon"></i>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <p>{message}</p>
      {/* {
    StudentView && 
    <ViewStudentDetails />
} */}
    </div>
  );
};

export default StudentDetails;
