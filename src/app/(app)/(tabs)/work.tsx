import { StyleSheet, Image, View } from "react-native";
import { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";

import { Text, Carousel, Grid, Toast } from "@ant-design/react-native";
import type { DataItem } from "@ant-design/react-native/lib/grid/PropsType";

export default function WorkScreen() {
  // 走马灯图片列表
  const imgList = [
    require("@/src/assets/images/banner/banner01.jpg"),
    require("@/src/assets/images/banner/banner02.jpg"),
    require("@/src/assets/images/banner/banner03.jpg"),
  ];
  // 走马灯选中项
  const [current, setCurrent] = useState<number>(0);
  // 宫格数据
  const gridData: DataItem[] = [
    {
      icon: <FontAwesome name="user" size={24} color="black" />,
      text: "用户管理",
      path: void 0,
    },
    {
      icon: <FontAwesome name="users" size={24} color="black" />,
      text: "角色管理",
      path: void 0,
    },
    {
      icon: <Ionicons name="color-palette-outline" size={24} color="black" />,
      text: "菜单管理",
      path: void 0,
    },
    {
      icon: <AntDesign name="bars" size={24} color="black" />,
      text: "部门管理",
      path: void 0,
    },
    {
      icon: <AntDesign name="heart" size={24} color="black" />,
      text: "岗位管理",
      path: void 0,
    },
    {
      icon: <AntDesign name="barschart" size={24} color="black" />,
      text: "字典管理",
      path: void 0,
    },
    {
      icon: <FontAwesome name="gear" size={24} color="black" />,
      text: "参数设置",
      path: void 0,
    },
    {
      icon: <Ionicons name="chatbox-ellipses" size={24} color="black" />,
      text: "通知公告",
      path: void 0,
    },
    {
      icon: <Ionicons name="wallet" size={24} color="black" />,
      text: "日志管理",
      path: void 0,
    },
  ];
  // 宫格点击事件
  const gridClick = (el: DataItem, index: number | undefined) => {
    console.log(index, el);
    if (!el.path) {
      Toast.info("该功能暂未开放");
    } else {
      router.push(el.path);
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
        }}
      >
        <Carousel
          style={styles.wrapper}
          selectedIndex={current}
          afterChange={setCurrent}
          autoplay
          infinite
        >
          {imgList.map((item) => (
            <View key={item} style={styles.wrapperItem}>
              <Image source={item} style={{ width: "100%", height: "100%" }} />
            </View>
          ))}
        </Carousel>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionDecoration}></View>
        <Text style={styles.sectionText}>系统管理</Text>
      </View>
      <Grid
        data={gridData}
        columnNum={4}
        hasLine={false}
        onPress={(el, index) => gridClick(el as DataItem, index)}
      ></Grid>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  wrapper: {
    width: "100%",
    height: 150,
  },
  wrapperItem: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 150,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  sectionDecoration: {
    width: 2,
    height: 15,
    borderRadius: 3,
    marginRight: 5,
    backgroundColor: "#2979ff",
  },
  sectionText: {
    fontSize: 14,
  },
});
