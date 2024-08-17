import { StyleSheet } from "react-native";
import { View, Text, List, Card } from "@ant-design/react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";

interface DataItem {
  id: number;
  title: string;
  content: string;
}
const ruoyiIssue: DataItem[] = [
  { id: 1, title: "若依开源吗？", content: "开源" },
  { id: 2, title: "若依可以商用吗？", content: "可以" },
  { id: 3, title: "若依官网地址多少？", content: "http://ruoyi.vip" },
  { id: 4, title: "若依文档地址多少？", content: "http://doc.ruoyi.vip" },
];
const otherIssue: DataItem[] = [
  {
    id: 1,
    title: "如何退出登录？",
    content: "请点击[我的] - [应用设置] - [退出登录]即可退出登录",
  },
  {
    id: 2,
    title: "如何修改用户头像？",
    content: "请点击[我的] - [选择头像] - [点击提交]即可更换用户头像",
  },
  {
    id: 3,
    title: "如何修改登录密码？",
    content: "请点击[我的] - [应用设置] - [修改密码]即可修改登录密码",
  },
];
export default function MineHelpScreen() {
  const lookDetail = (item: DataItem) => {
    router.push({
      pathname: "/common/textview",
      params: { title: item.title, content: item.content },
    });
  };
  return (
    <View style={styles.container}>
      <List renderHeader={ListHeader1} style={styles.list1}>
        {ruoyiIssue.map((item) => (
          <List.Item key={item.id} onPress={() => lookDetail(item)}>
            {item.title}
          </List.Item>
        ))}
      </List>

      <List renderHeader={ListHeader2} style={styles.list2}>
        {otherIssue.map((item) => (
          <List.Item key={item.id} onPress={() => lookDetail(item)}>
            {item.title}
          </List.Item>
        ))}
      </List>
    </View>
  );
}

function ListHeader1() {
  return (
    <View style={styles.listHeader}>
      <AntDesign name="github" size={20} color="black" />
      <Text style={styles.headerTitle}>若依问题</Text>
    </View>
  );
}

function ListHeader2() {
  return (
    <View style={styles.listHeader}>
      <Feather name="help-circle" size={20} color="black" />
      <Text style={styles.headerTitle}>其它问题</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // backgroundColor: "#fff",
    padding: 15,
  },
  list1: {
    width: "100%",
    marginBottom: 15,
  },
  list2: {
    width: "100%",
  },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    marginLeft: 5,
  },
});
