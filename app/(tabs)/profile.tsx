import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";

export default function Profile() {
  const [introVideo, setIntroVideo] = useState<string | null>(null);
  const [thumbPics, setThumbPics] = useState<string[]>([
    "https://i.pinimg.com/736x/c3/83/df/c383df6f147ac8b320f9061f5118294d.jpg",
    "https://i.pinimg.com/736x/38/14/3d/38143d47870166bdad8f399b08248ea8.jpg",
  ]);
  const [proofPics, setProofPics] = useState<(string | null)[]>(
    Array(8).fill(null)
  );
  const [fullName, setFullName] = useState("");
  const [skill, setSkill] = useState("");
  const [skillLearn, setSkillLearn] = useState("");
  const [gender, setGender] = useState("");
  const [yearsExp, setYearsExp] = useState("");
  const [locationAddress, setLocationAddress] = useState("");
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const markChanged = useCallback(() => {
    setUnsavedChanges(true);
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        let { coords } = await Location.getCurrentPositionAsync({});
        let reverse = await Location.reverseGeocodeAsync({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
        if (reverse.length > 0) {
          let addr = reverse[0];
          let formatted = `${addr.city || ""}, ${addr.region || ""}, ${addr.country || ""}`;
          setLocationAddress(formatted);
        }
      }
    })();
  }, []);

  const pickMedia = async (
    onPicked: (uri: string) => void,
    mediaTypes: ImagePicker.MediaTypeOptions
  ) => {
    let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes, quality: 0.7 });
    if (!result.canceled) {
      onPicked(result.assets[0].uri);
      markChanged();
    }
  };

  const pickIntroVideo = () =>
    pickMedia((uri) => setIntroVideo(uri), ImagePicker.MediaTypeOptions.Videos);
  const pickThumbPic = (index: number) =>
    pickMedia((uri) => {
      const arr = [...thumbPics];
      arr[index] = uri;
      setThumbPics(arr);
    }, ImagePicker.MediaTypeOptions.Images);
  const pickProofPic = (index: number) =>
    pickMedia((uri) => {
      const arr = [...proofPics];
      arr[index] = uri;
      setProofPics(arr);
    }, ImagePicker.MediaTypeOptions.Images);

  const hasProof = proofPics.some((uri) => uri !== null);

  const handleSave = () => {
    if (!fullName || !skill || !skillLearn || !gender || !yearsExp || !hasProof) {
      Toast.show({
        type: "info",
        text1: "Fill all the required fields",
      });
      return;
    }

    Toast.show({
      type: "info",
      text1: "Profile successfully updated",
    });
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
          {thumbPics.slice(0, 2).map((uri, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.picThumb}
              onPress={() => pickThumbPic(idx)}
            >
              <Image source={{ uri }} style={styles.picThumb} />
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.picThumb}
            onPress={() => pickThumbPic(thumbPics.length)}
          >
            <View style={styles.plusBox}>
              <Ionicons name="add" size={40} color="#888" />
              <Text style={styles.plusText}>Upload</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Profile</Text>

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

        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
          Proof of Work (required)
        </Text>
        <View style={styles.proofGrid}>
          {proofPics.map((uri, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.proofCard}
              onPress={() => pickProofPic(idx)}
            >
              {uri ? (
                <Image source={{ uri }} style={styles.proofCard} />
              ) : (
                <View style={styles.plusBox}>
                  <Ionicons name="add" size={32} color="#888" />
                  <Text style={styles.plusText}>Upload proof</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
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
  topSpacing: { paddingTop: 40 },
  videoHeading: { fontSize: 16, fontWeight: "600", textAlign: "center", marginTop: 20 },
  videoSub: { fontSize: 13, color: "#666", textAlign: "center", marginBottom: 12 },
  videoBanner: {
    marginHorizontal: 20,
    width: "90%",
    height: 140,
    backgroundColor: "#ddd",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    alignSelf: "center",
  },
  videoBannerText: { color: "#555", fontSize: 14 },
  pictureRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
  },
  picThumb: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  plusBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  plusText: {
    color: "#888",
    fontSize: 12,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginHorizontal: 20,
    marginTop: 10,
  },
  input: {
    marginHorizontal: 20,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  locationLabel: {
    marginHorizontal: 20,
    marginTop: 12,
    fontSize: 13,
    color: "#444",
  },
  proofGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 20,
    justifyContent: "space-between",
  },
  proofCard: {
    width: "48%",
    height: 120,
    borderRadius: 8,
    marginBottom: 12,
  },
  saveButton: {
    backgroundColor: "#FF3D34",
    paddingVertical: 14,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 40,
  },
  saveButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },

  // TOAST STYLES
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
