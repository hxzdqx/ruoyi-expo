import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="about"
        options={{ title: "关于我们", headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="help"
        options={{ title: "常见问题", headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="setting"
        options={{ title: "应用设置", headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="avatar"
        options={{ title: "修改头像", headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="password"
        options={{ title: "修改密码", headerTitleAlign: "center" }}
      />

      <Stack.Screen name="info" options={{ headerShown: false }} />
    </Stack>
  );
}
