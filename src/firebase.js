import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAeqLJKjzEpIx_6EyL9IFTuTCOwM3x1xcQ",
  authDomain: "pulse-point-v1.firebaseapp.com",
  projectId: "pulse-point-v1",
  storageBucket: "pulse-point-v1.firebasestorage.app",
  messagingSenderId: "856788375810",
  appId: "1:856788375810:web:52df04971b0aa2fb794a1b",
  measurementId: "G-2TWYXW1C3Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);

export default app;