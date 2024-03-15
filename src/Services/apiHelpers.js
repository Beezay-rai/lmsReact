import axios from "axios";
import { store } from "../redux/store";
const baseUrl = "https://ourlibraryapi.azurewebsites.net/api";

export const urls = {
  courseUrl: `${baseUrl}/Admin/Course`,
  studentUrl: `${baseUrl}/Admin/Student`,
  categoryUrl: `${baseUrl}/Admin/Category`,
  bookUrl: `${baseUrl}/Admin/Book`,
  transactionUrl: `${baseUrl}/Admin/Transaction`,
  commonUrl: `${baseUrl}/Common`,
  dashboardUrl: `${baseUrl}/Dashboard`,
};

export const authApi = async (method, url, data) => {
  let response = await axios({
    method,
    url: `${baseUrl}${url}`,
    data,
  });
  return response.data;
};

export const googleLoginApi = async (method, url, data) => {
  let response = await axios({
    method,
    url: `${baseUrl}${url}`,
    data,
  });
  return response.data;
};

export const googleSignUpApi = async (method, url, data) => {
  let response = await axios({
    method,
    url: `${baseUrl}${url}`,
    data,
  });
  return response.data;
};

export const signUpApi = async (method, url, data) => {
  debugger;
  let response = await axios({
    method,
    url: `${baseUrl}${url}`,
    data,
  });
  return response.data;
};

export const courseApi = async (method, url, data) => {
  const token = store.getState();
  let response = await axios({
    method,
    url: `${urls.courseUrl}${url}`,
    data,
    headers: {
      Authorization: `Bearer ${token.userDetail.user?.data?.token}`,
    },
  });
  return response.data;
};

export const transactionApi = async (method, url, data) => {
  const token = store.getState();
  let response = await axios({
    method,
    url: `${urls.transactionUrl}${url}`,
    data,
    headers: {
      Authorization: `Bearer ${token.userDetail.user?.data?.token}`,
    },
  });
  return response.data;
};

export const bookApi = async (method, url, data) => {
  const token = store.getState();
  let response = await axios({
    method,
    url: `${urls.bookUrl}${url}`,
    data,
    headers: {
      Authorization: `Bearer ${token.userDetail.user?.data?.token}`,
    },
  });
  return response.data;
};

export const studentApi = async (method, url, data) => {
  const token = store.getState();
  let response = await axios({
    method,
    url: `${urls.studentUrl}${url}`,
    data,
    headers: {
      Authorization: `Bearer ${token.userDetail.user?.data?.token}`,
    },
  });
  return response.data;
};
export const dashboardApi = async (method, url, data) => {
  const token = store.getState();
  let response = await axios({
    method,
    url: `${urls.dashboardUrl}${url}`,
    data,
    headers: {
      Authorization: `Bearer ${token.userDetail.user?.data?.token}`,
    },
  });
  return response;
};

export const categoryApi = async (method, url, data) => {
  const token = store.getState();
  let response = await axios({
    method,
    url: `${urls.categoryUrl}${url}`,
    data,
    headers: {
      Authorization: `Bearer ${token.userDetail.user?.data?.token}`,
    },
  });
  return response.data;
};

export const commonApi = async (method, url, data) => {
  const token = store.getState();
  let response = await axios({
    method,
    url: `${urls.commonUrl}${url}`,
    data,
    headers: {
      Authorization: `Bearer ${token.userDetail.user?.data?.token}`,
    },
  });
  return response.data;
};
