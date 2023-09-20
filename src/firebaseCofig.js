import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDxL7VJcZp89SazbP9MmBYEGVXRBXJ90_o",
  authDomain: "plantshop-5ac3c.firebaseapp.com",
  projectId: "plantshop-5ac3c",
  storageBucket: "plantshop-5ac3c.appspot.com",
  messagingSenderId: "758121555523",
  appId: "1:758121555523:web:2e87b9f625742135b556f6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//FIRESTORE
export const db = getFirestore(app);

//AUTH
const auth = getAuth(app);

//login with email & password
export const onSignIn = async ({ email, password }) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//logout
export const logout = () => {
  signOut(auth);
  console.log("logout");
};

//login woth google
let googleProvider = new GoogleAuthProvider();

export const loginGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//register
export const register = async ({ email, password }) => {
  try {
    let res = await createUserWithEmailAndPassword(auth, email, password);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//forgot password
export const forgotPassword = async (email) => {
  let res = sendPasswordResetEmail(auth, email);
  return res;
};
