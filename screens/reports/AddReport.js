import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Toast from "react-native-easy-toast";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Loading from "../../components/Loading";

import AddReportForm from "../../components/reports/AddReportForm";

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
      <Loading isVisible={loading} text="Creando reporte..." />
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({});
