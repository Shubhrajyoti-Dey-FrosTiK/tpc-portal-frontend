"use client";
import React, { useEffect, useState } from "react";
import Viewer from "../../../../components/form/Viewer";
const mockData = {
    "_id": {
      "$oid": "6465a6d7eb5c748b728d57b5"
    },
    "recruiter": {
      "$oid": "000000000000000000000000"
    },
    "company": {
      "$oid": "000000000000000000000000"
    },
    "alternateHR": [
      {
        "name": "1",
        "contact": "1",
        "email": "1",
        "alternativeContact": "1"
      }
    ],
    "internshipDescription": {
      "profile": "1",
      "jd": "1",
      "expectedHires": 1,
      "internshipDuration": 1,
      "locations": "1",
      "courses": [
        "btech",
        "idd",
        "mtech",
        "phd"
      ],
      "btech": {
        "eligibility": {
          "cgpa": 1,
          "branches": [
            "cer"
          ],
          "ageLimit": 1
        },
        "stipend": {
          "stipendPerMonth": "INR 1",
          "accommodation": "1",
          "relocationBonus": "1",
          "incentives": "1"
        }
      },
      "idd": {
        "eligibility": {
          "cgpa": 1,
          "branches": [
            "bme"
          ],
          "ageLimit": 1
        },
        "stipend": {
          "stipendPerMonth": "INR 1",
          "accommodation": "1",
          "relocationBonus": "1",
          "incentives": "1"
        }
      },
      "mtech": {
        "eligibility": {
          "cgpa": 1,
          "branches": [
            "bme"
          ],
          "ageLimit": 1
        },
        "stipend": {
          "stipendPerMonth": "INR 1",
          "accommodation": "1",
          "relocationBonus": "1",
          "incentives": "1"
        }
      },
      "phd": {
        "eligibility": {
          "cgpa": 1,
          "branches": [
            "bme"
          ],
          "ageLimit": 0
        },
        "stipend": {
          "stipendPerMonth": "INR 1",
          "accommodation": "1",
          "relocationBonus": "1",
          "incentives": "1"
        }
      },
      "jdAttachments": []
    },
    "medical": {
      "colorBlindness": "1",
      "visibility": "1",
      "height": "1",
      "weight": "1",
      "others": "1"
    },
    "selectionProcess": [
      "shortlistFromResume"
    ],
    "processMode": [
      "virtual"
    ],
    "session": "2023-24",
    "isActive": true,
    "raw_key_store": {
      "medical": {
        "colorBlindness": "1",
        "visibility": "1",
        "height": "1",
        "weight": "1",
        "bmi": "1",
        "others": "1"
      },
      "selectionProcess": [
        "shortlistFromResume"
      ],
      "processMode": [
        "virtual"
      ],
      "keyStore": {
        "[internshipDescription]-[idd]-[eligibility]-[cgpa]": 1,
        "[alternateHR]-(0)-[contact]": "1",
        "[internshipDescription]-[jdAttachments]": [],
        "[medical]-[visibility]": "1",
        "[medical]-[weight]": "1",
        "[internshipDescription]-[btech]-[eligibility]-[cgpa]": 1,
        "[internshipDescription]-[btech]-[eligibility]-[branches]": [
          "cer"
        ],
        "[internshipDescription]-[btech]-[eligibility]-[ageLimit]": 1,
        "[internshipDescription]-[mtech]-[eligibility]-[cgpa]": 1,
        "[internshipDescription]-[phd]-[eligibility]-[branches]": [
          "bme"
        ],
        "[internshipDescription]-[phd]-[stipend]-[accommodation]": "1",
        "[internshipDescription]-[idd]-[stipend]-[accommodation]": "1",
        "[internshipDescription]-[idd]-[stipend]-[incentives]": "1",
        "[internshipDescription]-[mtech]-[eligibility]-[branches]": [
          "bme"
        ],
        "[internshipDescription]-[mtech]-[eligibility]-[ageLimit]": 1,
        "[internshipDescription]-[mtech]-[stipend]-[incentives]": "1",
        "[internshipDescription]-[phd]-[eligibility]-[cgpa]": 1,
        "[internshipDescription]-[expectedHires]": 1,
        "[internshipDescription]-[locations]": "1",
        "[internshipDescription]-[phd]-[stipend]-[relocationBonus]": "1",
        "[alternateHR]-(0)-[alternativeContact]": "1",
        "[internshipDescription]-[jd]": "1",
        "[medical]-[height]": "1",
        "[medical]-[others]": "1",
        "[internshipDescription]-[btech]-[stipend]-[accommodation]": "1",
        "[internshipDescription]-[idd]-[stipend]-[relocationBonus]": "1",
        "[internshipDescription]-[mtech]-[stipend]-[stipendPerMonth]": "INR 1",
        "[alternateHR]-(0)-[email]": "1",
        "[selectionProcess]": [
          "shortlistFromResume"
        ],
        "[processMode]": [
          "virtual"
        ],
        "[internshipDescription]-[btech]-[stipend]-[relocationBonus]": "1",
        "[internshipDescription]-[phd]-[stipend]-[incentives]": "1",
        "[internshipDescription]-[phd]-[ageLimit]": 1,
        "[internshipDescription]-[courses]": [
          "btech",
          "idd",
          "mtech",
          "phd"
        ],
        "[medical]-[bmi]": "1",
        "[internshipDescription]-[btech]-[stipend]-[stipendPerMonth]": "INR 1",
        "[internshipDescription]-[idd]-[eligibility]-[branches]": [
          "bme"
        ],
        "[internshipDescription]-[idd]-[stipend]-[stipendPerMonth]": "INR 1",
        "[internshipDescription]-[phd]-[stipend]-[stipendPerMonth]": "INR 1",
        "[alternateHR]-(0)-[name]": "1",
        "[internshipDescription]-[profile]": "1",
        "[internshipDescription]-[mtech]-[stipend]-[accommodation]": "1",
        "[internshipDescription]-[mtech]-[stipend]-[relocationBonus]": "1",
        "[internshipDescription]-[internshipDuration]": 1,
        "[medical]-[colorBlindness]": "1",
        "[internshipDescription]-[btech]-[stipend]-[incentives]": "1",
        "[internshipDescription]-[idd]-[eligibility]-[ageLimit]": 1
      },
      "recruiter": "",
      "company": "",
      "alternateHR": [
        {
          "email": "1",
          "alternativeContact": "1",
          "name": "1",
          "contact": "1"
        }
      ],
      "internshipDescription": {
        "internshipDuration": 1,
        "btech": {
          "eligibility": {
            "cgpa": 1,
            "branches": [
              "cer"
            ],
            "ageLimit": 1
          },
          "stipend": {
            "stipendPerMonth": "INR 1",
            "accommodation": "1",
            "relocationBonus": "1",
            "incentives": "1"
          }
        },
        "jdAttachments": [],
        "profile": "1",
        "jd": "1",
        "courses": [
          "btech",
          "idd",
          "mtech",
          "phd"
        ],
        "idd": {
          "stipend": {
            "stipendPerMonth": "INR 1",
            "accommodation": "1",
            "relocationBonus": "1",
            "incentives": "1"
          },
          "eligibility": {
            "branches": [
              "bme"
            ],
            "ageLimit": 1,
            "cgpa": 1
          }
        },
        "mtech": {
          "eligibility": {
            "ageLimit": 1,
            "cgpa": 1,
            "branches": [
              "bme"
            ]
          },
          "stipend": {
            "stipendPerMonth": "INR 1",
            "accommodation": "1",
            "relocationBonus": "1",
            "incentives": "1"
          }
        },
        "phd": {
          "eligibility": {
            "cgpa": 1,
            "branches": [
              "bme"
            ]
          },
          "stipend": {
            "stipendPerMonth": "INR 1",
            "accommodation": "1",
            "relocationBonus": "1",
            "incentives": "1"
          },
          "ageLimit": 1
        },
        "expectedHires": 1,
        "locations": "1"
      }
    },
    "createdAt": {
      "$date": "2023-05-18T04:17:27.860Z"
    },
    "updatedAt": {
      "$date": "2023-05-18T04:17:27.860Z"
    }
  }

export default function View() {
  return (
    <div>
        <Viewer schema={mockData}/>
    </div>
  );
}
