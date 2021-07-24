import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import firebase from "firebase/app";
import Clustering, {
  CustomMarker,
} from "../../components/reports/components/Clustering/Clustering";
import { useState } from "react";
import { ReportsContext } from "../../components/context/ReportsContext";
import { useIsFocused } from "@react-navigation/native";
import { getCurrentLocation } from "../../utils/helpers";
import { ActivityIndicator } from "react-native";
import { COLORS, SCREEN_HEIGHT, SCREEN_WIDTH } from "../../theme";

export default function Reports({ navigation }) {
  const [user, setUser] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [{ data, loading }, { getReports, updateCollection }] =
    ReportsContext();
  const isFocused = useIsFocused();

  const callFunction = async () => {
    const response = await getCurrentLocation();
    if (response.status) {
      setCurrentLocation(response.location);
    }
    await getReports({ collection: "reports" });
    console.log("ejecutó!");
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      userInfo ? setUser(true) : setUser(false);
    });

    callFunction();
  }, [isFocused, loading, user]);

  if (loading || !currentLocation) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color="#442484" />
      </View>
    );
  }

  return (
    <View style={styles.viewBody}>
      {/* {!loading && ( */}
      <Clustering
        loading={loading}
        data={data}
        currentLocation={currentLocation}
        updateCollection={updateCollection}
      />
      {/* )} */}
      {user && (
        <Icon
          type="material-community"
          name="plus"
          color={COLORS.secondary}
          reverse
          containerStyle={styles.btnContainer}
          onPress={() => navigation.navigate("notes")}
        />
      )}

      <View style={{ position: "absolute", marginLeft: SCREEN_WIDTH * 0.03 }}>
        <View
          style={{ flexDirection: "row", marginVertical: SCREEN_HEIGHT * 0.01 }}
        >
          <CustomMarker item={{ status: true }} />
          <Text
            style={{
              textAlignVertical: "center",
              marginLeft: SCREEN_WIDTH * 0.009,
              fontWeight: "700",
            }}
          >
            Reparado
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <CustomMarker item={{ status: false }} />
          <Text
            style={{
              textAlignVertical: "center",
              marginLeft: SCREEN_WIDTH * 0.009,
              fontWeight: "700",
            }}
          >
            Sin reparar
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
  },
  btnContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
  },
});
