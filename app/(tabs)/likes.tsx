import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Animated,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { images } from "@/constants/images";
import Toast from "react-native-toast-message";
import AnimatedIconButton from "@/components/AnimatedIconButton";


const initialMatches = [
  {
    id: "1",
    image: "https://i.pinimg.com/736x/24/da/68/24da684a52ea6c4a54451d2508e2737e.jpg?text=User+1",
    name: "Jude Bellingham",
    location: "Lagos, Nigeria",
    skill: "React Native Developer",
    gender: "Male",
    website: "https://judebell.dev",
    experience: "5 years",
  },
  {
    id: "2",
    image: "https://i.pinimg.com/736x/f4/c7/0c/f4c70c85301c9eb1ca1bfe0a0fc5d43f.jpg?text=User+2",
    name: "John Smith",
    location: "Abuja, Nigeria",
    skill: "Frontend Developer",
    gender: "Male",
    website: "https://johnsmith.dev",
    experience: "3 years",
  },
  {
    id: "3",
    image: "https://i.pinimg.com/736x/31/c5/97/31c597006df7ee18fd02c5459da19a2b.jpg?text=User+3",
    name: "Alice Effiong",
    location: "Port Harcourt, Nigeria",
    skill: "Product Designer",
    gender: "Female",
    website: "https://alicejohn.dev",
    experience: "2 years",
  },
  {
    id: "4",
    image: "https://i.pinimg.com/736x/fe/4f/30/fe4f3018342613b0027f9c6e5b5929f3.jpg?text=User+4",
    name: "Linda Olagunju",
    location: "Ibadan, Nigeria",
    skill: "Backend Developer",
    gender: "Female",
    website: "https://markbrown.dev",
    experience: "4 years",
  },
];

const { width } = Dimensions.get("window");
const cardSize = (width - 60) / 2;

export default function Matches() {
  const router = useRouter();
  const [matches, setMatches] = useState(initialMatches);
  const [expandedMatch, setExpandedMatch] = useState<any>(null);

  const collapseCard = () => setExpandedMatch(null);



  const renderMatch = ({ item }: any) => (
    <TouchableOpacity style={styles.card} onPress={() => setExpandedMatch(item)}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardOverlayInfo}>
        <Text style={styles.cardName}>{item.name}</Text>
        <Text style={styles.cardSkill}>{item.skill}</Text>
      </View>
    </TouchableOpacity>
  );

  const hasMatches = matches.length > 0;

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={images.logo} style={styles.logo} resizeMode="contain" />

      {/* Heading */}
      <Text style={styles.heading}>Recent Matches</Text>

      {hasMatches ? (
        <FlatList
          data={matches}
          renderItem={renderMatch}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.grid}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Image source={images.crying_emoji} style={styles.emojiImage} resizeMode="contain" />
          <Text style={styles.emptyText}>No recent matches</Text>
          <TouchableOpacity style={styles.exploreButton} onPress={() => router.push("/")}>
            <Text style={styles.exploreButtonText}>Explore Now</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Expanded Match Overlay */}
      {expandedMatch && (
        <View style={styles.fullscreenOverlay}>
          <Image source={{ uri: expandedMatch.image }} style={styles.expandedImage} />

          {/* Close Button (top-left) */}
          <TouchableOpacity style={styles.closeButton} onPress={collapseCard}>
            <Ionicons name="close" size={24} color="#fff" />
          </TouchableOpacity>

          {/* Chat & Cancel Buttons */}
          <View style={styles.overlayButtons}>
             <AnimatedIconButton
              icon="chatbubble-ellipses-outline"
              text="Chat"
              color="#4CAF50"
              onPress={() => router.push("/chats")}
            />
            <AnimatedIconButton
              icon="close"
              text="Remove Match"
              color="#FF3D34"
              onPress={() => {
              Alert.alert("Cancel Match", "Do you want to cancel the match?", [
              { text: "No", style: "cancel" },
            {
              text: "Yes",
              onPress: () => {
                setExpandedMatch(null);
                setMatches((prev: any) => prev.filter((m: any) => m.id !== expandedMatch.id));
                Toast.show({
                  type: "info",
                  text1: `You unmatched ${expandedMatch.name}`,
                  position: "top",
                  visibilityTime: 2000,
                });
              },
            },
          ]);
        }}
        />
        </View>

          {/* Match Details in Grid Rectangular Cards */}
          <View style={styles.detailsGrid}>
            <View style={styles.detailCard}>
              <Text style={styles.detailTitle}>Name</Text>
              <Text style={styles.detailValue}>{expandedMatch.name}</Text>
            </View>
            <View style={styles.detailCard}>
              <Text style={styles.detailTitle}>Location</Text>
              <Text style={styles.detailValue}>{expandedMatch.location}</Text>
            </View>
            <View style={styles.detailCard}>
              <Text style={styles.detailTitle}>Skill</Text>
              <Text style={styles.detailValue}>{expandedMatch.skill}</Text>
            </View>
            <View style={styles.detailCard}>
              <Text style={styles.detailTitle}>Gender</Text>
              <Text style={styles.detailValue}>{expandedMatch.gender}</Text>
            </View>
            <View style={styles.detailCard}>
              <Text style={styles.detailTitle}>Website</Text>
              <Text style={styles.detailValue}>{expandedMatch.website}</Text>
            </View>
            <View style={styles.detailCard}>
              <Text style={styles.detailTitle}>Experience</Text>
              <Text style={styles.detailValue}>{expandedMatch.experience}</Text>
            </View>
          </View>
        </View>
      )}
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
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  grid: {
    paddingBottom: 60,
  },
  card: {
    width: cardSize,
    height: cardSize + 10,
    borderRadius: 14,
    overflow: "hidden",
    margin: 10,
    backgroundColor: "#eee",
    position: "relative",
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  cardOverlayInfo: {
    position: "absolute",
    bottom: 0,
    padding: 8,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  cardName: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  cardSkill: {
    color: "#fff",
    fontSize: 12,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  emojiImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#777",
    marginBottom: 16,
  },
  exploreButton: {
    backgroundColor: "#FF3D34",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  exploreButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },

  fullscreenOverlay: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 999,
},

  expandedImage: {
    width: "100%",
    height: "55%",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 20,
    padding: 6,
    zIndex: 1000,
  },
  overlayButtons: {
    position: "absolute",
    bottom: 20,
    left: 30,
    right: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 100,
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  detailCard: {
    width: "47%",
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  detailTitle: {
    fontSize: 12,
    color: "#888",
    fontWeight: "600",
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    color: "#222",
    fontWeight: "500",
  },
});
