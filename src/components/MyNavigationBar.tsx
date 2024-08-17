import { Stack } from "expo-router";
import { View } from "@ant-design/react-native";
import React from "react";
import type { HeaderBackButtonProps } from "@react-navigation/native-stack/src/types";

interface MyNavigationBarProps {
  title?: string;
  headerTitleAlign?: "center" | "left" | undefined;
  children?: React.ReactNode;
  headerLeft?: ((props: HeaderBackButtonProps) => React.ReactNode) | undefined;
}

export default function MyNavigationBar({
  title,
  headerTitleAlign,
  children,
  headerLeft,
}: MyNavigationBarProps) {
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <Stack.Screen
        options={{
          title: title,
          headerTitleAlign: headerTitleAlign ?? "center",
          headerLeft,
        }}
      />

      {children}
    </View>
  );
}
