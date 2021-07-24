import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-easy-toast";

import { closeSession, getCurrentUser } from "../../utils/actions";
import Loading from "../../components/Loading";
import InfoUser from "../../components/account/InfoUser";
import AccountOptions from "../../components/account/AccountOptions";
import { ImageBackground } from "react-native";
import { COLORS, FONT_SIZE, SCREEN_HEIGHT } from "../../theme";

export default function UserLogged() {
  const toastRef = useRef();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [user, setUser] = useState(null);
  const [relodUser, setRelodUser] = useState(false);

  useEffect(() => {
    setUser(getCurrentUser());
    setRelodUser(false);
  }, [relodUser]);

  return (
    <ImageBackground
      style={styles.container}
      source={require("../../assets/app-12.png")}
    >
      <View
        style={{
          height: "30%",
          width: "100%",
          // borderWidth: 1,
          justifyContent: "flex-end",
        }}
      >
        <ImageBackground
          source={require("../../assets/Informacion.png")}
          style={{
            // borderWidth: 1,
            alignItems: "center",
            height: "70%",
            width: "100%",
            position: "absolute",
            marginTop: SCREEN_HEIGHT * 0.03,
            zIndex: 1,
          }}
          resizeMethod="resize"
          resizeMode="contain"
        >
          <Text
            style={{
              // borderWidth: 1,
              // position: "absolute",
              color: COLORS.secondary,
              fontSize: SCREEN_HEIGHT * 0.03,
              fontWeight: "700",
              textAlign: "left",
              marginTop: SCREEN_HEIGHT * 0.11,
            }}
          >
            REPARA
          </Text>
          <Text
            style={{
              // borderWidth: 1,
              color: COLORS.secondary,
              fontSize: SCREEN_HEIGHT * 0.01,
              fontWeight: "700",
              textAlign: "left",
              //   marginBottom: SCREEN_HEIGHT * 0.8,
              marginLeft: "9%",
              width: "18%",
            }}
          >
            Red participativa de reparación y acción
          </Text>
        </ImageBackground>
      </View>

      {user && (
        <View style={{}}>
          <InfoUser
            user={user}
            setLoading={setLoading}
            setLoadingText={setLoadingText}
          />
          <AccountOptions
            user={user}
            toastRef={toastRef}
            setRelodUser={setRelodUser}
          />
        </View>
      )}
      <Button
        title="Cerrar Sesión"
        buttonStyle={[
          styles.btnCloseSession,
          {
            marginHorizontal: SCREEN_HEIGHT * 0.03,
            backgroundColor: COLORS.primary,
            borderRadius: SCREEN_HEIGHT * 0.05,
            marginTop: SCREEN_HEIGHT * 0.03,
          },
        ]}
        titleStyle={{
          color: COLORS.white,
          fontWeight: "700",
          fontSize: FONT_SIZE.large,
        }}
        onPress={() => {
          closeSession();
          navigation.navigate("account");
        }}
      />
      <Toast ref={toastRef} position="center" opacity={0.9} />
      <Loading isVisible={loading} text={loadingText} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    // backgroundColor: "#f9f9f9",
  },
  btnCloseSession: {
    // marginTop: 30,
    // borderRadius: 5,
    // backgroundColor: "#FFFFFF",
    // borderTopWidth: 1,
    // borderTopColor: "#442484",
    // borderBottomWidth: 1,
    // borderBottomColor: "#442484",
    // paddingVertical: 10,
  },
  btnCloseSessionTitle: {},
});
