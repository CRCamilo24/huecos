import React from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";
import { loadImageFromGallery } from "../../../utils/helpers";
import { Avatar, Icon } from "react-native-elements";
import { filter, map, size } from "lodash";

function UploadImage({ toastRef, imagesSelected, setImagesSelected }) {
  const imageSelect = async () => {
    const response = await loadImageFromGallery([4, 3]);
    if (!response.status) {
      toastRef.current.show("No has seleccionado ninguna imagen", 3000);
      return;
    }
    setImagesSelected([...imagesSelected, response.image]);
  };

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
            );
          },
        },
      ],
      { cancelable: true }
    );
  };
  return (
    <ScrollView horizontal style={styles.viewImages}>
      {size(imagesSelected) < 1 && (
        <Icon
          type="material-community"
          name="camera"
          color="#7a7a7a"
          containerStyle={styles.containerIcon}
          onPress={imageSelect}
        />
      )}
      {map(imagesSelected, (imageReport, index) => (
        <Avatar
          key={index}
          style={styles.miniatureStyles}
          source={{ uri: imageReport }}
          onPress={() => removeImage(imageReport)}
        />
      ))}
    </ScrollView>
  );
}

export default UploadImage;

const styles = StyleSheet.create({
  viewImages: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 30,
  },

  containerIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 70,
    width: 79,
    backgroundColor: "#e3e3e3",
  },
  miniatureStyle: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
});
