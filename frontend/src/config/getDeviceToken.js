import { getToken } from "firebase/messaging";
import { messaging } from "./firebaseConfig"; // Assuming you have this set up
import apiClient from "../apiClient"; // Import the custom axios client

// getDeviceToken.js
export const getDeviceToken = async () => {
  try {
    const token = await getToken(messaging);
    const institutionId = localStorage.getItem("institutionId"); // Retrieve the institution ID from localStorage

    if (token && institutionId) {
      console.log("Device token:", token);
      // Send both token and institutionId to backend
      await apiClient.post("/institutions/update-device-token", {
        token,
        institutionId,
      });
    }
  } catch (error) {
    console.error("Error getting device token:", error);
  }
};
