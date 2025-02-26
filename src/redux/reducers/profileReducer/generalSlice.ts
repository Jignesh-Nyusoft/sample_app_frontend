import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash"

type SliceState = {
  isLoading: boolean;
  cmsData: any | null;
};
const generalSlice = createSlice({
  name: "General",
  initialState: {
    isLoading: false,
    cmsData: null
  } as SliceState,
  reducers: {
    setCmsData(state, action: PayloadAction<any>) {
        state.cmsData = action.payload;
      },
  },
  extraReducers: (builder) => {
    // builder.addCase(getProfileData.fulfilled, (state, action) => {
      
    //   if (action.payload.status === STATUS_CODES.SUCCESS && action.payload?.data) {
    //     let data = action.payload?.data;
    //     state.profileData = _.assign(data)
    //     console.log(" setting profile data ==>", state.profileData)
    //   }
    // });
  }
});

export const { setCmsData } = generalSlice.actions;
export default generalSlice.reducer;
