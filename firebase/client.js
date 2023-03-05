import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDnF8du8aMY-gEeVYT-7q3M29f7YC1u9vM",
  authDomain: "questionbox-23293.firebaseapp.com",
  projectId: "questionbox-23293",
  storageBucket: "questionbox-23293.appspot.com",
  messagingSenderId: "227837068248",
  appId: "1:227837068248:web:cf1b0252370ad14200e8ad",
  measurementId: "G-WZ5L7G1Z44",
};

if (!getApps()?.length) {
  initializeApp(firebaseConfig);
}

export const firestore = getFirestore();
export const auth = getAuth();
