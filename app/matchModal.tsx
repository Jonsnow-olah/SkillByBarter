import React, { useEffect } from "react";
import {
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import * as Haptics from "expo-haptics";

const screenHeight = Dimensions.get("window").height;

export default function MatchModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const router = useRouter();
  const slideAnim = new Animated.Value(screenHeight);

  useEffect(() => {
    if (visible) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        onClose();
      }, 9000);
    }
  }, [visible]);

  const handleChat = () => {
    onClose();
    router.push("/chats");
  };

  return (
    <Modal visible={visible} transparent animationType="none">
      <View style={styles.overlay}>
        <Animated.View style={[styles.modalContainer, { transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.title}>You matched with Jude Bellingham</Text>
          <Image
            source={{
              uri: "https://i.pinimg.com/736x/c3/83/df/c383df6f147ac8b320f9061f5118294d.jpg?text=Jude+Bellingham",
            }}
            style={styles.image}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onClose} style={styles.button}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleChat} style={[styles.button, styles.chatBtn]}>
              <Text style={styles.buttonText}>Chat</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
      <Toast />
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    elevation: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  button: {
    flex: 1,
    backgroundColor: "#FF3D34",
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  chatBtn: {
    backgroundColor: "#4CAF50",
  },
});
