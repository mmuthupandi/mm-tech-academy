import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbUg406e2aIFv38dNd0AkzoJ_wf7SlBaM",
  authDomain: "mm-tech-academy.firebaseapp.com",
  projectId: "mm-tech-academy",
  storageBucket: "mm-tech-academy.firebasestorage.app",
  messagingSenderId: "260169759514",
  appId: "1:260169759514:web:909903696cf61d03174aa3",
  measurementId: "G-M6BDF7PRE8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { app, db };
