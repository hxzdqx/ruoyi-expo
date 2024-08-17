import * as SecureStore from "expo-secure-store";
import { isWeb } from "./device";

/**
 * 获取存储项
 */
export function getStorageItem(key: string) {
  if (isWeb) {
    if (!localStorage) return null;
    return localStorage.getItem(key);
  } else {
    return SecureStore.getItem(key);
  }
}
/**
 * 异步设置存储项
 */
export async function setStorageItemAsync(key: string, value: string | null) {
  if (isWeb) {
    if (localStorage) {
      if (value === null) {
        localStorage.removeItem(key);
        return Promise.reject();
      } else {
        localStorage.setItem(key, value);
        return Promise.resolve();
      }
    } else {
      return Promise.reject();
    }
  } else {
    if (value == null) {
      await SecureStore.deleteItemAsync(key);
      return Promise.reject();
    } else {
      await SecureStore.setItemAsync(key, value);
      return Promise.resolve();
    }
  }
}

/**
 * 异步删除存储项
 */
export async function deleteStorageItemAsync(key: string) {
  if (isWeb) {
    if (!localStorage) return null;
    localStorage.removeItem(key);
    return Promise.resolve();
  } else {
    await SecureStore.deleteItemAsync(key);
    return Promise.resolve();
  }
}

/**
 * 异步删除所有存储项
 * web端
 */
export async function deleteAllStorageItemAsync() {
  if (isWeb) {
    if (!localStorage) return null;
    localStorage.clear();
    return Promise.resolve();
  }
}
