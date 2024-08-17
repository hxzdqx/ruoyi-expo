import request, { type Response } from "@/src/utils/request";
import type { UserProfile } from "@/src/types/userProfile";

/**
 * 用户密码重置
 * @param oldPassword 旧密码
 * @param newPassword 新密码
 */
export const resetPassword = (
  oldPassword: string,
  newPassword: string
): Promise<Response> => {
  return request({
    url: "/system/user/profile/updatePwd",
    method: "put",
    params: {
      oldPassword,
      newPassword,
    },
  });
};

/**
 * 查询用户个人信息
 */
export const getUserProfile = (): Promise<UserProfile> => {
  return request({
    url: "/system/user/profile",
    method: "get",
  });
};

/**
 * 修改用户个人信息
 */
export const updateUserProfile = (data: any): Promise<Response> => {
  return request({
    url: "/system/user/profile",
    method: "put",
    data,
  });
};

/**
 * 用户头像上传
 */
export const uploadAvatar = (data: any): Promise<Response> => {
  return request({
    url: "/system/user/profile/avatar",
    method: "put",
    data,
  });
};
