"use client";
import { Failure, FormBuilder, Success } from "../types/Form";
import { FormInputType, FormType } from "../types/FormType";
import { Validation } from "../types/Validation";

const StudentRegisterSchema: FormBuilder = {
  title: "Student Registration Form",
  description:
    "Fill this form to register for internship/placement season",
  key: "srf",
  sections: [{
    title: "Personal Information",
    key: "personalInformation",
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
        label: "Date of Birth",
        key: "dob",
        type: FormInputType.SHORT_TEXT,
        required: true,
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
        label: "Father's Name",
        key: "fatherName",
        type: FormInputType.SHORT_TEXT,
        required: true,
      },
      {
        label: "Father's Occupation",
        key: "fatherOccupation",
        type: FormInputType.SHORT_TEXT,
        required: true,
      },
      {
        label: "Mother's Name",
        key: "motherName",
        type: FormInputType.SHORT_TEXT,
        required: true,
      },
      {
        label: "Mother's Occupation",
        key: "motherOccupation",
        type: FormInputType.SHORT_TEXT,
        required: true,
      },
      {
        label: "Home Address",
        key: "homeAddress",
        type: FormInputType.LONG_TEXT,
        required: true,
      },
      {
        label: "Area Pincode",
        key: "areaPincode",
        validation: {
          props: ["[personalInformation]-[areaPincode]"],
          validator: (propsList) => {
            const pincode = propsList[0];
            console.log(pincode.length)
            return pincode.length == 6 ? {
              validationStatus: Validation.SUCCESS,
            } :
              {
                validationStatus: Validation.FAILURE,
                errorMessage: "Pincode must be of 6 numbers"
              };
          },
        },
        type: FormInputType.SHORT_TEXT,
        required: true,
      },
    ]
  }, {
    title: "Academic Information",
    key: "academicInformation",
    type: FormType.SECTION,
    formElements: [
      {
        label: "Class 10th Percentage",
        key: "class10Percentage",
        required: true,
        type: FormInputType.NUMBER
      },
      {
        label: "Class 12th Percentage",
        key: "class12Percentage",
        required: true,
        type: FormInputType.NUMBER
      },
      {
        label: "Enrolled In",
        key: "enrolledIn",
        type: FormInputType.RADIO,
        required: true,
        options: [{
          label: "Btech",
          key: "btech"
        },
        {
          label: "Idd",
          key: "idd"
        },
        {
          label: "Mtech / Mpharm / Msc",
          key: "mtech/mpharm/msc"
        },
        {
          label: "Phd",
          key: "phd"
        }
        ],
      }, {
        label: "Branch",
        key: "branch",
        required: true,
        type: FormInputType.RADIO,
        visible: {
          props: ["[academicInformation]-[enrolledIn]"],
          validator: (eligibilityArray: Array<string>) => {
            const eligibility = eligibilityArray[0];
            if (!eligibility) return false;
            return eligibility.includes("btech") ? true : false;
          },
        },
        options: [
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
          {
            label: "Architecture Planning and Design",
            key: "arch",
          },
        ],
      },
      {
        label: "Branch",
        key: "branch",
        required: true,
        type: FormInputType.RADIO,
        visible: {
          props: ["[academicInformation]-[enrolledIn]"],
          validator: (eligibilityArray: Array<string>) => {
            const eligibility = eligibilityArray[0];
            if (!eligibility) return false;
            return eligibility.includes("idd") ? true : false;
          },
        },
        options: [{
          label: "Biochemical Engineering",
          key: "bce",
        },
        {
          label: "Biomedical Engineering",
          key: "bme",
        },
        {
          label: "Architecture",
          key: "arch",
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
        label: "Branch",
        key: "branch",
        required: true,
        type: FormInputType.RADIO,
        visible: {
          props: ["[academicInformation]-[enrolledIn]"],
          validator: (eligibilityArray: Array<string>) => {
            const eligibility = eligibilityArray[0];
            if (!eligibility) return false;
            return eligibility.includes("mtech/mpharm/msc") ? true : false;
          },
        },
        options: [{
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
        {
          label: "Decision Science Engineering",
          key: "dse",
        },
        ],
      }, {
        label: "Branch",
        key: "branch",
        required: true,
        type: FormInputType.RADIO,
        visible: {
          props: ["[academicInformation]-[enrolledIn]"],
          validator: (eligibilityArray: Array<string>) => {
            const eligibility = eligibilityArray[0];
            if (!eligibility) return false;
            return eligibility.includes("phd") ? true : false;
          },
        },
        options: [{
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
        }]
      },
      {
        label: "Institute Email Address",
        key: "instituteEmail",
        type: FormInputType.SHORT_TEXT,
        required: true,
      },
      {
        label: "Personal Email Address",
        key: "personalEmail",
        type: FormInputType.SHORT_TEXT,
        required: true,
      },
      {
        label: "Enrollment Year",
        key: "enrollmentYear",
        required: true,
        type: FormInputType.SHORT_TEXT
      },
      {
        label: "Year of Graduation",
        key: "yearofGraduation",
        required: true,
        type: FormInputType.SHORT_TEXT
      },
      {
        label: "Current SPI",
        key: "currentSPI",
        required: true,
        type: FormInputType.NUMBER
      },
      {
        label: "CPI",
        key: "cpi",
        required: true,
        type: FormInputType.NUMBER
      },
    ]
  }, {
    title: "Other Information",
    key: "otherInformation",
    type: FormType.SECTION,
    formElements: [
      {
        label: "Codeforces ID",
        key: "codeforcesId",
        type: FormInputType.SHORT_TEXT,
        required: false,
      },
      {
        label: "CodeChef ID",
        key: "codechefId",
        type: FormInputType.SHORT_TEXT,
        required: false,
      },
      {
        label: "Hackerrank ID",
        key: "hackerrankId",
        type: FormInputType.SHORT_TEXT,
        required: false,
      },
      {
        label: "Kaggle ID",
        key: "kaggleId",
        type: FormInputType.SHORT_TEXT,
        required: false,
      },
      {
        label: "Github URL",
        key: "githubURL",
        type: FormInputType.SHORT_TEXT,
        required: false,
      },
      {
        label: "Gitlab URL",
        key: "gitlabURL",
        type: FormInputType.SHORT_TEXT,
        required: false,
      },
      {
        label: "Linkedin URL",
        key: "linkedinURL",
        type: FormInputType.SHORT_TEXT,
        required: false,
      },
      {
        label: "Area of Interest",
        key: "areaOfInterest",
        type: FormInputType.SHORT_TEXT,
        required: false
      }
    ]
  }]
};

export default StudentRegisterSchema;
