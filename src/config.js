// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
/*import { getAnalytics } from "firebase/analytics";*/
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaDuvBTH2cIDmkv39Ruo1pxEJ3QpvpK6o",
  authDomain: "e-shop-hetic.firebaseapp.com",
  projectId: "e-shop-hetic",
  storageBucket: "e-shop-hetic.appspot.com",
  messagingSenderId: "39638114697",
  appId: "1:39638114697:web:6b8a91b072961ef25fc158",
  measurementId: "G-MM1WS767GX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
/*
const analytics = getAnalytics(app);*/
