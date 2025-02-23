// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqiEXzzH-fghEXgvSP5GOS7i8JUPQiWKY",
  authDomain: "plus1-7dd60.firebaseapp.com",
  projectId: "plus1-7dd60",
  storageBucket: "plus1-7dd60.firebasestorage.app",
  messagingSenderId: "836967339477",
  appId: "1:836967339477:web:9e349624a1b01f773b995c",
  measurementId: "G-3J1JXY9CM4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, firebaseConfig };

