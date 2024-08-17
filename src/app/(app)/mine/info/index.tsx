import { View, List, Text } from "@ant-design/react-native";
import { StyleSheet } from "react-native";
import { getUserProfile } from "@/src/api/system/user";
import { useState, useEffect } from "react";
import type { UserData } from "@/src/types/userProfile";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function MineInfoScreen() {
  const [user, setUser] = useState<UserData | null>(null);
  // 角色
  const [roleGroup, setRoleGroup] = useState<string>("");
  // 岗位
  const [postGroup, setPostGroup] = useState<string>("");
  // 获取用户细腻些
  const getUser = async () => {
    try {
      const res = await getUserProfile();
      setUser(res.data);
      setRoleGroup(res.roleGroup);
      setPostGroup(res.postGroup);
    } catch (error) {
      console.log("getUser", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <View style={styles.container}>
      <List style={styles.widthFull}>
        <List.Item extra={user?.nickName}>
          <View style={styles.row}>
            <Ionicons name="person" size={16} color="black" />
            <Text>昵称</Text>
          </View>
        </List.Item>
        <List.Item extra={user?.phonenumber}>
          <View style={styles.row}>
            <FontAwesome name="phone" size={16} color="black" />
            <Text>手机号码</Text>
          </View>
        </List.Item>
        <List.Item extra={user?.email}>
          <View style={styles.row}>
            <MaterialIcons name="email" size={16} color="black" />
            <Text>邮箱</Text>
          </View>
        </List.Item>
        <List.Item extra={postGroup}>
          <View style={styles.row}>
            <FontAwesome5 name="user-cog" size={16} color="black" />
            <Text>岗位</Text>
          </View>
        </List.Item>
        <List.Item extra={roleGroup}>
          <View style={styles.row}>
            <FontAwesome5 name="user-friends" size={16} color="black" />
            <Text>角色</Text>
          </View>
        </List.Item>
        <List.Item extra={user?.createTime}>
          <View style={styles.row}>
            <Ionicons name="calendar-clear-sharp" size={16} color="black" />
            <Text>创建日期</Text>
          </View>
        </List.Item>
      </List>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // backgroundColor: "#fff",
  },
  widthFull: {
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
