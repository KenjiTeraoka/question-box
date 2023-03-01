// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnF8du8aMY-gEeVYT-7q3M29f7YC1u9vM",
  authDomain: "questionbox-23293.firebaseapp.com",
  projectId: "questionbox-23293",
  storageBucket: "questionbox-23293.appspot.com",
  messagingSenderId: "227837068248",
  appId: "1:227837068248:web:cf1b0252370ad14200e8ad",
  measurementId: "G-WZ5L7G1Z44",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//firebase
