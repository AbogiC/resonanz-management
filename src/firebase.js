// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRASAb0OEkvRYOwus0rU7PvMvG_oMIL5Y",
  authDomain: "resonanz-management.firebaseapp.com",
  projectId: "resonanz-management",
  storageBucket: "resonanz-management.firebasestorage.app",
  messagingSenderId: "285634206968",
  appId: "1:285634206968:web:9e03566dfbdf03f00c2f0d",
  measurementId: "G-JD07CMZF8J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
