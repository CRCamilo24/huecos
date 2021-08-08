import React, { useState } from "react";
import { TextInput } from "react-native";
import { Pressable, Text, View } from "react-native";
import { COLORS, FONT_SIZE, SCREEN_HEIGHT } from "../../theme";

const NotesStreets = ({ navigation }) => {
  return (
    <View style={{ alignItems: "center", height: "100%" }}>
      <View style={{ width: "80%", padding: "5%", marginTop: "5%" }}>
        <Text
          style={{
            color: COLORS.secondary,
            fontSize: SCREEN_HEIGHT * 0.03,
            fontWeight: "700",
          }}
        >
          Instructivo

        </Text>
        <Text
          style={{
            color: COLORS.secondary,
            fontSize: FONT_SIZE.normal,
            fontWeight: "600",
            width: "85%",
          }}
        >

          Tenga en cuenta las siguientes recomendaciones al momento de realizar la postulación de la vía de interes:
        </Text>
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
            Asegúrese de que las fotografías sean claras, tomadas en condiciones
            de buena iluminación y que correspondan a vías pertenecientes al municipio de Pasto.

            Por favor no envíes fotos que No correspondan a la problemática
            asociada de este aplicativo.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            flexWrap: "wrap",
            flex: 1,
            marginTop: SCREEN_HEIGHT * 0.22,
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
            Las fotos que no muestren claramente la problemática descrita, serán
            rechazadas.
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
            onPress={() => navigation.navigate("another-notes-streets")}
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
      </View>
    </View>
  );
};

export default NotesStreets;
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
