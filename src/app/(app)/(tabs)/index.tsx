import { StyleSheet } from "react-native";

import { Text, View, Button } from "@ant-design/react-native";
import { useSession } from "@/src/ctx";
import { Image } from "react-native";

export default function TabOneScreen() {
  const { signOut } = useSession();
  return (
    <View style={styles.container}>
      <Image
        source={require("@/src/assets/images/logo.png")}
        style={styles.img}
      ></Image>
      <Text>Hello RuoYi</Text>
      <Button onPress={signOut}>退出登录</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  img: {
    width: 120,
    height: 120,
    marginTop: 120,
    marginBottom: 50,
  },
  title: {
    fontSize: 27,
    color: "#8f8f94",
  },
});
