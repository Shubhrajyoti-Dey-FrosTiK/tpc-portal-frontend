import React from "react";

import { Button, Typography } from "@material-tailwind/react";
import {
  handleLoginWithGoogle,
  handleLoginWithEmailPassword,
  handleSignUpWithEmailPassword,
  signOutAccount,
} from "../firebase/auth";
import { COLOR } from "../constants/colors";

// Redux
import { selectUserIdToken, setUserToken } from "../store/states/userSlice";
import { useDispatch, useSelector } from "react-redux";

function Test() {
  // Redux State
  const userIdToken = useSelector(selectUserIdToken);

  const handleLoginWithGoogle = async () => {
    await handleLoginWithGoogle();
  };

  const loginWithEmail = async () => {
    const token = await handleLoginWithEmailPassword(
      "tosumandey77@gmail.com",
      "password@1234"
    );
  };

  return (
    <div>
      <Button variant="gradient" ripple={true} onClick={loginWithEmail}>
        Login With Google
      </Button>
      <Button onClick={signOutAccount}>signOut</Button>
      <Typography>{userIdToken}</Typography>
      <div className="helper-firebase-ui"></div>
    </div>
  );
}

export default Test;
