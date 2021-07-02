import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { loadImageFromGallery } from "../../../utils/helpers";
import { Avatar, Icon } from "react-native-elements";
import { filter, map, size } from "lodash";
import TakePhoto from "./TakePhoto";
import * as ImagePicker from "expo-image-picker";
import { PictureContext } from "../../context/PictureContext";

function UploadImage({
  toastRef,
  imagesSelected,
  setImagesSelected,
  navigation,
  setShowCamera,
  showCamera,
}) {
  const [galleryPerssionsStatus, setGalleryPerssionsStatus] = useState(false);
  const [refreshPremissions, setRefreshPremissions] = useState(false);
  const [pressedGallery, setPressedGallery] = useState(false);
  const [{ photo, image }, { setPhoto, setImage }] = PictureContext();

  const imageUri = photo || image;

  const pickImage = async () => {
    if (!galleryPerssionsStatus) {
      setRefreshPremissions(!refreshPremissions);
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });

      console.log(result);

      if (!result.cancelled) {
        setImage(result.uri);
        setImagesSelected([result.uri]);
        setPhoto(null);
        setPressedGallery(false);
      } else {
        setPressedGallery(false);
      }
    }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert(
            "Debes de darle permiso para accerder a las imágenes del teléfono."
          );
          setGalleryPerssionsStatus(false);
        } else {
          setGalleryPerssionsStatus(true);
        }
      }
    })();
  }, [refreshPremissions]);

  useEffect(() => {
    photo && setImagesSelected([photo]);
    pressedGallery && pickImage();
  }, [photo, pressedGallery]);

  const removeImage = (image) => {
    Alert.alert(
      "Eliminar imagen",
      "¿Estas seguro que deseas eliminar la imagen?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Si",
          onPress: () => {
            setImagesSelected(
              filter(imagesSelected, (imageUrl) => imageUrl !== image)
              // [""]
            );
            setPhoto(null);
            setImage(null);
          },
        },
      ],
      { cancelable: true }
    );
  };
  return (
    <>
      {imageUri && !showCamera && (
        <View style={styles.viewImage}>
          <Pressable
            style={styles.pressableText}
            onPress={() => removeImage(imagesSelected[0])}
          >
            <Text style={{ color: "white" }}>Borrar</Text>
            <Text style={{ color: "white" }}>X</Text>
          </Pressable>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </View>
      )}
      <ScrollView horizontal style={styles.scrollView}>
        <Icon
          type="material-community"
          name="image"
          color="#7a7a7a"
          containerStyle={styles.containerIcon}
          // onPress={imageSelect}
          onPress={() => (pickImage, setPressedGallery(true))}
        />
        <Icon
          type="material-community"
          name="camera"
          color="#7a7a7a"
          containerStyle={styles.containerIcon}
          onPress={() => setShowCamera(true)}
        />
      </ScrollView>
      {showCamera && (
        <TakePhoto
          setShowCamera={setShowCamera}
          showCamera={showCamera}
          navigation={navigation}
          imagesSelected={imagesSelected}
          setImagesSelected={setImagesSelected}
        />
      )}
    </>
  );
}

export default UploadImage;

const styles = StyleSheet.create({
  scrollView: {
    flexDirection: "row",
    marginHorizontal: 20,
    // marginTop: 30,
  },

  containerIcon: {
    alignItems: "center",
    backgroundColor: "#e3e3e3",
    justifyContent: "center",
    marginRight: 10,
    height: 70,
    width: 79,
  },
  miniatureStyle: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  image: {
    height: 100,
    width: 100,
  },
  viewImage: {
    alignItems: "center",
    // borderWidth: 1,
    marginBottom: 15,
  },
  pressableText: {
    backgroundColor: "#442484",
    // borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    width: 100,
  },
});

{
  /* {size(imagesSelected) < 1 && ( */
}

{
  /* )} */
}

{
  /* {map(imagesSelected, (imageReport, index) => (
          <Avatar
            key={index}
            // style={styles.miniatureStyles}
            source={{ uri: imageReport }}
            onPress={() => removeImage(imageReport)}
          />
        ))} */
}
