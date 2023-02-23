// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyA-8xOqOBu9d-DPonkNsLTCqZGHvtrgARQ",
  authDomain: "uploading-file-b1217.firebaseapp.com",
  projectId: "uploading-file-b1217",
  storageBucket: "uploading-file-b1217.appspot.com",
  messagingSenderId: "428431371167",
  appId: "1:428431371167:web:84d0bedb45731427f9ebaa",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
