import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCrq5iWzKxOpd4A5soOL1SiHjZ7F9pYAJg",
  authDomain: "web-store-assessment.firebaseapp.com",
  projectId: "web-store-assessment",
  storageBucket: "web-store-assessment.firebasestorage.app",
  messagingSenderId: "651777170737",
  appId: "1:651777170737:web:c5920c83c0ddf7ee1a2410",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
