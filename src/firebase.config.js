
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCF93r-wEnBdfS-b3XhlYb1j6jMaW8tumE",
  authDomain: "evidencija-tura.firebaseapp.com",
  databaseURL: "https://evidencija-tura-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "evidencija-tura",
  storageBucket: "evidencija-tura.appspot.com",
  messagingSenderId: "739943431582",
  appId: "1:739943431582:web:8b0ca1fd50464e6ee16a8f",
  measurementId: "G-GECZ5MLBSJ"
};

// Initialize Firebase
const appInit = initializeApp(firebaseConfig);
const db = getFirestore(appInit);

export default db;