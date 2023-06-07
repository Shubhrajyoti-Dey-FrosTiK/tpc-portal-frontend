import { Avatar, Typography } from "../components";
import React from "react";
import { BarLoader } from "react-spinners";
import iitbhu from "../../assets/logo/Logo.png";
import { ASSETS } from "../../constants/assets";

function Spinner() {
  return (
    <div className="h-full w-full bg-white flex justify-center items-center">
      <div className="text-center flex justify-center flex-col items-center">
        <Avatar src={ASSETS.iitbhu_logo} size="lg" alt="IIT BHU" />
        <Typography className="p-5 text-black" order={3}>
          Training and Placement Cell
        </Typography>
        <BarLoader color={"#701a75"} />
      </div>
    </div>
  );
}

export default Spinner;
