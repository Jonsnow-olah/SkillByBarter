// app/IntroVideoScreen.tsx
import React, { useCallback, useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { useRouter } from "expo-router";

type Props = { onFinish: () => void };

export default function IntroVideoScreen({ onFinish }: Props) {
  const videoRef = useRef<Video>(null);
  const router = useRouter();
  const [ready, setReady] = useState(false);

  const onReady = useCallback(() => setReady(true), []);

  const handleStart = () => {
     console.log("Get Started tapped");
      onFinish();
      router.navigate("/auth");  

  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={require("../assets/images/welcome.mp4")}
        style={StyleSheet.absoluteFill}  // fill entire parent
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
        onReadyForDisplay={onReady}
      />
      {ready && (
        <TouchableOpacity style={styles.button} onPress={handleStart}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}



const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  button: {
    position: "absolute",
    bottom: 80,
    alignSelf: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 30,
  },
  buttonText: {
    fontFamily: "Skripter",
    fontSize: 22,
    color: "#d43c4f",
  },
});
