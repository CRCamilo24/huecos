import React, { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Toast from "react-native-easy-toast";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Loading from "../../components/Loading";

import AddReportForm from "../../components/reports/AddReportForm";

export default function AddReport({ navigation }) {
  const [showCamera, setShowCamera] = useState(false);
  const toastRef = useRef();
  const [loading, setLoading] = useState(false);

  return (
    <KeyboardAwareScrollView scrollEnabled={!showCamera}>
      <AddReportForm
        toastRef={toastRef}
        setLoading={setLoading}
        navigation={navigation}
        setShowCamera={setShowCamera}
        showCamera={showCamera}
      />
      <Loading isVisible={loading} text="Creando reporte..." />
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({});
