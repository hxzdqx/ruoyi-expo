import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, Redirect } from "expo-router";

import "react-native-reanimated";
import { Text, View } from "@ant-design/react-native";
import { useColorScheme } from "@/src/components/useColorScheme";
import { useSession } from "../../ctx";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const { isLoading, session } = useSession();

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>加载中...</Text>
      </View>
    );
  }

  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        <Stack.Screen
          name="mine/about"
          options={{ headerTitleAlign: "center", title: "关于我们" }}
        />
        <Stack.Screen
          name="mine/avatar"
          options={{ headerTitleAlign: "center", title: "修改头像" }}
        />
        <Stack.Screen
          name="mine/help"
          options={{ headerTitleAlign: "center", title: "常见问题" }}
        />
        <Stack.Screen
          name="mine/password"
          options={{ headerTitleAlign: "center", title: "修改密码" }}
        />
        <Stack.Screen
          name="mine/setting"
          options={{ headerTitleAlign: "center", title: "应用设置" }}
        />
        <Stack.Screen
          name="mine/info/index"
          options={{ headerTitleAlign: "center", title: "个人信息" }}
        />
        <Stack.Screen
          name="mine/info/edit"
          options={{ headerTitleAlign: "center", title: "编辑资料" }}
        />
      </Stack>
    </ThemeProvider>
  );
}
