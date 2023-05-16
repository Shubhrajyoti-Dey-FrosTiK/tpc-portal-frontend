"use client";

import { title } from "process";
import { Failure, FormBuilder, Success } from "../types/Form";
import { FormInputType, FormType } from "../types/FormType";
import { Validation } from "../types/Validation";

const JAFSchema: FormBuilder = {
  title: "Job Announcement Form",
  description:
    "Fill this form to show your interest in hiring full time candidates from our Institute",
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
      title: "Job Description",
      key: "jobDescription",
      type: FormType.SECTION,
      formElements: [
        {
          label: "Profile",
          key: "profile",
          type: FormInputType.SHORT_TEXT,
          required: true,
        },
        {
          label: "Job Description",
          key: "jobDescription",
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
          label: "Tentative Location(s)",
          key: "locations",
          type: FormInputType.SHORT_TEXT,
          required: true,
        },
        {
          label: "JD Attachments (if any)",
          key: "locations",
          type: FormInputType.FILE,
          storagePath: {
            prop: "",
            path: () => {
              return "jd";
            },
          },
        },
      ],
    },

    {
      title: "Eligibility",
      key: "eligibility",
      type: FormType.SECTION,
      description:
        "CGPA must be a value between 0 - 10, XII % must be a value between 0 - 100, X % must be a value between 0 - 100",
      formElements: [
        {
          label: "Eligible Courses",
          key: "courses",
          type: FormInputType.CHECKBOX,
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
          title: "B.Tech Eligibility Criteria",
          key: "btech",
          type: FormType.SECTION,
          visible: {
            props: ["[eligibility]-[courses]"],
            validator: (eligibilityArray: Array<string>) => {
              const eligibility = eligibilityArray[0];
              if (!eligibility) return false;
              return eligibility.includes("btech") ? true : false;
            },
          },
          formElements: [
            {
              label: "CGPA",
              key: "cgpa",
              type: FormInputType.NUMBER,
              required: true,
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
            {
              title: "B.Tech Components Of CTC",
              key: "ctc",
              type: FormType.SECTION,
              formElements: [
                {
                  label: "Total CTC",
                  key: "totalCTC",
                  type: FormInputType.NUMBER,
                },
                {
                  label: "1st Year CTC",
                  key: "firstCTC",
                  type: FormInputType.NUMBER,
                },
                {
                  label: "Fixed Salary",
                  key: "fixedSalary",
                  type: FormInputType.NUMBER,
                },
                {
                  label: "Provident Fund and Gratuity",
                  key: "providentFund",
                  type: FormInputType.NUMBER,
                },
                {
                  label: "Joining Bonus",
                  key: "joiningBonus",
                  type: FormInputType.NUMBER,
                },
                {
                  label: "Relocation Bonus",
                  key: "relocationBonus",
                  type: FormInputType.NUMBER,
                },
                {
                  label: "Patent Bonus",
                  key: "patentBonus",
                  type: FormInputType.NUMBER,
                },
                {
                  label: "Education Reimbursement",
                  key: "educationReimbursement",
                  type: FormInputType.NUMBER,
                },
                {
                  label: "Bonds(if any)",
                  key: "bonds",
                  type: FormInputType.NUMBER,
                },
                {
                  label: "Stocks (with vesting period)",
                  key: "stocks",
                  type: FormInputType.NUMBER,
                },
                {
                  label: "Other Benefits",
                  key: "otherBenefits",
                  type: FormInputType.SHORT_TEXT,
                },
              ],
            },
          ],
        },
        {
          title: "IDD(Btech + Mtech) Eligibility Criteria",
          key: "idd",
          type: FormType.SECTION,
          visible: {
            props: ["[eligibility]-[courses]"],
            validator: (eligibilityArray: Array<string>) => {
              const eligibility = eligibilityArray[0];
              if (!eligibility) return false;
              return eligibility.includes("idd") ? true : false;
            },
          },
          formElements: [
            {
              label: "CGPA",
              key: "cgpa",
              type: FormInputType.NUMBER,
              required: true,
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
            {
              title: "IDD Components Of CTC",
              key: "ctc",
              type: FormType.SECTION,
              formElements: [
                {
                  label: "Total CTC",
                  key: "totalCTC",
                  type: FormInputType.NUMBER,
                },
                {
                  label: "1st Year CTC",
                  key: "firstCTC",
                  type: FormInputType.NUMBER,
                },
                {
                  label: "Fixed Salary",
                  key: "fixedSalary",
                  type: FormInputType.NUMBER,
                },
                {
                  label: "Provident Fund and Gratuity",
                  key: "providentFund",
                  type: FormInputType.NUMBER,
                },
                {
                  label: "Joining Bonus",
                  key: "joiningBonus",
                  type: FormInputType.NUMBER,
                },
                {
                  label: "Relocation Bonus",
                  key: "relocationBonus",
                  type: FormInputType.NUMBER,
                },
                {
                  label: "Patent Bonus",
                  key: "patentBonus",
                  type: FormInputType.NUMBER,
                },
                {
                  label: "Education Reimbursement",
                  key: "educationReimbursement",
                  type: FormInputType.NUMBER,
                },
                {
                  label: "Bonds(if any)",
                  key: "bonds",
                  type: FormInputType.NUMBER,
                },
                {
                  label: "Stocks (with vesting period)",
                  key: "stocks",
                  type: FormInputType.NUMBER,
                },
                {
                  label: "Other Benefits",
                  key: "otherBenefits",
                  type: FormInputType.SHORT_TEXT,
                },
              ],
            },
          ],
        },
        {
          title: "MTech/Msc/Mpharm",
          key: "mtech",
          type: FormType.SECTION,
          visible: {
            props: ["[eligibility]-[courses]"],
            validator: (eligibilityArray: Array<string>) => {
              const eligibility = eligibilityArray[0];
              if (!eligibility) return false;
              return eligibility.includes("mtech") ? true : false;
            },
          },
          formElements: [
            {
              label: "CGPA",
              key: "cgpa",
              type: FormInputType.NUMBER,
              required: true,
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
            {
              title: "M.Tech Components Of CTC",
              key: "ctc",
              type: FormType.SECTION,
              formElements: [
                {
                  label: "Total CTC",
                  key: "totalCTC",
                  type: FormInputType.NUMBER,
                },
                {
                  label: "1st Year CTC",
                  key: "firstCTC",
                  type: FormInputType.NUMBER,
                },
                {
                  label: "Fixed Salary",
                  key: "fixedSalary",
                  type: FormInputType.NUMBER,
                },
                {
                  label: "Provident Fund and Gratuity",
                  key: "providentFund",
                  type: FormInputType.NUMBER,
                },
                {
                  label: "Joining Bonus",
                  key: "joiningBonus",
                  type: FormInputType.NUMBER,
                },
                {
                  label: "Relocation Bonus",
                  key: "relocationBonus",
                  type: FormInputType.NUMBER,
                },
                {
                  label: "Patent Bonus",
                  key: "patentBonus",
                  type: FormInputType.NUMBER,
                },
                {
                  label: "Education Reimbursement",
                  key: "educationReimbursement",
                  type: FormInputType.NUMBER,
                },
                {
                  label: "Bonds(if any)",
                  key: "bonds",
                  type: FormInputType.NUMBER,
                },
                {
                  label: "Stocks (with vesting period)",
                  key: "stocks",
                  type: FormInputType.NUMBER,
                },
                {
                  label: "Other Benefits",
                  key: "otherBenefits",
                  type: FormInputType.SHORT_TEXT,
                },
              ],
            },
          ],
        },
        {
          title: "Phd Eligibility Criteria",
          key: "phd",
          type: FormType.SECTION,
          visible: {
            props: ["[eligibility]-[courses]"],
            validator: (eligibilityArray: Array<string>) => {
              const eligibility = eligibilityArray[0];
              if (!eligibility) return false;
              return eligibility.includes("phd") ? true : false;
            },
          },
          formElements: [
            {
              label: "CGPA",
              key: "cgpa",
              type: FormInputType.NUMBER,
              required: true,
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
            {
              title: "PhD Components Of CTC",
              key: "ctc",
              type: FormType.SECTION,
              formElements: [
                {
                  label: "Total CTC",
                  key: "totalCTC",
                  type: FormInputType.NUMBER,
                },
                {
                  label: "1st Year CTC",
                  key: "firstCTC",
                  type: FormInputType.NUMBER,
                },
                {
                  label: "Fixed Salary",
                  key: "fixedSalary",
                  type: FormInputType.NUMBER,
                },
                {
                  label: "Provident Fund and Gratuity",
                  key: "providentFund",
                  type: FormInputType.NUMBER,
                },
                {
                  label: "Joining Bonus",
                  key: "joiningBonus",
                  type: FormInputType.NUMBER,
                },
                {
                  label: "Relocation Bonus",
                  key: "relocationBonus",
                  type: FormInputType.NUMBER,
                },
                {
                  label: "Patent Bonus",
                  key: "patentBonus",
                  type: FormInputType.NUMBER,
                },
                {
                  label: "Education Reimbursement",
                  key: "educationReimbursement",
                  type: FormInputType.NUMBER,
                },
                {
                  label: "Bonds(if any)",
                  key: "bonds",
                  type: FormInputType.NUMBER,
                },
                {
                  label: "Stocks (with vesting period)",
                  key: "stocks",
                  type: FormInputType.NUMBER,
                },
                {
                  label: "Other Benefits",
                  key: "otherBenefits",
                  type: FormInputType.SHORT_TEXT,
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
          key: "jobDescription",
          type: FormInputType.SHORT_TEXT,
        },
        {
          label: "Visibility",
          key: "hires",
          type: FormInputType.NUMBER,
        },
        {
          label: "Height",
          key: "location",
          type: FormInputType.SHORT_TEXT,
        },
        {
          label: "Weight",
          key: "joiningDate",
          type: FormInputType.SHORT_TEXT,
        },
        {
          label: "BP",
          key: "joiningDate",
          type: FormInputType.SHORT_TEXT,
        },
        {
          label: "BMI",
          key: "joiningDate",
          type: FormInputType.SHORT_TEXT,
        },
        {
          label: "Others",
          key: "joiningDate",
          type: FormInputType.SHORT_TEXT,
        },
      ],
    },

    {
      label: "Selection Process",
      key: "selectionProcess",
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
  ],
};

export default JAFSchema;
