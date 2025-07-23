import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Toast from "react-native-toast-message";

export default function AuthCodeScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const [code, setCode] = useState("");
  const [shake, setShake] = useState(false);

  const correctCode = "123456";

  const handleSubmit = () => {
    if (code !== correctCode) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      Toast.show({ type: "info", text1: "Incorrect code" });
      return;
    }
    // Success — go to app
    router.replace("/(tabs)");
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.container}>
      <Text style={styles.heading}>Enter the 6‑digit code we sent to:</Text>
      <Text style={styles.emailText}>{email}</Text>
      <TextInput
        value={code}
        onChangeText={setCode}
        placeholder="123456"
        keyboardType="number-pad"
        maxLength={6}
        style={[styles.codeInput, shake && styles.shake]}
      />
      <TouchableOpacity style={[styles.button, code.length === 6 ? {} : styles.buttonDisabled]} disabled={code.length !== 6} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <Toast config={{
        info: props => (
          <View style={styles.toastContainer}>
            <Text style={styles.toastText}>{props.text1}</Text>
          </View>
        ),
      }} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", backgroundColor: "#fff" },
  heading: { fontSize: 18, textAlign: "center", marginBottom: 8, fontWeight: "500" },
  emailText: { fontSize: 16, textAlign: "center", marginBottom: 24, color: "#444" },
  codeInput: {
    alignSelf: "center",
    fontSize: 24,
    letterSpacing: 8,
    width: "60%",
    height: 50,
    borderBottomWidth: 2,
    borderColor: "#ccc",
    textAlign: "center",
    marginBottom: 24,
  },
  shake: {
    borderColor: "#f00",
    backgroundColor: "#ffe6e6",
  },
  button: { backgroundColor: "#FF3D34", paddingVertical: 16, borderRadius: 8, alignItems: "center" },
  buttonDisabled: { backgroundColor: "#ccc" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  toastContainer: { backgroundColor: "#333", paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12, alignSelf: "center", marginTop: 50 },
  toastText: { color: "#fff", fontSize: 13 },
});
