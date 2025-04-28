import axios from "axios";
import { store } from "../redux/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { logout } from "../redux/appSlices";
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
  studentUrl: `${baseUrl}/v1/student`,
  categoryUrl: `${baseUrl}/v1/categories`,
  bookUrl: `${baseUrl}/v1/books`,
  transactionUrl: `${baseUrl}/v1/transaction`,
  dashboardUrl: `${baseUrl}/dashboard`,
};

const myAxios = axios.create();

myAxios.interceptors.response.use(
  (config) => {
    const token = store.getState().userDetail.user?.access_token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  async (error) => {
    console.log("Error in interceptor", error);
    return Promise.reject(error);
  }
);

const apiRequest = async (method, url, data, requiresAuth = false) => {
  const config = {
    method,
    url,
    data,
  };
  if (requiresAuth) {
    const token = store.getState().userDetail.user?.access_token;
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    let response = await myAxios(config);
    return response.data;
  } catch (e) {
    return null;
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
export const categoryApi = (method, url, data) =>
  apiRequest(method, `${urls.categoryUrl}${url}`, data, true);
export const refreshTokenApi = (refresh_token) =>
  apiRequest("POST", `${urls.refreshTokenUrl}/${refresh_token}`, null, false);
