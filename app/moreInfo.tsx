import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, Entypo } from "@expo/vector-icons";
import Toast, { BaseToast, ToastConfig } from "react-native-toast-message";
import * as Location from "expo-location";

const dummyImages = [
  "https://i.pinimg.com/736x/89/fa/ec/89faeceb9fe3ffe56a3a3c3aa831275f.jpg?text=Proof1",
  "https://i.pinimg.com/736x/0d/14/94/0d1494e2ea7283d8bc00b22d41fdf673.jpg?text=Proof2",
  "https://i.pinimg.com/736x/c2/22/22/c222225feb08bbc143741a82dfee2431.jpg?text=Proof3",
  "https://i.pinimg.com/736x/17/ce/04/17ce041d312fa6d09c878ab31b318afd.jpg?text=Proof4",
  "https://via.placeholder.com/150x150.png?text=Proof5",
  "https://via.placeholder.com/150x150.png?text=Proof6",
  "https://via.placeholder.com/150x150.png?text=Proof7",
  "https://via.placeholder.com/150x150.png?text=Proof8",
];

const toastConfig: ToastConfig = {
  success: ({ text1 }) => (
    <View style={styles.customToast}>
      <Text style={styles.toastText}>{text1}</Text>
    </View>
  ),
};

export default function MoreInfo() {
  const router = useRouter();
  const [selectedStars, setSelectedStars] = useState(0);
  const [location, setLocation] = useState("Unknown");
  const [modalVisible, setModalVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;
      const current = await Location.getCurrentPositionAsync({});
      setLocation(`Lat: ${current.coords.latitude.toFixed(2)}, Lon: ${current.coords.longitude.toFixed(2)}`);
    })();
  }, []);

  const handleRate = (stars: number) => {
    setSelectedStars(stars);
    Toast.show({
      type: "success",
      text1: `You rated Jane Doe ${stars} star${stars > 1 ? "s" : ""}`,
      position: "center",
      visibilityTime: 2000,
      autoHide: true,
    });
  };

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setModalVisible(true);
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentImageIndex((prev) => (prev - 1 + dummyImages.length) % dummyImages.length);
    } else {
      setCurrentImageIndex((prev) => (prev + 1) % dummyImages.length);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <TouchableOpacity onPress={() => router.back()} style={styles.fixedBackButton}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.videoBanner}>
          <Entypo name="youtube" size={48} color="#fff" />
        </View>

        <Text style={styles.sectionHeading}>Portfolio</Text>
        <View style={styles.gridContainer}>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Skill</Text>
            <Text style={styles.cardValue}>React Native Developer</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Name</Text>
            <Text style={styles.cardValue}>Jane Doe</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Gender</Text>
            <Text style={styles.cardValue}>Female</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Years of Experience</Text>
            <Text style={styles.cardValue}>5 years</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Website Portfolio</Text>
            <Text style={[styles.cardValue, { color: "#007AFF" }]}>https://janedoe.dev</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Location</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="location" size={14} color="#444" style={{ marginRight: 6 }} />
              <Text style={styles.cardValue}>{location}</Text>
            </View>
          </View>
        </View>

        <View style={styles.ratingWrapper}>
          <Text style={styles.subHeading}>Overall Rating</Text>
          <View style={styles.starRow}>
            {[...Array(3)].map((_, i) => (
              <Ionicons key={i} name="star" size={28} color="#FFD700" />
            ))}
          </View>
        </View>

        <Text style={styles.subHeading}>Rate</Text>
        <View style={styles.starRow}>
          {[...Array(5)].map((_, i) => (
            <TouchableOpacity key={i} onPress={() => handleRate(i + 1)}>
              <Ionicons
                name="star"
                size={36}
                color={i < selectedStars ? "#FFD700" : "#ccc"}
              />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionHeading}>Proof of Work</Text>
        <View style={styles.proofGrid}>
          {dummyImages.map((uri, i) => (
            <TouchableOpacity key={i} onPress={() => openModal(i)}>
              <Image source={{ uri }} style={styles.proofImage} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <Image
            source={{ uri: dummyImages[currentImageIndex] }}
            style={styles.lightboxImage}
            resizeMode="contain"
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Ionicons name="close-circle" size={32} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.leftArrow}
            onPress={() => navigateImage("prev")}
          >
            <Ionicons name="chevron-back" size={32} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rightArrow}
            onPress={() => navigateImage("next")}
          >
            <Ionicons name="chevron-forward" size={32} color="#fff" />
          </TouchableOpacity>
        </View>
      </Modal>

      <Toast config={toastConfig} />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 40,
  },
  fixedBackButton: {
    position: "absolute",
    top: 48,
    left: 16,
    zIndex: 10,
    backgroundColor: "#fff",
    padding: 6,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  videoBanner: {
    width: "100%",
    height: 200,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 10,
    textAlign: "center",
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 24,
    marginBottom: 10,
    textAlign: "center",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    gap: 10,
  },
  card: {
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    padding: 12,
    width: "48%",
    marginBottom: 10,
  },
  cardLabel: {
    fontSize: 12,
    color: "#999",
  },
  cardValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  ratingWrapper: {
    marginTop: 16,
  },
  starRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  proofGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
    paddingHorizontal: 20,
    marginTop: 12,
  },
  proofImage: {
    width: (Dimensions.get("window").width - 60) / 2,
    height: 150,
    borderRadius: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  lightboxImage: {
    width: "90%",
    height: "70%",
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
  },
  leftArrow: {
    position: "absolute",
    left: 20,
    top: "50%",
    transform: [{ translateY: -16 }],
  },
  rightArrow: {
    position: "absolute",
    right: 20,
    top: "50%",
    transform: [{ translateY: -16 }],
  },
  customToast: {
    backgroundColor: "#333",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  toastText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "500",
  },
});
