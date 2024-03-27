// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyA6SMz6YLp10xxYaUQRz3iFizprGpeK9-c",
  authDomain: "eshop-5bb6a.firebaseapp.com",
  projectId: "eshop-5bb6a",
  storageBucket: "eshop-5bb6a.appspot.com",
  messagingSenderId: "774897450264",
  appId: "1:774897450264:web:0e39f9d9522e3c56c5f26d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);
export const storage = getStorage(app);
export default app;
