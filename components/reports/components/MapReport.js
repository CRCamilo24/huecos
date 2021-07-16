import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import { getCurrentLocation } from "../../../utils/helpers";
import Modal from "../../Modal";
import { Button } from "react-native-elements";
import { COLORS, SCREEN_HEIGHT } from "../../../theme";

function MapReport({
  isVisibleMap,
  setIsVisibleMap,
  setLocationReport,
  toastRef,
}) {
  const [newRegion, setNewRegion] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getCurrentLocation();
      if (response.status) {
        setNewRegion(response.location);
        console.log("response.location:-MapReport", response.location);
      }
    })();
  }, []);

  const confirmLocation = () => {
    setLocationReport(newRegion);
    toastRef.current.show("Localización guardada correctamente.", 3000);
    setIsVisibleMap(false);
  };

  return (
    <Modal isVisible={isVisibleMap} setVisible={setIsVisibleMap}>
      {/* <Text>El Mapa va aqui</Text> */}
      <View>
        {newRegion && (
          <MapView
            style={styles.mapStyle}
            initialRegion={newRegion}
            showsUserLocation={true}
            onRegionChange={(region) => setNewRegion(region)}
          >
            <MapView.Marker
              coordinate={{
                latitude: newRegion.latitude,
                longitude: newRegion.longitude,
              }}
              pinColor={COLORS.secondary}
              draggable
            />
          </MapView>
        )}
        <View style={styles.viewMapBtn}>
          <Button
            title="Guardar ubicación"
            containerStyle={styles.viewMapContainerSave}
            buttonStyle={{
              backgroundColor: COLORS.secondary,
              borderRadius: SCREEN_HEIGHT * 0.05,
              paddingHorizontal: SCREEN_HEIGHT * 0.02,
            }}
            onPress={confirmLocation}
          />
          <Button
            title="Cancelar ubicación"
            containerStyle={styles.viewMapContainerCancel}
            buttonStyle={{
              backgroundColor: COLORS.primary,
              borderRadius: SCREEN_HEIGHT * 0.05,
              paddingHorizontal: SCREEN_HEIGHT * 0.02,
            }}
            onPress={() => setIsVisibleMap(false)}
          />
        </View>
      </View>
    </Modal>
  );
}

export default MapReport;

const styles = StyleSheet.create({
  mapStyle: {
    width: "100%",
    height: 550,
  },

  viewMapBtn: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },

  viewMapBtnCancel: {
    backgroundColor: "#a65273",
  },
  viewMapBtnSave: {
    backgroundColor: "#442484",
  },
});
