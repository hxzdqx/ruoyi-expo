import { Platform } from "react-native";
import * as Device from "expo-device";

interface DeviceInfo {
  /**
   * 设备名称
   */
  deviceName: string | null;
  /**
   * 设备类型
   */
  deviceType: Device.DeviceType | null;
  /**
   * 设备的设备年份类别
   */
  deviceYearClass: number | null;
  /**
   * 是否为真实设备
   */
  isDevice: boolean;
  /**
   * 产品或硬件的实际设备制造商
   */
  manufacturer: string | null;
  /**
   * 设备型号的人性化名称
   */
  modelName: string | null;
  /**
   * 操作系统的生成ID
   */
  osBuildId: string | null;
  /**
   * 操作系统的名称
   */
  osName: string | null;
  /**
   * 操作系统的版本
   */
  osVersion: string | null;
  /**
   * 设备的总内存
   */
  totalMemory: number | null;
}

interface IosInfo extends DeviceInfo {
  /**
   * 设备品牌
   */
  brand: string | null;
  /**
   * 设备型号
   */
  model: string | null;
  /**
   * 设备的内部型号 ID
   */
  modelId: any;
}

interface AndroidInfo extends DeviceInfo {
  /**
   * 设备品牌
   */
  brand: string | null;
  /**
   * 工业品外观设计的具体配置或名称
   */
  designName: string | null;
  /**
   * 设备的唯一标识
   */
  osBuildFingerprint: string | null;
}

const _platform = Platform.OS;

/**
 * 检查当前平台是否为android
 */
export const isAndroid = _platform === "android";
/**
 * 检查当前平台是否为ios
 */
export const isIOS = _platform === "ios";
/**
 * 检查当前平台是否为web
 */
export const isWeb = _platform === "web";
/**
 * 检查当前平台是否为mac
 */
export const isMacOS = _platform === "macos";
/**
 * 检查当前平台是否为windows
 */
export const isWindows = _platform === "windows";
/**
 * 检查当前平台是否为移动设备
 */
export const isMobile = isAndroid || isIOS;
/**
 * 检查当前平台是否为平板
 */
export const isTablet = !isMobile;
/**
 * 检查当前平台是否为桌面
 */
export const isDesktop = !isMobile && !isTablet;

export const getAndroidInfo = (): AndroidInfo => {
  return {
    brand: Device.brand,
    designName: Device.designName,
    deviceName: Device.deviceName,
    deviceType: Device.deviceType,
    deviceYearClass: Device.deviceYearClass,
    isDevice: Device.isDevice,
    manufacturer: Device.manufacturer,
    modelName: Device.modelName,
    osBuildId: Device.osBuildId,
    osName: Device.osName,
    osVersion: Device.osVersion,
    totalMemory: Device.totalMemory,
    osBuildFingerprint: Device.osBuildFingerprint,
  };
};
