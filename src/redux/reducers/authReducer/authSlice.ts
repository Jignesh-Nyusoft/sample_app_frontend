import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginWithOTP, loginWithPassword, logOut, verifyEmail } from "../../actions/authActions";
import { STATUS_CODES } from "../../../utils/CommonConstants";

type SliceState = {
  isLoading: boolean;
  isFirstOpen: boolean | null;
  isLoggedIn: boolean | null;
  userData: any;
  device_token: string | null;
  unreadMessages: number | null;
};
const authSlice = createSlice({
  name: "Auth",
  initialState: {
    isLoading: false,
    isFirstOpen: true,
    isLoggedIn: false,
    userData: null,
    device_token: null,
    unreadMessages: null
  } as SliceState,
  reducers: {
    setFirstOpen(state, action: PayloadAction<boolean>) {
        state.isFirstOpen = action.payload;
      },
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
    setDeviceToken(state, action: PayloadAction<string>) {
      state.device_token = action.payload;
    },
    setUnreadMessages(state, action: PayloadAction<number>) {
      state.unreadMessages = action.payload;
  },
  },
  extraReducers: (builder) => {
    builder.addCase(loginWithOTP.fulfilled, (state, action) => {
      console.log(" setting reducer data ==>", action.payload)
      if (action.payload.status === STATUS_CODES.SUCCESS && action.payload?.data) {
        let data = action.payload?.data;
        state.userData = data;
        state.isLoggedIn = true;
      }
    });
    builder.addCase(loginWithOTP.rejected, (state, action) => {
      state.isLoggedIn = false;
    });
    builder.addCase(loginWithOTP.pending, (state, action) => {
      state.isLoggedIn = false;
    });
    builder.addCase(loginWithPassword.fulfilled, (state, action) => {
      console.log(" setting reducer data ==>", action.payload)
      if (action.payload.status === STATUS_CODES.SUCCESS && action.payload?.data) {
        let data = action.payload?.data;
        if (data?.is_verify === 0) {
          state.isLoggedIn = false;
        } else {
          state.userData = data;
          state.isLoggedIn = true;
        }
      }
    });
    builder.addCase(loginWithPassword.rejected, (state, action) => {
      state.isLoggedIn = false;
    });
    builder.addCase(loginWithPassword.pending, (state, action) => {
      state.isLoggedIn = false;
    });
    builder.addCase(verifyEmail.fulfilled, (state, action) => {
      console.log(" setting reducer data ==>", action.payload)
      if (action.payload.status === STATUS_CODES.SUCCESS && action.payload?.data) {
        let data = action.payload?.data;
        if (data?.is_verify === 0) {
          state.isLoggedIn = false;
        } else {
          state.userData = data;
          state.isLoggedIn = true;
        }
      }
    });
    builder.addCase(verifyEmail.rejected, (state, action) => {
      state.isLoggedIn = false;
    });
    builder.addCase(verifyEmail.pending, (state, action) => {
      state.isLoggedIn = false;
    });
    builder.addCase(logOut.fulfilled, (state, action) => {
      console.log(" setting reducer data ==>", action.payload)
      if (action.payload.status === STATUS_CODES.SUCCESS) {
        let data = action.payload?.data;
        state.userData = null;
        state.isLoggedIn = false;
        state.unreadMessages = null;
      }
    });
  }
});

export const { setFirstOpen, setIsLoggedIn, setDeviceToken, setUnreadMessages } = authSlice.actions;
export default authSlice.reducer;
