import request, { type Response } from "../utils/request";

/**
 * 登录参数
 */
export interface LoginParamType {
  username: string;
  password: string;
  code: string;
  uuid: string;
}

/**
 * 登录
 */
export const login = (data: LoginParamType): Promise<Response> => {
  return request({
    url: "/login",
    headers: {
      isToken: false,
    },
    method: "post",
    data,
  });
};

export interface RegisterParamType extends LoginParamType {
  confirmPassword: string;
}

/**
 * 注册方法
 */
export const register = (data: LoginParamType): Promise<Response> => {
  return request({
    url: "/register",
    headers: {
      isToken: false,
    },
    method: "post",
    data,
  });
};

/**
 * 获取用户详细信息
 */
export const getInfo = (): Promise<Response> => {
  return request({
    url: "/getInfo",
    method: "get",
  });
};

/**
 * 退出
 */
export const logout = () => {
  return request({
    url: "/logout",
    method: "post",
  });
};

/**
 * 获取验证码
 */
export const getCodeImg = (): Promise<Response> => {
  return request({
    url: "/captchaImage",
    headers: {
      isToken: false,
    },
    method: "get",
    timeout: 20000,
  });
};
