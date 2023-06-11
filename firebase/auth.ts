// Firebase
import firebase from "firebase/compat/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  connectAuthEmulator,
} from "firebase/auth";

// Constants
import {
  ERROR,
  FIREBASE_AUTH_ERRORS,
  FIREBASE_AUTH_SUCCESS,
} from "../constants/codes";

import axios from "axios";

// Redux
import { store } from "../store/store";
import { setCurrentUser } from "../store/states/userSlice";
import { app } from "./firebase";

export const provider = new GoogleAuthProvider();

// export const auth = getAuth(app);
// connectAuthEmulator(auth, "http://localhost:9099");

// export const handleLoginWithGoogle = async () => {
//   try {
//     await signInWithPopup(auth, provider);
//     store.dispatch(setCurrentUser({ user: auth.currentUser }));
//     return { status: FIREBASE_AUTH_SUCCESS };
//   } catch (error) {
//     // Problem with API key
//     return { error: ERROR.API_KEY };
//   }
// };

// export const handleSignUpWithEmailPassword = async (
//   email: string,
//   password: string
// ) => {
//   try {
//     await createUserWithEmailAndPassword(auth, email, password);
//     return { status: FIREBASE_AUTH_SUCCESS };
//   } catch (error: any) {
//     return { error: error.message as string };
//   }
// };

// export const handleLoginWithEmailPassword = async (
//   email: string,
//   password: string
// ) => {
//   try {
//     await signInWithEmailAndPassword(auth, email, password);
//     return { status: FIREBASE_AUTH_SUCCESS };
//   } catch (error: any) {
//     return { error: error.message as string };
//   }
// };

// export const handleLoginWithEmailPassword = async (email, password) => {
//   try {
//     await signInWithEmailAndPassword(auth, email, password);
//     return { status: FIREBASE_AUTH_SUCCESS };
//   } catch (error) {
//     return FIREBASE_AUTH_ERRORS[error.message];
//   }
// };

// export const signOutAccount = async () => {
//   try {
//     await signOut(auth);
//   } catch (error) {
//     return error.message;
//   }
// };

// export const getUserStatus = () => {
//   try {
//     return auth.currentUser;
//   } catch (error) {
//     return false;
//   }
// };

// const defaultResponse = {
//   user: {
//     uid: "",
//     email: "",
//     emailVerified: true,
//     displayName: "",
//     isAnonymous: false,
//     photoURL: "",
//     providerData: [
//       {
//         providerId: "",
//         uid: "",
//         displayName: "",
//         email: "",
//         phoneNumber: null,
//         photoURL: "",
//       },
//     ],
//     stsTokenManager: {
//       refreshToken: "",
//       accessToken: "",
//       expirationTime: 1666518157763,
//     },
//     createdAt: "1666474821227",
//     lastLoginAt: "1666514558021",
//     apiKey: "",
//     appName: "[DEFAULT]",
//   },
//   providerId: "",
//   _tokenResponse: {
//     federatedId: "",
//     providerId: "",
//     email: "",
//     emailVerified: true,
//     firstName: "",
//     fullName: "",
//     lastName: "",
//     photoUrl: "",
//     localId: "",
//     displayName: "",
//     idToken: "",
//     context: "",
//     oauthAccessToken: "",
//     oauthExpireIn: 3599,
//     refreshToken: "",
//     expiresIn: "3600",
//     oauthIdToken: "",
//     rawUserInfo: "",
//     kind: "identitytoolkit#VerifyAssertionResponse",
//   },
//   operationType: "signIn",
// };
