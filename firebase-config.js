// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyCo2X5frM_JCU03OI3nosOfkpDIc8GxFUE",
  authDomain: "nexa-data-2cd66.firebaseapp.com",
  projectId: "nexa-data-2cd66",
  storageBucket: "nexa-data-2cd66.firebasestorage.app",
  messagingSenderId: "721271582322",
  appId: "1:721271582322:web:711ab29e50ad5854d6dceb",
  measurementId: "G-0X0LXBQYHB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth };
