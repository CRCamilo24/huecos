import React from "react";
import { Image, ImageBackground, Text, View } from "react-native";

const CameraPreview = ({ photo, retakePicture, savePhoto }) => {
  // console.log("photo-Preview", photo.photo.uri);
  // console.log("photo-Preview:", photo);
  return (
    <View
      style={{
        backgroundColor: "rgba(0,0,0,1)",
        flex: 1,
        height: "100%",
        // position: "absolute",
        width: "100%",
      }}
    >
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={{
          flex: 1,
          height: "100%",
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
        }}
        resizeMethod="scale"
        resizeMode="contain"
      >
        <Text
          style={{
            borderColor: "white",
            borderWidth: 1,
            color: "white",
            height: "5%",
            marginTop: "5%",
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
            height: "5%",
            marginTop: "5%",
            textAlign: "center",
            textAlignVertical: "center",
            width: "17%",
          }}
          onPress={retakePicture}
        >
          Cerrar
        </Text>
      </ImageBackground>
    </View>
  );
};

export default CameraPreview;
