import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUE0tlAxRU2c128iQk5n_sWjhl-uNvKA8",
  authDomain: "lexilearn-91902.firebaseapp.com",
  projectId: "lexilearn-91902",
  storageBucket: "lexilearn-91902.appspot.com",
  messagingSenderId: "703031410788",
  appId: "1:703031410788:web:a75a1523617fb30ea49f71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
