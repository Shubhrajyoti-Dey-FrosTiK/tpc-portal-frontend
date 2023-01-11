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
            props: ["[personalInfo]-(0)-[firstName]"],
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
              "[personalInfo]-(0)-[firstName]",
              "[personalInfo]-(0)-[middleName]",
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
      initialValue: "8",
      type: FormInputType.SHORT_TEXT,
      required: true,
      description: "Enter your age",
      validation: {
        props: ["[age]", "[personalInfo]-[firstName]"],
        validator: (propsArray: Array<string>): Success | Failure => {
          const age: Number = Number(propsArray[0]);
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
  ],
};

export default DemoSchema;
