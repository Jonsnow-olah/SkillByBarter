import { View, Text} from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";



const _Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
         height: 75,
        paddingBottom: 8,
        paddingTop: 8,
        justifyContent: 'center',
        alignItems: 'center',
        },
        tabBarLabelStyle: {
          fontSize: 11,
          lineHeight: 16,
          paddingTop: 2,
          flexWrap: 'nowrap',
          textAlign: 'center',
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          width: 100,
        },
      }}
    >
          <Tabs.Screen
        name="index"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                   width: 80,
                  height: 80,
                  alignItems: "center",
                  justifyContent: "center",
              }}
            >
              <Ionicons
                name={focused ? "compass" : "compass-outline"}
                size={24}
                color={focused ? "#FF3D34" : "#888"}
                style={{ marginTop: 10 }}
              />
              <Text
                style={{
                  fontSize: 10,
                  color: focused ? "#FF3D34" : "#888",
                  marginTop: 5,
                  lineHeight: 15,
                }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />

        <Tabs.Screen
        name="likes"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 80,
                height: 80,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name={focused ? "heart" : "heart-outline"}
                size={24}
                color={focused ? "#FF3D34" : "#888"}
                style={{ marginTop: 10 }}
              />
              <Text
                style={{
                  fontSize: 10,
                  color: focused ? "#FF3D34" : "#888",
                  marginTop: 5,
                  lineHeight: 10,
                  paddingTop: 4,
                  
                  
                }}
              >
                Matches
              </Text>
            </View>
          ),
        }}
      />

        <Tabs.Screen
        name="chats"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                 width: 80,
                height: 80,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name={focused ? "chatbubbles" : "chatbubbles-outline"}
                size={24}
                color={focused ? "#FF3D34" : "#888"}
                style={{ marginTop: 10 }}
              />
              <Text
                style={{
                  fontSize: 10,
                  color: focused ? "#FF3D34" : "#888",
                  marginTop: 5,
                }}
              >
                Chats
              </Text>
            </View>
          ),
        }}
      />

        <Tabs.Screen
        name="community"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                 width: 80,
                height: 80,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name={focused ? "game-controller" : "game-controller-outline"}
                size={24}
                color={focused ? "#FF3D34" : "#888"}
                style={{ marginTop: 10 }}
              />
              <Text
                style={{
                  fontSize: 10,
                  color: focused ? "#FF3D34" : "#888",
                  marginTop: 5,
                }}
              >
                Touch Grass
              </Text>
            </View>
          ),
        }}
      />

        <Tabs.Screen
        name="profile"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                 width: 80,
                height: 80,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={24}
                color={focused ? "#FF3D34" : "#888"}
                style={{ marginTop: 10 }}
              />
              <Text
                style={{
                  fontSize: 10,
                  color: focused ? "#FF3D34" : "#888",
                  marginTop: 5,
                }}
              >
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

export default _Layout;
