import { createAsyncThunk } from "@reduxjs/toolkit";
import { convertFormData, showToast } from "../../utils/CommonFunctions";
import ApiUtils, { MethodType } from "../../Api/ApiRequest";
import { ApiConstant } from "../../Api/APIConstants";

  export const getCmsData = createAsyncThunk(
    "getCmsData/getCmsDataRequest",
    async (slug: string) => {
      try {
        const response: any = await ApiUtils({
          method: MethodType.GET,
          route: `${ApiConstant.CMS_PAGE}/${slug}`,
          isLoading: true,
          isSkeleton: false,
          skeletonName: "general"
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