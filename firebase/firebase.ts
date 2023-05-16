// Firebase
import firebase from "firebase/compat/app";
import { FIREBASE_CONFIG } from "../constants/firebase";

export const app = firebase.initializeApp(FIREBASE_CONFIG);
