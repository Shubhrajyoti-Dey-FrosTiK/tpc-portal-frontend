"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

// Firebase
import firebase from "firebase/compat/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  Auth,
  User,
} from "firebase/auth";
import { FIREBASE_CONFIG } from "../constants/firebase";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setCurrentUser } from "../store/states/userSlice";
import { PUBLIC_ROUTES } from "../routes";
import axios from "axios";
import {
  selectIdStore,
  updateCompanyRecruiterId,
} from "../store/states/idStore";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathName: string = usePathname() || "";
  const dispatch = useDispatch();
  const UserState = useSelector(selectUser);
  const IdStore = useSelector(selectIdStore);

  const [loggedIn, setLoggedIn] = useState<Boolean>(false);
  const [loginChecked, setLoginChecked] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(true);
  const auth: Auth = getAuth(firebase.initializeApp(FIREBASE_CONFIG));

  const checkAuthState = () => {
    const currentUser = auth.currentUser;
    dispatch(setCurrentUser({ user: currentUser }));

    // If user is not logged in
    if (!currentUser) {
      setLoggedIn(false);
      setLoginChecked(true);
    }
  };

  auth.onAuthStateChanged(async function (user) {
    if (!(pathName in PUBLIC_ROUTES)) {
      // if (!user)  setLoginChecked(false);
      checkAuthState();
    }
  });

  const getIDToken = async () => {
    const idToken = await UserState.currentUser.getIdToken(true);

    let loginState: boolean = false;

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_AUTH_BACKEND}/api/token/verify`,
      {
        headers: {
          token: idToken,
        },
      }
    );

    if (!response.data.error) {
      if (response.data) {
        dispatch(
          updateCompanyRecruiterId({
            companyId: response.data.data["company"],
            recruiterId: response.data.data["_id"],
          })
        );
      }
      setLoggedIn(true);
    } else setLoggedIn(false);
    setLoginChecked(true);
  };

  // Trigger whenever there is a change in the UserState.currentUser
  useEffect(() => {
    if (UserState.currentUser) {
      getIDToken();
    }
  }, [UserState.currentUser]);

  useEffect(() => {
    if (loggedIn && pathName in PUBLIC_ROUTES) router.push("/");
  }, [loggedIn]);

  // Trigger when the full login cycle is completed . Kick out if not logged in
  useEffect(() => {
    if (loginChecked) {
      // Check if the route is public or not
      if (!loggedIn && !(pathName in PUBLIC_ROUTES)) {
        router.push("/register/recruiter");
      } else if (loggedIn && pathName in PUBLIC_ROUTES) {
        router.push("/");
      } else {
        setLoading(false);
      }
    }
  }, [loginChecked]);

  // Trigger whenever path gets changed
  useEffect(() => {
    if (pathName in PUBLIC_ROUTES) {
      setLoading(false);
    }
  }, [pathName]);

  return (
    <>
      {loading ? (
        "Loading ......"
      ) : (
        <>
          {/* {loggedIn ? <h1>Logged In</h1> : <h1>Not Logged In</h1>} */}
          {children}
        </>
      )}
    </>
  );
}
