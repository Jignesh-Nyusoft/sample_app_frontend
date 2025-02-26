import { createAsyncThunk } from "@reduxjs/toolkit";
import { convertFormData, showToast } from "../../utils/CommonFunctions";
import ApiUtils, { MethodType } from "../../Api/ApiRequest";
import { ApiConstant } from "../../Api/APIConstants";
import { UpdateProfileRequest } from "../types/profileTypes";

export const getMyProducts = createAsyncThunk(
  "getMyProducts/getMyProductsRequest",
  async (body: { isApproved: boolean, isRefresh?: boolean, page?: number }) => {
    try {
      const response: any = await ApiUtils({
        method: MethodType.GET,
        route: body?.page ? (body?.isApproved ? `${ApiConstant.GET_MY_PRODUCTS}/approved?page=${body?.page}` : `${ApiConstant.GET_MY_PRODUCTS}?page=${body?.page}`) : (body?.isApproved ? `${ApiConstant.GET_MY_PRODUCTS}/approved` : ApiConstant.GET_MY_PRODUCTS),
        isLoading: false,
        isSkeleton: true,
        skeletonName: body?.page ? "myProductListPagination" :  body?.isRefresh ? "myProductRefresh" : "myProducts"
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

export const deleteMyProduct = createAsyncThunk(
  "deleteMyProduct/deleteMyProductRequest",
  async (id: number) => {
    try {
      const response: any = await ApiUtils({
        method: MethodType.GET,
        route: `${ApiConstant.DELETE_MY_PRODUCT}/${id}`,
        isLoading: false,
        isSkeleton: true,
        skeletonName: "myProducts"
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

export const addNewProduct = createAsyncThunk(
  "addNewProduct/addNewProductRequest",
  async ({
    body,
  }: {
    body: any;
  }) => {
    try {
      const response: any = await ApiUtils({
        method: MethodType.POST,
        route:  body?.product_id ? ApiConstant.EDIT_MY_PRODUCT : ApiConstant.ADD_NEW_PRODUCT,
        body: convertFormData(body),
        isLoading: true,
        isSkeleton: false,
        skeletonName: "addNewProduct"
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

export const getProductDetailsforEdit = createAsyncThunk(
  "getProductDetailsforEdit/getProductDetailsforEditRequest",
  async (id: number) => {
    try {
      const response: any = await ApiUtils({
        method: MethodType.GET,
        route: `${ApiConstant.PRODUCT_DETAILS}/${id}`,
        isLoading: true,
        isSkeleton: false,
        skeletonName: "productDetails",
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

export const deleteProductImage = createAsyncThunk(
  "deleteProductImage/deleteProductImageRequest",
  async (id: number) => {
    try {
      const response: any = await ApiUtils({
        method: MethodType.GET,
        route: `${ApiConstant.DELETE_PRODUCT_IMAGE}/${id}`,
        isLoading: true,
        isSkeleton: false,
        skeletonName: "imageRemove"
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