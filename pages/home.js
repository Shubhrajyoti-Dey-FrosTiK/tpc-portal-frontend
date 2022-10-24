// Style
import { Button } from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";

// Libraries
import React from "react";

// Firebase
import { signOutAccount } from "../firebase/auth";

function Home() {
  return (
    <div>
      <Typography variant="h1">Home</Typography>
      <Button onClick={signOutAccount}>SIGN OUT</Button>
    </div>
  );
}

export default Home;
