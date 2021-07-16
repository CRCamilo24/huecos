import React from "react";
import { ImageBackground } from "react-native";
import { Image, StyleSheet, Text, View } from "react-native";
import { COLORS, SCREEN_HEIGHT, SCREEN_WIDTH } from "../theme";

export default function Favorite() {
  return (
    <View
      style={{
        alignItems: "flex-start",
        height: "100%",
        backgroundColor: COLORS.primary,
        // borderTopWidth: 1,
      }}
    >
      <ImageBackground
        source={require("../assets/Informacion.png")}
        style={{
          //   borderWidth: 1,
          alignItems: "center",
          height: "35%",
          width: "80%",
          position: "absolute",
          marginTop: SCREEN_HEIGHT * 0.03,
          marginLeft: -SCREEN_HEIGHT * 0.045,
          zIndex: 1,
        }}
        resizeMethod="resize"
        resizeMode="contain"
      >
        <Text
          style={{
            // borderWidth: 1,
            // position: "absolute",
            color: COLORS.secondary,
            fontSize: SCREEN_HEIGHT * 0.03,
            fontWeight: "700",
            textAlign: "left",
            marginTop: SCREEN_HEIGHT * 0.075,
            marginLeft: -SCREEN_HEIGHT * 0.07,
          }}
        >
          REPARA
        </Text>
        <Text
          style={{
            // borderWidth: 1,
            color: COLORS.secondary,
            fontSize: SCREEN_HEIGHT * 0.01,
            fontWeight: "700",
            textAlign: "left",
            //   marginBottom: SCREEN_HEIGHT * 0.8,
            marginRight: "8%",
            width: "23%",
          }}
        >
          Red participativa de reparación y acción
        </Text>
      </ImageBackground>

      <Image
        source={require("../assets/Fondo1.png")}
        style={{
          height: "100%",
          width: "100%",
          marginLeft: -SCREEN_HEIGHT * 0.045,
        }}
        resizeMethod="resize"
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({});
