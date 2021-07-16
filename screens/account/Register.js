import React from "react";
import { ImageBackground } from "react-native";
import { ScrollView, Image, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RegisterForm from "../../components/account/RegisterForm";
import { SCREEN_HEIGHT } from "../../theme";

export default function Register() {
  return (
    <KeyboardAwareScrollView style={{ backgroundColor: "white" }}>
      <ImageBackground
        style={{ height: SCREEN_HEIGHT }}
        source={require("../../assets/app-12.png")}
      >
        <Image
          // source={{
          //   uri: "https://firebasestorage.googleapis.com/v0/b/valorizacionapp.appspot.com/o/Source%2FLOGOS-02.png?alt=media&token=6a6fcc14-2f68-4f54-9829-7e6295af4922",
          // }}
          source={require("../../assets/LOGOS-02.png")}
          resizeMode="contain"
          style={[styles.image, { marginTop: SCREEN_HEIGHT * 0.05 }]}
        />
        <RegisterForm />
        <Image
          // source={{
          //   uri: "https://firebasestorage.googleapis.com/v0/b/valorizacionapp.appspot.com/o/Source%2FLOGOS-02.png?alt=media&token=6a6fcc14-2f68-4f54-9829-7e6295af4922",
          // }}
          source={require("../../assets/LOGOS-04.png")}
          resizeMode="contain"
          style={styles.image}
        />
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 150,
    width: "100%",
    marginTop: SCREEN_HEIGHT * 0.035,
  },
});
