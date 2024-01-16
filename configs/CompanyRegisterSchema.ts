"use client";

import { Failure, FormBuilder, Success } from "../types/Form";
import { FormInputType, FormType } from "../types/FormType";
import { Validation } from "../types/Validation";


const RecruiterAndCompanyRegisterSchema: FormBuilder = {
  title: "Recruiter and Company Registration",
  description: "Please mention your basic details and the company you belong",
  key: "recruiterAndCompanyRegistration",
  sections: [
    {
      title: "Recruiter Details",
      key: "recruiter",
      type: FormType.SECTION,
      formElements: [
        {
          label: "First Name",
          key: "firstName",
          type: FormInputType.SHORT_TEXT,
          required: true,
        },
        {
          label: "Middle Name",
          key: "middleName",
          type: FormInputType.SHORT_TEXT,
        },
        {
          label: "Last Name",
          key: "lastName",
          type: FormInputType.SHORT_TEXT,
        },
        {
          label: "Gender",
          key: "gender",
          required: true,
          type: FormInputType.RADIO,
          options: [
            {
              label: "Male",
              key: "male",
            },
            {
              label: "Female",
              key: "female",
            },
            {
              label: "Other",
              key: "other",
            },
          ],
        },
        {
          label: "Mobile Number",
          key: "contact",
          type: FormInputType.SHORT_TEXT,
          required: true,
        },
        {
          label: "Alternative Mobile Number",
          key: "alternativeContact",
          type: FormInputType.SHORT_TEXT,
        },
        {
          label: "Email Address",
          description:
            "This will be used as your username in future login sessions and you can also sign in with Google with this email",
          key: "email",
          type: FormInputType.SHORT_TEXT,
          required: true,
        },
        {
          label: "Alternative Email Address",
          key: "alternativeEmail",
          type: FormInputType.SHORT_TEXT,
        },
      ],
    },
    {
      title: "Company Details",
      key: "company",
      type: FormType.SECTION,
      formElements: [
        {
          label: "Company Name",
          key: "name",
          type: FormInputType.SHORT_TEXT,
          required: true,
        },
        {
          label: "Address",
          key: "address",
          type: FormInputType.SHORT_TEXT,
          required: true,
        },
        {
          label: "Company Website",
          key: "website",
          type: FormInputType.SHORT_TEXT,
          required: false,
        },
        {
          label: "Company Turnover",
          key: "turnover",
          type: FormInputType.SHORT_TEXT,
          required: false,
        },
        {
          label: "Category",
          key: "category",
          type: FormInputType.RADIO,
          required: true,
          options: [
            {
              key: "private",
              label: "Private",
            },
            {
              key: "govt",
              label: "Govt",
            },
            {
              key: "psu",
              label: "PSU",
            },
            {
              key: "mnc",
              label: "MNC",
            },
            {
              key: "ngo",
              label: "NGO",
            },
            { key: "startup", label: "Startup" },
          ],
        },
        {
          label: "Sector",
          key: "sector",
          type: FormInputType.RADIO,
          required: true,
          options: [
            {
              label: "Core engg.",
              key: "core",
            },
            {
              label: "Consulting",
              key: "consulting",
            },
            {
              label: "Trading",
              key: "trading",
            },
            {
              label: "IT",
              key: "IT",
            },
            {
              label: "Networking",
              key: "networking",
            },
            {
              label: "Automobile",
              key: "automobile",
            },
            {
              label: "Finance",
              key: "finance",
            },
            {
              label: "Educational",
              key: "educational",
            },
            {
              label: "Analytics",
              key: "analytics",
            },
            {
              label: "Marketing",
              key: "marketing",
            },
            {
              label: "R&D",
              key: "R&D",
            },
            {
              label: "Healthcare",
              key: "healthcare",
            },
            {
              label: "Others",
              key: "others",
            },
          ],
        },
        {
          label: "Company Logo",
          key: "logo",
          required: true,
          type: FormInputType.FILE,
          storagePath: {
            prop: "[company]-[name]",
            path: (companyName: string) => {
              return `companies/${companyName}/logo`;
            },
          },
        },
      ],
    },
    {
      title: "Set your Password",
      key: "passwordCreation",
      description:
        "This will be your password for your upcoming login sessions and your email id will be the username",
      type: FormType.SECTION,
      formElements: [
        {
          label: "New Password",
          key: "password",
          description: "Your password should be at least 6 letters long",
          validation: {
            props: ["[passwordCreation]-[password]"],
            validator: (propsList) => {
              const password = propsList[0];
              return password.length >= 6
                ? {
                    validationStatus: Validation.SUCCESS,
                  }
                : {
                    validationStatus: Validation.FAILURE,
                    errorMessage: "Password must be at least of 6 letters",
                  };
            },
          },
          required: true,
          type: FormInputType.PASSWORD_CREATION,
        },
      ],
    },
  ],
};

export default RecruiterAndCompanyRegisterSchema;
