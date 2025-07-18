import React, { useState } from "react";
import {
  View, Text, StyleSheet, Image, TextInput,
  TouchableOpacity, Alert
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function AuthScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleNext = () => {
    if (!email.includes("@")) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    router.push("/signup?email=" + encodeURIComponent(email));
  };

  const handleGoogle = () => {
    // Google auth placeholder
    Alert.alert("Google login not implemented yet");
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/images/barter_logo.png")} style={styles.logo} />
      <Text style={styles.heading}>Sign in or Sign up</Text>

      <TouchableOpacity style={styles.googleBtn} onPress={handleGoogle}>
        <Ionicons name="logo-google" size={24} color="#fff" />
        <Text style={styles.googleText}>Continue with Google</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>OR</Text>

      <View style={styles.emailContainer}>
        <TextInput
          style={styles.emailInput}
          placeholder="Your email address"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
          <Ionicons name="arrow-forward" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", backgroundColor: "#fff" },
  logo: { width: 120, height: 120, alignSelf: "center", marginBottom: 30 },
  heading: { fontSize: 20, fontWeight: "600", textAlign: "center", marginBottom: 20 },
  googleBtn: {
    flexDirection: "row",
    backgroundColor: "#4285F4",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
  },
  googleText: { color: "#fff", marginLeft: 10, fontSize: 16 },
  orText: { textAlign: "center", marginVertical: 20, color: "#777" },
  emailContainer: { flexDirection: "row", alignItems: "center" },
  emailInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 50,
  },
  nextBtn: {
    marginLeft: 10,
    backgroundColor: "#d43c4f",
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
  },
});
