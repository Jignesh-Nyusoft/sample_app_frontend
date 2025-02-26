import { createAsyncThunk } from "@reduxjs/toolkit";
import { convertFormData, showToast } from "../../utils/CommonFunctions";
import ApiUtils, { MethodType } from "../../Api/ApiRequest";
import { ApiConstant } from "../../Api/APIConstants";
import { UpdateProfileRequest } from "../types/profileTypes";

export const getWishList = createAsyncThunk(
  "getWishList/getWishListRequest",
  async (page?: number) => {
    try {
      const response: any = await ApiUtils({
        method: MethodType.GET,
        route: page ? `${ApiConstant.GET_WISHIST}?page=${page}` : `${ApiConstant.GET_WISHIST}`,
        isLoading: false,
        isSkeleton: true,
        skeletonName: page ? "wishListPagination" : "wishList"
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

  export const removeFromList = createAsyncThunk(
    "removeFromList/removeFromListRequest",
    async (body: { id: number, isSkeleton?: boolean }) => {
      try {
        const response: any = await ApiUtils({
          method: MethodType.GET,
          route: `${ApiConstant.REMOVE_FROM_WISHIST}/${body.id}`,
          isLoading: !body.isSkeleton,
          isSkeleton: body.isSkeleton,
          skeletonName: "removeFromList"
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

  export const addToWishList = createAsyncThunk(
    "addToWishList/addToWishListRequest",
    async ({
      body,
    }: {
      body: any;
    }) => {
      try {
        const response: any = await ApiUtils({
          method: MethodType.POST,
          route: `${ApiConstant.ADD_TO_WISHIST}`,
          isLoading: false,
          isSkeleton: true,
          body: body,
          skeletonName: "addToWishList",
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

