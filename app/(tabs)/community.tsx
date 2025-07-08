import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const dummyEvents = [
  {
    id: "1",
    title: "Tech Hangout @ Yaba",
    description: "Meet fellow techies for a chilled weekend hangout.",
    location: "Yaba, Lagos",
    attendees: 34,
    banner: require("@/assets/images/party1.jpg"),
  },
  {
    id: "2",
    title: "Freelancer Movie Night",
    description: "Unwind with movies and snacks with fellow freelancers.",
    location: "Lekki Phase 1",
    attendees: 20,
    banner: require("@/assets/images/party2.jpg"),
  },
  // To test empty state, you can temporarily change this to: []
];

export default function Community() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Touch Grass 🌱</Text>
      <Text style={styles.subheading}>Join events and hangouts around you</Text>

      {dummyEvents.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>😕 Oops, No hangouts or events available</Text>
          <TouchableOpacity
            onPress={() => router.push("/")}
            style={styles.exploreButton}
          >
            <Text style={styles.exploreText}>Go back to Explore</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={dummyEvents}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => router.push(`/community/${item.id}`)}
              style={styles.card}
            >
              <Image source={item.banner} style={styles.banner} />
              <View style={styles.cardContent}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <View style={styles.meta}>
                  <Ionicons name="location" size={14} color="#888" />
                  <Text style={styles.metaText}>{item.location}</Text>
                  <Ionicons
                    name="people"
                    size={14}
                    color="#888"
                    style={{ marginLeft: 16 }}
                  />
                  <Text style={styles.metaText}>{item.attendees} going</Text>
                </View>
              </View>
            </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  heading: { fontSize: 22, fontWeight: "700", color: "#111", marginBottom: 4 },
  subheading: { fontSize: 13, color: "#555", marginBottom: 20 },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
    elevation: 1,
  },
  banner: {
    width: "100%",
    height: 160,
    resizeMode: "cover",
  },
  cardContent: { padding: 12 },
  title: { fontSize: 16, fontWeight: "700", color: "#111", marginBottom: 4 },
  description: { fontSize: 13, color: "#666", marginBottom: 8 },
  meta: { flexDirection: "row", alignItems: "center" },
  metaText: { fontSize: 12, color: "#777", marginLeft: 4 },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
    marginBottom: 20,
  },
  exploreButton: {
    backgroundColor: "#FF3D34",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  exploreText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
