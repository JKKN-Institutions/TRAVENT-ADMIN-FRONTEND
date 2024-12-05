// firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.1.2/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyDcAvMejYf5QC18_Ns01gXxw-HdQW5GRh8",
  authDomain: "transport-login-2fe75.firebaseapp.com",
  projectId: "transport-login-2fe75",
  storageBucket: "transport-login-2fe75.appspot.com",
  messagingSenderId: "188257593103",
  appId: "1:188257593103:web:a9b38abe2427ae6d7c807a",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function (payload) {
  console.log("Background Message received:", payload);
  // Customize notification here
});
