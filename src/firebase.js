// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZqDJZf54ZEIZfPOET8cmbg8WRwdw070E",
  authDomain: "sl-office-ec2da.firebaseapp.com",
  projectId: "sl-office-ec2da",
  storageBucket: "sl-office-ec2da.firebasestorage.app",
  messagingSenderId: "1054639976551",
  appId: "1:1054639976551:web:f96535e793d7075363e4c2",
  measurementId: "G-6D5Y5MHBY0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {});
}

export default app;
