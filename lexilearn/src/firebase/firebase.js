import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAm6uIH161CIjPXQsqAju0N-ngEjkcw9Wc",
  authDomain: "lexilearn-5c713.firebaseapp.com",
  projectId: "lexilearn-5c713",
  storageBucket: "lexilearn-5c713.appspot.com",
  messagingSenderId: "859172595025",
  appId: "1:859172595025:web:0700ffc0e2e281ada0df70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app,auth };