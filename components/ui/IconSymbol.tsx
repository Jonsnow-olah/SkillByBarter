import Ionicons from "@expo/vector-icons/Ionicons";
import { ComponentProps } from "react";
import { OpaqueColorValue, StyleProp, TextStyle } from "react-native";

type IconName = "home" | "people";

interface IconSymbolProps {
  name: IconName;
  focused?: boolean;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
}

export function IconSymbol({
  name,
  focused = true,
  size = 24,
  color,
  style,
}: IconSymbolProps) {
  const iconName = focused
    ? name
    : (`${name}-outline` as ComponentProps<typeof Ionicons>["name"]);

  return <Ionicons name={iconName} size={size} color={color} style={style} />;
}
