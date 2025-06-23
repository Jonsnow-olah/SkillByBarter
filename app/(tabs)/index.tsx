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
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import Swiper from "react-native-deck-swiper";
import { images } from "@/constants/images";


const allSkills = [
  "Graphic Designer",
  "Photoshop Editor",
  "JavaScript Developer",
  "React Native Developer",
  "Motion Graphics Artist",
  "UI/UX Designer",
  "Full Stack Developer",
  "Frontend Engineer",
  "Logo Designer",
  "Web Developer",
];

const users = [
  {
    id: 1,
    name: "Lisa Smith",
    skill: "React Native Developer",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    id: 2,
    name: "John Doe",
    skill: "Graphic Designer",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    id: 3,
    name: "Sophia Williams",
    skill: "Photoshop Editor",
    image: "https://randomuser.me/api/portraits/women/30.jpg",
  },
];

export default function Index() {
  const router = useRouter();

  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showOnboarding, setShowOnboarding] = useState(true);

  const bounceValue = useRef(new Animated.Value(0)).current;

  const users = [
    {
      id: "1",
      name: "Jane Doe",
      skill: "Graphic Designer",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: "2",
      name: "Mark Smith",
      skill: "React Native Developer",
      image: "https://randomuser.me/api/portraits/men/33.jpg",
    },
  ];

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

  useEffect(() => {
    if (showOnboarding) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceValue, {
            toValue: -10,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(bounceValue, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
        { iterations: 2 }
      ).start(() => setShowOnboarding(false));
    }
  }, [showOnboarding]);

  const handleNotificationClick = () => {
    router.push("/notifications");
  };

  const handleSuggestionClick = (skill: string) => {
    setSearchQuery(skill);
    setSearchModalVisible(false);
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="px-5">
        <View className="flex-row justify-between px-2 mt-10 mb-3 items-start p-7">
          <Image
            source={images.logo}
            style={{ width: 70, height: 70 }}
            resizeMode="contain"
          />
          <View className="flex-row gap-5 mt-4">
            <Pressable onPress={() => setSearchModalVisible(true)}>
              <Ionicons name="search" size={22} color="black" />
            </Pressable>
            <Pressable onPress={handleNotificationClick}>
              <View className="relative">
                <Ionicons name="notifications-outline" size={24} />
                <View className="absolute top-0 right-0 w-3 h-2.5 bg-[#FF3D34] rounded-full" />
              </View>
            </Pressable>
          </View>
        </View>

        <Text className="text-lg font-bold px-7 mb-2">Freelancers near you</Text>

        <View className="items-center justify-center -mt-4">
          <Swiper
            cards={users}
            renderCard={(card) => (
              <Animated.View
                className="bg-white rounded-xl p-5 w-[85%] shadow-md"
                style={{ transform: [{ translateY: bounceValue }] }}
              >
                <Image
                  source={{ uri: card.image }}
                  className="w-full h-48 rounded-xl mb-4"
                />
                <Text className="text-xl font-semibold">{card.name}</Text>
                <Text className="text-gray-500">{card.skill}</Text>
              </Animated.View>
            )}
            cardIndex={0}
            backgroundColor="transparent"
            stackSize={2}
            disableBottomSwipe
            disableTopSwipe
          />
        </View>
      </ScrollView>

      {/* Onboarding Text */}
      {showOnboarding && (
        <View className="absolute bottom-24 w-full items-center px-5">
          <Text className="text-center text-sm text-gray-600 bg-white px-4 py-2 rounded-full shadow">
            Swipe left to explore skilled freelancers
          </Text>
        </View>
      )}

      {/* Search Modal */}
      <Modal visible={searchModalVisible} animationType="slide" transparent>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          className="flex-1 justify-center bg-black/50 px-5"
        >
          <View className="bg-white rounded-lg p-5">
            <View className="flex-row items-center border border-gray-300 rounded-md px-3 mb-4">
              <Ionicons name="search" size={20} color="gray" />
              <TextInput
                placeholder="Search skills..."
                className="flex-1 px-2 py-2"
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
                  className="py-2 border-b border-gray-200"
                  onPress={() => handleSuggestionClick(suggestion)}
                >
                  <Text className="text-sm text-gray-700">{suggestion}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text className="text-sm text-gray-400 mt-2">No suggestions found</Text>
            )}
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}