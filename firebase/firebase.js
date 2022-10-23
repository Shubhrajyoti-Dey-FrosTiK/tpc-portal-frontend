import firebase from "firebase/compat/app";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { ERROR } from "../constants/codes.js";

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

export const handleLoginWithGoogle = async () => {
  try {
    const auth = getAuth(firebase.initializeApp(FirebaseCredentials));
    try {
      return await signInWithPopup(auth, provider);
    } catch (error) {
      return { error: error.message };
    }
  } catch (error) {
    // Problem with API key
    return process.env.NODE_ENV.toUpperCase !== "PRODUCTION"
      ? defaultResponse
      : { error: ERROR.API_KEY };
  }
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
