import React from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  View,
  Pressable,
} from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { COLORS, FONT_SIZE, SCREEN_HEIGHT } from "../../theme";
import { AppState } from "react-native";

export default function UserGuest() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        // source={{
        //   uri: "https://firebasestorage.googleapis.com/v0/b/valorizacionapp.appspot.com/o/Source%2Fapp%201-13.jpg?alt=media&token=6d30c10b-16df-45c9-b135-cade9a321e33",
        // }}
        source={require("../../assets/background/app-13.png")}
        style={{
          alignItems: "center",
          height: "100%",
          justifyContent: "space-around",
          width: "100%",
        }}
        resizeMethod="scale"
        resizeMode="cover"
      >
        <View
          style={{
            alignItems: "center",
            // borderWidth: 1,
            height: "40%",
            width: "100%",
            marginTop: SCREEN_HEIGHT * 0.02,
          }}
        >
          <ImageBackground
            // source={{
            //   uri: "https://firebasestorage.googleapis.com/v0/b/valorizacionapp.appspot.com/o/Source%2FInformacion.png?alt=media&token=9ce61302-28af-496e-938f-b0f9a09fd269",
            // }}
            source={require("../../assets/Informacion.png")}
            style={{
              // backgroundColor: "red",
              // borderWidth: 1,
              height: SCREEN_HEIGHT * 0.2,
              width: SCREEN_HEIGHT * 0.2,
            }}
          >
            <Text
              style={{
                // borderWidth: 1,
                color: COLORS.secondary,
                fontWeight: "700",
                fontSize: SCREEN_HEIGHT * 0.07,
                marginTop: SCREEN_HEIGHT * 0.16,
                marginLeft: -SCREEN_HEIGHT * 0.035,
                width: "150%",
              }}
            >
              REPARA
            </Text>

            <Text
              style={{
                // borderWidth: 1,
                color: COLORS.secondary,
                fontSize: FONT_SIZE.small,
                fontWeight: "700",
                textAlign: "left",
                marginBottom: SCREEN_HEIGHT * 0.8,
                marginLeft: "50%",
                width: "65%",
              }}
              // numberOfLines={3}
            >
              Red participativa de reparación y acción
            </Text>
          </ImageBackground>
        </View>

        <View style={{ alignItems: "center", width: "100%" }}>
          <Text
            style={{
              color: COLORS.white,
              fontSize: SCREEN_HEIGHT * 0.025,
              fontWeight: "700",
              marginBottom: SCREEN_HEIGHT * 0.01,
            }}
          >
            Ingresa a tu cuenta
          </Text>
          <Text
            style={{
              // borderWidth: 1,
              color: COLORS.secondary,
              fontWeight: "600",
              textAlign: "center",
              fontSize: SCREEN_HEIGHT * 0.015,
              width: "85%",
            }}
          >
            Accede a tu cuenta para que puedas registrarte y enviar reportes
            sobre el estado de las vías de la ciudad
          </Text>
        </View>

        <Pressable
          style={({ pressed }) => [
            {
              alignItems: "center",
              backgroundColor: COLORS.secondary,
              borderRadius: SCREEN_HEIGHT * 0.05,
              height: SCREEN_HEIGHT * 0.05,
              justifyContent: "center",
              width: "85%",
            },
            {
              backgroundColor: pressed ? COLORS.secondaryDeg : COLORS.secondary,
            },
          ]}
          onPress={() => navigation.navigate("login")}
        >
          <Text style={{ color: COLORS.white, fontSize: FONT_SIZE.normal }}>
            INGRESAR
          </Text>
        </Pressable>
        <Image
          // source={{
          //   uri: "https://firebasestorage.googleapis.com/v0/b/valorizacionapp.appspot.com/o/Source%2FLOGOS-03.png?alt=media&token=27b80a7a-ed04-4d7a-9f76-c97a5b316283",
          // }}
          source={require("../../assets/LOGOS-03.png")}
          style={{ height: SCREEN_HEIGHT * 0.15, width: SCREEN_HEIGHT * 0.15 }}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    marginHorizontal: 30,
  },
  image: {
    height: 300,
    width: "100%",
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginVertical: 10,
    textAlign: "center",
  },
  description: {
    textAlign: "justify",
    marginBottom: 20,
    color: "#a65273",
  },
  button: {
    backgroundColor: "#442484",
  },
});
