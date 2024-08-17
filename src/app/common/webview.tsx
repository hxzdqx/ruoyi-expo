import { WebView } from "react-native-webview";
import { StyleSheet } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { View } from "@ant-design/react-native";

export default function WebViewScreen() {
  const { url, title } = useLocalSearchParams<{ url: string; title: string }>();
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ title, headerTitleAlign: "center" }} />
      <WebView style={styles.container} source={{ uri: url }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
