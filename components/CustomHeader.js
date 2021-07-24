import React from "react";
import { ImageBackground } from "react-native";
import { Image, View, Text } from "react-native";
import { COLORS, FONT_SIZE, SCREEN_HEIGHT, SCREEN_WIDTH } from "../theme";

const CustomHeader = ({ title }) => {
  return (
    <View
      style={{
        // backgroundColor: COLORS.primary,
        alignItems: "center",
        flexDirection: "row",
        // borderWidth: 1,
        height: SCREEN_HEIGHT * 0.1,
        width: SCREEN_WIDTH,
        // marginLeft: -SCREEN_WIDTH * 0.037,
      }}
    >
      <View
        style={{
          height: SCREEN_HEIGHT * 0.1,
          width: SCREEN_HEIGHT * 0.1,
        }}
      >
        <ImageBackground
          source={require("./../assets/Informacion.png")}
          style={{
            alignItems: "center",
            // borderRightWidth: 1,
            // flex: 1,
            height: SCREEN_HEIGHT * 0.065,
            // justifyContent: "flex-end",
            width: "100%",
          }}
          resizeMode="contain"
        >
          <Text
            style={{
              fontWeight: "700",
              fontSize: SCREEN_HEIGHT * 0.018,
              color: COLORS.secondary,
              //   position: "absolute",
              marginTop: SCREEN_HEIGHT * 0.052,
            }}
          >
            REPARA
          </Text>
          <Text
            style={{
              // borderWidth: 1,
              color: COLORS.secondary,
              fontSize: SCREEN_HEIGHT * 0.0045,
              fontWeight: "700",
              textAlign: "left",
              //   marginBottom: SCREEN_HEIGHT * 0.8,
              marginLeft: "25%",
              width: "40%",
            }}
            // numberOfLines={3}
          >
            Red participativa de reparación y acción
          </Text>
        </ImageBackground>
      </View>
      <View
        style={{
          borderRightWidth: 1,
          height: SCREEN_HEIGHT * 0.09,
          borderColor: COLORS.secondary,
        }}
      />
      <Text
        style={{
          color: COLORS.secondary,
          fontSize: SCREEN_HEIGHT * 0.025,
          fontWeight: "700",
          paddingLeft: SCREEN_HEIGHT * 0.01,
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default CustomHeader;
