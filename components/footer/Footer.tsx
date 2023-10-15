"use client";
import React from "react";
import { ASSETS } from "../../constants/assets";
import { Avatar } from "@mantine/core";
import { Typography } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { IconBrandLinkedin } from "../components";
export default function Footer() {
  const router = useRouter();
  const currentYear = new Date().getFullYear();
  console.log(currentYear);
  const handleCredits = () => {
    router.push("/credits");
  };
  const handleLinkedin = () => {
    router.push("https://www.linkedin.com/company/tpoiitbhu/");
  };
  return (
    <div className="flex justify-center items-center flex-col mt-8">
      <div className="flex items-start mb-7 md:flex-row flex-col w-full justify-evenly">
        <Avatar
          src={ASSETS.iitbhu_logo}
          size="xl"
          alt="IIT BHU"
          className="mt-4 mb-2"
        />
        <Typography>
          <strong className="font-bold">TRAINING AND PLACEMENT CELL</strong>
          <br />
          Training and Placement Cell, Near Administrative Office
          <br />
          Indian Institute of Technology (BHU), Varanasi - 221005
          <br />
          career.tpc@iitbhu.ac.in | +91-542-7165958 | +91-542-2369162
          <br />
        </Typography>
      </div>
      <div className="font-semibold">DEVELOPED BY</div>
      <div className="font-medium cursor-pointer" onClick={handleCredits}>
        TEAM FROSTIK
      </div>

      <div className="w-full mt-2 flex justify-between items-center md:flex-row flex-col pt-2 border-t-[1px] border-t-[#3F3E45] p-3">
        <p className="font-poppins font-normal  text-[10px] leading-[27px] text text-center">
          Copyright Ⓒ{currentYear} Career Development Program IIT (BHU)
          Varanasi. All Rights Reserved.
        </p>
        <IconBrandLinkedin className="cursor-pointer" onClick={handleLinkedin}/>
      </div>
    </div>
  );
}
