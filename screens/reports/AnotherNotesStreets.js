import React from "react";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { COLORS, FONT_SIZE, SCREEN_HEIGHT } from "../../theme";

const AnotherNotesStreets = ({ navigation }) => {
  const [understood, setUnderstood] = useState(false);

  return (
    <View style={{ alignItems: "center", height: "100%" }}>
      <View style={{ width: "80%", padding: "5%", marginTop: "5%" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            flexWrap: "wrap",
            flex: 1,
          }}
        >
          <Text
            style={{
              fontSize: SCREEN_HEIGHT * 0.04,
              color: COLORS.secondary,
            }}
          >
            {"\u2022" + " "}
          </Text>
          <Text
            style={{
              color: COLORS.secondary,
              fontSize: FONT_SIZE.normal,
              fontWeight: "600",
              marginTop: SCREEN_HEIGHT * 0.015,
              width: "85%",
            }}
          >
            Una vez seleccionada la imagen, complete el formulario para
            identificar la zona en la cual esta ubicada la vía.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            flexWrap: "wrap",
            marginTop: SCREEN_HEIGHT * 0.1,
            flex: 1,
          }}
        >
          <Text
            style={{
              fontSize: SCREEN_HEIGHT * 0.04,
              color: COLORS.secondary,
            }}
          >
            {"\u2022" + " "}
          </Text>
          <Text
            style={{
              color: COLORS.secondary,
              fontSize: FONT_SIZE.normal,
              fontWeight: "600",
              marginTop: SCREEN_HEIGHT * 0.015,
              width: "85%",
            }}
          >
            La vía debe ser local de bajo tráfico y debe especificar si conoce o no que tenga redes de alcantarillado.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            flexWrap: "wrap",
            flex: 1,
            marginTop: SCREEN_HEIGHT * 0.1,
          }}
        >
          <Text
            style={{
              fontSize: SCREEN_HEIGHT * 0.04,
              color: COLORS.secondary,
            }}
          >
            {"\u2022" + " "}
          </Text>
          <Text
            style={{
              color: COLORS.secondary,
              fontSize: FONT_SIZE.normal,
              fontWeight: "600",
              marginTop: SCREEN_HEIGHT * 0.015,
              width: "85%",
            }}
          >
            Asegúrese de diligenciar todos los campos y oprima el botón de
            postular vía.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            flexWrap: "wrap",
            flex: 1,
            marginTop: SCREEN_HEIGHT * 0.1,
          }}
        >
          <Text
            style={{
              fontSize: SCREEN_HEIGHT * 0.04,
              color: COLORS.secondary,
            }}
          >
            {"\u2022" + " "}
          </Text>
          <Text
            style={{
              color: COLORS.secondary,
              fontSize: FONT_SIZE.normal,
              fontWeight: "600",
              marginTop: SCREEN_HEIGHT * 0.015,
              width: "85%",
            }}
          >
            Vías que no cumplan las condiciones solicitadas no serán tenidas en cuenta para la respectiva postulación.
          </Text>
        </View>
        <View style={{ width: "100%", alignItems: "center" }}>
          <Pressable
            style={({ pressed }) => [
              {
                alignItems: "center",
                borderRadius: SCREEN_HEIGHT * 0.05,
                height: SCREEN_HEIGHT * 0.05,
                justifyContent: "center",
                // marginVertical: SCREEN_HEIGHT * 0.015,
                marginTop: SCREEN_HEIGHT * 0.2,
                width: "60%",
              },
              {
                backgroundColor: pressed ? COLORS.primaryDeg : COLORS.primary,
              },
            ]}
            onPress={() => setUnderstood(true)}
          >
            <Text
              style={{
                color: COLORS.white,
                fontSize: FONT_SIZE.large,
                fontWeight: "700",
              }}
            >
              Entendido
            </Text>
          </Pressable>
        </View>
        <View style={{ width: "100%", alignItems: "center" }}>
          <Pressable
            style={({ pressed }) => [
              {
                alignItems: "center",
                borderRadius: SCREEN_HEIGHT * 0.05,
                // borderWidth: 1,
                height: SCREEN_HEIGHT * 0.05,
                justifyContent: "center",
                marginTop: "10%",
                width: "100%",
              },
              {
                backgroundColor:
                  pressed || !understood
                    ? COLORS.secondaryDeg
                    : COLORS.secondary,
              },
            ]}
            onPress={() => navigation.navigate("add-street")}
            disabled={!understood}
          >
            <Text
              style={{
                color: COLORS.white,
                fontSize: FONT_SIZE.large,
                fontWeight: "700",
              }}
            >
              Postular Vía
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default AnotherNotesStreets;
{
  /* <Text
style={{
  borderColor: "green",
  borderWidth: 1,
  height: "30%",
  width: "100%",
}}
>
Párrafo 1{" "}
</Text>
<Text
style={{
  borderWidth: 1,
  height: "8%",
  marginVertical: "5%",
  textAlignVertical: "center",
  width: "100%",
}}
>
Entendido
</Text>
<Text
style={{
  borderColor: "green",
  borderWidth: 1,
  height: "30%",
  width: "100%",
}}
>
Párrafo 2{" "}
</Text>
<Text
style={{
  borderWidth: 1,
  height: "8%",
  marginVertical: "5%",
  textAlignVertical: "center",
  width: "100%",
}}
>
Entendido
</Text>

<Pressable
style={({ pressed }) => [
  {
    alignItems: "center",
    borderRadius: 8,
    // borderWidth: 1,
    height: "8%",
    justifyContent: "center",
    marginTop: "5%",
    width: "90%",
  },
  { backgroundColor: pressed ? "#a17dc3" : "#442484" },
]}
onPress={() => navigation.navigate("add-report")}
>
<Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
  Continuar con el reporte
</Text>
</Pressable> */
}
