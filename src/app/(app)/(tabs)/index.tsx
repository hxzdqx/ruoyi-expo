import { StyleSheet } from "react-native";

import { Text, View } from "@ant-design/react-native";
import { Image } from "react-native";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/src/assets/images/logo.png")}
        style={styles.img}
      ></Image>
      <Text>Hello RuoYi</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    // backgroundColor: "#fff",
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
