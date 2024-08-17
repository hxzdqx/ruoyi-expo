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
export const setToken = async (token: string) => {
  await setStorageItemAsync(TokenKey, token);
  return Promise.resolve();
};

/**
 * 删除token
 */
export const deleteToken = async () => {
  await deleteStorageItemAsync(TokenKey);
  return Promise.resolve();
};
