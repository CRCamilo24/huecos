import React from "react";
import { Pressable, Text, View } from "react-native";

const Notes = ({ navigation }) => {
  return (
    <View style={{ alignItems: "center", borderWidth: 1, height: "100%" }}>
      <Text
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
          TOMAR FOTO
        </Text>
      </Pressable>
    </View>
  );
};

export default Notes;
