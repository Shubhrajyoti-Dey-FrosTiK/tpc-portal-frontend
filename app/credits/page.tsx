"use client";
import React from "react";
import { Typography } from "@material-tailwind/react";
import Team from "../../components/creditcomponents/TeamComponent";
import { CreditsDataType } from "../../components/creditcomponents/TeamComponent";
import Footer from "../../components/footer/Footer";

const dummyData: Array<CreditsDataType> = [
  {
    name: "Shubhrajyoti Dey",
    title: "Lead Full Stack Developer and Architect",
    description:
      "Responsible for designing the architecture of the Placement and Internship Portal",
    imgURL:
      "https://drive.google.com/uc?export=view&id=1crf9wjuq9KnYuG7yy0dvRulbWYF63kl5",
    githubURL: "https://github.com/Shubhrajyoti-Dey-FrosTiK",
    linkedinURL: "https://linkedin.com/in/shubhrajyoti-dey-217353201",
    mailID: "toshubhrajyotidey@gmail.com",
  },
  {
    name: "Soumik Dutta",
    title: "Senior Backend Architect",
    description:
      "Responsible for architecture and overall development of backend of the application ",
    imgURL:
      "https://drive.google.com/uc?export=view&id=1WHjaWqc86mwzmhsf5FwSuK1Z4FSSVC45",
    githubURL: "https://github.com/shalearkane",
    linkedinURL: "https://linkedin.com/in/soumik-dutta-a8aab8222",
    mailID: "shalearkane@gmail.com",
  },
  {
    name: "Sakshi Sharan",
    title: "Senior Full Stack Developer",
    description:
      "Responsible for developing the backend and frontend of the application",
    imgURL:
      "https://drive.google.com/uc?export=view&id=1FVkxijrx3Gnxdm_wi19qyFd-nDSobQNh",
    githubURL: "https://github.com/SakshiSharan",
    linkedinURL: "https://linkedin.com/in/sakshi-sharan-90051620a",
    mailID: "sakshisharan9401@gmail.com",
  },
  {
    name: "Vishisht Dubey",
    title: "Junior Frontend Developer",
    description:
      "Responsible for creating the dashboard and other ui components for the portal",
    imgURL:
      "https://drive.google.com/uc?export=view&id=1VDVQjQFAVFpmyXlBgYN8O_BgDEEIs6UG",
    githubURL: "https://github.com/vishisht-dubey",
    linkedinURL: "https://linkedin.com/in/vishisht-dubey-648097228",
    mailID: "vishisht.dubey.phe21@itbhu.ac.in",
  },
  {
    name: "Chirag Goel",
    title: "Junior Frontend Developer",
    description:
      "Responsible for developing the frontend of iaf-jaf portal",
    imgURL:
      "https://drive.google.com/uc?export=view&id=1OmbhQCLrAHQ7uxcybkOI78VXwMlzMEm5",
    githubURL: "https://github.com/chiggshiggs",
    linkedinURL: "https://linkedin.com/in/chirag-goel-087169223",
    mailID: "chirag.goel.mat21@itbhu.ac.in",
  },
  {
    name: "Dev Raj",
    title: "Junior Frontend Developer",
    description:
      "Responsible for developing the frontend of the resume builder application",
    imgURL:
      "https://drive.google.com/uc?export=view&id=1ZL7jVb3tc6Z3AhdWwImuKDFxgCjmQcPq",
    githubURL: "https://github.com/dev-raj-1729",
    linkedinURL: "https://linkedin.com/in/dev-raj-r-24b371228",
    mailID: "dev.rajr.mat20@itbhu.ac.in",
  },
  {
    name: "Shashank Kumar",
    title: "Backend Developer",
    description:
      "Responsible for developing the backend of the resume builder application",
    imgURL:
      "https://drive.google.com/uc?export=view&id=1RrNG2AvJJyjRSzD3mBunkUT4Wa-WC3WP",
    githubURL: "https://github.com/shashankiitbhu",
    linkedinURL: "https://linkedin.com/in/shashank-k-606",
    mailID: "shashank.kumar.phe22@itbhu.ac.in",
  },
];

export default function Credits() {
  return (
    <div className="border-1 border-purple-500 m-5 grid justify-center">
      <div className="mb-4">
        <Typography variant="h1">Credits</Typography>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
        {dummyData &&
          dummyData.map((value: CreditsDataType, key: any) => (
            <Team
              name={value.name}
              title={value.title}
              description={value.description}
              imgURL={value.imgURL}
              linkedinURL={value.linkedinURL}
              githubURL={value.githubURL}
              mailID={value.mailID}
              key={key}
            />
          ))}
      </div>
      <div>
        {/* <Footer /> */}
      </div>
    </div>
  );
}
