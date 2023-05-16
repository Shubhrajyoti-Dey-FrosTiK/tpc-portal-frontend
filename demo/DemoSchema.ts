"use client";

import { Failure, FormBuilder, Success } from "../types/Form";
import { FormInputType, FormType } from "../types/FormType";
import { Validation } from "../types/Validation";

const DemoSchema: FormBuilder = {
  title: "Demo Form",
  description: "This is a form built by fully automated form Builder",
  key: "demoForm",
  sections: [
    {
      title: "Personal Info",
      key: "personalInfo",
      type: FormType.SECTION,
      formElements: [
        {
          label: "First Name",
          key: "firstName",
          type: FormInputType.SHORT_TEXT,
        },
        {
          label: "Middle Name",
          key: "middleName",
          type: FormInputType.SHORT_TEXT,
          visible: {
            props: ["[personalInfo]-[firstName]"],
            validator: (propsList: Array<string>) => {
              const firstName = propsList[0];
              return firstName && firstName.length ? true : false;
            },
          },
        },
        {
          label: "Last Name",
          key: "lastName",
          type: FormInputType.SHORT_TEXT,
          visible: {
            props: [
              "[personalInfo]-[firstName]",
              "[personalInfo]-[middleName]",
            ],
            validator: (propsList: Array<string>) => {
              const firstName = propsList[0];
              const middleName = propsList[1];
              return firstName &&
                firstName.length &&
                middleName &&
                middleName.length
                ? true
                : false;
            },
          },
        },
        {
          label: "Gender",
          key: "gender",
          type: FormInputType.RADIO,
          required: true,
          description: "Choose your gender",
          options: [
            {
              label: "Male",
              key: "male",
            },
            {
              label: "Female",
              key: "female",
            },
          ],
        },
        {
          title: "Schooling",
          key: "school",
          formElements: [
            [
              {
                label: "School Name",
                key: "name",
                type: FormInputType.SHORT_TEXT,
                validation: {
                  props: ["SELF"],
                  validator: (propsList: Array<string>): Success | Failure => {
                    const school = propsList[0];
                    if (school === "IIT BHU")
                      return {
                        validationStatus: Validation.SUCCESS,
                      };
                    else
                      return {
                        validationStatus: Validation.FAILURE,
                        errorMessage: "Sad to see you are not in IIT BHU",
                      };
                  },
                },
              },
            ],
          ],
          type: FormType.REPEATABLE_SECTION,
        },
      ],
    },
    {
      label: "Age",
      key: "age",
      type: FormInputType.NUMBER,
      required: true,
      description: "Enter your age",
      validation: {
        props: ["[age]", "[personalInfo]-[firstName]"],
        validator: (propsArray: Array<string>): Success | Failure => {
          const age: number = Number(propsArray[0]);
          const name: string = propsArray[1];
          if (age > 18 && name === "sd")
            return { validationStatus: Validation.SUCCESS };
          else
            return {
              validationStatus: Validation.FAILURE,
              errorMessage: "Age must be greater than 18",
            };
        },
      },
    },
    {
      label: "Preferred Branch",
      key: "preferredBranch",
      type: FormInputType.CHECKBOX,
      description: "Choose your preferred branch",
      required: true,
      // initialValue: ["ece", "cse"],
      options: [
        {
          label: "circuital",
          key: "circuital",
          value: ["cse", "mnc", "ece", "eee"],
        },
        {
          label: "CSE",
          key: "cse",
        },
        {
          label: "MnC",
          description: "Mathematics and Computing",
          key: "mnc",
        },
        {
          label: "ECE",
          key: "ece",
        },
        {
          label: "EEE",
          key: "eee",
        },
        {
          label: "PHE",
          key: "phe",
        },
      ],
    },
    {
      label: "CTC",
      key: "ctc",
      required: true,
      type: FormInputType.CURRENCY,
      description: "Enter the first year CTC",
    },
    // {
    //   label: "Job Description",
    //   key: "jd",
    //   required: true,
    //   type: FormInputType.FILE,
    //   description: "Attach the JD related to the profile",
    // },
  ],
};

export default DemoSchema;
