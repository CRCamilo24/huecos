import React, { useEffect } from "react";
import { useState } from "react";
import { Text, StyleSheet, TouchableOpacity, View, Alert } from "react-native";
import { Camera } from "expo-camera";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import CameraPreview from "./Preview";

const TakePhoto = ({
  showCamera,
  setShowCamera,
  imagesSelected,
  setImagesSelected,
}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [capture, setCapture] = useState({});
  const [preview, setPreview] = useState(false);
  const navigation = useNavigation();

  const isFocused = useIsFocused();

  let camera;

  const snap = async () => {
    if (!camera) return;
    const photo = await camera.takePictureAsync({ quality: 1 });
    setCapture(photo);
    setPreview(true);
    // setShowCamera(false);
    // console.log("photo:-TAKEPHOTO", photo);
  };

  const retakePicture = () => {
    setCapture(null);
    setPreview(false);
    setShowCamera(true);
  };

  useEffect(() => {
    if (!isFocused) {
      setShowCamera(false);
    }
  }, [isFocused]);

  useEffect(() => {
    showCamera &&
      (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        console.log(status);
        if (status === "granted") {
          setShowCamera(true);
          setHasPermission(status === "granted");
        } else {
          Alert.alert("Acceso denegado");
          setShowCamera(false);
          navigation.navigate("reports");
        }
      })();
  }, [showCamera]);

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
        zIndex: 1,
      }}
    >
      {preview && capture ? (
        <CameraPreview
          photo={capture}
          retakePicture={retakePicture}
          imagesSelected={imagesSelected}
          setImagesSelected={setImagesSelected}
        />
      ) : (
        <Camera
          style={{
            alignItems: "center",
            backgroundColor: "white",
            height: "100%",
            justifyContent: "flex-start",
            width: "90%",
          }}
          type={type}
          ref={(r) => {
            camera = r;
          }}
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
              CERRAR
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
              <Text style={{ color: "white" }}> ROTAR </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              // flex: 1,
              position: "absolute",
              // borderWidth: 1,
              borderColor: "white",
              top: "85%",
            }}
          >
            <TouchableOpacity style={styles.cameraButtons} onPress={snap}>
              <Text
                style={{
                  fontSize: 18,
                  color: "white",
                }}
              >
                Capturar
              </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
};

export default TakePhoto;

const styles = StyleSheet.create({
  cameraButtons: {
    borderColor: "white",
    borderRadius: 5,
    borderWidth: 2,
    justifyContent: "center",
    margin: 5,
    padding: 15,
  },
  containerIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 70,
    width: 79,
    backgroundColor: "#e3e3e3",
  },
});
