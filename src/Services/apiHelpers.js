import axios from "axios";
import { store } from "../redux/store";

const baseUrl = "http://my-lms.runasp.net/api";
// // const baseUrl = "https://ourlibraryapi.azurewebsites.net/api";
// // const baseUrl = "https://localhost:8000/api";
// // const baseUrl = "https://localhost:7098/api";
// const baseUrl = "http://my-lms.runasp.net/api";
export const urls = {
  loginUrl: `${baseUrl}/v1/auth/login`,
  signUpUserUrl: `${baseUrl}/v1/users`,
  courseUrl: `${baseUrl}/v1/courses`,
  studentUrl: `${baseUrl}/v1/student`,
  categoryUrl: `${baseUrl}/v1/categories`,
  bookUrl: `${baseUrl}/v1/book`,
  transactionUrl: `${baseUrl}/v1/transaction`,
  dashboardUrl: `${baseUrl}/dashboard`,
};

const apiRequest = async (method, url, data, requiresAuth = false) => {
  const config = {
    method,
    url,
    data,
  };
  if (requiresAuth) {
    const token = store.getState().userDetail.user?.data?.token;
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  let response = await axios(config);
  return response;
};

export const authApi = ( data) => apiRequest("POST", `${baseUrl}${urls.loginUrl}`, data);
export const signUpApi = ( data) => apiRequest("POST", `${baseUrl}${urls.signUpUserUrl}`, data);
export const googleLoginApi = (method, url, data) => apiRequest(method, `${baseUrl}${url}`, data);
export const googleSignUpApi = (method, url, data) => apiRequest(method, `${baseUrl}${url}`, data);
export const courseApi = (method, url, data) => apiRequest(method, `${urls.courseUrl}${url}`, data, true);
export const transactionApi = (method, url, data) => apiRequest(method, `${urls.transactionUrl}${url}`, data, true);
export const bookApi = (method, url, data) => apiRequest(method, `${urls.bookUrl}${url}`, data, true);
export const studentApi = (method, url, data) => apiRequest(method, `${urls.studentUrl}${url}`, data, true);
export const dashboardApi = (method, url, data) => apiRequest(method, `${urls.dashboardUrl}${url}`, data, true);
export const categoryApi = (method, url, data) => apiRequest(method, `${urls.categoryUrl}${url}`, data, true);