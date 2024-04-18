import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDL5kCWusrJt78TF8d9lH1NO6rcDJgk4jY",
    authDomain: "chamados-a0ae9.firebaseapp.com",
    projectId: "chamados-a0ae9",
    storageBucket: "chamados-a0ae9.appspot.com",
    messagingSenderId: "354678532437",
    appId: "1:354678532437:web:52d5dc4aee00a9849267dc",
    measurementId: "G-F37ZV0EVT9"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

const db = getFirestore(firebaseApp);

const storage = getStorage(firebaseApp);

export { auth, db, storage};



