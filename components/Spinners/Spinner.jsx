import { Avatar, Typography } from "@material-tailwind/react";
import React from "react";
import { BarLoader } from "react-spinners";
import iitbhu from "../../assets/logo/iitbhu.png";
import { COLOR } from "../../constants/colors";

function Spinner() {
  return (
    <div className="h-full w-full bg-white flex justify-center items-center">
      <div className="text-center flex justify-center flex-col items-center">
        <Avatar src={iitbhu.src} size="lg" alt="IIT BHU" />
        <Typography className="p-5 text-black" variant="h4">
          Training and Placement Cell
        </Typography>
        <BarLoader color={COLOR.TEXT_HEX} />
      </div>
    </div>
  );
}

export default Spinner;
