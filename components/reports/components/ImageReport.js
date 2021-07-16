import React from "react";

import { Dimensions, StyleSheet, View } from "react-native";
import { Image } from "react-native-elements";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../theme";

const widthScreen = Dimensions.get("window").width;

function ImageReport({ imageReport }) {
  return (
    <View style={styles.viewPhoto}>
      <Image
        style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.2 }}
        source={
          imageReport
            ? { uri: imageReport }
            : require("../../../assets/no-image.png")
        }
        resizeMode="cover"
      />
    </View>
  );
}

export default ImageReport;

const styles = StyleSheet.create({
  viewPhoto: {
    // borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    height: SCREEN_HEIGHT * 0.2,
    marginBottom: 20,
  },
});
