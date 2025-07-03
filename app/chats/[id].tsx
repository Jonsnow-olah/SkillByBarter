import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type Message = {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
  status?: "delivered" | "read";
  isSender: boolean;
};

const dummyChatUsers: Record<
  string,
  { name: string; skill: string; avatar: any }
> = {
  "1": {
    name: "Jude Bellingham",
    skill: "React Native Developer",
    avatar: require("@/assets/images/jude.jpg"),
  },
  "2": {
    name: "Olah Israel",
    skill: "Frontend Developer",
    avatar: require("@/assets/images/snw.jpg"),
  },
};

const initialMessages: Message[] = [
  
];

export default function ChatDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const chatUser = dummyChatUsers[id || ""];

  useEffect(() => {
    if (!chatUser) return;

    const lastSentIndex = [...messages]
      .reverse()
      .findIndex((msg) => msg.isSender && msg.status === "delivered");

    if (lastSentIndex !== -1) {
      const trueIndex = messages.length - 1 - lastSentIndex;
      const updated = [...messages];
      updated[trueIndex].status = "read";
      setMessages(updated);
    }
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: "You",
      timestamp: "Now",
      status: "delivered",
      isSender: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
  };

  if (!chatUser) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>User not found</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={90}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Image source={chatUser.avatar} style={styles.avatar} />
        <View>
          <Text style={styles.name}>{chatUser.name}</Text>
          <Text style={styles.skill}>{chatUser.skill}</Text>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageBubble,
              item.isSender ? styles.sentBubble : styles.receivedBubble,
            ]}
          >
            <Text style={styles.messageText}>{item.text}</Text>
            <View style={styles.metaRow}>
              <Text style={styles.timestamp}>{item.timestamp}</Text>
              {item.isSender && item.status && (
                <Text style={styles.statusBubble}>
                  {item.status === "read" ? "✓✓" : "✓"}
                </Text>
              )}
            </View>
          </View>
        )}
      />

      {/* Input */}
      <View style={styles.inputContainer}>
        <TouchableOpacity>
          <Ionicons name="image-outline" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="mic-outline" size={24} color="#333" />
        </TouchableOpacity>
        <TextInput
          placeholder="Type a message..."
          value={message}
          onChangeText={setMessage}
          style={styles.input}
        />
        <TouchableOpacity onPress={sendMessage}>
          <Ionicons name="send" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  error: {
    paddingTop: 60,
    textAlign: "center",
    fontSize: 18,
    color: "#333",
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#9b9898",
    gap: 10,
  },
  avatar: { width: 42, height: 42, borderRadius: 21 },
  name: { fontSize: 16, fontWeight: "700" },
  skill: { fontSize: 12, color: "#555" },
  messagesList: { padding: 20, flexGrow: 1 },
  messageBubble: {
    maxWidth: "75%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  sentBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#007AFF",
  },
  receivedBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#555",
  },
  messageText: {
    color: "#fff",
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 4,
    alignItems: "center",
  },
  timestamp: {
    color: "#ddd",
    fontSize: 10,
    marginRight: 6,
  },
  statusBubble: {
    color: "#ddd",
    fontSize: 12,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 14,
  },
});
