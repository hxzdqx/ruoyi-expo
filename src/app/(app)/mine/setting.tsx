import { View, Text, List, Button, Toast } from "@ant-design/react-native";
import { StyleSheet } from "react-native";
import { useUserStore } from "@/src/store/index";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import * as Updates from "expo-updates";

export default function MineSettingScreen() {
  const logout = useUserStore((state) => state.logout);
  // 退出登录
  const handleLogout = async () => {
    await logout();
    router.replace("/sign-in");
  };
  // 修改密码
  const handlePwd = () => {
    router.push("/mine/password");
  };
  // 检查更新
  const handleUpdate = async () => {
    try {
      const { isAvailable } = await Updates.checkForUpdateAsync();
      console.log("update1 -> isAvailable ->", isAvailable);
      if (isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      Toast.fail("检查更新失败");
      console.log("update ->", error);
    }
  };
  // 清理缓存
  const handleClear = () => {
    Toast.info("模块建设中...");
  };
  return (
    <View style={styles.container}>
      <List style={styles.list}>
        <List.Item arrow="horizontal" onPress={handlePwd}>
          <View style={styles.row}>
            <AntDesign name="lock" size={20} color="#007aff" />
            <Text style={styles.label}>修改密码</Text>
          </View>
        </List.Item>
        <List.Item arrow="horizontal" onPress={handleUpdate}>
          <View style={styles.row}>
            <FontAwesome name="refresh" size={20} color="#007aff" />
            <Text style={styles.label}>检查更新</Text>
          </View>
        </List.Item>
        <List.Item arrow="horizontal" onPress={handleClear}>
          <View style={styles.row}>
            <MaterialIcons name="cleaning-services" size={20} color="#007aff" />
            <Text style={styles.label}>清理缓存</Text>
          </View>
        </List.Item>
      </List>
      <Button style={styles.button} onPress={handleLogout}>
        退出登录
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    // backgroundColor: "#fff",
    padding: 15,
  },
  list: {
    width: "100%",
  },
  button: {
    marginTop: 30,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    marginLeft: 10,
  },
});
