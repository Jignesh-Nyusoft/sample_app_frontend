import { createAsyncThunk } from "@reduxjs/toolkit";
import { showToast } from "../../utils/CommonFunctions";
import ApiUtils, { MethodType } from "../../Api/ApiRequest";
import { ApiConstant } from "../../Api/APIConstants";
import { LoginWithOTPAPIRequest, RegisterAPIRequest, SendOTPAPIRequest } from "../types/authTypes";

export const loginWithOTP = createAsyncThunk(
    "loginWithOTP/loginWithOTPRequest",
    async ({
      body,
    }: {
      body: LoginWithOTPAPIRequest
    }) => {
      try {
        const response: any = await ApiUtils({
          method: MethodType.POST,
          route: ApiConstant.LOGIN_WITH_OTP,
          body: body,
        });
        if (response?.data) {
          return response.data;
        }
        return null;
      } catch (error: any) {
        showToast(error.message);
        return;
      }
    }
  );

  export const register = createAsyncThunk(
    "register/registerRequest",
    async ({
      body,
    }: {
      body: RegisterAPIRequest;
    }) => {
      try {
        const response: any = await ApiUtils({
          method: MethodType.POST,
          route: ApiConstant.REGISTER,
          body: body,
        });
        if (response?.data) {
          return response.data;
        }
        return null;
      } catch (error: any) {
        showToast(error.message);
        return;
      }
    }
  );

  export const sendOtp = createAsyncThunk(
    "sendOtp/sendOtpRequest",
    async ({
      body,
    }: {
      body: SendOTPAPIRequest;
    }) => {
      try {
        const response: any = await ApiUtils({
          method: MethodType.POST,
          route: ApiConstant.SEND_OTP,
          body: body,
        });
        if (response?.data) {
          return response.data;
        }
        return null;
      } catch (error: any) {
        showToast(error.message);
        return;
      }
    }
  );  

  export const logOut = createAsyncThunk(
    "logOut/logOutRequest",
    async () => {
      try {
        const response: any = await ApiUtils({
          method: MethodType.GET,
          route: ApiConstant.LOGOUT,
        });
        if (response?.data) {
          return response.data;
        }
        return null;
      } catch (error: any) {
        showToast(error.message);
        return;
      }
    }
  );

  export const loginWithPassword = createAsyncThunk(
    "loginWithPassword/loginWithPasswordRequest",
    async ({
      body,
    }: {
      body: any
    }) => {
      try {
        const response: any = await ApiUtils({
          method: MethodType.POST,
          route: ApiConstant.LOGIN_WITH_PASSWORD,
          body: body,
        });
        if (response?.data) {
          return response.data;
        }
        return null;
      } catch (error: any) {
        showToast(error.message);
        return;
      }
    }
  );

  export const sendOtpEmail = createAsyncThunk(
    "sendOtpEmail/sendOtpEmailRequest",
    async ({
      body,
    }: {
      body: any;
    }) => {
      try {
        const response: any = await ApiUtils({
          method: MethodType.POST,
          route: ApiConstant.SEND_OTP,
          body: body,
        });
        if (response?.data) {
          return response.data;
        }
        return null;
      } catch (error: any) {
        showToast(error.message);
        return;
      }
    }
  );  

  export const forgotPassword = createAsyncThunk(
    "forgotPassword/forgotPasswordRequest",
    async ({
      body,
    }: {
      body: any
    }) => {
      try {
        const response: any = await ApiUtils({
          method: MethodType.POST,
          route: ApiConstant.FORGOT_PASSWORD,
          body: body,
        });
        if (response?.data) {
          return response.data;
        }
        return null;
      } catch (error: any) {
        showToast(error.message);
        return;
      }
    }
  );

  export const changePassword = createAsyncThunk(
    "changePassword/changePasswordRequest",
    async ({
      body,
    }: {
      body: any
    }) => {
      try {
        const response: any = await ApiUtils({
          method: MethodType.POST,
          route: ApiConstant.CHANGE_PASSWORD,
          body: body,
        });
        if (response?.data) {
          return response.data;
        }
        return null;
      } catch (error: any) {
        showToast(error.message);
        return;
      }
    }
  );

  export const verifyEmail = createAsyncThunk(
    "verifyEmail/verifyEmailRequest",
    async ({
      body,
    }: {
      body: any
    }) => {
      try {
        const response: any = await ApiUtils({
          method: MethodType.POST,
          route: ApiConstant.VERIFY_EMAIL,
          body: body,
        });
        if (response?.data) {
          return response.data;
        }
        return null;
      } catch (error: any) {
        showToast(error.message);
        return;
      }
    }
  );