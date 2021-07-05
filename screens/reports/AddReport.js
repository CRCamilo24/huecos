import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Toast from "react-native-easy-toast";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Loading from "../../components/Loading";
import AddReportForm from "../../components/reports/AddReportForm";

export const SCREEN_WIDTH = Dimensions.get("screen").width;
export const SCREEN_HEIGHT = Dimensions.get("screen").height;

export default function AddReport({ navigation }) {
  const [showCamera, setShowCamera] = useState(false);
  const toastRef = useRef();
  const [loading, setLoading] = useState(false);
  const scroll = useRef();

  useEffect(() => {
    scroll.current.scrollToEnd({ animated: false });
  }, [showCamera]);

  return (
    <KeyboardAwareScrollView scrollEnabled={!showCamera} ref={scroll}>
      <AddReportForm
        toastRef={toastRef}
        setLoading={setLoading}
        navigation={navigation}
        setShowCamera={setShowCamera}
        showCamera={showCamera}
      />
      {loading && (
        <View style={styles.loadingView}>
          <ActivityIndicator size="large" color="#442484" />

          <Text style={styles.loadingText}>Creando reporte...</Text>
        </View>
      )}
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  loadingView: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    height: SCREEN_HEIGHT / 1.1,
    justifyContent: "center",
    position: "absolute",
    width: SCREEN_WIDTH,
  },
  loadingText: {
    backgroundColor: "white",
    color: "#442484",
    fontSize: 14,
    marginTop: 10,
    fontWeight: "700",
  },
});

{
  /* <Loading isVisible={loading} text="Creando reporte..." /> */
}
