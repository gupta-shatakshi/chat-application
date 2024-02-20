import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCedKKBDAv5aZyAvqFo40mH2QEKOTJ2uOE",
    authDomain: "quick--chat--app.firebaseapp.com",
    projectId: "quick--chat--app",
    storageBucket: "quick--chat--app.appspot.com",
    messagingSenderId: "116607123485",
    appId: "1:116607123485:web:af0996ab5ea49a4f70c6f4"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore(app);
