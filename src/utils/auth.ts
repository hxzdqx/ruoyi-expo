import {
  getStorageItem,
  setStorageItemAsync,
  deleteStorageItemAsync,
} from "./secureStore";

const TokenKey = "App-Token";

/**
 * 获取token
 * @returns token string
 */
export const getToken = () => {
  return getStorageItem(TokenKey);
};

/**
 * 设置token
 */
export const setToken = (token: string) => {
  setStorageItemAsync(TokenKey, token);
};

/**
 * 删除token
 */
export const deleteToken = () => {
  deleteStorageItemAsync(TokenKey);
};
