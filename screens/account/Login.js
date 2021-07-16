import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LoginForm from "../../components/account/LoginForm";
import { useAuthContext } from "../../components/context/AuthContext";
import { useEffect } from "react";
import GoogleButton from "./GoogleButton";
import * as Google from "expo-auth-session/providers/google";
import * as firebase from "firebase";
import * as WebBrowser from "expo-web-browser";
import { SCREEN_HEIGHT } from "../reports/AddReport";
import { COLORS } from "../../theme";
import { ImageBackground } from "react-native";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const navigation = useNavigation();
  const [{ authUser, loading }, { setAuthUser }] = useAuthContext();

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    behavior: "web",
    expoClientId:
      "849721799436-5k6jqs7h1bkptqujjaiqango8ntri8j9.apps.googleusercontent.com",
    // iosClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    androidClientId:
      "849721799436-786e0b6meh28ed1l25k355trmt4n8g0n.apps.googleusercontent.com",
    webClientId:
      "849721799436-5k6jqs7h1bkptqujjaiqango8ntri8j9.apps.googleusercontent.com",

    // clientId:
    //   "849721799436-5k6jqs7h1bkptqujjaiqango8ntri8j9.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const getUser = async () => {
        const credential = await firebase.auth.GoogleAuthProvider.credential(
          id_token
        );
        const userInfo = await firebase.auth().signInWithCredential(credential);
        setAuthUser(userInfo.user);
      };
      getUser();
    }
  }, [response]);

  useEffect(() => {
    authUser && !loading && navigation.navigate("account");
    authUser && !loading && navigation.navigate("reports");
  });

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
          style={styles.image}
        />
        <View style={styles.container}>
          <LoginForm />
          <GoogleButton onPress={() => promptAsync()} />
          <CreateAccount />
        </View>
        {/* <Divider style={styles.divider} /> */}
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
}

function CreateAccount(props) {
  const navigation = useNavigation();

  return (
    <Text
      style={styles.register}
      onPress={() => navigation.navigate("register")}
    >
      ¿Aún no tienes una cuenta?{" "}
      <Text style={styles.btnRegister}>Regístrate</Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  image: {
    // borderWidth: 1,
    height: 150,
    width: "100%",
    marginTop: SCREEN_HEIGHT * 0.08,
  },
  container: {
    // borderWidth: 1,
    height: SCREEN_HEIGHT * 0.5,
    marginHorizontal: 40,
  },
  divider: {
    backgroundColor: "#442484",
    margin: 40,
  },
  register: {
    color: COLORS.secondary,
    marginTop: 15,
    marginHorizontal: 10,
    alignSelf: "center",
  },
  btnRegister: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
});
