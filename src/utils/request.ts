import axios from "axios";
import type { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";
import { getToken } from "./auth";
axios.defaults.headers["Content-Type"] = "application/json;charset=UTF-8";
// 创建axios实例
const service = axios.create({
  baseURL: "https://vue.ruoyi.vip/prod-api",
  timeout: 10000,
});

// request拦截器
service.interceptors.request.use(
  (config) => {
    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false;
    if (getToken() && !isToken) {
      config.headers["Authorization"] = "Bearer " + getToken();
    }
    return config;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  }
);

// response拦截器
service.interceptors.response.use(
  (res) => {
    if (res.data.code !== 200) {
      return Promise.reject(new Error(res.data.message || "Error"));
    }
    return res.data;
  },
  (error) => {
    console.log("err" + error);
    return Promise.reject(error);
  }
);

export interface Response<T = any> extends AxiosResponse {
  data: T;
  code: number;
  msg: string;
  [key: string]: any;
}

export default service;
