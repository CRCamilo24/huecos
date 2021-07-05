import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import { getCurrentLocation } from "../../../../utils/helpers";
import Markers from "./Markers";

const Clustering = () => {
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getCurrentLocation();
      if (response.status) {
        setCurrentLocation(response.location);
        console.log("response.location:-Clustering", response.location);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {currentLocation && (
        <MapView
          style={styles.map}
          initialRegion={currentLocation}
          showsUserLocation
        >
          <Markers />
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
