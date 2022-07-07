import { AxiosInstance } from "axios";
//make an instance of axios
const axios = require("axios");
const baseUrl = process.env.REACT_APP_API_URL;

export const reqInsSinToken: AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: function (status: any) {
    return status >= 200 && status < 400;
  },
});

export const reqInsConToken: AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: function (status: any) {
    return status >= 200 && status < 500 && status !== 401;
  },
});

//make an interceptor
reqInsSinToken.interceptors.request.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

//make an interceptor with personal token
reqInsConToken.interceptors.request.use(
  function (config: any) {
    config.headers["x-token"] = localStorage.getItem("token");
    return config;
  },
  function (error: any) {
    return Promise.reject(error);
  }
);
