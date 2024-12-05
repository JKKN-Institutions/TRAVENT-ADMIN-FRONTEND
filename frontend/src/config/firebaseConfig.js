import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

// Firebase config (use your own)
export const firebaseConfig = {
  apiKey: "AIzaSyDcAvMejYf5QC18_Ns01gXxw-HdQW5GRh8",
  authDomain: "transport-login-2fe75.firebaseapp.com",
  projectId: "transport-login-2fe75",
  storageBucket: "transport-login-2fe75.firebasestorage.app",
  messagingSenderId: "188257593103",
  appId: "1:188257593103:web:a9b38abe2427ae6d7c807a",
  measurementId: "G-JM8HD14PDL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging };
