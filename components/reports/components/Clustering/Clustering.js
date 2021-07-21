import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import { Callout, Marker } from "react-native-maps";
import { getCurrentLocation } from "../../../../utils/helpers";
import Markers from "./Markers";
import MapView from "react-native-map-clustering";
import { COLORS, SCREEN_HEIGHT } from "../../../../theme";
import { useAuthContext } from "../../../context/AuthContext";
import { Alert } from "react-native";

export const CustomMarker = ({ item }) => (
  <View
    style={{
      alignItems: "center",
      backgroundColor: item.status ? COLORS.secondary : COLORS.primary,
      borderRadius: SCREEN_HEIGHT * 0.02,
      width: SCREEN_HEIGHT * 0.04,
      height: SCREEN_HEIGHT * 0.04,
      justifyContent: "center",
    }}
  >
    <Image
      source={require("../../../../assets/Informacionwhite.png")}
      style={{
        borderRadius: SCREEN_HEIGHT * 0.0175,
        height: SCREEN_HEIGHT * 0.035,
        width: SCREEN_HEIGHT * 0.035,
      }}
    />
  </View>
);

const Clustering = ({ currentLocation, data, loading, updateCollection }) => {
  const [{ authUser }, {}] = useAuthContext();

  const isAdmin =
    authUser && authUser.email === "valorizacionapppasto@gmail.com";

  const getMarkerLocation = () => {
    const points = data.map((item) => {
      return {
        id: item.id_doc,
        location: item.location,
        status: item.status,
      };
    });
    return points;
  };
  console.log("isAdmin:", isAdmin);

  const updateReport = (item) => {
    const findReport = data.find((element) => element.id_doc === item.id);
    console.log("item:", item);

    Alert.alert("Actualizar Reporte", "¿Desea actualizar el reporte?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          updateCollection({
            collection: "reports",
            idDoc: item.id,
            body: { ...findReport, status: !item.status },
          });
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {currentLocation && !loading && (
        <MapView
          style={styles.map}
          initialRegion={{
            ...currentLocation,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          showsUserLocation
          clusterColor={COLORS.primary}
        >
          {getMarkerLocation().map((item, i) => (
            <Marker
              key={i}
              coordinate={item.location}
              pinColor={COLORS.secondary}
              onPress={() => isAdmin && updateReport(item)}
              // tracksViewChanges={false}
            >
              <CustomMarker item={item} />
            </Marker>
          ))}
        </MapView>
      )}
      {!currentLocation && <ActivityIndicator size="large" color="#442484" />}
    </View>
  );
};

export default Clustering;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

{
  /* <Markers data={data} loading={loading} /> */
}
{
  /* <Marker
            coordinate={{
              latitude: -9.938030444037494,
              longitude: -76.25186568582463,
            }}
          />
          <Marker
            coordinate={{
              latitude: -9.934955107039436,
              longitude: -76.25071458244372,
            }}
          />
          <Marker
            coordinate={{
              latitude: -9.933650409880547,
              longitude: -76.2460313262228,
            }}
          />
          <Marker
            coordinate={{
              latitude: -9.936609269170209,
              longitude: -76.24787624534014,
            }}
          />
          <Marker
            coordinate={{
              latitude: -9.933596047386004,
              longitude: -76.24963443749041,
            }}
          />
          <Marker
            coordinate={{
              latitude: -9.934768722049604,
              longitude: -76.24393411047404,
            }}
          />
          <Marker
            coordinate={{
              latitude: -9.932400070195445,
              longitude: -76.25002865097814,
            }}
          /> */
}
