import React from "react";

import { Dimensions, StyleSheet, View } from "react-native";
import { Image } from "react-native-elements";

const widthScreen = Dimensions.get("window").width;

function ImageReport({ imageReport }) {
  return (
    <View style={styles.viewPhoto}>
      <Image
        style={{ width: widthScreen, height: 200 }}
        source={
          imageReport
            ? { uri: imageReport }
            : require("../../../assets/no-image.png")
        }
      />
    </View>
  );
}

export default ImageReport;

const styles = StyleSheet.create({
  viewPhoto: {
    alignItems: "center",
    height: 200,
    marginBottom: 20,
  },
});
