import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";

import { validateEmail } from "../../utils/helpers";
import { getCurrentUser, registerUser } from "../../utils/actions";
import Loading from "../Loading";
import { COLORS, FONT_SIZE, SCREEN_HEIGHT } from "../../theme";
import { Pressable } from "react-native";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultFormValues());
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirm, setErrorConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const doregisterUser = async () => {
    if (!validateData()) {
      return;
    }

    setLoading(true);
    const result = await registerUser(formData.email, formData.password);
    if (!result.statusResponse) {
      setLoading(false);
      setErrorEmail(result.error);
      return;
    }

    navigation.navigate("account");
  };

  const validateData = () => {
    setErrorConfirm("");
    setErrorEmail("");
    setErrorPassword("");
    let isValid = true;

    if (!validateEmail(formData.email)) {
      setErrorEmail("Debes de ingresar un email válido.");
      isValid = false;
    }

    if (size(formData.password) < 6) {
      setErrorPassword(
        "Debes ingresar una contraseña de al menos seis carácteres."
      );
      isValid = false;
    }

    if (size(formData.confirm) < 6) {
      setErrorConfirm(
        "Debes ingresar una confirmación de contraseña de al menos seis carácteres."
      );
      isValid = false;
    }

    if (formData.password !== formData.confirm) {
      setErrorPassword("La contraseña y la confirmación no son iguales.");
      setErrorConfirm("La contraseña y la confirmación no son iguales.");
      isValid = false;
    }

    return isValid;
  };

  return (
    <View style={styles.form}>
      <Input
        containerStyle={[styles.input]}
        label="Ingresa tu email..."
        labelStyle={{ color: COLORS.secondary, fontSize: FONT_SIZE.normal }}
        onChange={(e) => onChange(e, "email")}
        keyboardType="email-address"
        errorMessage={errorEmail}
        defaultValue={formData.email}
      />
      <Input
        containerStyle={styles.input}
        label="Ingresa tu contraseña..."
        labelStyle={{ color: COLORS.secondary, fontSize: FONT_SIZE.normal }}
        password={true}
        secureTextEntry={!showPassword}
        onChange={(e) => onChange(e, "password")}
        errorMessage={errorPassword}
        defaultValue={formData.password}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Input
        containerStyle={styles.input}
        label="Confirma tu contraseña..."
        labelStyle={{ color: COLORS.secondary, fontSize: FONT_SIZE.normal }}
        password={true}
        secureTextEntry={!showPassword}
        onChange={(e) => onChange(e, "confirm")}
        errorMessage={errorConfirm}
        defaultValue={formData.confirm}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Pressable
        style={({ pressed }) => [
          {
            alignItems: "center",
            borderRadius: SCREEN_HEIGHT * 0.05,
            height: SCREEN_HEIGHT * 0.05,
            justifyContent: "center",
            marginVertical: SCREEN_HEIGHT * 0.015,
            width: "80%",
          },
          {
            backgroundColor: pressed ? COLORS.primaryDeg : COLORS.primary,
          },
        ]}
        onPress={() => doregisterUser()}
      >
        <Text
          style={{
            color: COLORS.white,
            fontSize: FONT_SIZE.normal,
            fontWeight: "700",
          }}
        >
          REGISTRAR NUEVO USUARIO
        </Text>
      </Pressable>
      {/* <Button
        title="Registrar Nuevo Usuario"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={() => doregisterUser()}
      /> */}
      <Loading isVisible={Loading} text="Creando Cuenta" />
    </View>
  );
}

const defaultFormValues = () => {
  return { email: "", password: "", confirm: "" };
};

const styles = StyleSheet.create({
  form: {
    // borderWidth: 1,
    // flex: 1,
    height: SCREEN_HEIGHT * 0.4,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  input: {
    width: "80%",
  },
  btnContainer: {
    marginTop: 20,
    width: "80%",
    alignSelf: "center",
  },
  btn: {
    backgroundColor: "#442484",
  },
  icon: {
    color: "#c1c1c1",
  },
});
