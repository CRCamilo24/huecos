import React, { useEffect } from "react";
import { useState } from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { Camera } from "expo-camera";

const TakePhoto = ({ showCamera, setShowCamera }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        alignItems: "center",
        height: "100%",
        justifyContent: "center",
        position: "absolute",
        width: "100%",
      }}
    >
      {showCamera && (
        <Camera
          style={{
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: 5,
            height: 700,
            justifyContent: "flex-start",
            width: "90%",
          }}
          type={type}
        >
          <View
            style={{
              borderColor: "white",
              borderWidth: 1,
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            <Text
              style={{ color: "white" }}
              onPress={() => setShowCamera(false)}
            >
              CLOSE
            </Text>
            <TouchableOpacity
              style={{}}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Text style={{ color: "white" }}> Flip </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
};

export default TakePhoto;

const styles = StyleSheet.create({
  containerIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 70,
    width: 79,
    backgroundColor: "#e3e3e3",
  },
});
