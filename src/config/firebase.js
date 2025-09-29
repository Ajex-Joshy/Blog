// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLvc1X6a5uZbmaQ7B9Rc1cA8xwsYWAzZE",
  authDomain: "blog-app-87279.firebaseapp.com",
  projectId: "blog-app-87279",
  storageBucket: "blog-app-87279.firebasestorage.app",
  messagingSenderId: "666962627795",
  appId: "1:666962627795:web:f3f08fe7144daccabc5826",
  measurementId: "G-17CEYDGRE3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();

// Firestore

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
