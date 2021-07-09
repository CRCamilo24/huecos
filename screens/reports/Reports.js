import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import firebase from "firebase/app";

import Loading from "../../components/Loading";
import Clustering from "../../components/reports/components/Clustering/Clustering";
import { useState } from "react";
import { ReportsContext } from "../../components/context/ReportsContext";

export default function Reports({ navigation }) {
  const [user, setUser] = useState(null);
  const [{ data, loading }, { getReports }] = ReportsContext();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      userInfo ? setUser(true) : setUser(false);
    });
    getReports({ collection: "reports" });
  }, []);

  if (loading) {
    return <Loading isVisible={true} text="Cargando..." />;
  }

  return (
    <View style={styles.viewBody}>
      {/* {loading && <Text>Reportes...</Text>} */}
      {!loading && (
        <Clustering getReports={getReports} loading={loading} data={data} />
      )}
      {user && (
        <Icon
          type="material-community"
          name="plus"
          color="#442484"
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
