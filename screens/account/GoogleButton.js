import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import googleLogo from "../../assets/g_logo.png";

const SCREEN_WIDTH = Dimensions.get("screen").width;
const SCREEN_HEIGHT = Dimensions.get("screen").height;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 11,
    height: SCREEN_HEIGHT / 16,
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    backgroundColor: "white",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 7,
    marginTop: 10,
    width: "90%",
  },
  icon: {
    width: 26,
    height: 26,
  },
  text: {
    color: "black",
    fontSize: 14,
    letterSpacing: SCREEN_WIDTH / 297.6,
    textTransform: "uppercase",
  },
});

const GoogleButton = ({ signUp, ...rest }) => (
  <View style={{ alignItems: "center", width: "100%" }}>
    <TouchableOpacity style={styles.container} {...rest}>
      <Image style={styles.icon} source={googleLogo} />
      <Text style={styles.text}>
        {`${signUp ? "Sign up " : "Sign In "} with Google`}
      </Text>
    </TouchableOpacity>
  </View>
);

GoogleButton.defaultProps = {
  signUp: false,
};

export default GoogleButton;
