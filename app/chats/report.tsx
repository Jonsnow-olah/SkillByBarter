import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ReportPage() {
  const router = useRouter();
  const { name } = useLocalSearchParams<{ name: string }>();
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!comment.trim()) {
      Alert.alert("Required", "Please provide additional details before submitting.");
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={() => router.push("/chats")}>
          <Ionicons name="close" size={30} color="#333" />
        </TouchableOpacity>
        <View style={styles.successBox}>
          <Text style={styles.successMessage}>
            Your report has been submitted. We will contact you via mail if we need additional information.
          </Text>
          <Ionicons name="checkmark-circle" size={60} color="green" style={{ marginVertical: 20 }} />
          <TouchableOpacity onPress={() => router.push("/chats")} style={styles.backToChats}>
            <Text style={styles.backToChatsText}>Back to chats</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={90}
    >
      <View style={styles.topRow}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={30} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/chats")}>
          <Ionicons name="close" size={30} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <Text style={styles.heading}>Report {name}</Text>
        <Text style={styles.subHeading}>
          The more details you give, the better we can take action
        </Text>

        <Text style={styles.label}>Add a comment</Text>
        <TextInput
          multiline
          value={comment}
          onChangeText={setComment}
          placeholder="Please provide additional details"
          placeholderTextColor="#888"
          style={styles.input}
        />

        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 60,
    marginBottom: 10,
  },
  body: {
    marginTop: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 8,
    textAlign: "center",
  },
  subHeading: {
    fontSize: 13,
    color: "#666",
    marginBottom: 25,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f2f2f2",
    height: 120,
    borderRadius: 10,
    padding: 15,
    fontSize: 14,
    textAlignVertical: "top",
    color: "#000",
  },
  submitButton: {
    backgroundColor: "#FF3D34",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 25,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  closeButton: {
    position: "absolute",
    top: 60,
    right: 20,
    zIndex: 1,
  },
  successBox: {
    marginTop: 120,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  successMessage: {
    fontSize: 15,
    textAlign: "center",
    color: "#333",
    fontWeight: "500",
  },
  backToChats: {
    marginTop: 20,
    backgroundColor: "#FF3D34",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  backToChatsText: {
    color: "#fff",
    fontWeight: "600",
  },
});
