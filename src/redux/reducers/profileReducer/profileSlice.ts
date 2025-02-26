import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { STATUS_CODES } from "../../../utils/CommonConstants";
import { getProfileData } from "../../actions/profileActions";
import _ from "lodash"
import { MyProfileData } from "../../types/profileTypes";

type SliceState = {
  isLoading: boolean;
  profileData: MyProfileData | null;
 //  unreadMessages: number | null;
};
const profileSlice = createSlice({
  name: "Profile",
  initialState: {
    isLoading: false,
    profileData: null,
   //  unreadMessages: null
  } as SliceState,
  reducers: {
    setProfileData(state, action: PayloadAction<any>) {
        state.profileData = action.payload;
      },
    // setUnreadMessages(state, action: PayloadAction<number>) {
    //     state.unreadMessages = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfileData.fulfilled, (state, action) => {
      
      if (action.payload.status === STATUS_CODES.SUCCESS && action.payload?.data) {
        let data = action.payload?.data;
        state.profileData = _.assign(data)
      }
    });
  }
});

export const { setProfileData } = profileSlice.actions;
export default profileSlice.reducer;
