// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-course-32feb.firebaseapp.com",
  projectId: "ai-course-32feb",
  storageBucket: "ai-course-32feb.firebasestorage.app",
  messagingSenderId: "349500841479",
  appId: "1:349500841479:web:cc34f2522f29b9145394a2",
  measurementId: "G-WMYCGGFHRD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);