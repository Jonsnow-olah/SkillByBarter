import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { images } from "@/constants/images";
import MatchModal from "../matchModal";


export default function Index() {
  const router = useRouter();

  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGender, setSelectedGender] = useState<"Male" | "Female">("Male");
  const [matchVisible, setMatchVisible] = useState(false); // ✅ state for match modal

  const slideAnim = useRef(new Animated.Value(0)).current;

  const toggleGender = (gender: "Male" | "Female") => {
    const toValue = gender === "Male" ? 0 : 1;
    Animated.timing(slideAnim, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setSelectedGender(gender);
    });
  };

  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  const allSkills = [
    "Graphic Designer",
    "Photoshop Editor",
    "JavaScript Developer",
    "React Native Developer",
    "UI/UX Designer",
    "Web Developer",
  ];

  const filteredSuggestions = allSkills.filter((skill) =>
    skill.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const getLocationPermission = async () => {
      const alreadyAsked = await AsyncStorage.getItem("locationPermissionAsked");
      if (alreadyAsked) return;

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Location permission denied");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      await AsyncStorage.setItem("locationPermissionAsked", "true");
    };

    getLocationPermission();
  }, []);

  const handleNotificationClick = () => {
    router.push("/notifications");
  };

  const handleSuggestionClick = (skill: string) => {
    setSearchQuery(skill);
    setSearchModalVisible(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView style={{ paddingHorizontal: 20 }}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Image
            source={images.logo}
            style={{ width: 70, height: 70 }}
            resizeMode="contain"
          />
          <View style={{ flexDirection: "row", gap: 20, marginTop: 14 }}>
            <Pressable onPress={() => setSearchModalVisible(true)}>
              <Ionicons name="search" size={22} color="black" />
            </Pressable>

            <Pressable onPress={handleNotificationClick}>
              <View style={styles.notificationWrapper}>
                <Ionicons name="notifications-outline" size={24} color="black" />
                <View style={styles.redDot} />
              </View>
            </Pressable>
          </View>
        </View>

        {/* Gender Filter Toggle */}
        <View style={styles.filterWrapper}>
          <Ionicons name="filter" size={16} color="black" style={{ marginRight: 9 }} />
          <Text style={styles.filterLabel}>Show only</Text>

          <View style={styles.toggleContainer}>
            <Animated.View style={[styles.toggleSlider, { transform: [{ translateX }] }]} />
            <TouchableOpacity
              style={styles.toggleOption}
              onPress={() => toggleGender("Male")}
            >
              <Text style={[styles.toggleText, selectedGender === "Male" && styles.activeText]}>
                Male
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.toggleOption}
              onPress={() => toggleGender("Female")}
            >
              <Text style={[styles.toggleText, selectedGender === "Female" && styles.activeText]}>
                Female
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Cards */}
        <View style={{ marginTop: 30 }}>
          {[...Array(5)].map((_, index) => (
            <SkillCard key={index} router={router} onMatch={() => setMatchVisible(true)} />
          ))}
        </View>
      </ScrollView>

      {/* Search Modal */}
      <Modal visible={searchModalVisible} animationType="slide" transparent>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
            padding: 20,
          }}
        >
          <View style={{ backgroundColor: "white", borderRadius: 10, padding: 20 }}>
            <View style={styles.searchRow}>
              <Ionicons name="search" size={20} color="gray" />
              <TextInput
                placeholder="Search skills..."
                style={styles.searchInput}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
              />
              <Pressable onPress={() => setSearchModalVisible(false)}>
                <Ionicons name="close" size={20} color="gray" />
              </Pressable>
            </View>

            {filteredSuggestions.length > 0 ? (
              filteredSuggestions.map((suggestion, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    paddingVertical: 10,
                    borderBottomWidth: 1,
                    borderColor: "#eee",
                  }}
                  onPress={() => handleSuggestionClick(suggestion)}
                >
                  <Text style={{ fontSize: 14, color: "#333" }}>{suggestion}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={{ fontSize: 13, color: "#999", marginTop: 10 }}>
                No suggestions found
              </Text>
            )}
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* ✅ Match Modal */}
      <MatchModal visible={matchVisible} onClose={() => setMatchVisible(false)} />
    </View>
  );
}

const SkillCard = ({
  router,
  onMatch,
}: {
  router: any;
  onMatch: () => void;
}) => {
  const images = [
    "https://i.pinimg.com/736x/c3/83/df/c383df6f147ac8b320f9061f5118294d.jpg",
    "https://i.pinimg.com/736x/38/14/3d/38143d47870166bdad8f399b08248ea8.jpg?text=Portrait+2",
    "https://i.pinimg.com/736x/24/da/68/24da684a52ea6c4a54451d2508e2737e.jpg?text=Portrait+3",
  ];
  const [index, setIndex] = useState(0);

  const handlePress = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
      <View style={cardStyles.cardContainer}>
        <Image source={{ uri: images[index] }} style={cardStyles.cardImage} resizeMode="cover" />
        <View style={cardStyles.imageIndicator}>
          {images.map((_, i) => (
            <View
              key={i}
              style={[cardStyles.segment, index === i && cardStyles.activeSegment]}
            />
          ))}
        </View>
        <View style={cardStyles.overlay}>
          <View style={cardStyles.overlayRow}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="location" size={14} color="#fff" />
              <Text style={cardStyles.overlayText}>Lagos, Nigeria</Text>
            </View>
            <View style={cardStyles.starWrapper}>
              {[...Array(5)].map((_, i) => (
                <Ionicons key={i} name="star" size={14} color="#FFD700" />
              ))}
            </View>
          </View>

          <View style={cardStyles.labelRow}>
            <Text style={cardStyles.label}>Skill</Text>
            <TouchableOpacity
              style={cardStyles.moreInfoBtn}
              onPress={() => router.push("/moreInfo")}
            >
              <Text style={{ color: "#fff", fontSize: 11 }}>More Info</Text>
            </TouchableOpacity>
          </View>
          <Text style={cardStyles.value}>React Native Developer</Text>

          <Text style={cardStyles.label}>Name</Text>
          <Text style={cardStyles.value}>Jude Bellingham</Text>

          <Text style={cardStyles.label}>Gender</Text>
          <Text style={cardStyles.value}>Male</Text>

          <Text style={cardStyles.label}>Years of Experience</Text>
          <Text style={cardStyles.value}>5 years</Text>

          <TouchableOpacity style={cardStyles.matchButton} onPress={onMatch}>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Match</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 56,
    paddingBottom: 16,
    alignItems: "center",
  },
  notificationWrapper: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  redDot: {
    position: "absolute",
    top: 2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF3D34",
  },
  filterWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    marginTop: 10,
    flexWrap: "wrap",
    paddingLeft: 20,
  },
  filterLabel: {
    marginRight: 10,
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  toggleContainer: {
    flexDirection: "row",
    width: 160,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#eee",
    position: "relative",
    overflow: "hidden",
  },
  toggleSlider: {
    position: "absolute",
    width: "50%",
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
  },
  toggleOption: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  toggleText: {
    fontSize: 14,
    color: "#888",
    fontWeight: "600",
  },
  activeText: {
    color: "#000",
    fontWeight: "700",
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 14,
    color: "#333",
  },
});

const cardStyles = StyleSheet.create({
  cardContainer: {
    marginBottom: 30,
    borderRadius: 16,
    overflow: "hidden",
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
    height: 500,
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  imageIndicator: {
    position: "absolute",
    top: 10,
    alignSelf: "center",
    flexDirection: "row",
  },
  segment: {
    width: 25,
    height: 3,
    backgroundColor: "#FF3D34",
    marginHorizontal: 2,
    opacity: 0.3,
    borderRadius: 2,
  },
  activeSegment: {
    opacity: 1,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    padding: 14,
  },
  overlayRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  overlayText: {
    color: "#fff",
    marginLeft: 5,
    fontSize: 12,
  },
  starWrapper: {
    flexDirection: "row",
    gap: 2,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 11,
    color: "#ccc",
    marginTop: 6,
  },
  value: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },
  matchButton: {
    marginTop: 12,
    backgroundColor: "#FF3D34",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  moreInfoBtn: {
  position: "absolute",
  top: 14,
  right: 5,
  backgroundColor: "#FF3D34",
  paddingHorizontal: 10,
  paddingVertical: 10,
  borderRadius: 6,
  zIndex: 10,
  },
});
