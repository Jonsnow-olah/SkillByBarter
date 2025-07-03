import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BaseToastProps } from "react-native-toast-message";

export const toastConfig = {
  info: ({ text1 }: BaseToastProps) => (
    <View style={styles.toastContainer}>
      <Text style={styles.toastText}>{text1}</Text>
    </View>
  ),
  success: ({ text1 }: BaseToastProps) => (
    <View style={[styles.toastContainer, { backgroundColor: "#28a745" }]}>
      <Text style={styles.toastText}>{text1}</Text>
    </View>
  ),
  error: ({ text1 }: BaseToastProps) => (
    <View style={[styles.toastContainer, { backgroundColor: "#dc3545" }]}>
      <Text style={styles.toastText}>{text1}</Text>
    </View>
  ),
};

const styles = StyleSheet.create({
  toastContainer: {
    backgroundColor: "#333",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    maxWidth: "80%",
    alignSelf: "center",
    marginTop: 40,
  },
  toastText: {
    color: "#fff",
    fontSize: 13,
    textAlign: "center",
    fontWeight: "500",
  },
});
