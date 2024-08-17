import {
  Text,
  StyleSheet,
  Image,
  type ImageSourcePropType,
} from "react-native";
import { Grid, List, View, Toast } from "@ant-design/react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link, router } from "expo-router";
import { useUserStore } from "@/src/store/index";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import type { DataItem } from "@ant-design/react-native/lib/grid/PropsType";

export default function MineScreen() {
  const { avatar, name } = useUserStore();

  // const [] = useState<String>("");
  return (
    <View style={styles.container}>
      {/* 顶部个人信息栏 */}
      <View style={styles.headerSection}>
        <View style={styles.headerLeft}>
          {/* 头像 */}
          <Link href="/mine/avatar">
            {/* 必须加层View */}
            <View style={styles.avatarBox}>
              <Image
                style={styles.avatar}
                source={avatar as ImageSourcePropType}
              ></Image>
            </View>
          </Link>

          <Text style={styles.headerLeftText}>用户名: {name}</Text>
        </View>
        <View style={styles.headerRight}>
          <Link href={"/mine/info"}>
            <View style={styles.headerRight}>
              <Text style={styles.headerRightText}>个人信息 </Text>
              <AntDesign name="right" size={16} color="white" />
            </View>
          </Link>
        </View>
      </View>
      <ContentSection />
    </View>
  );
}

const ContentSection = () => {
  return (
    <View style={styles.contentSection}>
      <MineActions />
      <MenuList />
    </View>
  );
};

const MineActions = () => {
  // 宫格数据
  const gridData: DataItem[] = [
    {
      icon: <FontAwesome name="users" size={24} color="red" />,
      text: "交流群",
      msg: "QQ群: 999999999",
    },
    {
      icon: <AntDesign name="customerservice" size={24} color="blue" />,
      text: "在线客服",
      msg: "模块建设中...",
    },
    {
      icon: <Entypo name="chat" size={24} color="#9c26b0" />,
      text: "反馈社区",
      msg: "模块建设中...",
    },
    {
      icon: <AntDesign name="like2" size={24} color="#39b54a" />,
      text: "点赞我们",
      msg: "模块建设中...",
    },
  ];
  // 宫格点击事件
  const gridClick = (el: DataItem | undefined, index?: number | undefined) => {
    Toast.info(el!.msg);
  };
  return (
    <View style={styles.mineActions}>
      <Grid
        data={gridData}
        columnNum={4}
        hasLine={false}
        onPress={gridClick}
      ></Grid>
    </View>
  );
};

const MenuList = () => {
  /**
   * 编辑资料
   */
  const handleToEditInfo = () => {
    router.push("/mine/info/edit");
  };
  /**
   * 常见问题
   */
  const handleHelp = () => {
    router.push("/mine/help");
  };
  /**
   * 关于我们
   */
  const handleAbout = () => {
    router.push("/mine/about");
  };
  /**
   * 应用设置
   */
  const handleToSetting = () => {
    router.push("/mine/setting");
  };
  return (
    <View style={styles.menuList}>
      <List
        styles={{
          List: styles.List,
          Body: styles.Body,
          BodyBottomLine: styles.BodyBottomLine,
        }}
      >
        <List.Item arrow="horizontal" onPress={handleToEditInfo}>
          <View style={styles.row}>
            <AntDesign name="user" size={20} color="#007aff" />
            <Text style={styles.rowText}>编辑资料</Text>
          </View>
        </List.Item>
        <List.Item arrow="horizontal" onPress={handleHelp}>
          <View style={styles.row}>
            <Feather name="help-circle" size={20} color="#007aff" />
            <Text style={styles.rowText}>常见问题</Text>
          </View>
        </List.Item>
        <List.Item arrow="horizontal" onPress={handleAbout}>
          <View style={styles.row}>
            <AntDesign name="hearto" size={20} color="#007aff" />
            <Text style={styles.rowText}>关于我们</Text>
          </View>
        </List.Item>
        <List.Item arrow="horizontal" onPress={handleToSetting}>
          <View style={styles.row}>
            <AntDesign name="setting" size={20} color="#007aff" />
            <Text style={styles.rowText}>应用设置</Text>
          </View>
        </List.Item>
      </List>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // backgroundColor: "#fff",
    // justifyContent: "center",
  },
  avatarBox: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
  },
  headerSection: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 25,
    paddingTop: 15,
    paddingBottom: 45,
    backgroundColor: "#3c96f3",
    color: "white",
  },
  headerLeft: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headerRight: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    fontSize: 14,
  },
  headerLeftText: {
    color: "white",
    fontSize: 18,
    marginLeft: 15,
  },
  headerRightText: {
    color: "white",
    fontSize: 16,
  },
  contentSection: {
    width: "100%",
    flexDirection: "column",
    paddingHorizontal: 20,
    position: "relative",
    top: -50,
  },
  mineActions: {
    backgroundColor: "white",
    borderRadius: 8,
    marginVertical: 15,
    // paddingVertical: 20,
  },
  menuList: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 5,
  },
  list: {
    borderWidth: 0,
    borderColor: "transparent",
  },
  List: {
    borderWidth: 0,
    borderColor: "transparent",
  },
  Body: {
    borderWidth: 0,
    borderColor: "transparent",
  },
  BodyBottomLine: {
    color: "transparent",
    borderWidth: 0,
    borderColor: "transparent",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 3,
  },
});
