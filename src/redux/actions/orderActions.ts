import { createAsyncThunk } from "@reduxjs/toolkit";
import { convertFormData, showToast } from "../../utils/CommonFunctions";
import ApiUtils, { MethodType } from "../../Api/ApiRequest";
import { ApiConstant } from "../../Api/APIConstants";

export const getAllCoupons = createAsyncThunk(
  "getAllCoupons/getAllCouponsRequest",
  async () => {
    try {
      const response: any = await ApiUtils({
        method: MethodType.GET,
        route: ApiConstant.GET_COUPONS,
        isLoading: false,
        isSkeleton: true,
        skeletonName: "getCoupons"
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

export const getOrderSummary = createAsyncThunk(
  "getOrderSummary/getOrderSummaryRequest",
  async ({
    body,
  }: {
    body: any;
  }) => {
    try {
      const response: any = await ApiUtils({
        method: MethodType.POST,
        route: ApiConstant.APPLY_COUPON,
        isLoading: true,
        isSkeleton: true,
        body: convertFormData(body),
        skeletonName: "orderSummary"
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

export const getOrderList = createAsyncThunk(
  "getOrderList/getOrderListRequest",
  async (type: string) => {
    console.log("type here =>", type)
    let newtype = type
    if (type === "Pending") {
      newtype = "processing"
    }
    try {
      const response: any = await ApiUtils({
        method: MethodType.POST,
        route: `${ApiConstant.ORDER_LIST}/${newtype.toLowerCase()}`,
        isLoading: false,
        isSkeleton: true,
        skeletonName: "orderList"
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

export const getOrderDetails = createAsyncThunk(
  "getOrderDetails/getOrderDetailsRequest",
  async (id: number) => {
    try {
      const response: any = await ApiUtils({
        method: MethodType.GET,
        route: `${ApiConstant.ORDER_DETAILS}/${id}`,
        isLoading: false,
        isSkeleton: true,
        skeletonName: "orderDetails"
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

export const createOrder = createAsyncThunk(
  "createOrder/createOrderRequest",
  async ({
    body,
  }: {
    body: any;
  }) => {
    try {
      const response: any = await ApiUtils({
        method: MethodType.POST,
        route:  ApiConstant.CREATE_ORDER,
        body: convertFormData(body),
        isLoading: true,
        isSkeleton: false,
        skeletonName: "createOrder"
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

export const orderCheckout = createAsyncThunk(
  "orderCheckout/orderCheckoutRequest",
  async ({
    body,
  }: {
    body: any;
  }) => {
    try {
      const response: any = await ApiUtils({
        method: MethodType.POST,
        route:  ApiConstant.ORDER_CHECKOUT,
        body: convertFormData(body),
        isLoading: true,
        isSkeleton: false,
        skeletonName: "orderCheckout"
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

export const addReview = createAsyncThunk(
  "addReview/addReviewRequest",
  async ({
    body,
  }: {
    body: any;
  }) => {
    try {
      const response: any = await ApiUtils({
        method: MethodType.POST,
        route:  ApiConstant.ADD_REVIEW,
        body: convertFormData(body),
        isLoading: true,
        isSkeleton: false,
        skeletonName: "addReview"
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

export const getDeliveryOptions = createAsyncThunk(
  "getDeliveryOptions/getDeliveryOptionsRequest",
  async () => {
    try {
      const response: any = await ApiUtils({
        method: MethodType.GET,
        route: ApiConstant.DELIVERY_OPTIONS,
        isLoading: false,
        isSkeleton: true,
        skeletonName: "getDeliveryOptions"
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

export const markAsDelivered = createAsyncThunk(
  "markAsDelivered/markAsDeliveredRequest",
  async (body: {
     id: number, type: string 
  }) => {
    try {
      const response: any = await ApiUtils({
        method: MethodType.GET,
        route: `${ApiConstant.MARK_AS_DELIVERED}/${body.id}/${body.type}`,
        isLoading: true,
        isSkeleton: false,
        skeletonName: "markAsDelivered"
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
