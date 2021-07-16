import React, { useEffect } from "react";
import Navigation from "./navigations/Navigation";
import { LogBox } from "react-native";
import { firebaseApp } from "./utils/firebase";
import { useAuthContext } from "./components/context/AuthContext";
import { View } from "react-native";
import { SCREEN_HEIGHT } from "./screens/reports/AddReport";

LogBox.ignoreAllLogs();
export default function App() {
  const [{}, { setAuthUser }] = useAuthContext();

  function onAuthStateChanged(firebaseUser) {
    if (!firebaseUser) {
      setAuthUser(firebaseUser);
      return;
    }

    firebaseUser?.reload().then(() => {
      setAuthUser(firebaseApp.auth().currentUser);
    });
  }

  useEffect(() => {
    const subscriber = firebaseApp
      .auth()
      .onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: SCREEN_HEIGHT * 0.04,
      }}
    >
      <Navigation />
    </View>
  );
}
