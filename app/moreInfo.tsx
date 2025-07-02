import React, { useState } from "react";
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
import Toast from "react-native-toast-message";

const dummyImages = [
  "https://i.pinimg.com/736x/17/ce/04/17ce041d312fa6d09c878ab31b318afd.jpg?text=Proof1",
  "https://i.pinimg.com/736x/00/a5/3e/00a53e462d010992000f879817d3a0db.jpg?text=Proof2",
  "https://i.pinimg.com/736x/0d/14/94/0d1494e2ea7283d8bc00b22d41fdf673.jpg?text=Proof3",
  "https://i.pinimg.com/736x/5a/cb/4a/5acb4ad15ae73b988bfef927336b5bab.jpg?text=Proof4",
  "https://i.pinimg.com/736x/1e/6f/55/1e6f557ff71a6a7194b6f45aa9ae1516.jpg?text=Proof5",
  "https://i.pinimg.com/736x/72/11/fb/7211fb4baa5a88c2d5bbe3a325e5d48f.jpg?text=Proof6",
  "https://i.pinimg.com/736x/9f/ad/80/9fad800e43eb36b0314326bf5e983fce.jpg?text=Proof7",
  "https://i.pinimg.com/736x/62/78/9f/62789f713475cf1be5e40e4150c63a11.jpg?text=Proof8",
];

const dummyReviews = [
  {
    name: "John Smith",
    avatar: "https://i.pinimg.com/736x/bb/6a/ef/bb6aef8c1bd48cd8b3b41725eaba18e3.jpg?text=JS",
    review: "Great experience working with Jane!",
    stars: 4,
  },
  {
    name: "Layi Wasabi",
    avatar: "https://i.pinimg.com/736x/a8/29/ae/a829ae32929de50f772278ce3fd5a4ba.jpg?text=EC",
    review: "Very professional and skilled.",
    stars: 5,
  },
  {
    name: "David Lee",
    avatar: "https://i.pinimg.com/736x/0d/5a/60/0d5a60a562f8754e876a414b4dbce933.jpg?text=DL",
    review: "Quick delivery and excellent communication.",
    stars: 5,
  },
  {
    name: "Sophia King",
    avatar: "https://i.pinimg.com/736x/0a/d6/81/0ad6818b2afe8d602c24989226a30b2e.jpg?text=SK",
    review: "Highly recommended!",
    stars: 4,
  },
  {
    name: "Lucia",
    avatar: "https://i.pinimg.com/736x/89/5c/e9/895ce9b162a6dd229795babb12420b60.jpg?text=MP",
    review: "Good work overall, will hire again.",
    stars: 3,
  },
];

export default function MoreInfo() {
  const router = useRouter();
  const [selectedStars, setSelectedStars] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const handleRate = (stars: number) => {
    setSelectedStars(stars);
    Toast.show({
      type: "info",
      text1: `You rated Jude Bellingham ${stars} star${stars > 1 ? "s" : ""}`,
      position: "top",
      visibilityTime: 2000,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <TouchableOpacity onPress={() => router.back()} style={styles.fixedBackButton}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.videoBanner}>
          <Entypo name="youtube" size={48} color="#e50a0a" />
        </View>

        <Text style={styles.sectionHeading}>Portfolio</Text>
        <View style={styles.cardGrid}>
          {[
            { label: "Skill", value: "React Native Developer" },
            { label: "Name", value: "Jude Bellingham" },
            { label: "Gender", value: "Male" },
            { label: "Years of Experience", value: "5 years" },
            {
              label: "Website Portfolio",
              value: "https://judebell.dev",
              isLink: true,
            },
            {
              label: "Location",
              value: "Lagos, Nigeria",
              icon: <Ionicons name="location" size={16} color="#FF3D34" />,
            },
          ].map((item, i) => (
            <View key={i} style={styles.card}>
              <Text style={styles.cardLabel}>{item.label}</Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                {item.icon}
                <Text
                  style={[
                    styles.cardValue,
                    item.isLink && { color: "#007AFF" },
                  ]}
                >
                  {item.value}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.ratingSection}>
          <Text style={styles.sectionHeading}>Overall Rating</Text>
          <View style={styles.starRow}>
            {[...Array(3)].map((_, i) => (
              <Ionicons key={i} name="star" size={26} color="#FFD700" />
            ))}
          </View>

          <Text style={styles.rateHeading}>Rate</Text>
          <View style={styles.starRow}>
            {[...Array(5)].map((_, i) => (
              <TouchableOpacity key={i} onPress={() => handleRate(i + 1)}>
                <Ionicons
                  name="star"
                  size={30}
                  color={i < selectedStars ? "#FFD700" : "#ccc"}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Proof of Work</Text>
          <View style={styles.proofGrid}>
            {dummyImages.map((uri, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  setActiveImage(i);
                  setModalVisible(true);
                }}
              >
                <Image source={{ uri }} style={styles.proofImage} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Reviews</Text>
          {dummyReviews.map((review, i) => (
            <View key={i} style={styles.reviewCard}>
              <Image source={{ uri: review.avatar }} style={styles.avatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.reviewerName}>{review.name}</Text>
                <View style={[styles.starRow, { justifyContent: "flex-start", marginTop: 4 }]}>
                  {[...Array(review.stars)].map((_, j) => (
                    <Ionicons key={j} name="star" size={16} color="#FFD700" />
                  ))}
                </View>
                <Text style={styles.reviewText}>{review.review}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <Image
            source={{ uri: dummyImages[activeImage] }}
            style={styles.modalImage}
            resizeMode="contain"
          />
          <View style={styles.navArrows}>
            <TouchableOpacity
              disabled={activeImage === 0}
              onPress={() => setActiveImage((prev) => prev - 1)}
            >
              <Ionicons name="chevron-back-circle" size={40} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              disabled={activeImage === dummyImages.length - 1}
              onPress={() => setActiveImage((prev) => prev + 1)}
            >
              <Ionicons name="chevron-forward-circle" size={40} color="#fff" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.closeBtn}
          >
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      </Modal>

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

const screenWidth = Dimensions.get("window").width;

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
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 16,
  },
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    gap: 12,
    paddingHorizontal: 10,
  },
  card: {
    width: "46%",
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 10,
    marginBottom: 14,
  },
  cardLabel: {
    fontSize: 12,
    color: "#666",
  },
  cardValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  ratingSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  rateHeading: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  starRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  proofGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 8,
    marginTop: 10,
  },
  proofImage: {
    width: (screenWidth - 60) / 2,
    height: 100,
    borderRadius: 8,
  },
  reviewCard: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  reviewerName: {
    fontWeight: "bold",
    fontSize: 14,
  },
  reviewText: {
    fontSize: 13,
    marginTop: 6,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: screenWidth - 40,
    height: 400,
    marginBottom: 20,
  },
  navArrows: {
    flexDirection: "row",
    gap: 40,
  },
  closeBtn: {
    position: "absolute",
    top: 40,
    right: 20,
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
