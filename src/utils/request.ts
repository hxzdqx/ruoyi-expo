import axios from "axios";
import type { AxiosResponse } from "axios";
import { getToken } from "./auth";
import { Toast } from "@ant-design/react-native";
import { useRouter } from "expo-router";
import { deleteToken } from "@/src/utils/auth";
import { Constant } from "@/src/utils/constant";
import { deleteStorageItemAsync } from "@/src/utils/secureStore";

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
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200;
    // 二进制数据则直接返回
    if (
      res.request.responseType === "blob" ||
      res.request.responseType === "arraybuffer"
    ) {
      return res.data;
    }
    if (code === 401) {
      Toast.fail("登录过期, 请重新登录");
      Promise.all([
        deleteToken(),
        deleteStorageItemAsync(Constant.PERMISSIONS),
        deleteStorageItemAsync(Constant.ROLES),
        deleteStorageItemAsync(Constant.NAME),
        deleteStorageItemAsync(Constant.AVATAR),
      ])
        .then(() => {
          useRouter().replace("/sign-in");
        })
        .catch((error) => {
          console.log(error);
        });
      return Promise.reject("登录过期, 请重新登录");
    }
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
