import React from "react";
import { Dimensions, Image, ImageBackground, Text, View } from "react-native";

const SCREEN_WIDTH = Dimensions.get("screen").width;
const SCREEN_HEIGHT = Dimensions.get("screen").height;

const CameraPreview = ({ photo, retakePicture, savePhoto }) => {
  // console.log("photo-Preview", photo.photo.uri);
  // console.log("photo-Preview:", photo);
  return (
    <View
      style={{
        backgroundColor: "rgba(0,0,0,1)",
        height: "100%",
        // position: "absolute",
        width: "100%",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          height: "5%",
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        <Text
          style={{
            borderColor: "white",
            borderWidth: 1,
            color: "white",
            height: "100%",
            marginTop: "2%",
            textAlign: "center",
            textAlignVertical: "center",
            width: "17%",
          }}
          onPress={() => savePhoto(photo.uri)}
        >
          Guardar
        </Text>
        <Text
          style={{
            borderColor: "white",
            borderWidth: 1,
            color: "white",
            height: "100%",
            marginTop: "2%",
            textAlign: "center",
            textAlignVertical: "center",
            width: "17%",
          }}
          onPress={retakePicture}
        >
          Cerrar
        </Text>
      </View>
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={{
          // flex: 1,
          height: "100%",
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
        }}
        resizeMethod="scale"
        resizeMode="contain"
      />
    </View>
  );
};

export default CameraPreview;
