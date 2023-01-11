// Firebase
import firebase from "firebase/compat/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// Constants
import {
  ERROR,
  FIREBASE_AUTH_ERRORS,
  FIREBASE_AUTH_SUCCESS,
  NOT_LOGGED_IN,
} from "../constants/codes.js";

// Redux
import { store } from "../store/store";
import { setUserToken } from "../store/states/userSlice.js";

import axios from "axios";

const provider = new GoogleAuthProvider();

const FirebaseCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const auth = getAuth(firebase.initializeApp(FirebaseCredentials));

auth.onAuthStateChanged(async function (user) {
  if (user) {
    // const authValid = await axios.get(
    //   `${process.env.NEXT_PUBLIC_URL}/api/auth/login`,
    //   {
    //     headers: {
    //       token: store.getState("user").user.idToken,
    //     },
    //   }
    // );
    // console.log("USER LOGGED IN", auth.currentUser);
    // if (!authValid.data.verified) {
    //   const userIdToken = await user.getIdToken(true);
    store.dispatch(setUserToken(auth.currentUser));
    // }
  } else {
    store.dispatch(setUserToken(NOT_LOGGED_IN));
  }
});

export const handleLoginWithGoogle = async () => {
  try {
    await signInWithPopup(auth, provider);
    return { status: FIREBASE_AUTH_SUCCESS };
  } catch (error) {
    // Problem with API key
    return process.env.NODE_ENV.toUpperCase() !== "PRODUCTION"
      ? defaultResponse
      : { error: ERROR.API_KEY };
  }
};

export const handleSignUpWithEmailPassword = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return { status: FIREBASE_AUTH_SUCCESS };
  } catch (error) {
    return FIREBASE_AUTH_ERRORS[error.message];
  }
};

export const handleLoginWithEmailPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { status: FIREBASE_AUTH_SUCCESS };
  } catch (error) {
    return FIREBASE_AUTH_ERRORS[error.message];
  }
};

export const signOutAccount = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    return error.message;
  }
};

export const getUserStatus = () => {
  // try {
  console.log(auth);
  return auth.currentUser;
  // } catch (error) {
  //   return false;
  // }
};

const defaultResponse = {
  user: {
    uid: "",
    email: "",
    emailVerified: true,
    displayName: "",
    isAnonymous: false,
    photoURL: "",
    providerData: [
      {
        providerId: "",
        uid: "",
        displayName: "",
        email: "",
        phoneNumber: null,
        photoURL: "",
      },
    ],
    stsTokenManager: {
      refreshToken: "",
      accessToken: "",
      expirationTime: 1666518157763,
    },
    createdAt: "1666474821227",
    lastLoginAt: "1666514558021",
    apiKey: "",
    appName: "[DEFAULT]",
  },
  providerId: "",
  _tokenResponse: {
    federatedId: "",
    providerId: "",
    email: "",
    emailVerified: true,
    firstName: "",
    fullName: "",
    lastName: "",
    photoUrl: "",
    localId: "",
    displayName: "",
    idToken: "",
    context: "",
    oauthAccessToken: "",
    oauthExpireIn: 3599,
    refreshToken: "",
    expiresIn: "3600",
    oauthIdToken: "",
    rawUserInfo: "",
    kind: "identitytoolkit#VerifyAssertionResponse",
  },
  operationType: "signIn",
};
