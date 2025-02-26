import { createAsyncThunk } from "@reduxjs/toolkit";
import { convertFormData, showToast } from "../../utils/CommonFunctions";
import ApiUtils, { MethodType } from "../../Api/ApiRequest";
import { ApiConstant } from "../../Api/APIConstants";
import { SaveAddressRequest, UpdateProfileRequest } from "../types/profileTypes";

  export const getProfileData = createAsyncThunk(
    "getProfileData/getProfileDataRequest",
    async (showLoader?: boolean) => {
      try {
        const response: any = await ApiUtils({
          method: MethodType.GET,
          route: ApiConstant.GET_PROFILE,
          isLoading: showLoader ? true : false,
          isSkeleton: true,
          skeletonName: "myProfile"
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

  export const updateProfile = createAsyncThunk(
    "updateProfile/updateProfileRequest",
    async ({
      body,
    }: {
      body: UpdateProfileRequest;
    }) => {
      try {
        const response: any = await ApiUtils({
          method: MethodType.POST,
          route: ApiConstant.UPDATE_PROFILE,
          body: convertFormData(body),
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

  export const getSavedAddresses = createAsyncThunk(
    "getSavedAddresses/getSavedAddressesRequest",
    async () => {
      try {
        const response: any = await ApiUtils({
          method: MethodType.GET,
          route: ApiConstant.GET_SAVED_ADDRESS_LIST,
          isLoading: false,
          isSkeleton: true,
          skeletonName: "addressList"
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

  export const saveAddress = createAsyncThunk(
    "saveAddress/saveAddressRequest",
    async ({
      body,
    }: {
      body: SaveAddressRequest;
    }) => {
      try {
        const response: any = await ApiUtils({
          method: MethodType.POST,
          route: body?.address_id ? ApiConstant.UPDATE_ADDRESS : ApiConstant.STORE_ADDRESS,
          body: convertFormData(body),
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

  export const updateAddress = createAsyncThunk(
    "updateAddress/updateAddressRequest",
    async ({
      body,
    }: {
      body: SaveAddressRequest;
    }) => {
      try {
        const response: any = await ApiUtils({
          method: MethodType.POST,
          route: ApiConstant.UPDATE_ADDRESS,
          body: convertFormData(body),
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

  export const deleteAddress = createAsyncThunk(
    "deleteAddress/deleteAddressRequest",
    async (id: number) => {
      try {
        const response: any = await ApiUtils({
          method: MethodType.GET,
          route: `${ApiConstant.DELETE_ADDRESS}/${id}`,
          isLoading: false,
          isSkeleton: true,
          skeletonName: "addressList"
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

  export const contactUs = createAsyncThunk(
    "contactUs/contactUsRequest",
    async ({
      body,
    }: {
      body: any;
    }) => {
      try {
        const response: any = await ApiUtils({
          method: MethodType.POST,
          route: ApiConstant.CONTACT_US,
          body: convertFormData(body),
          isLoading: true
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

  export const getTransactionHistory = createAsyncThunk(
    "getTransactionHistory/getTransactionHistoryRequest",
    async () => {
      try {
        const response: any = await ApiUtils({
          method: MethodType.GET,
          route: ApiConstant.TRANSACTION_HISTORY,
          isLoading: false,
          isSkeleton: true,
          skeletonName: "transactionHistory"
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

  export const getNotificationList = createAsyncThunk(
    "getNotificationList/getNotificationListRequest",
    async (page?: number) => {
      try {
        const response: any = await ApiUtils({
          method: MethodType.GET,
          route: page ? `${ApiConstant.NOTIFICATION_LIST}?page=${page}` : ApiConstant.NOTIFICATION_LIST,
          isLoading: false,
          isSkeleton: true,
          skeletonName: page ? "notificationListPagination" :"notificationList"
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

  export const readNotification = createAsyncThunk(
    "readNotification/readNotificationRequest",
    async (id: number) => {
      try {
        const response: any = await ApiUtils({
          method: MethodType.GET,
          route: `${ApiConstant.READ_NOTIFICATION}/${id}`,
          isLoading: false,
          isSkeleton: true,
          skeletonName: "readNotification"
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

  export const deleteNotification = createAsyncThunk(
    "deleteNotification/deleteNotificationRequest",
    async (id: number) => {
      try {
        const response: any = await ApiUtils({
          method: MethodType.GET,
          route: `${ApiConstant.DELETE_NOTIFICATION}/${id}`,
          isLoading: false,
          isSkeleton: true,
          skeletonName: "notificationList"
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

  export const getCardList = createAsyncThunk(
    "getCardList/getCardListRequest",
    async () => {
      try {
        const response: any = await ApiUtils({
          method: MethodType.GET,
          route: ApiConstant.GET_CARD_LIST,
          isLoading: false,
          isSkeleton: true,
          skeletonName: "cardList"
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

  export const makeDefaultCard = createAsyncThunk(
    "makeDefaultCard/makeDefaultCardRequest",
    async (id: any) => {
      try {
        const response: any = await ApiUtils({
          method: MethodType.GET,
          route: `${ApiConstant.MAKE_DEFAULT_CARD}/${id}`,
          isLoading: false,
          isSkeleton: true,
          skeletonName: "cardList"
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

  export const deleteCard = createAsyncThunk(
    "deleteCard/deleteCardRequest",
    async (id: any) => {
      try {
        const response: any = await ApiUtils({
          method: MethodType.GET,
          route: `${ApiConstant.DELETE_CARD}/${id}`,
          isLoading: false,
          isSkeleton: true,
          skeletonName: "cardList"
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

  export const uploadChatImage = createAsyncThunk(
    "uploadChatImage/uploadChatImageRequest",
    async ({
      body,
    }: {
      body: any;
    }) => {
      try {
        const response: any = await ApiUtils({
          method: MethodType.POST,
          route: `${ApiConstant.UPLOAD_IMAGE}`,
          body: convertFormData(body),
          isLoading: false,
          isSkeleton: true,
          skeletonName: "uploadChatImage"
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

  export const getConnectAccountLink = createAsyncThunk(
    "getConnectAccountLink/getConnectAccountLinkRequest",
    async (showLoader?: boolean) => {
      try {
        const response: any = await ApiUtils({
          method: MethodType.GET,
          route: ApiConstant.CREATE_STRIPE_CONNECT_ACCOUNT_LINK,
          isLoading: showLoader ? true : false,
          isSkeleton: true,
          skeletonName: "getConnectAccountLink"
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

  export const becomeASeller = createAsyncThunk(
    "becomeASeller/becomeASellerRequest",
    async ({
      body,
    }: {
      body: any;
    }) => {
      try {
        const response: any = await ApiUtils({
          method: MethodType.POST,
          route: ApiConstant.BECOME_SELLER,
          body: convertFormData(body),
          isLoading: true
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

  export const changeSellerPickup = createAsyncThunk(
    "changeSellerPickup/changeSellerPickupRequest",
    async (id: any) => {
      try {
        const response: any = await ApiUtils({
          method: MethodType.GET,
          route: `${ApiConstant.CHANGE_PICKUP}/${id}`,
          isLoading: true,
          isSkeleton: false,
          skeletonName: "changePickup"
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

  export const verifyConnectAccount = createAsyncThunk(
    "verifyConnectAccount/verifyConnectAccountRequest",
    async ({
      body,
    }: {
      body: any;
    }) => {
      try {
        const response: any = await ApiUtils({
          method: MethodType.POST,
          route: ApiConstant.VERIFY_CONNECT_ACCOUNT,
          body: convertFormData(body),
          isLoading: true
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

  export const deleteMyAccount = createAsyncThunk(
    "deleteMyAccount/deleteMyAccountRequest",
    async () => {
      try {
        const response: any = await ApiUtils({
          method: MethodType.GET,
          route: ApiConstant.DELETE_MY_ACCOUNT,
          isLoading: true,
          isSkeleton: false,
          skeletonName: "deleteMyAccount"
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