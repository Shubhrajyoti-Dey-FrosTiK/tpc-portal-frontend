import React from "react";

import { Button, Typography } from "@material-tailwind/react";
import { handleLoginWithGoogle } from "../firebase/firebase";
import { COLOR } from "../constants/colors";

// Redux
import { selectUserIdToken, setUserToken } from "../store/states/userSlice";
import { useDispatch, useSelector } from "react-redux";

function Test() {
  // Redux State
  const userIdToken = useSelector(selectUserIdToken);
  console.log(userIdToken);

  const handleLogin = async () => {
    console.log(await handleLoginWithGoogle());
  };
  return (
    <div>
      <Button variant="gradient" ripple={true} onClick={handleLogin}>
        Login With Google
      </Button>
      <Typography>{userIdToken}</Typography>
      <div className="helper-firebase-ui"></div>
    </div>
  );
}

export default Test;
