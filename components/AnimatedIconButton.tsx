import React, { useRef, useState, useEffect } from "react";
import {
  Animated,
  Text,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
  color: string;
  onPress: () => void;
}

export default function AnimatedIconButton({ icon, text, color, onPress }: Props) {
  const widthAnim = useRef(new Animated.Value(48)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslate = useRef(new Animated.Value(10)).current;

  const [expanded, setExpanded] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const expand = () => {
    Animated.timing(widthAnim, {
      toValue: 140,
      duration: 250,
      useNativeDriver: false,
    }).start(() => {
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(textTranslate, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const retract = () => {
    Animated.parallel([
      Animated.timing(textOpacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(textTranslate, {
        toValue: 10,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.timing(widthAnim, {
        toValue: 48,
        duration: 250,
        useNativeDriver: false,
      }).start(() => setExpanded(false));
    });
  };

  const handlePress = () => {
    if (!expanded) {
      setExpanded(true);
      expand();

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => retract(), 5000);
    } else {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      onPress();
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Animated.View style={[styles.wrapper, { backgroundColor: color, width: widthAnim }]}>
        <Ionicons name={icon} size={22} color="#fff" />
        {expanded && (
          <Animated.Text
            style={[
              styles.text,
              {
                opacity: textOpacity,
                transform: [{ translateX: textTranslate }],
              },
            ]}
          >
            {text}
          </Animated.Text>
        )}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 48,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    gap: 8,
    elevation: 4,
  },
  text: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
});
