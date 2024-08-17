import { View, Text, List } from "@ant-design/react-native";
import { StyleSheet, Image } from "react-native";
import { router } from "expo-router";
import * as Application from "expo-application";

export default function MineAboutScreen() {
  const goToOfficialWebsite = () => {
    router.push("https://www.ruoyi.vip");
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("@/src/assets/images/logo200.png")}
      ></Image>
      <Text style={styles.title}>若依移动端</Text>
      <List style={styles.list}>
        <List.Item
          extra={Application.nativeApplicationVersion}
          arrow="horizontal"
        >
          版本信息
        </List.Item>
        <List.Item extra="ruoyi@xxx.com" arrow="horizontal">
          官方邮箱
        </List.Item>
        <List.Item extra="400-999-9999" arrow="horizontal">
          服务热线
        </List.Item>
        <List.Item
          extra="www.ruoyi.vip"
          arrow="horizontal"
          onPress={goToOfficialWebsite}
        >
          公司官网
        </List.Item>
      </List>

      <Text style={styles.copyright}>
        Copyright © 2022 深圳市若依科技有限公司
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  logo: {
    width: 75,
    height: 75,
    resizeMode: "contain",
    tintColor: "#1890ff",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
  },
  list: {
    width: "100%",
    marginTop: 20,
    marginBottom: 35,
  },
  copyright: {
    color: "#999",
  },
});
