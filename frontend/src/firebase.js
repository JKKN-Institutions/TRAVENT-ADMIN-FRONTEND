// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAtAGoAmmq_t4u2VuxOd9CJkG2J9oM_0po",
  authDomain: "transport-login-427307.firebaseapp.com",
  projectId: "transport-login-427307",
  storageBucket: "transport-login-427307.appspot.com",
  messagingSenderId: "827591818988",
  appId: "1:827591818988:web:644692bc353582c04a2fc9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
