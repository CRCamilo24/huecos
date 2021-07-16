import React, { useEffect } from "react";
import { useState } from "react";
import {
  Dimensions,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { Camera } from "expo-camera";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import CameraPreview from "./Preview";
import { PictureContext } from "../../context/PictureContext";

const SCREEN_WIDTH = Dimensions.get("screen").width;
const SCREEN_HEIGHT = Dimensions.get("screen").height;

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

  const [, { setPhoto }] = PictureContext();

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

  const savePhoto = (picture) => {
    setCapture(null);
    setPreview(false);
    setShowCamera(false);
    setPhoto(picture);
  };

  useEffect(() => {
    if (!isFocused) {
      setShowCamera(false);
    }
  }, [isFocused]);

  useEffect(() => {
    const getPermission = async () => {
      try {
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
      } catch (error) {
        alert(error);
      }
    };

    showCamera && getPermission();
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
        paddingTop: SCREEN_HEIGHT * 0.05,
      }}
    >
      {preview && capture ? (
        <CameraPreview
          photo={capture}
          retakePicture={retakePicture}
          savePhoto={savePhoto}
        />
      ) : (
        <Camera
          style={{
            alignItems: "center",
            backgroundColor: "white",
            height: "100%",
            justifyContent: "flex-start",
            // // marginTop: SCREEN_HEIGHT / 15,
            width: "90%",
          }}
          type={type}
          ref={(r) => {
            camera = r;
          }}
        >
          <View
            style={{
              alignItems: "center",
              borderColor: "white",
              borderWidth: 1,
              flexDirection: "row",
              height: "5%",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            <Text
              style={{ color: "white" }}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              {" "}
              ROTAR{" "}
            </Text>

            <Text
              style={{ color: "white" }}
              onPress={() => setShowCamera(false)}
            >
              CERRAR
            </Text>
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
    // marginBottom: SCREEN_HEIGHT / 15,
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
