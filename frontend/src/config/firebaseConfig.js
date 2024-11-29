// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
