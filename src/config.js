// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAaDuvBTH2cIDmkv39Ruo1pxEJ3QpvpK6o",
  authDomain: "e-shop-hetic.firebaseapp.com",
  projectId: "e-shop-hetic",
  storageBucket: "e-shop-hetic.appspot.com",
  messagingSenderId: "39638114697",
  appId: "1:39638114697:web:6b8a91b072961ef25fc158",
  measurementId: "G-MM1WS767GX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const storage = getStorage(app, "gs://e-shop-hetic.appspot.com");

