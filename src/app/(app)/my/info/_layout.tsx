import { Stack } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "个人信息", headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="edit"
        options={{
          title: "编辑资料",
          headerTitleAlign: "center",
          // 解决返回键无法返回上一页问题
          headerLeft: () => (
            <AntDesign
              name="arrowleft"
              onPress={() => router.back()}
              size={22}
              color="black"
            />
          ),
        }}
      />
    </Stack>
  );
}
