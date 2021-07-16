import { Dimensions } from "react-native";

export const SCREEN_WIDTH = Dimensions.get("screen").width;
export const SCREEN_HEIGHT = Dimensions.get("screen").height;

export const COLORS = {
  primary: "#e8b025",
  primaryDeg: "rgba(232,176,37,0.4)",
  secondaryDeg: "rgba(0,30,122,0.4)",
  secondary: "#001e7a",
  white: "#FFF",
  dark: "#41007A",
  gray: "#E8E8E8",
  error: "#E0378A",
  black: "#000000",
  black87: "rgba(0, 0, 0, 0.87)",
  black38: "rgba(0, 0, 0, 0.38)",
  buttonOpacity: "rgba(115,39,170, 0.4)",
};

export const FONT_SIZE = {
  small: SCREEN_HEIGHT * 0.016,
  normal: SCREEN_HEIGHT * 0.018,
  large: SCREEN_HEIGHT * 0.02,
};

export const StackTheme = {
  headerStyle: {
    backgroundColor: COLORS.primary,
    height: SCREEN_HEIGHT * 0.1,
    borderColor: "rgba(0,0,0,0.4)",
    borderBottomColor: "rgba(0,0,0,0.2)",
    borderBottomWidth: 0,
    elevation: 3,
    borderBottomWidth: 2,
    shadowOffset: { height: 1, width: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
  },
  headerTitleStyle: {
    backgroundColor: COLORS.primary,
  },
};
