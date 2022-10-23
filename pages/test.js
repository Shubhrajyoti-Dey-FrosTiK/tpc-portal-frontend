import React from "react";

import { Button } from "@material-tailwind/react";
import { handleLoginWithGoogle } from "../firebase/firebase";

function Test() {
  const handleLogin = async () => {
    console.log(await handleLoginWithGoogle());
  };
  return (
    <div>
      <Button onClick={handleLogin}>Login With Google</Button>
      <div className="helper-firebase-ui"></div>
    </div>
  );
}

export default Test;
