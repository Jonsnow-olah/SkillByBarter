// app/_layout.tsx

import { Stack } from "expo-router";
import "./globals.css";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/components/CustomToast";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import IntroVideoScreen from "./IntroVideoScreen";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      {showIntro ? (
        <IntroVideoScreen onFinish={() => setShowIntro(false)} />
      ) : (
        <View style={styles.container}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="notifications" />
            <Stack.Screen name="moreInfo" />
            <Stack.Screen name="chats/[id]" />
            <Stack.Screen name="chats/report" />
            <Stack.Screen name="community/[id]" />
          </Stack>
          <Toast config={toastConfig} />
        </View>
      )}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
