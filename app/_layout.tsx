import { Stack } from "expo-router";
import "./globals.css";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/components/CustomToast";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useState } from "react";
import { StyleSheet } from "react-native";
import IntroVideoScreen from "../app/intro";

export default function RootLayout() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <GestureHandlerRootView style={styles.container}>
      { !introDone ? (
        <IntroVideoScreen onFinish={() => setIntroDone(true)} />
      ) : (
        <>
          <Stack screenOptions={{ headerShown: false }}> 
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="notifications" />
            <Stack.Screen name="moreInfo" />
            <Stack.Screen name="chats/[id]" />
            <Stack.Screen name="chats/report" />
            <Stack.Screen name="community/[id]" />
            <Stack.Screen name="auth/index" />
          </Stack>
          <Toast config={toastConfig} />
        </>
      )}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
