import axios from "axios";
import { store } from "../redux/store";
import { logout, setIsLoading, updateToken } from "../redux/appSlices";
import { checkTokenValidity } from "../util/Utility";

// const baseUrl = "http://my-lms.runasp.net/api";
// // const baseUrl = "https://ourlibraryapi.azurewebsites.net/api";
// // const baseUrl = "https://localhost:8000/api";
const baseUrl = "https://localhost:7098/api";
// const baseUrl = "https://my-lms.runasp.net/api";

export const urls = {
  loginUrl: `${baseUrl}/v1/auth/login`,
  refreshTokenUrl: `${baseUrl}/v1/auth/refresh`,
  signUpUserUrl: `${baseUrl}/v1/users`,
  courseUrl: `${baseUrl}/v1/courses`,
  studentUrl: `${baseUrl}/v1/students`,
  bookCategoryUrl: `${baseUrl}/v1/book-categories`,
  bookUrl: `${baseUrl}/v1/books`,
  transactionUrl: `${baseUrl}/v1/transaction`,
  dashboardUrl: `${baseUrl}/dashboard`,
};

const myAxios = axios.create();

const setUpToken = async () => {
  const userData = store.getState().userDetail;
  const access_token = userData?.user?.access_token;
  const refresh_token = userData?.user?.refresh_token;
  const dispatch = store.dispatch;
  const isAccessTokenValid = checkTokenValidity(access_token);
  const isRefreshTokenValid = checkTokenValidity(refresh_token);
  if (!isAccessTokenValid && isRefreshTokenValid) {
    const response = await refreshTokenApi(refresh_token);
    if (response.access_token) {
      dispatch(updateToken(response));
    } else {
      dispatch(logout());
      window.location.href = "/login";
    }
  } else if (!isAccessTokenValid && !isRefreshTokenValid) {
    dispatch(logout());
    window.location.href = "/login";
  }
};

const apiRequest = async (method, url, data, requiresAuth = false) => {
  const dispatch = store.dispatch;
  if (
    method?.toUpperCase() === "POST" ||
    method?.toUpperCase() === "PUT" ||
    method?.toUpperCase() === "DELETE"
  ) {
    dispatch(setIsLoading(true));
  }

  const config = {
    method,
    url,
    data,
  };
  if (requiresAuth) {
    await setUpToken();
    let token = store.getState().userDetail.user?.access_token;
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    let response = await myAxios(config);
    return response.data;
  } catch (e) {
    return { status: false };
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const authApi = (data) => apiRequest("POST", `${urls.loginUrl}`, data);
export const signUpApi = (data) =>
  apiRequest("POST", `${urls.signUpUserUrl}`, data);
export const googleLoginApi = (method, url, data) =>
  apiRequest(method, `${baseUrl}${url}`, data);
export const googleSignUpApi = (method, url, data) =>
  apiRequest(method, `${baseUrl}${url}`, data);
export const courseApi = (method, url, data) =>
  apiRequest(method, `${urls.courseUrl}${url}`, data, true);
export const transactionApi = (method, url, data) =>
  apiRequest(method, `${urls.transactionUrl}${url}`, data, true);
export const bookApi = (method, url, data) =>
  apiRequest(method, `${urls.bookUrl}${url}`, data, true);
export const studentApi = (method, url, data) =>
  apiRequest(method, `${urls.studentUrl}${url}`, data, true);
export const dashboardApi = (method, url, data) =>
  apiRequest(method, `${urls.dashboardUrl}${url}`, data, true);
export const bookCategoryApi = (method, url = "", data) =>
  apiRequest(method, `${urls.bookCategoryUrl}${url}`, data, true);
export const refreshTokenApi = async (refresh_token) => {
  try {
    const config = {
      method: "POST",
      url: `${urls.refreshTokenUrl}/${refresh_token}`,
    };
    var response = await myAxios(config);
    return response.data;
  } catch (e) {
    console.log("Error in refresh token api", e);
    return null;
  }
};
