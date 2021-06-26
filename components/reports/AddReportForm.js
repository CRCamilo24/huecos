import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Button } from "react-native-elements";

import { map, size, isEmpty } from "lodash";
import uuid from "random-uuid-v4";
import { validateEmail } from "../../utils/helpers";
import {
  addDocumentWithoutId,
  getCurrentUser,
  uploadImage,
} from "../../utils/actions";
import MapReport from "./components/MapReport";
import ImageReport from "./components/ImageReport";
import UploadImage from "./components/UploadImage";
import FormAdd from "./components/FormAdd";

export default function AddReportForm({ toastRef, setLoading, navigation }) {
  const [formData, setFormData] = useState(defaultFormValues());
  //const [errorName, setErrorName] = useState(null)
  const [errorDescription, setErrorDescription] = useState(null);
  const [errorBarrio, setErrorBarrio] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorAddress, setErrorAddress] = useState(null);
  const [errorPhone, setErrorPhone] = useState(null);
  const [imagesSelected, setImagesSelected] = useState([]);
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [locationReport, setLocationReport] = useState(null);

  const addReport = async () => {
    //console.log(formData)
    if (!validForm()) {
      return;
    }
    setLoading(true);
    const responseUploadImages = await uploadImages();
    //console.log(response)
    const report = {
      address: formData.address,
      description: formData.description,
      email: formData.email,
      barrio: formData.barrio,
      callingCode: formData.callingCode,
      location: locationReport,
      images: responseUploadImages,
      createBy: getCurrentUser().uid,
    };
    const responseAddDocument = await addDocumentWithoutId("reports", report);
    setLoading(false);
    //console.log("YEAH")

    if (!responseAddDocument.statusResponse) {
      toastRef.current.show(
        "Error al grabar el reporte, por favor intenta mas tarde",
        3000
      );
      return;
    }
    navigation.navigate("reports");
  };
  const uploadImages = async () => {
    const imagesUrl = [];
    await Promise.all(
      map(imagesSelected, async (image) => {
        const response = await uploadImage(image, "reports", uuid());
        if (response.statusResponse) {
          imagesUrl.push(response.url);
        }
      })
    );
    return imagesUrl;
  };

  const validForm = () => {
    clearErrors();
    let isValid = true;

    /* if (isEmpty(formData.name)) {
        setErrorName("Debes ingresar el nombre del reporte.")
        isValid = false
    } */

    if (isEmpty(formData.address)) {
      setErrorAddress(
        "Debes ingresar la zona en la que se encuentra el reporte."
      );
      isValid = false;
    }

    if (isEmpty(formData.barrio)) {
      setErrorBarrio("Debes ingresar la zona del reporte.");
      isValid = false;
    }

    if (!validateEmail(formData.email)) {
      setErrorEmail("Debes ingresar un email válido.");
      isValid = false;
    }

    if (size(formData.phone) < 10) {
      setErrorPhone("Debes ingresar un teléfono válido.");
      isValid = false;
    }

    if (isEmpty(formData.description)) {
      setErrorDescription("Debes ingresar una descripción del reporte.");
      isValid = false;
    }

    if (!locationReport) {
      toastRef.current.show("Debes de localizar el reporte en el mapa.", 3000);
      isValid = false;
    } else if (size(imagesSelected) === 0) {
      toastRef.current.show(
        "Debes de agregar al menos una imagen al reporte.",
        3000
      );
      isValid = false;
    }

    return isValid;
  };
  const clearErrors = () => {
    setErrorAddress(null);
    setErrorDescription(null);
    setErrorEmail(null);
    setErrorBarrio(null);
    //setErrorName(null)
    setErrorPhone(null);
  };

  return (
    <ScrollView style={styles.viewContainer}>
      <ImageReport imageReport={imagesSelected[0]} />
      <FormAdd
        formData={formData}
        setFormData={setFormData}
        //errorName={errorName}
        errorDescription={errorDescription}
        errorBarrio={errorBarrio}
        errorEmail={errorEmail}
        errorAddress={errorAddress}
        errorPhone={errorPhone}
        setIsVisibleMap={setIsVisibleMap}
        locationReport={locationReport}
      />
      <UploadImage
        toastRef={toastRef}
        imagesSelected={imagesSelected}
        setImagesSelected={setImagesSelected}
        navigation={navigation}
      />
      <Button
        title="Crear Reporte"
        onPress={addReport}
        buttonStyle={styles.btnAddReport}
      />
      <MapReport
        isVisibleMap={isVisibleMap}
        setIsVisibleMap={setIsVisibleMap}
        setLocationReport={setLocationReport}
        toastRef={toastRef}
      />
    </ScrollView>
  );
}

const defaultFormValues = () => {
  return {
    //name: "",
    description: "",
    email: "",
    barrio: "",
    phone: "",
    address: "",
    country: "CO",
    callingCode: "57",
  };
};

const styles = StyleSheet.create({
  viewContainer: {
    height: "100%",
  },

  btnAddReport: {
    margin: 20,
    backgroundColor: "#442484",
  },
});
