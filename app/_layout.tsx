import { Stack } from "expo-router";
import "./globals.css";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen name="notifications" options={{ headerShown: false }} />

      <Stack.Screen name="moreInfo" options={{ headerShown: false }} />

      {/* <Stack.Screen name="designer/[id]" options={{ headerShown: false }} /> */}
    </Stack>
  );
}
