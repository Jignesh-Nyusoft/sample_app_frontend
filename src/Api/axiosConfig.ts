import axios from "axios";
import { CONSTANTS } from "../utils/CommonConstants";
import { store } from "../redux/store/store";
import { navigationRef } from "../navigation/RootNavigationFunctions";
/** # create axios interceptor for make https request (Api calling) */
const Axios = axios.create({
  baseURL: CONSTANTS.BASE_URL,
});

Axios.interceptors.request.use(
  async (config) => {
    let { isLoggedIn, userData } = store.getState().authSlice;
    if (isLoggedIn && userData) {
      config.headers.Authorization = "Bearer " + userData.access_token;
    }
    config.headers["Content-Type"] = "multipart/form-data";
    let url = config.url;
    console.log("config.....", {
      ...config.headers,
      ...config.data,
      url,
    });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      originalRequest?.url !== 'login-with-password'
    ) {
      // console.log("error data here", originalRequest?.url)
    //   originalRequest._retry = true;
    //   if (!ConstantVariables.IS_UNAUTHORISED) {
    //     ConstantVariables.IS_UNAUTHORISED = true;
        // store.dispatch(setIsLogin());
        // store.dispatch(setUserData(null));
        // store.dispatch(setFCMToken(null));
        originalRequest._retry = true;

        navigationRef.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      }

    //   Sentry.captureException(error);
      // try {
      // } catch (refreshError) {
      //   return Promise.reject(refreshError);
      // }
    // }
    return Promise.reject(error);
  }
);

export default Axios;
