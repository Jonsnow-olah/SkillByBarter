import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function MoreInfo() {
  const router = useRouter();
  const [rating, setRating] = useState(0);

  const handleRate = (value: number) => {
    setRating(value);
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Video Banner Placeholder */}
        <View style={styles.videoBanner}>
          <Ionicons name="logo-youtube" size={50} color="#fff" />
        </View>

        {/* Portfolio Section */}
        <Text style={styles.heading}>Portfolio</Text>
        <View style={styles.detailBlock}>
          <Text style={styles.label}>Skill</Text>
          <Text style={styles.value}>React Native Developer</Text>

          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>Jane Doe</Text>

          <Text style={styles.label}>Gender</Text>
          <Text style={styles.value}>Female</Text>

          <Text style={styles.label}>Years of Experience</Text>
          <Text style={styles.value}>5 years</Text>

          <Text style={styles.label}>Website Portfolio</Text>
          <Text style={styles.value}>https://example.com</Text>
        </View>

        {/* Overall Rating */}
        <Text style={styles.subHeading}>Overall Rating</Text>
        <View style={styles.starRow}>
          {[1, 2, 3].map((i) => (
            <Ionicons key={i} name="star" size={28} color="#FFD700" />
          ))}
        </View>

        {/* Rate */}
        <Text style={styles.subHeading}>Rate</Text>
        <View style={styles.starRow}>
          {[1, 2, 3, 4, 5].map((i) => (
            <TouchableOpacity key={i} onPress={() => handleRate(i)}>
              <Ionicons
                name={i <= rating ? "star" : "star-outline"}
                size={36}
                color="#FFD700"
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Proof of Work */}
        <Text style={styles.heading}>Proof of Work</Text>
        <View style={styles.grid}>
          {Array.from({ length: 8 }).map((_, i) => (
            <Image
              key={i}
              source={{ uri: "https://via.placeholder.com/100" }}
              style={styles.gridImage}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backButton: {
    padding: 16,
    position: "absolute",
    top: 40,
    left: 16,
    zIndex: 10,
    backgroundColor: "#fff",
    borderRadius: 50,
    elevation: 4,
  },
  content: {
    paddingTop: 100,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  videoBanner: {
    height: 200,
    backgroundColor: "#000",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  heading: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
  },
  detailBlock: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#888",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  starRow: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  gridImage: {
    width: "30%",
    height: 100,
    marginBottom: 12,
    borderRadius: 8,
  },
});
