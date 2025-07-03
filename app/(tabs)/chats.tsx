import React, { useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import ReanimatedSwipeable from "react-native-gesture-handler/Swipeable";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

const initialChats = [
  {
    id: "1",
    name: "Jude Bellingham",
    skill: "React Native Developer",
    avatar: require("@/assets/images/jude.jpg"),
    lastMessage: "Start a chat with Jude",
    unread: true,
    timestamp: "10:45 PM",
  },
  {
    id: "2",
    name: "Olah Israel",
    skill: "Frontend Developer",
    avatar: require("@/assets/images/snw.jpg"),
    lastMessage: "Sent you the files.",
    unread: false,
    timestamp: "9:30 AM",
  },
];

export default function Chats() {
  const router = useRouter();
  const [chats, setChats] = useState(initialChats);
  const [search, setSearch] = useState("");
  const openSwipeableRef = useRef<any>(null);

  const handlePressChat = (id: string) => {
    if (openSwipeableRef.current) {
      openSwipeableRef.current.close(); // Close open swipe if active
      openSwipeableRef.current = null;
      return; // Prevent navigation when closing
    }

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === id ? { ...chat, unread: false } : chat
      )
    );
    router.push(`/chats/${id}`);
  };

  const deleteChat = (id: string, name: string) => {
    setChats((prev) => prev.filter((chat) => chat.id !== id));
    Toast.show({
      type: "info",
      text1: `You deleted chat with ${name}`,
      position: "top",
    });
  };

  const confirmDelete = (id: string, name: string) => {
    Alert.alert("Delete Chat", `Are you sure you want to delete ${name}?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => deleteChat(id, name) },
    ]);
  };

  const renderRightActions = (id: string, name: string) => (
    <TouchableOpacity
      onPress={() => confirmDelete(id, name)}
      style={styles.deleteButton}
      activeOpacity={0.8}
    >
      <Ionicons name="trash" size={24} color="#fff" />
    </TouchableOpacity>
  );

  const filteredChats = chats
    .filter((chat) =>
      chat.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (a.unread && !b.unread) return -1;
      if (!a.unread && b.unread) return 1;
      return 0;
    });

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Chats</Text>

      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search for chats"
        style={styles.searchInput}
        placeholderTextColor="#888"
      />

      <FlatList
        data={filteredChats}
        keyExtractor={(item) => `chat-${item.id}`}
        extraData={chats}
        renderItem={({ item }) => {
          let thisSwipeRef: any;

          return (
            <ReanimatedSwipeable
              ref={(ref) => (thisSwipeRef = ref)}
              friction={3}
              overshootRight={false}
              onSwipeableOpen={() => {
                if (
                  openSwipeableRef.current &&
                  openSwipeableRef.current !== thisSwipeRef
                ) {
                  openSwipeableRef.current.close();
                }
                openSwipeableRef.current = thisSwipeRef;
              }}
              onSwipeableClose={() => {
                if (openSwipeableRef.current === thisSwipeRef) {
                  openSwipeableRef.current = null;
                }
              }}
              containerStyle={{ marginBottom: 15 }}
              renderRightActions={() => renderRightActions(item.id, item.name)}
            >
              <TouchableOpacity
                style={styles.chatItem}
                onPress={() => handlePressChat(item.id)}
                activeOpacity={0.9}
              >
                <Image source={item.avatar} style={styles.avatar} />
                <View style={{ flex: 1 }}>
                  <View style={styles.topRow}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.timestamp}>{item.timestamp}</Text>
                  </View>
                  <Text style={styles.skill}>{item.skill}</Text>
                  <View style={styles.messageRow}>
                    <Text style={styles.messagePreview}>{item.lastMessage}</Text>
                    {item.unread && (
                      <View style={styles.unreadBadge}>
                        <Text style={styles.unreadText}>New</Text>
                      </View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            </ReanimatedSwipeable>
          );
        }}
        contentContainerStyle={{ paddingBottom: 40 }}
      />

       <Toast
              config={{
                info: (props) => (
                  <View style={styles.toastContainer}>
                    <Text style={styles.toastText}>{props.text1}</Text>
                  </View>
                ),
              }}
            />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  searchInput: {
    height: 40,
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 14,
    color: "#000",
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    flex: 1,
  },
  timestamp: {
    fontSize: 12,
    color: "#999",
    marginLeft: 10,
  },
  skill: {
    fontSize: 12,
    color: "#666",
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  messagePreview: {
    fontSize: 13,
    color: "#444",
    flex: 1,
  },
  unreadBadge: {
    backgroundColor: "#FF3D34",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 10,
  },
  unreadText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },
  deleteButton: {
    backgroundColor: "#FF3D34",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    borderRadius: 10,
    marginVertical: 6,
  },
  toastContainer: {
    backgroundColor: "#333",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    alignSelf: "center",
    marginTop: 50,
  },
  toastText: {
    color: "#fff",
    fontSize: 13,
  },
});
