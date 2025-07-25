import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCo2X5frM_JCU03OI3nosOfkpDIc8GxFUE",
  authDomain: "nexa-data-2cd66.firebaseapp.com",
  projectId: "nexa-data-2cd66",
  storageBucket: "nexa-data-2cd66.firebasestorage.app",
  messagingSenderId: "721271582322",
  appId: "1:721271582322:web:711ab29e50ad5854d6dceb",
  measurementId: "G-0X0LXBQYHB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const loginMessage = document.getElementById("message");
const signupMessage = document.getElementById("signupMessage");

// Login form handler
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  loginMessage.textContent = "";

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  signInWithEmailAndPassword(auth, email, password)
  .then(() => {
    loginMessage.style.color = "green";
    loginMessage.textContent = "Login successful! Redirecting...";
    setTimeout(() => {
      window.location.href = "pages/home.html"; // ✅ Adjust path if needed
    }, 1000);
  })
  .catch((error) => {
    loginMessage.style.color = "red";
    loginMessage.textContent = "Login error: " + error.message;
  });
  

});

// Signup form handler
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  signupMessage.textContent = "";

  const email = signupForm.signupEmail.value;
  const password = signupForm.signupPassword.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      signupMessage.style.color = "green";
      signupMessage.textContent = "Sign-up successful! Redirecting...";
      setTimeout(() => {
        window.location.href = "pages/home.html";

      }, 1000);
    })
    .catch((error) => {
      signupMessage.style.color = "red";
      signupMessage.textContent = "Sign-up error: " + error.message;
    });
});

// Logout button handler — this should run AFTER DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      signOut(auth)
        .then(() => {
          alert("You have been logged out.");
          window.location.href = "index.html";
        })
        .catch((error) => {
          console.error("Logout error:", error);
          alert("Error logging out.");
        });
    });
  }
});
