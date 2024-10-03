import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBiaJjXgMVlY42mkkCcrk46W6F-uZq3l4I",
    authDomain: "myweb-c793c.firebaseapp.com",
    projectId: "myweb-c793c",
    storageBucket: "myweb-c793c.appspot.com",
    messagingSenderId: "321603759423",
    appId: "1:321603759423:web:3c6746fe86b0076f25778a",
    measurementId: "G-22XTYQ2ZDD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage, app, doc, setDoc, getDoc };