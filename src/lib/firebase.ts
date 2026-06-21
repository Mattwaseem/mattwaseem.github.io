import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase web config. These are identifiers, not secrets — safe to commit.
// Security is enforced by Firebase Auth + Firestore rules, not by hiding these.
const firebaseConfig = {
  apiKey: "AIzaSyD9bJt1TQw1JXOfHOZPgdXQ2GPguvfa4M8",
  authDomain: "portfolio-b0b27.firebaseapp.com",
  projectId: "portfolio-b0b27",
  storageBucket: "portfolio-b0b27.firebasestorage.app",
  messagingSenderId: "567723615273",
  appId: "1:567723615273:web:fb2b1b295093e7d6c02838",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// The only account allowed to write habit data.
// Leave empty until your FIRST sign-in, then paste your UID here.
export const OWNER_UID = "";
