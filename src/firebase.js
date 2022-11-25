import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAw4gqRaVSBeXeXq4xSCgQyQ37u8AoFxs8",
  authDomain: "amogus-4b93b.firebaseapp.com",
  projectId: "amogus-4b93b",
  storageBucket: "amogus-4b93b.appspot.com",
  messagingSenderId: "688459943514",
  appId: "1:688459943514:web:bb60fb6bfc8c89596c9263",
  measurementId: "G-ES0X7S0520",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export { auth };
