import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Slot, Stack } from "expo-router";
import { SessionProvider } from "../ctx";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "@ant-design/react-native";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import "react-native-reanimated";
import zhCN from "@ant-design/react-native/lib/locale-provider/zh_CN";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function Root() {
  const [loaded, error] = useFonts({
    SpaceMono: require("@/src/assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  const [fontsLoaded] = useFonts({
    antoutline: require("@ant-design/icons-react-native/fonts/antoutline.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);
  useEffect(() => {
    if (loaded && fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, fontsLoaded]);

  if (!loaded || !fontsLoaded) {
    return null;
  }

  // Set up the auth context and render our layout inside of it.
  return (
    <SessionProvider>
      <SafeAreaProvider>
        <Provider locale={zhCN}>
          <Stack>
            <Stack.Screen name="(app)" options={{ headerShown: false }} />
            <Stack.Screen name="register" options={{ headerShown: false }} />
            <Stack.Screen
              name="common/webview"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="sign-in" options={{ headerShown: false }} />

            {/* <Slot /> */}
          </Stack>
        </Provider>
      </SafeAreaProvider>
    </SessionProvider>
  );
}
