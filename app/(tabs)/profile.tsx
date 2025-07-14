import React, { useState, useEffect, useCallback } from "react";
import {
  View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";

export default function Profile() {
  const maxProof = 8;
  const [introVideo, setIntroVideo] = useState<string | null>(null);
  const [thumbPics, setThumbPics] = useState<string[]>([]);
  const [proofPics, setProofPics] = useState<string[]>([]);

  const [fullName, setFullName] = useState("");
  const [skill, setSkill] = useState("");
  const [skillLearn, setSkillLearn] = useState("");
  const [gender, setGender] = useState("");
  const [yearsExp, setYearsExp] = useState("");
  const [locationAddress, setLocationAddress] = useState("");
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const markChanged = useCallback(() => setUnsavedChanges(true), []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        let { coords } = await Location.getCurrentPositionAsync({});
        let rev = await Location.reverseGeocodeAsync(coords);
        if (rev[0]) {
          const addr = rev[0];
          setLocationAddress(`${addr.city}, ${addr.region}, ${addr.country}`);
        }
      }
    })();
  }, []);

  const pickMedia = async (
    onPicked: (uri: string) => void,
    mediaTypes: ImagePicker.MediaTypeOptions
  ) => {
    let r = await ImagePicker.launchImageLibraryAsync({ mediaTypes, quality: 0.7 });
    if (!r.canceled) {
      onPicked(r.assets[0].uri);
      markChanged();
    }
  };

  const pickProof = () =>
    pickMedia((u) => {
      if (proofPics.length < maxProof) {
        setProofPics((p) => [...p, u]);
      }
    }, ImagePicker.MediaTypeOptions.Images);

  const confirmDeletePic = (uri: string, type: "thumb" | "proof") => {
    Alert.alert("Delete Image", "Are you sure you want to delete this image?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          if (type === "proof") {
            setProofPics((prev) => prev.filter((p) => p !== uri));
          } else {
            setThumbPics((prev) => prev.filter((p) => p !== uri));
          }
          markChanged();
          Toast.show({ type: "info", text1: "Image deleted" });
        },
      },
    ]);
  };

  const pickIntroVideo = () =>
    pickMedia((u) => setIntroVideo(u), ImagePicker.MediaTypeOptions.Videos);

  const pickThumbPic = (idx: number) =>
    pickMedia((u) => {
      const arr = [...thumbPics];
      arr[idx] = u;
      setThumbPics(arr);
    }, ImagePicker.MediaTypeOptions.Images);

  const handleSave = () => {
    if (!fullName || !skill || !skillLearn || !gender || !yearsExp || proofPics.length === 0) {
      Toast.show({ type: "info", text1: "Fill all the required fields" });
      return;
    }
    Toast.show({ type: "info", text1: "Profile successfully updated" });
    setUnsavedChanges(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topSpacing}>
        <Text style={styles.videoHeading}>Upload your introductory video</Text>
        <Text style={styles.videoSub}>
          Your video will be shown to other skilled people that view your profile
        </Text>
        <TouchableOpacity style={styles.videoBanner} onPress={pickIntroVideo}>
          <Ionicons name="videocam-outline" size={40} color="#fff" />
          <Text style={styles.videoBannerText}>
            {introVideo ? "Change video" : "Upload a video"}
          </Text>
        </TouchableOpacity>

        <View style={styles.pictureRow}>
          {thumbPics.map((uri, idx) => (
            <View key={idx} style={styles.picWrapper}>
              <Image source={{ uri }} style={styles.picThumb} />
              <TouchableOpacity
                style={styles.deleteIconSmall}
                onPress={() => confirmDeletePic(uri, "thumb")}
              >
                <Ionicons name="close-circle" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          ))}
          {thumbPics.length < 3 && (
            <TouchableOpacity
              style={styles.picThumb}
              onPress={() => pickThumbPic(thumbPics.length)}
            >
              <View style={styles.plusBox}>
                <Ionicons name="add" size={40} color="#888" />
                <Text style={styles.plusText}>Upload</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        <TextInput
          style={styles.input}
          placeholder="Full Name *"
          value={fullName}
          onChangeText={(t) => {
            setFullName(t);
            markChanged();
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Skill *"
          value={skill}
          onChangeText={(t) => {
            setSkill(t);
            markChanged();
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Skill you want to learn *"
          value={skillLearn}
          onChangeText={(t) => {
            setSkillLearn(t);
            markChanged();
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Gender *"
          value={gender}
          onChangeText={(t) => {
            setGender(t);
            markChanged();
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Years of experience *"
          keyboardType="numeric"
          value={yearsExp}
          onChangeText={(t) => {
            setYearsExp(t);
            markChanged();
          }}
        />
        <TextInput
          style={[styles.input, { backgroundColor: "#eee" }]}
          value={locationAddress}
          editable={false}
        />

        <Text style={styles.sectionTitle}>Proof of Work (required)</Text>
        <Text style={styles.subText}>You can upload up to 8 photos</Text>
        <View style={styles.proofGrid}>
          {proofPics.map((uri) => (
            <View key={uri} style={styles.proofCardWrapper}>
              <Image source={{ uri }} style={styles.proofCard} />
              <TouchableOpacity
                style={styles.deleteIconSmall}
                onPress={() => confirmDeletePic(uri, "proof")}
              >
                <Ionicons name="close-circle" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          ))}
          {proofPics.length < maxProof && (
            <TouchableOpacity style={styles.proofCardWrapper} onPress={pickProof}>
              <View style={styles.plusBoxProof}>
                <Ionicons name="add" size={32} color="#888" />
              </View>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          onPress={handleSave}
          disabled={!unsavedChanges}
          style={[
            styles.saveButton,
            !unsavedChanges && { backgroundColor: "#ccc" },
          ]}
        >
          <Text style={styles.saveButtonText}>Save Profile</Text>
        </TouchableOpacity>
      </View>

      <Toast
        config={{
          info: (props) => (
            <View style={styles.toastContainer}>
              <Text style={styles.toastText}>{props.text1}</Text>
            </View>
          ),
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  topSpacing: { paddingTop: 40, paddingBottom: 40 },
  videoHeading: { fontSize: 16, fontWeight: "600", textAlign: "center", marginTop: 20 },
  videoSub: { fontSize: 13, color: "#666", textAlign: "center", marginBottom: 12 },
  videoBanner: {
    marginHorizontal: 20,
    height: 140,
    backgroundColor: "#ccc",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  videoBannerText: { color: "#555", fontSize: 14 },
  pictureRow: { flexDirection: "row", paddingHorizontal: 20, marginVertical: 20 },
  picWrapper: { position: "relative", marginRight: 10 },
  picThumb: { width: 100, height: 100, borderRadius: 8, backgroundColor: "#eee" },
  plusBox: { flex: 1, alignItems: "center", justifyContent: "center" },
  plusText: { color: "#888", fontSize: 12, marginTop: 4 },
  input: {
    marginHorizontal: 20,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  sectionTitle: { marginHorizontal: 20, fontSize: 18, fontWeight: "600", marginTop: 20 },
  subText: { marginHorizontal: 20, fontSize: 13, color: "#666", marginBottom: 8 },
  proofGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 20,
    justifyContent: "space-between",
  },
  proofCardWrapper: {
    width: "48%",
    height: 120,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    position: "relative",
    overflow: "hidden",
  },
  proofCard: { width: "100%", height: "100%" },
  plusBoxProof: { flex: 1, alignItems: "center", justifyContent: "center" },
  deleteIconSmall: {
    position: "absolute", top: 4, right: 4,
    backgroundColor: "rgba(0,0,0,0.4)", borderRadius: 12,
  },
  saveButton: {
    backgroundColor: "#FF3D34",
    paddingVertical: 14,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  toastContainer: {
    backgroundColor: "#333",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    alignSelf: "center",
    marginTop: 50,
  },
  toastText: { color: "#fff", fontSize: 13 },
});
