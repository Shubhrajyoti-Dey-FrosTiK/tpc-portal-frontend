import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type Link = {
  linkURL: string;
  linkText: string;
};

type TimePeriod = {
  startDate: string;
  endDate: string;
  isOngoing: boolean;
};

export interface Education {
  timePeriod: TimePeriod;
  institution: string;
  location: string;
  course: string;
  degree: string;
  maximumGPA: number;
  marksOrCGPA: number;
  details: Array<string>;
}

export interface Project {
  projectName: string;
  timePeriod: TimePeriod;
  links: Array<Link>;
  content: Array<string>;
}

export interface PositionsOfResponsibility {
  position: string;
  responsibilities: Array<string>;
  timePeriod: TimePeriod;
}

export interface ProfileLink {
  link: Link;
  icon?: string;
}

export interface ResearchExperience {
  projectTitle: string;
  institute: string;
  location: string;
  projectAdvisor: string;
  TimePeriod: TimePeriod;
  details: Array<string>;
}

export interface Skill {
  skillType: string;
  skillItems: Array<string>;
}

export interface WorkExperience {
  organization: string;
  role: string;
  TimePeriod: TimePeriod;
  links: Array<Link>;
  details: Array<string>;
}

export interface Resume {
  achievements: Array<string>;
  education: Array<Education>;
  extraCurricular: Array<string>;
  projects: Array<Project>;
  positionsOfResponsibility: Array<PositionsOfResponsibility>;
  profileLinks: Array<ProfileLink>;
  researchExperience: Array<ResearchExperience>;
  skills: Array<Skill>;
  workExperience: Array<WorkExperience>;
}

export interface ResumeState {
  resume: Resume;
  resumeFields: Resume;
}

const initialState: ResumeState = {
  resume: {
    achievements: [],
    education: [],
    extraCurricular: [],
    projects: [],
    positionsOfResponsibility: [],
    profileLinks: [],
    researchExperience: [],
    skills: [],
    workExperience: [],
  },
  resumeFields: {
    achievements: [],
    education: [],
    extraCurricular: [],
    projects: [],
    positionsOfResponsibility: [],
    profileLinks: [],
    researchExperience: [],
    skills: [],
    workExperience: [],
  },
};

export interface UpdateResume {
  resume: Resume;
}

export interface AddProfileLink {
  profileLink: ProfileLink;
}

export interface UpdateProfileLink {
  profileLink: ProfileLink;
  index: number;
}

export const resumeSlice = createSlice({
  name: "resume",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateResume: (state, action: PayloadAction<UpdateResume>) => {
      state.resume = action.payload.resume;
    },

    addProfileLinksField: (state, action: PayloadAction<AddProfileLink>) => {
      state.resumeFields.profileLinks.push(action.payload.profileLink);
    },

    updateProfileLinksField: (
      state,
      action: PayloadAction<UpdateProfileLink>
    ) => {
      state.resumeFields.profileLinks[action.payload.index] =
        action.payload.profileLink;
    },

    removeProfileLinksField: (
      state,
      action: PayloadAction<{ index: number }>
    ) => {
      state.resumeFields.profileLinks.splice(action.payload.index, 1);
    },

    updateResumeFields: (state, action: PayloadAction<UpdateResume>) => {
      state.resumeFields = action.payload.resume;
    },
  },
});

export const { updateResume, updateResumeFields } = resumeSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectResume = (state: RootState) => state.resume;

export default resumeSlice;
