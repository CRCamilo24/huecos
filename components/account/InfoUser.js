import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import { COLORS, FONT_SIZE } from "../../theme";

import { updateProfile, uploadImage } from "../../utils/actions";
import { loadImageFromGallery } from "../../utils/helpers";

export default function InfoUser({ user, setLoading, setLoadingText }) {
  //console.log(user)
  const [photoUrl, setPhotoUrl] = useState(user.photoURL);
  const changePhoto = async () => {
    console.log("pressed");

    const result = await loadImageFromGallery([1, 1]);
    //console.log(result)
    if (!result.status) {
      return;
    }
    setLoadingText("Actualizando imagen...");
    setLoading(true);
    const resultUploadImage = await uploadImage(
      result.image,
      "avatars",
      user.uid
    );
    if (!resultUploadImage.statusResponse) {
      setLoading(false);
      Alert.alert("Ha ocurrido un error al almacenar la foto de perfil.");
      return;
    }
    const resultUpdateProfie = await updateProfile({
      photoURL: resultUploadImage.url,
    });
    setLoading(false);
    if (resultUpdateProfie.statusResponse) {
      setPhotoUrl(resultUploadImage.url);
      console.log("resultUploadImage.url:", resultUploadImage.url);
    } else {
      Alert.alert("Ha ocurrido un error al actualizar la foto de perfil.");
    }
  };
  console.log("user.photoUrl :", user.photoURL);

  return (
    <View style={styles.container}>
      <Avatar
        rounded
        size="large"
        onPress={changePhoto}
        //containerStyle={styles.Avatar}
        source={
          user.photoURL
            ? { uri: photoUrl }
            : require("../../assets/avatar-default.jpg")
        }
      />
      <View style={styles.infoUser}>
        <Text
          style={[
            styles.displayName,
            {
              color: COLORS.secondary,
              fontSize: FONT_SIZE.normal,
              fontWeight: "700",
            },
          ]}
        >
          {user.displayName ? user.displayName : "Anónimo"}
        </Text>
        <Text
          style={{
            color: COLORS.secondary,
            fontSize: FONT_SIZE.small,
            fontWeight: "600",
          }}
        >
          {user.email ? user.email : "Correo"}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    // backgroundColor: "#f9f9f9",
    paddingVertical: 30,
  },
  infoUser: {
    marginLeft: 20,
  },
  displayName: {
    fontWeight: "bold",

    paddingBottom: 5,
  },
});
