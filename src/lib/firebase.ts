import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Replace with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUTXUdphlHpucksrIb6UTJhynFVdRMRDU",
  authDomain: "mdg-website-3865a.firebaseapp.com",
  projectId: "mdg-website-3865a",
  storageBucket: "mdg-website-3865a.firebasestorage.app",
  messagingSenderId: "67628447719",
  appId: "1:67628447719:web:cdac81757cf6dbb3ccef42",
  measurementId: "G-04WYWY6X32"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);