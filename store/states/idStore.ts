import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface IdStore {
  recruiterId: string;
  companyId: string;
}

const initialState: IdStore = {
  recruiterId: "",
  companyId: "",
};

export interface UpdateRecruiterId {
  recruiterId: string;
}

export interface UpdateCompanyId {
  companyId: string;
}

export interface UpdateCompanyRecruiterId {
  recruiterId: string;
  companyId: string;
}

export const idStoreSlice = createSlice({
  name: "idStore",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateRecruiterId: (state, action: PayloadAction<UpdateRecruiterId>) => {
      state.recruiterId = action.payload.recruiterId;
    },

    updateCompanyId: (state, action: PayloadAction<UpdateCompanyId>) => {
      state.companyId = action.payload.companyId;
    },

    updateCompanyRecruiterId: (
      state,
      action: PayloadAction<UpdateCompanyRecruiterId>
    ) => {
      state.recruiterId = action.payload.recruiterId;
      state.companyId = action.payload.companyId;
    },
  },
});

export const { updateRecruiterId, updateCompanyId, updateCompanyRecruiterId } =
  idStoreSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectIdStore = (state: RootState) => state.idStore;

export default idStoreSlice;
