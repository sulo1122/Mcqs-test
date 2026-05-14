// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0A_MYyqfTK2zR7_XLTJ3ejoMBWnKZFRQ",
  authDomain: "sk-academy-78011.firebaseapp.com",
  projectId: "sk-academy-78011",
  storageBucket: "sk-academy-78011.firebasestorage.app",
  messagingSenderId: "386282168675",
  appId: "1:386282168675:web:f4a37020e49faabab47356",
  measurementId: "G-0M9ZMN2SWW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);