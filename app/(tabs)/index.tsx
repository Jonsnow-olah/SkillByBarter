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

export default function Index() {
  const router = useRouter();

  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGender, setSelectedGender] = useState<"Male" | "Female">("Male");

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
    </View>
  );
}

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
    paddingLeft: 55,
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
