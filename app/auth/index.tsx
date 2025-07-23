import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter, Stack } from "expo-router";
import Toast from "react-native-toast-message";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";

export default function AuthScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleGoogle = () => {
    console.log("Google sign-in pressed");
    // placeholder for google auth flow
  };

  const handleNext = () => {
    if (!email.includes("@")) {
      Toast.show({ type: "info", text1: "Enter a valid email" });
      return;
    }
    router.push({ pathname: "/auth/code", params: { email } });
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Image source={require("../../assets/images/barter_logo.png")} style={styles.logo} />
      <GoogleSigninButton onPress={handleGoogle} />
      <View style={styles.orRow}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.emailRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", alignItems: "center" },
  logo: { width: 120, height: 120, marginBottom: 40, resizeMode: "contain" },
  orRow: { flexDirection: "row", alignItems: "center", marginVertical: 20, width: "80%" },
  line: { flex: 1, height: 1, backgroundColor: "#ccc" },
  orText: { marginHorizontal: 10, color: "#888" },
  emailRow: { flexDirection: "row", width: "100%", alignItems: "center" },
  input: { flex: 1, borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10 },
  nextBtn: { marginLeft: 10, backgroundColor: "#d43c4f", paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8 },
  nextText: { color: "#fff", fontWeight: "600" },
});
