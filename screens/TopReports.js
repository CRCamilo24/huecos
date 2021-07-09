import React, { useEffect } from "react";
import { FlatList } from "react-native";
import { Image } from "react-native";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useAuthContext } from "../components/context/AuthContext";
import { ReportsContext } from "../components/context/ReportsContext";
const { height, width } = Dimensions.get("screen");

export default function TopReports() {
  const [{ authUser }, {}] = useAuthContext();
  const [{ data, loading }, { getReports }] = ReportsContext();

  const userId = authUser.uid;

  const getUserReports = () => {
    let userReports = [];
    data.map((item) => {
      item.createBy === userId && userReports.push(item);
    });
    return userReports;
  };

  const orderReports = getUserReports().sort((a, b) =>
    a.date < b.date ? 1 : a.date > b.date ? -1 : 0
  );

  const renderReports = (item, index) => (
    <View
      style={{
        flexDirection: "row",
        padding: height * 0.01,
        backgroundColor: "#fff",
        borderRadius: height * 0.008,
        elevation: height * 0.003,
        marginTop: index ? 0 : height * 0.008,
        marginBottom: height * 0.008,
        marginHorizontal: height * 0.009,
        shadowOffset: { height: 1, width: 1 },
        shadowColor: "#333",
        shadowOpacity: 0.3,
      }}
    >
      <Image
        source={{ uri: item.images[0] }}
        style={{
          height: height * 0.095,
          borderRadius: height * 0.0475,
          width: height * 0.095,
        }}
      />
      <View
        style={{
          // borderWidth: 1,
          flex: 1,
          justifyContent: "space-around",
          padding: height * 0.01,
        }}
      >
        <Text>Reporte N° {orderReports.length - index}</Text>
        <Text>Zona:{item.barrio}</Text>
        <Text>
          Fecha: {item.date ? new Date(item.date).toLocaleDateString() : "- -"}
        </Text>
      </View>
    </View>
  );

  console.log("orderReports:", orderReports);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={orderReports}
        renderItem={({ item, index }) => item && renderReports(item, index)}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
