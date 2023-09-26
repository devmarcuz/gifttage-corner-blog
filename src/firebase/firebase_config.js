import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBtHcAWibxrrAy2XZaUfV6U_0_Eq7eVf3k",
  authDomain: "gifttage.firebaseapp.com",
  projectId: "gifttage",
  storageBucket: "gifttage.appspot.com",
  messagingSenderId: "697025971047",
  appId: "1:697025971047:web:16feca4303607fa3baa5c2",
  measurementId: "G-GFC9CYXHLZ",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
