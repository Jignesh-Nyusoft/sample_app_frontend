import { createAsyncThunk } from "@reduxjs/toolkit";
import { convertFormData, showToast } from "../../utils/CommonFunctions";
import ApiUtils, { MethodType } from "../../Api/ApiRequest";
import { ApiConstant } from "../../Api/APIConstants";
import { UpdateProfileRequest } from "../types/profileTypes";

export const getBannerList = createAsyncThunk(
  "getBannerList/getBannerListRequest",
  async () => {
    try {
      const response: any = await ApiUtils({
        method: MethodType.GET,
        route: ApiConstant.GET_BANNER_LIST,
        isLoading: false,
        isSkeleton: true,
        skeletonName: "bannerList"
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

export const getSuitableList = createAsyncThunk(
  "getSuitableList/getSuitableListRequest",
  async () => {
    try {
      const response: any = await ApiUtils({
        method: MethodType.GET,
        route: ApiConstant.GET_SUITABLE_LIST,
        isLoading: false,
        isSkeleton: true,
        skeletonName: "suitableList"
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

  export const getCategoryList = createAsyncThunk(
    "getCategoryList/getCategoryListRequest",
    async () => {
      try {
        const response: any = await ApiUtils({
          method: MethodType.GET,
          route: ApiConstant.GET_CATEGORY_LIST,
          isLoading: false,
          isSkeleton: true,
          skeletonName: "categoryList"
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

  export const getSubCategoryList = createAsyncThunk(
    "getSubCategoryList/getSubCategoryListRequest",
    async (id: number) => {
      try {
        const response: any = await ApiUtils({
          method: MethodType.GET,
          route: `${ApiConstant.GET_SUBCATEGORY_LIST}/${id}`,
          isLoading: false,
          isSkeleton: true,
          skeletonName: "subCategoryList"
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

  export const getFreshFindsList = createAsyncThunk(
    "getFreshFindsList/getFreshFindsListRequest",
    async ({
      body,
      page
    }: {
      body: any;
      page?: any;
    }) => {
      try {
        const response: any = await ApiUtils({
          method: MethodType.POST,
          route: page ? `${ApiConstant.PRODUCT_FILTER}?page=${page}` : `${ApiConstant.PRODUCT_FILTER}`,
          isLoading: false,
          isSkeleton: true,
          body: body,
          skeletonName: page ? "freshFindListPagination" : "freshFindList",
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

  export const getProductList = createAsyncThunk(
    "getProductList/getProductListRequest",
    async ({
      body,
      page
    }: {
      body: any;
      page?: any;
    }) => {
      try {
        console.log("page here", page);
        const response: any = await ApiUtils({
          method: MethodType.POST,
          route: page ? `${ApiConstant.PRODUCT_FILTER}?page=${page}` : `${ApiConstant.PRODUCT_FILTER}`,
          isLoading: false,
          isSkeleton: true,
          body: body,
          skeletonName: page !== undefined ? "productListPagination" : "productList",
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

  export const getAttributeList = createAsyncThunk(
    "getAttributeList/getAttributeListRequest",
    async ({
      body,
      page
    }: {
      body: any;
      page?: any;
    }) => {
      try {
        const response: any = await ApiUtils({
          method: MethodType.GET,
          route: page ? `${ApiConstant.GET_PRODUCT_ATTRIBUTE_LIST}?page=${page}` : `${ApiConstant.GET_PRODUCT_ATTRIBUTE_LIST}`,
          isLoading: false,
          isSkeleton: true,
          body: body,
          skeletonName: page ? "productAttributePagination" : "arrtibuteList",
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

  export const getProductDetails = createAsyncThunk(
    "getProductDetails/getProductDetailsRequest",
    async (id: number) => {
      try {
        const response: any = await ApiUtils({
          method: MethodType.GET,
          route: `${ApiConstant.PRODUCT_DETAILS}/${id}`,
          isLoading: false,
          isSkeleton: true,
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

  export const getSellerInfo = createAsyncThunk(
    "getSellerInfo/getSellerInfoRequest",
    async (id: number) => {
      try {
        const response: any = await ApiUtils({
          method: MethodType.GET,
          route: `${ApiConstant.SELLER_INFO}/${id}`,
          isLoading: false,
          isSkeleton: true,
          skeletonName: "sellerDetails",
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
