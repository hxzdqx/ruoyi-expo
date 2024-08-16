import { getToken, setToken, deleteToken } from "../utils/auth";
import {
  getStorageItem,
  setStorageItemAsync,
  deleteStorageItemAsync,
} from "../utils/secureStore";
import { Constant } from "../utils/constant";
import { login, getInfo, logout } from "@/src/api/login";
import type { LoginParamType } from "@/src/api/login";
import type { Response } from "@/src/utils/request";
import type { ImageSourcePropType } from "react-native";
export interface User {
  /**
   * token
   */
  token: string | null;
  /**
   * 用户名
   */
  name: string | null;
  /**
   * 头像
   */
  avatar: ImageSourcePropType;
  /**
   * 角色
   */
  roles: string[];
  /**
   * 权限
   */
  permissions: string[];
  /**
   * 登录
   */
  login: (loginInfo: LoginParamType) => Promise<Response>;
  /**
   * 获取用户详细信息
   */
  getInfo: () => Promise<Response>;
  /**
   * 退出
   */
  logout: () => Promise<Response>;
}

const getRoles = () => {
  const _routes = getStorageItem(Constant.ROLES);
  if (_routes) {
    return JSON.parse(_routes);
  } else {
    return [];
  }
};

const getPermissions = () => {
  const _permissions = getStorageItem(Constant.PERMISSIONS);
  if (_permissions) {
    return JSON.parse(_permissions);
  } else {
    return [];
  }
};

const getAvatarLocal = (): ImageSourcePropType => {
  const _avatar = getStorageItem(Constant.AVATAR);
  if (_avatar) {
    if (typeof JSON.parse(_avatar) === "number") {
      console.log("返回固定头像");
      return require("@/src/assets/images/profile.jpg");
    } else {
      return JSON.parse(_avatar);
    }
  } else {
    return require("@/src/assets/images/profile.jpg");
  }
};

const getAvatar = (user: {
  avatar: string | null;
  [key: string]: any;
}): ImageSourcePropType => {
  if (user == null || user.avatar == "" || user.avatar == null) {
    return require("@/src/assets/images/profile.jpg");
  } else {
    return { uri: "https://vue.ruoyi.vip/prod-api" + user.avatar };
  }
};

const userSlice = (set: any, ..._arg: any[]) =>
  ({
    token: getToken(),
    name: getStorageItem(Constant.NAME),
    avatar: getAvatarLocal(),
    roles: getRoles(),
    permissions: getPermissions(),
    // 登录
    login: async (userInfo: LoginParamType) => {
      try {
        const res = await login(userInfo);
        // signIn(res.token);
        // setToken(res.token);
        set({
          token: res.token,
        });
        return Promise.resolve(res);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    // 获取用户信息
    getInfo: async () => {
      try {
        const res = await getInfo();
        const user = res.user;
        const avatar = getAvatar(user);
        const username =
          user == null || user.userName == "" || user.userName == null
            ? ""
            : user.userName;
        setStorageItemAsync(Constant.NAME, username);
        setStorageItemAsync(Constant.AVATAR, JSON.stringify(avatar));
        setStorageItemAsync(
          Constant.ROLES,
          JSON.stringify(res.roles ?? ["ROLE_DEFAULT"])
        );
        setStorageItemAsync(
          Constant.PERMISSIONS,
          JSON.stringify(res.permissions ?? [])
        );
        set({
          name: username,
          avatar: avatar,
          roles: res.roles ?? ["ROLE_DEFAULT"],
          permissions: res.permissions ?? [],
        });
        return Promise.resolve(res);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    logout: async () => {
      try {
        await logout();
        deleteStorageItemAsync(Constant.NAME);
        deleteStorageItemAsync(Constant.AVATAR);
        deleteStorageItemAsync(Constant.ROLES);
        deleteStorageItemAsync(Constant.PERMISSIONS);
        deleteToken();
        set({
          token: "",
          name: "",
          avatar: null,
          roles: [],
          permissions: [],
        });
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    },
  } as User);

export default userSlice;
