import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const filters = ["All", "New Match", "Messages"];

const mockNotifications = [
  {
    id: "1",
    type: "match",
    title: "You have been matched with Winniefred",
    content: "Start a chat with Winniefred now",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    isNew: true,
    timestamp: "1 hour ago",
    showViewButton: true,
    hasImage: true,
  },
  {
    id: "2",
    type: "message",
    title: "New message from Tolu",
    content: "Hi, are you proficient in React Native",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    isNew: false,
    timestamp: "2 hours ago",
    hasImage: false,
  },
  {
    id: "3",
    type: "match",
    title: "You have been matched with Femi",
    content: "Start a chat with Femi now.",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    isNew: true,
    timestamp: "3 hours ago",
    showViewButton: true,
    hasImage: true,
  },
  {
    id: "4",
    type: "message",
    title: "New message from Sabinus",
    content: "I stay around Akoka, we can meet at the workspace in sabo.",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    isNew: false,
    timestamp: "5 hours ago",
    hasImage: false,
  },
  {
    id: "5",
    type: "match",
    title: "You have been matched with Maya",
    content: "Start a chat with Maya now.",
    avatar: "https://randomuser.me/api/portraits/women/50.jpg",
    isNew: false,
    timestamp: "6 hours ago",
    showViewButton: true,
    hasImage: true,
  },
];

export default function NotificationsScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const filteredNotifications =
    selectedFilter === "All"
      ? mockNotifications
      : mockNotifications.filter((n) =>
          selectedFilter === "New Match"
            ? n.type === "match"
            : n.type === "message"
        );

  const sortedNotifications = [...filteredNotifications].sort(
    (a, b) => Number(b.isNew) - Number(a.isNew)
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </Pressable>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      {/* Filter Tabs */}
      {filteredNotifications.length > 0 && (
  <View style={styles.filterContainer}>
    {filters.map((filter) => {
      const isActive = selectedFilter === filter;
      return (
        <TouchableOpacity
          key={filter}
          onPress={() => setSelectedFilter(filter)}
          style={[
            styles.filterButton,
            isActive && styles.activeFilterButton,
          ]}
        >
          <Text
            style={[
              styles.filterText,
              isActive && styles.activeFilterText,
            ]}
          >
            {filter}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
)}


      {/* If new items exist, show "New" text */}
      {sortedNotifications.some((n) => n.isNew) && (
        <Text style={styles.newSectionLabel}>New</Text>
      )}

      {/* Notification List or Empty */}
      {sortedNotifications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconWrapper}>
            <Ionicons name="notifications" size={38} color="#687588" />
          </View>
          <Text style={styles.emptyText}>You have no notifications</Text>
        </View>
      ) : (
        <FlatList
          key={selectedFilter}
          data={sortedNotifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.notificationItem}>
              {/* Left: Avatar */}
              <View style={styles.avatarWrapper}>
                <Image
                  source={{ uri: item.avatar }}
                  style={styles.avatar}
                />
                {item.isNew && <View style={styles.redDot} />}
              </View>

              {/* Middle: Text */}
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.content}>{item.content}</Text>

                {item.showViewButton && (
                  <TouchableOpacity style={styles.viewButton}>
                    <Text style={styles.viewButtonText}>View</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Right: Square image & timestamp */}
              {item.hasImage && item.type === "match" && (
                <View style={styles.rightImageWrapper}>
                  <Text style={styles.timestamp}>{item.timestamp}</Text>
                  <View style={styles.sideImageContainer}>
                    <Image
                      source={require('@/assets/images/mammoth2.png')} // 🖼️ Replace with your local image
                      style={styles.sideImage}
                      resizeMode="cover"
                    />
                  </View>
                </View>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 56,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
  filterContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  filterButton: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "white",
    marginRight: 12,
  },
  activeFilterButton: {
    backgroundColor: "white",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  filterText: {
    fontSize: 14,
    color: "#888",
    fontWeight: "500",
  },
  activeFilterText: {
    color: "#000",
    fontWeight: "600",
  },
  newSectionLabel: {
    fontSize: 14,
    color: "#333",
    fontWeight: "700",
    marginBottom: 12,
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    marginBottom: 190,
  },
  emptyIconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#EFF1F4",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: "#333",
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  avatarWrapper: {
    marginRight: 16,
    position: "relative",
    alignItems: "center",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  redDot: {
    position: "absolute",
    top: 0,
    right: -2,
    width: 8,
    height: 8,
    backgroundColor: "#FF3D34",
    borderRadius: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
  },
  content: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  timestamp: {
    fontSize: 10,
    color: "#999",
    marginBottom: 6,
    textAlign: "right",
  },
  rightImageWrapper: {
    alignItems: "flex-end",
    justifyContent: "flex-start",
    marginLeft: 8,
  },
  sideImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 6,
    overflow: "hidden",
  },
  sideImage: {
    width: "100%",
    height: "100%",
    borderRadius: 6,
  },
  viewButton: {
    backgroundColor: "#0F1625",
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  viewButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
