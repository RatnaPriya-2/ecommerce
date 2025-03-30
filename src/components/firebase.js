import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAhyGgQFtSW-9Y8KUJa4ez8nrAvXccR21k",
  authDomain: "ecommerce-38f81.firebaseapp.com",
  projectId: "ecommerce-38f81",
  storageBucket: "ecommerce-38f81.firebasestorage.app",
  messagingSenderId: "202034707761",
  appId: "1:202034707761:web:d378082ae1d74653010410",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);
