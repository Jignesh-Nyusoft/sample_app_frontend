import axios, { AxiosError, AxiosRequestConfig } from "axios";
import NetInfo from "@react-native-community/netinfo";
import { store } from "../redux/store/store";
import { removeSkeletonName, setLoader, setSkeleton, setSkeletonName } from "../redux/reducers/loaderReducer/loaderSlice";
import Axios from "./axiosConfig";
import { showToast } from "../utils/CommonFunctions";
import { LABELS } from "../locales/common";

export enum MethodType {
  POST = "POST",
  GET = "GET",
  DELETE = "DELETE",
  PUT = "PUT",
}

type API_UTILS_PROPS = {
  method: AxiosRequestConfig["method"];
  route: string;
  header?: AxiosRequestConfig["headers"];
  body?: any;
  isLoading?: boolean;
  baseURL?: string;
  manageResponseManually?: boolean;
  isSkeleton?: boolean;
  skeletonName?: string;
};
/** # create a function for Api calling. This function handle all request get, post, put and delete and also give error and response from api */
const ApiUtils = async ({
  method,
  route,
  header,
  body,
  isLoading = true,
  baseURL,
  isSkeleton = false,
  manageResponseManually = false,
  skeletonName = ""
}: API_UTILS_PROPS) => {
  return new Promise(async (resolve, reject) => {
    if (isLoading) {
      store.dispatch(setLoader(true));
    }
    if (isSkeleton) {
      store.dispatch(setSkeleton(true));
      store.dispatch(setSkeletonName(skeletonName));
      console.log(" setting skeleton name", skeletonName)
    }
    const state = await NetInfo.fetch();
    if (!state.isConnected) {
      if (isLoading) {
        store.dispatch(setLoader(false));
      }
      if (isSkeleton) {
        store.dispatch(setSkeleton(false));
        store.dispatch(removeSkeletonName(skeletonName));
        console.log(" removing skeleton name", "")
      }
      throw new Error("No Internet");
    }
    const config: AxiosRequestConfig = {
      method,
      url: route,
    };
    if (baseURL) {
      config.baseURL = baseURL;
    }
    if (header) {
      config.headers = header;
    }
    if (body) {
      config.data = body;
    }
    Axios.request(config)
      .then((response) => {
        if (isLoading) {
          store.dispatch(setLoader(false));
        }
        if (isSkeleton) {
          store.dispatch(setSkeleton(false));
          console.log("removing skeleton ", skeletonName)
          store.dispatch(removeSkeletonName(skeletonName));
        }
        console.log("API Res: ", route, JSON.stringify(response.data));
        resolve(response);
      })
      .catch((error) => {
        // reject(null);

        store.dispatch(setLoader(false));
          store.dispatch(setSkeleton(false));
          console.log("removing skeleton here", skeletonName)
          store.dispatch(removeSkeletonName(skeletonName));
        if (axios.isAxiosError(error)) {
          const axiosError: AxiosError = error;
          console.log(
            "Axios error " , axiosError.response?.data,
            "----",
            axiosError.response,
            "----",
            axiosError.code
          );
          if (axiosError && axiosError.response) {
            const statusCode = axiosError.response.status;
            const responseData: any = axiosError.response.data;
            console.log("statusCode:  ",statusCode,"response error message", responseData?.message )
            if (statusCode === 101 && responseData.message) {
              showToast(responseData.message);
            } else if (statusCode === 403 && responseData) {
              showToast(responseData);
            } else if (statusCode === 500) {
              showToast(LABELS.CommonApiErrors.somethingWentWrong, "error");
            } else if (statusCode == 401) {
              showToast(responseData?.message);
            } else if (responseData) {
                // console.log(" in responsedata", responseData?.message);
              if (responseData?.message) {
                showToast(responseData.message, "error");
              } else if (responseData.errors) {
                showToast(responseData.errors[0], "error");
              }else {
                // showToast(
                //   responseData.message ??
                //     LABELS.CommonApiErrors.errorOccured,
                //   "error"
                // );
              }
              console.log(axiosError.response);
            }
            // showToast(
            //     LABELS.CommonApiErrors.errorOccured,
            //   "error"
            // );
            return axiosError.response;
          } else if (axiosError.request) {
            showToast(
                LABELS.CommonApiErrors.errorOccured,
              "error"
            );
            return axiosError.request;
          } else {
            showToast(
                LABELS.CommonApiErrors.errorOccured,
              "error"
            );
            return axiosError;
          }
        } else {
          showToast(
            LABELS.CommonApiErrors.errorOccured,
            "error"
          );
          return error;
        }
      });
  });
};
export default ApiUtils;
