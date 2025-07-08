import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Modal,
  Linking,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import MapView, { Marker } from "react-native-maps";

const dummyDetails = {
  "1": {
    title: "Tech Hangout @ Yaba",
    banner: require("@/assets/images/party1.jpg"),
    description:
      "Join a relaxed weekend hangout with developers, designers and freelancers. Come network, play games and have fun.",
    location: "Yaba, Lagos",
    fullAddress: "Civic Innovation Hub, 50 Herbert Macaulay Way, Yaba, Lagos",
    date: "Saturday, July 20 · 4:00 PM",
    startTime: "2024-07-20T16:00:00",
    coordinates: { latitude: 6.5124, longitude: 3.3792 },
    attendees: 34,
    price: "₦2,000",
    ticketUrl: "https://techhangout.example.com",
    gallery: [
      require("@/assets/images/party3.jpg"),
      require("@/assets/images/party4.jpg"),
      require("@/assets/images/party5.jpg"),
    ],
  },
};

export default function EventDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const event = dummyDetails[id || ""];

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [attending, setAttending] = useState(event?.attendees || 0);
  const [response, setResponse] = useState<"yes" | "no" | null>(null);

  if (!event) return null;

  const handleImagePress = (image: any) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const handleAttend = (choice: "yes" | "no") => {
    if (choice === "yes" && response !== "yes") {
      setAttending((prev) => prev + 1);
      if (response === "no") setResponse("yes");
      else setResponse("yes");
    } else if (choice === "no" && response !== "no") {
      if (response === "yes") {
        setAttending((prev) => Math.max(prev - 1, 0));
      }
      setResponse("no");
    }
  };

  const openMapApp = () => {
    const { latitude, longitude } = event.coordinates;
    const label = encodeURIComponent(event.fullAddress);
    const url =
      Platform.OS === "ios"
        ? `http://maps.apple.com/?ll=${latitude},${longitude}&q=${label}`
        : `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  const openCalendar = () => {
    const start = new Date(event.startTime);
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // 2hr duration
    const format = (d: Date) =>
      `${d.getFullYear()}${(d.getMonth() + 1)
        .toString()
        .padStart(2, "0")}${d.getDate().toString().padStart(2, "0")}T${d
        .getHours()
        .toString()
        .padStart(2, "0")}${d.getMinutes().toString().padStart(2, "0")}00`;

    const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.title
    )}&details=${encodeURIComponent(
      event.description
    )}&location=${encodeURIComponent(
      event.fullAddress
    )}&dates=${format(start)}/${format(end)}`;

    Linking.openURL(calendarUrl);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity onPress={() => handleImagePress(event.banner)}>
          <Image source={event.banner} style={styles.banner} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.title}>{event.title}</Text>

          <Text style={styles.description}>{event.description}</Text>

          <TouchableOpacity onPress={openCalendar} style={styles.calendarButton}>
            <Ionicons name="calendar" size={16} color="#FF3D34" />
            <Text style={styles.calendarText}>Add to Calendar</Text>
          </TouchableOpacity>

          {/* Grid Info Cards */}
          <View style={styles.gridWrapper}>
            <View style={styles.gridCard}>
              <Ionicons name="calendar" size={16} color="#444" />
              <Text style={styles.gridText}>{event.date}</Text>
            </View>
            <View style={styles.gridCard}>
              <Ionicons name="people" size={16} color="#444" />
              <Text style={styles.gridText}>{attending} attending</Text>
            </View>
            <View style={styles.gridCard}>
              <Ionicons name="location" size={16} color="#444" />
              <Text style={styles.gridText}>{event.fullAddress}</Text>
            </View>
          </View>

          {/* Map */}
          <View style={{ marginVertical: 15 }}>
            <Text style={styles.mapLabel}>Event Location</Text>
            <View>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: event.coordinates.latitude,
                  longitude: event.coordinates.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
              >
                <Marker
                  coordinate={event.coordinates}
                  title={event.title}
                  description={event.location}
                />
              </MapView>
              <TouchableOpacity style={styles.mapOverlay} onPress={openMapApp}>
                <Text style={styles.mapOverlayText}>Open in Map</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Attend Prompt */}
          <View style={styles.attendBox}>
            <Text style={styles.attendQuestion}>Will you be attending?</Text>
            <View style={styles.attendButtons}>
              <TouchableOpacity
                onPress={() => handleAttend("yes")}
                style={[
                  styles.attendYes,
                  response === "yes" && { opacity: 0.5 },
                ]}
                disabled={response === "yes"}
              >
                <Text style={styles.attendText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleAttend("no")}
                style={[
                  styles.attendNo,
                  response === "no" && { opacity: 0.5 },
                ]}
                disabled={response === "no"}
              >
                <Text style={[styles.attendText, { color: "#fff" }]}>No</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Price & Ticket */}
          <Text style={styles.priceLabel}>
            {event.price === "Free" ? "🎉 Free Event" : `💳 Price: ${event.price}`}
          </Text>

          {event.ticketUrl ? (
            <TouchableOpacity
              onPress={() => Linking.openURL(event.ticketUrl)}
              style={styles.ticketButton}
            >
              <Text style={styles.ticketText}>Get Tickets</Text>
            </TouchableOpacity>
          ) : null}

          {/* Gallery */}
          <Text style={styles.galleryTitle}>Gallery</Text>
          <FlatList
            horizontal
            data={event.gallery}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleImagePress(item)}>
                <Image source={item} style={styles.galleryImage} />
              </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>

      {/* Image Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalClose}
            onPress={() => setModalVisible(false)}
          >
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
          {selectedImage && (
            <Image source={selectedImage} style={styles.fullImage} resizeMode="contain" />
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  banner: { width: "100%", height: 220 },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 6,
    borderRadius: 20,
  },
  content: { padding: 20 },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 10 },
  description: { fontSize: 14, color: "#555", marginBottom: 10 },
  calendarButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  calendarText: {
    color: "#FF3D34",
    marginLeft: 6,
    fontWeight: "600",
  },
  gridWrapper: {
    flexDirection: "column",
    gap: 12,
    marginBottom: 16,
  },
  gridCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 10,
  },
  gridText: {
    marginLeft: 10,
    fontSize: 13,
    color: "#444",
    flex: 1,
    flexWrap: "wrap",
  },
  map: {
    width: "100%",
    height: 180,
    borderRadius: 10,
  },
  mapLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    color: "#111",
  },
  mapOverlay: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#FF3D34",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  mapOverlayText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
  attendBox: {
    backgroundColor: "#fff6f6",
    borderColor: "#FF3D34",
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  attendQuestion: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 10,
    color: "#111",
  },
  attendButtons: {
    flexDirection: "row",
    gap: 15,
  },
  attendYes: {
    backgroundColor: "#FF3D34",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  attendNo: {
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  attendText: {
    color: "#fff",
    fontWeight: "600",
  },
  priceLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 10,
    color: "#FF3D34",
  },
  ticketButton: {
    backgroundColor: "#FF3D34",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  ticketText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  galleryTitle: { fontSize: 16, fontWeight: "600", marginBottom: 10 },
  galleryImage: {
    width: 140,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "100%",
    height: "80%",
  },
  modalClose: {
    position: "absolute",
    top: 60,
    right: 20,
    zIndex: 1,
  },
});
