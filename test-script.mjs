import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDbUg406e2aIFv38dNd0AkzoJ_wf7SlBaM",
  authDomain: "mm-tech-academy.firebaseapp.com",
  projectId: "mm-tech-academy",
  storageBucket: "mm-tech-academy.firebasestorage.app",
  messagingSenderId: "260169759514",
  appId: "1:260169759514:web:909903696cf61d03174aa3",
  measurementId: "G-M6BDF7PRE8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function test() {
  try {
    const colRef = collection(db, "test");
    const docRef = await addDoc(colRef, { test: 123 });
    console.log("Success! Doc ID:", docRef.id);
  } catch (err) {
    console.error("Firebase Error:", err);
  }
}

test();
