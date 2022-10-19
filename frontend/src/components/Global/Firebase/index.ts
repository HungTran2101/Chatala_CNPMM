import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAsfabV4yzacVdOogs2PG6u-NoD6f2tQuI",
  authDomain: "chatala-ced10.firebaseapp.com",
  projectId: "chatala-ced10",
  storageBucket: "chatala-ced10.appspot.com",
  messagingSenderId: "532567438703",
  appId: "1:532567438703:web:654307e9e3bb8398b2649a"
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);