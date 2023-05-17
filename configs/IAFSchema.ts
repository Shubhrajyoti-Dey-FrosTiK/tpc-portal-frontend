"use client";

import { title } from "process";
import { Failure, FormBuilder, Success } from "../types/Form";
import { FormInputType, FormType } from "../types/FormType";
import { Validation } from "../types/Validation";

const IAFSchema: FormBuilder = {
  title: "Internship Announcement Form",
  description:
    "Fill this form to show your interest in hiring intern candidates from our Institute",
  key: "iaf",
  sections: [
    {
      title: "Alternate HR Contact Information",
      key: "alternateHR",
      type: FormType.REPEATABLE_SECTION,
      formElements: [
        [
          {
            label: "Name",
            key: "name",
            type: FormInputType.SHORT_TEXT,
          },
          {
            label: "Mobile",
            key: "mobile",
            type: FormInputType.SHORT_TEXT,
          },
          {
            label: "Email",
            key: "email",
            type: FormInputType.SHORT_TEXT,
          },
          {
            label: "Phone",
            key: "phone",
            type: FormInputType.SHORT_TEXT,
          },
        ],
      ],
    },
    {
      title: "Internship Description",
      key: "internshipDescription",
      type: FormType.SECTION,
      formElements: [
        {
          label: "Profile",
          key: "profile",
          type: FormInputType.SHORT_TEXT,
          required: true,
        },
        {
          label: "Internship Description",
          key: "jd",
          type: FormInputType.LONG_TEXT,
          required: true,
        },
        {
          label: "No of Expected Hires",
          key: "expectedHires",
          type: FormInputType.NUMBER,
          required: true,
        },
        {
          label: "Internship Duration",
          key: "internshipDuration",
          description:
            "Please enter the number of weeks the Internship will span for",
          type: FormInputType.NUMBER,
          required: true,
        },
        {
          label: "Tentative Location(s)",
          key: "locations",
          type: FormInputType.SHORT_TEXT,
          required: true,
        },
        {
          label: "JD Attachments (if any)",
          key: "jdAttachments",
          type: FormInputType.FILE,
          storagePath: {
            prop: "",
            path: () => {
              return "jd";
            },
          },
        },
        {
          label: "Eligible Courses",
          key: "courses",
          type: FormInputType.CHECKBOX,
          required: true,
          options: [
            {
              label: "B.Tech",
              description: "4 Year Bachelors in Technology",
              key: "btech",
            },
            {
              label: "IDD",
              description: "5 Yr Integrated B.Tech + M.Tech",
              key: "idd",
            },
            {
              label: "M.Tech",
              description: "2 Yr Masters in Technology",
              key: "mtech",
            },
            {
              label: "PhD",
              key: "phd",
            },
          ],
        },

        {
          title: "",
          key: "btech",
          type: FormType.SECTION,
          visible: {
            props: ["[internshipDescription]-[courses]"],
            validator: (eligibilityArray: Array<string>) => {
              const eligibility = eligibilityArray[0];
              if (!eligibility) return false;
              return eligibility.includes("btech") ? true : false;
            },
          },
          formElements: [
            {
              title: "B.Tech Eligibility Criteria",
              key: "eligibility",
              type: FormType.SECTION,
              formElements: [
                {
                  label: "CGPA",
                  key: "cgpa",
                  type: FormInputType.NUMBER,
                  required: true,
                  description: "CGPA must be a number between 0 - 10",
                  max: 10,
                  min: 9,
                },
                {
                  label: "Eligible Branches",
                  key: "branches",
                  required: true,
                  type: FormInputType.CHECKBOX,
                  options: [
                    {
                      label: "All",
                      key: "all",
                      value: [
                        "cer",
                        "che",
                        "civ",
                        "cse",
                        "ece",
                        "eee",
                        "mec",
                        "met",
                        "min",
                        "phe",
                      ],
                    },
                    {
                      label: "Ceramic Engineering",
                      key: "cer",
                    },
                    {
                      label: "Chemical Engineering",
                      key: "che",
                    },
                    {
                      label: "Civil Engineering",
                      key: "civ",
                    },
                    {
                      label: "Computer Science and Engineering",
                      key: "cse",
                    },
                    {
                      label: "Electronics Engineering",
                      key: "ece",
                    },
                    {
                      label: "Electrical Engineering",
                      key: "eee",
                    },
                    {
                      label: "Mechanical Engineering",
                      key: "mec",
                    },
                    {
                      label: "Metallurgical Engineering",
                      key: "met",
                    },
                    {
                      label: "Mining Engineering",
                      key: "min",
                    },
                    {
                      label: "Pharmaceutical Engineering",
                      key: "phe",
                    },
                  ],
                },
              ],
            },
            {
              title: "B.Tech Stipend Details",
              key: "stipend",
              type: FormType.SECTION,
              formElements: [
                {
                  label: "Stipend Per Month",
                  key: "stipendPerMonth",
                  type: FormInputType.CURRENCY,
                  required: true,
                },
                {
                  label: "Accommodation",
                  key: "accommodation",
                  type: FormInputType.SHORT_TEXT,
                  required: true,
                },
                {
                  label: "Relocation Bonus",
                  key: "relocationBonus",
                  type: FormInputType.SHORT_TEXT,
                  required: true,
                },
                {
                  label: "Incentives/Perks/Bonus",
                  key: "incentives",
                  type: FormInputType.SHORT_TEXT,
                  required: true,
                },
              ],
            },
          ],
        },
        {
          title: "",
          key: "idd",
          type: FormType.SECTION,
          visible: {
            props: ["[internshipDescription]-[courses]"],
            validator: (eligibilityArray: Array<string>) => {
              const eligibility = eligibilityArray[0];
              if (!eligibility) return false;
              return eligibility.includes("idd") ? true : false;
            },
          },
          formElements: [
            {
              title: "IDD Eligibility Criteria",
              key: "eligibility",
              type: FormType.SECTION,
              formElements: [
                {
                  label: "CGPA",
                  key: "cgpa",
                  type: FormInputType.NUMBER,
                  required: true,
                  description: "CGPA must be a number between 0 - 10",
                  max: 10,
                  min: 9,
                },
                {
                  label: "Eligible Branches",
                  key: "branches",
                  required: true,
                  type: FormInputType.CHECKBOX,
                  options: [
                    {
                      label: "All",
                      key: "all",
                      value: [
                        "bce",
                        "bme",
                        "cer",
                        "civ",
                        "cse",
                        "eee",
                        "phy",
                        "chy",
                        "mst",
                        "mat",
                        "mec",
                        "met",
                        "min",
                        "phe",
                      ],
                    },
                    {
                      label: "Biochemical Engineering",
                      key: "bce",
                    },
                    {
                      label: "Biomedical Engineering",
                      key: "bme",
                    },
                    {
                      label: "Ceramic Engineering",
                      key: "cer",
                    },
                    {
                      label: "Civil Engineering",
                      key: "civ",
                    },
                    {
                      label: "Computer Science and Engineering",
                      key: "cse",
                    },
                    {
                      label: "Electrical Engineering",
                      key: "eee",
                    },
                    {
                      label: "Department of Physics",
                      key: "phy",
                    },
                    {
                      label: "Department of Chemistry",
                      key: "chy",
                    },
                    {
                      label: "Material Science and Technology",
                      key: "mst",
                    },
                    {
                      label: "Department of Mathematical Sciences",
                      key: "mat",
                    },
                    {
                      label: "Mechanical Engineering",
                      key: "mec",
                    },
                    {
                      label: "Metallurgical Engineering",
                      key: "met",
                    },
                    {
                      label: "Mining Engineering",
                      key: "min",
                    },
                    {
                      label: "Pharmaceutical Engineering",
                      key: "phe",
                    },
                  ],
                },
              ],
            },
            {
              title: "IDD Stipend Details",
              key: "stipend",
              type: FormType.SECTION,
              formElements: [
                {
                  label: "Stipend Per Month",
                  key: "stipendPerMonth",
                  type: FormInputType.CURRENCY,
                  required: true,
                },
                {
                  label: "Accommodation",
                  key: "accommodation",
                  type: FormInputType.SHORT_TEXT,
                  required: true,
                },
                {
                  label: "Relocation Bonus",
                  key: "relocationBonus",
                  type: FormInputType.SHORT_TEXT,
                  required: true,
                },
                {
                  label: "Incentives/Perks/Bonus",
                  key: "incentives",
                  type: FormInputType.SHORT_TEXT,
                  required: true,
                },
              ],
            },
          ],
        },
        {
          title: "",
          key: "mtech",
          type: FormType.SECTION,
          visible: {
            props: ["[internshipDescription]-[courses]"],
            validator: (eligibilityArray: Array<string>) => {
              const eligibility = eligibilityArray[0];
              if (!eligibility) return false;
              return eligibility.includes("mtech") ? true : false;
            },
          },
          formElements: [
            {
              title: "M.Tech Eligibility Criteria",
              key: "eligibility",
              type: FormType.SECTION,
              formElements: [
                {
                  label: "CGPA",
                  key: "cgpa",
                  type: FormInputType.NUMBER,
                  required: true,
                  description: "CGPA must be a number between 0 - 10",
                  max: 10,
                  min: 9,
                },
                {
                  label: "Eligible Branches",
                  key: "branches",
                  required: true,
                  type: FormInputType.CHECKBOX,
                  options: [
                    {
                      label: "All",
                      key: "all",
                      value: [
                        "bce",
                        "bme",
                        "cer",
                        "che",
                        "civ",
                        "cse",
                        "ece",
                        "eee",
                        "phy",
                        "chy",
                        "mst",
                        "mat",
                        "mec",
                        "met",
                        "min",
                        "phe",
                      ],
                    },
                    {
                      label: "Biochemical Engineering",
                      key: "bce",
                    },
                    {
                      label: "Biomedical Engineering",
                      key: "bme",
                    },
                    {
                      label: "Ceramic Engineering",
                      key: "cer",
                    },
                    {
                      label: "Chemical Engineering",
                      key: "che",
                    },
                    {
                      label: "Civil Engineering",
                      key: "civ",
                    },
                    {
                      label: "Computer Science and Engineering",
                      key: "cse",
                    },
                    {
                      label: "Electronics Engineering",
                      key: "ece",
                    },
                    {
                      label: "Electrical Engineering",
                      key: "eee",
                    },
                    {
                      label: "Department of Physics",
                      key: "phy",
                    },
                    {
                      label: "Department of Chemistry",
                      key: "chy",
                    },
                    {
                      label: "Material Science and Technology",
                      key: "mst",
                    },
                    {
                      label: "Department of Mathematical Sciences",
                      key: "mat",
                    },
                    {
                      label: "Mechanical Engineering",
                      key: "mec",
                    },
                    {
                      label: "Metallurgical Engineering",
                      key: "met",
                    },
                    {
                      label: "Mining Engineering",
                      key: "min",
                    },
                    {
                      label: "Pharmaceutical Engineering",
                      key: "phe",
                    },
                  ],
                },
              ],
            },
            {
              title: "M.Tech Stipend Details",
              key: "stipend",
              type: FormType.SECTION,
              formElements: [
                {
                  label: "Stipend Per Month",
                  key: "stipendPerMonth",
                  type: FormInputType.CURRENCY,
                  required: true,
                },
                {
                  label: "Accommodation",
                  key: "accommodation",
                  type: FormInputType.SHORT_TEXT,
                  required: true,
                },
                {
                  label: "Relocation Bonus",
                  key: "relocationBonus",
                  type: FormInputType.SHORT_TEXT,
                  required: true,
                },
                {
                  label: "Incentives/Perks/Bonus",
                  key: "incentives",
                  type: FormInputType.SHORT_TEXT,
                  required: true,
                },
              ],
            },
          ],
        },
        {
          title: "",
          key: "phd",
          type: FormType.SECTION,
          visible: {
            props: ["[internshipDescription]-[courses]"],
            validator: (eligibilityArray: Array<string>) => {
              const eligibility = eligibilityArray[0];
              if (!eligibility) return false;
              return eligibility.includes("phd") ? true : false;
            },
          },
          formElements: [
            {
              title: "PhD Eligibility Criteria",
              key: "eligibility",
              type: FormType.SECTION,
              formElements: [
                {
                  label: "CGPA",
                  key: "cgpa",
                  type: FormInputType.NUMBER,
                  required: true,
                  description: "CGPA must be a number between 0 - 10",
                  max: 10,
                  min: 9,
                },
                {
                  label: "Eligible Branches",
                  key: "branches",
                  required: true,
                  type: FormInputType.CHECKBOX,
                  options: [
                    {
                      label: "All",
                      key: "all",
                      value: [
                        "bce",
                        "bme",
                        "cer",
                        "che",
                        "civ",
                        "cse",
                        "ece",
                        "eee",
                        "phy",
                        "chy",
                        "mst",
                        "mat",
                        "mec",
                        "met",
                        "min",
                        "phe",
                      ],
                    },
                    {
                      label: "Biochemical Engineering",
                      key: "bce",
                    },
                    {
                      label: "Biomedical Engineering",
                      key: "bme",
                    },
                    {
                      label: "Ceramic Engineering",
                      key: "cer",
                    },
                    {
                      label: "Chemical Engineering",
                      key: "che",
                    },
                    {
                      label: "Civil Engineering",
                      key: "civ",
                    },
                    {
                      label: "Computer Science and Engineering",
                      key: "cse",
                    },
                    {
                      label: "Electronics Engineering",
                      key: "ece",
                    },
                    {
                      label: "Electrical Engineering",
                      key: "eee",
                    },
                    {
                      label: "Department of Physics",
                      key: "phy",
                    },
                    {
                      label: "Department of Chemistry",
                      key: "chy",
                    },
                    {
                      label: "Material Science and Technology",
                      key: "mst",
                    },
                    {
                      label: "Department of Mathematical Sciences",
                      key: "mat",
                    },
                    {
                      label: "Mechanical Engineering",
                      key: "mec",
                    },
                    {
                      label: "Metallurgical Engineering",
                      key: "met",
                    },
                    {
                      label: "Mining Engineering",
                      key: "min",
                    },
                    {
                      label: "Pharmaceutical Engineering",
                      key: "phe",
                    },
                  ],
                },
              ],
            },
            {
              title: "PhD Stipend details",
              key: "stipend",
              type: FormType.SECTION,
              formElements: [
                {
                  label: "Stipend Per Month",
                  key: "stipendPerMonth",
                  type: FormInputType.CURRENCY,
                  required: true,
                },
                {
                  label: "Accommodation",
                  key: "accommodation",
                  type: FormInputType.SHORT_TEXT,
                  required: true,
                },
                {
                  label: "Relocation Bonus",
                  key: "relocationBonus",
                  type: FormInputType.SHORT_TEXT,
                  required: true,
                },
                {
                  label: "Incentives/Perks/Bonus",
                  key: "incentives",
                  type: FormInputType.SHORT_TEXT,
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },

    {
      title: "Medical Requirements(if any)",
      key: "medical",
      type: FormType.SECTION,
      formElements: [
        {
          label: "Color Blindness",
          key: "colorBlindness",
          type: FormInputType.SHORT_TEXT,
        },
        {
          label: "Visibility",
          key: "visibility",
          type: FormInputType.SHORT_TEXT,
        },
        {
          label: "Height",
          key: "height",
          type: FormInputType.SHORT_TEXT,
        },
        {
          label: "Weight",
          key: "weight",
          type: FormInputType.SHORT_TEXT,
        },
        {
          label: "BMI",
          key: "bmi",
          type: FormInputType.SHORT_TEXT,
        },
        {
          label: "Others",
          key: "others",
          type: FormInputType.SHORT_TEXT,
        },
      ],
    },

    {
      label: "Selection Process",
      key: "selectionProcess",
      required: true,
      type: FormInputType.CHECKBOX,
      options: [
        {
          label: "Shortlist from resumes",
          key: "shortlistFromResume",
        },
        {
          label: "Written Test",
          key: "writtenTest",
        },
        {
          label: "Online Test",
          key: "onlineTest",
        },
        {
          label: "Group Discussion",
          key: "gd",
        },
        {
          label: "Personal Interview",
          key: "personalInterview",
        },
      ],
    },
    {
      label: "Campus process mode",
      required: true,
      key: "processMode",
      type: FormInputType.CHECKBOX,
      options: [
        {
          label: "Virtual",
          description: "All Processes are conducted online",
          key: "virtual",
        },
        {
          label: "Offline",
          description: "All processes are conducted in campus",
          key: "offline",
        },
        {
          label: "Hybrid",
          description:
            "Some processes is conducted in online mode and some in campus",
          key: "hybrid",
        },
        {
          label: "Undecided",
          key: "undecided",
        },
      ],
    },
  ],
};

export default IAFSchema;
