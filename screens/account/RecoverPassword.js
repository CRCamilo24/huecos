import React from "react";
import { useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  Pressable,
  Text,
  TextInput,
  Image,
  View,
} from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import { firebaseApp } from "../../utils/firebase";
import { validateEmail } from "../../utils/helpers";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../reports/AddReport";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { COLORS, FONT_SIZE } from "../../theme";

const RecoverPasswordPage = ({ navigation }) => {
  const [submitted, setSubmitted] = useState(false);
  const [send, setSend] = useState(false);
  const [email, setEmail] = useState("");

  const onSubmit = async () => {
    setSubmitted(true);
    try {
      await firebaseApp.auth().sendPasswordResetEmail(email);
      setSend(true);
    } catch (e) {
      setSubmitError(e.message);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View style={{ alignItems: "center", flex: 1 }}>
        {send ? (
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../../assets/Informacion.png")}
              resizeMode="contain"
              style={{
                height: SCREEN_HEIGHT * 0.2,
                width: SCREEN_HEIGHT * 0.2,
                marginVertical: 20,
              }}
            />
            <Text
              style={{
                fontSize: SCREEN_HEIGHT * 0.025,
                marginBottom: SCREEN_HEIGHT * 0.02,
                textAlign: "center",
              }}
            >
              Consulte su correo electrónico
            </Text>
            <Text
              style={{
                //   borderWidth: 1,
                fontSize: SCREEN_HEIGHT * 0.02,
                marginBottom: SCREEN_HEIGHT * 0.02,
                padding: SCREEN_HEIGHT * 0.009,
                textAlign: "center",
              }}
            >
              Le acabamos de enviar un correo electrónico con un vínculo para
              restablecer su contraseña.
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#442484",
                padding: SCREEN_HEIGHT * 0.009,
              }}
              onPress={() => navigation.navigate("login")}
            >
              <Text style={{ color: "white" }}>Regresar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../../assets/Informacion.png")}
              resizeMode="contain"
              style={{
                height: SCREEN_HEIGHT * 0.2,
                width: SCREEN_HEIGHT * 0.2,
                marginVertical: 20,
              }}
            />
            <Text
              style={{
                fontSize: SCREEN_HEIGHT * 0.025,
                marginBottom: SCREEN_HEIGHT * 0.02,
                textAlign: "center",
              }}
            >
              ¿Olvidó su contraseña?
            </Text>
            <Text
              style={{
                //   borderWidth: 1,
                fontSize: SCREEN_HEIGHT * 0.02,
                marginBottom: SCREEN_HEIGHT * 0.02,
                textAlign: "center",
                padding: SCREEN_HEIGHT * 0.009,
              }}
            >
              Ingrese la dirección de correo electrónico con la que se registró
              y le enviaremos un enlace para establecer una nueva contraseña.
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                fontSize: SCREEN_HEIGHT * 0.02,
                textAlign: "center",
                paddingHorizontal: SCREEN_HEIGHT * 0.009,
                marginBottom: SCREEN_HEIGHT * 0.02,
                width: SCREEN_WIDTH * 0.8,
              }}
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
            {!email && submitted && (
              <Text style={{ color: "red" }}>"Enter your email"</Text>
            )}
            {!validateEmail(email) && submitted && email !== "" && (
              <Text style={{ color: "red" }}>"Invalid email address"</Text>
            )}
            <TouchableOpacity
              style={{
                alignItems: "center",
                backgroundColor: COLORS.primary,
                borderRadius: SCREEN_HEIGHT * 0.05,
                height: SCREEN_HEIGHT * 0.05,
                justifyContent: "center",
                marginVertical: SCREEN_HEIGHT * 0.015,
                width: SCREEN_WIDTH * 0.75,
              }}
              onPress={onSubmit}
            >
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: FONT_SIZE.normal,
                  fontWeight: "700",
                }}
              >
                Restablecer contraseña
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default RecoverPasswordPage;
