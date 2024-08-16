// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
// 缩小器
config.transformer.minifierPath = "metro-minify-terser";
// 混淆
// config.transformer.minifierPath = "metro-minify-uglify";
config.transformer.minifierConfig = {
  compress: {
    // 下面的选项删除生产环境中的所有控制台日志语句。
    drop_console: true,
  },
};

module.exports = config;
