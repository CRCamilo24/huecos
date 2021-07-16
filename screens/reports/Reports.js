import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import firebase from "firebase/app";
import Clustering from "../../components/reports/components/Clustering/Clustering";
import { useState } from "react";
import { ReportsContext } from "../../components/context/ReportsContext";
import { useIsFocused } from "@react-navigation/native";
import { getCurrentLocation } from "../../utils/helpers";
import { ActivityIndicator } from "react-native";
import { COLORS } from "../../theme";

export default function Reports({ navigation }) {
  const [user, setUser] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [{ data, loading }, { getReports }] = ReportsContext();
  const isFocused = useIsFocused();

  const callFunction = async () => {
    const response = await getCurrentLocation();
    if (response.status) {
      setCurrentLocation(response.location);
    }
    await getReports({ collection: "reports" });
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      userInfo ? setUser(true) : setUser(false);
    });

    callFunction();
  }, [isFocused]);

  if (loading || !currentLocation) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
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
