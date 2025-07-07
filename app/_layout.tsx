import { Stack } from "expo-router";
import "./globals.css";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/components/CustomToast";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.gestureContainer}>
      <>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="notifications" options={{ headerShown: false }} />
          <Stack.Screen name="moreInfo" options={{ headerShown: false }} />
          <Stack.Screen name="chats/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="chats/report" options={{ headerShown: false }} />
        </Stack>

        <Toast config={toastConfig} />
      </>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gestureContainer: {
    flex: 1,
  },
});
