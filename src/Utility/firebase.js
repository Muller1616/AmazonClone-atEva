import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpW-P8b90woXKMG0_c3m3PmEiHC6SMpMA",
  authDomain: "clone-d68d3.firebaseapp.com",
  projectId: "clone-d68d3",
  storageBucket: "clone-d68d3.firebasestorage.app",
  messagingSenderId: "877643112264",
  appId: "1:877643112264:web:0c2daaaf2867951dc79d7d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = app.firestore();