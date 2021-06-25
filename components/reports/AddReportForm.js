import React, { useState, useEffect } from "react";
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { Avatar, Image, Icon, Input, Button } from "react-native-elements";
import CountryPicker from "react-native-country-picker-modal";
import { map, size, filter, isEmpty } from "lodash";
import MapView from "react-native-maps";
import uuid from "random-uuid-v4";

import {
  getCurrentLocation,
  loadImageFromGallery,
  validateEmail,
} from "../../utils/helpers";
import {
  addDocumentWithoutId,
  getCurrentUser,
  uploadImage,
} from "../../utils/actions";
import Modal from "../Modal";

const widthScreen = Dimensions.get("window").width;

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
        console.log(response.location);
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
              draggable
            />
          </MapView>
        )}
        <View style={styles.viewMapBtn}>
          <Button
            title="Guardar ubicación"
            containerStyle={styles.viewMapContainerSave}
            buttonStyle={styles.viewMapBtnSave}
            onPress={confirmLocation}
          />
          <Button
            title="Cancelar ubicación"
            containerStyle={styles.viewMapContainerCancel}
            buttonStyle={styles.viewMapBtnCancel}
            onPress={() => setIsVisibleMap(false)}
          />
        </View>
      </View>
    </Modal>
  );
}

function ImageReport({ imageReport }) {
  return (
    <View style={styles.viewPhoto}>
      <Image
        style={{ width: widthScreen, height: 200 }}
        source={
          imageReport
            ? { uri: imageReport }
            : require("../../assets/no-image.png")
        }
      />
    </View>
  );
}

function UploadImage({ toastRef, imagesSelected, setImagesSelected }) {
  const imageSelect = async () => {
    const response = await loadImageFromGallery([4, 3]);
    if (!response.status) {
      toastRef.current.show("No has seleccionado ninguna imagen", 3000);
      return;
    }
    setImagesSelected([...imagesSelected, response.image]);
  };

  const removeImage = (image) => {
    Alert.alert(
      "Eliminar imagen",
      "¿Estas seguro que deseas eliminar la imagen?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Si",
          onPress: () => {
            setImagesSelected(
              filter(imagesSelected, (imageUrl) => imageUrl !== image)
            );
          },
        },
      ],
      { cancelable: true }
    );
  };
  return (
    <ScrollView horizontal style={styles.viewImages}>
      {size(imagesSelected) < 1 && (
        <Icon
          type="material-community"
          name="camera"
          color="#7a7a7a"
          containerStyle={styles.containerIcon}
          onPress={imageSelect}
        />
      )}
      {map(imagesSelected, (imageReport, index) => (
        <Avatar
          key={index}
          style={styles.miniatureStyles}
          source={{ uri: imageReport }}
          onPress={() => removeImage(imageReport)}
        />
      ))}
    </ScrollView>
  );
}

function FormAdd({
  //errorName,
  formData,
  setFormData,
  errorDescription,
  errorBarrio,
  errorEmail,
  errorAddress,
  errorPhone,
  setIsVisibleMap,
  locationReport,
}) {
  const [country, setCountry] = useState("CO");
  const [callingCode, setCaliingCode] = useState("57");
  const [phone, setPhone] = useState("");

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  return (
    <View style={styles.viewForm}>
      {/* MODIFICAR POR UN NOMBRE NADA MAS 
            <Input
                placeholder="Nombre del reporte..."
                defaultValue={formData.name}
                onChange={(e) => onChange(e, "name")}
                errorMessage={errorName}
            />*/}
      <Text>FORMULARIO PARA REALIZAR REPORTE</Text>
      <Input
        placeholder="Dirección del reporte..."
        defaultValue={formData.address}
        onChange={(e) => onChange(e, "address")}
        errorMessage={errorAddress}
        rightIcon={{
          type: "material-community",
          name: "google-maps",
          color: locationReport ? "#442484" : "#c2c2c2",
          onPress: () => setIsVisibleMap(true),
        }}
      />
      <Input
        placeholder="Zona del reporte..."
        defaultValue={formData.barrio}
        onChange={(e) => onChange(e, "barrio")}
        errorMessage={errorBarrio}
      />
      {/* cambiar por Barrio */}
      <Input
        keyboardType="email-address"
        placeholder="Email del usuario..."
        defaultValue={formData.email}
        onChange={(e) => onChange(e, "email")}
        errorMessage={errorEmail}
      />
      {/* PARA MODIFICAR NO VA */}
      <View style={styles.phoneView} />
      <CountryPicker
        withFlag
        withCallingCode
        withFilter
        withCallingCodeButton
        containerStyle={styles.CountryPicker}
        countryCode={country}
        onSelect={(country) => {
          setFormData({
            ...formData,
            country: country.cca2,
            callingCode: country.callingCode[0],
          });
          setCountry(country.cca2);
          setCaliingCode(country.callingCode[0]);
        }}
      />
      {/* PARA MODIFICAR NO VA */}
      <Input
        placeholder="WhatsApp..."
        keyboardType="phone-pad"
        containerStyle={styles.inputPhone}
        defaultValue={formData.phone}
        onChange={(e) => onChange(e, "phone")}
        errorMessage={errorPhone}
      />
      <Input
        placeholder="Descripción del reporte..."
        multiline
        containerStyle={styles.textArea}
        defaultValue={formData.description}
        onChange={(e) => onChange(e, "description")}
        errorMessage={errorDescription}
      />
    </View>
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
  viewForm: {
    marginHorizontal: 10,
  },
  textArea: {
    height: 100,
    width: "100%",
  },
  phoneView: {
    width: "80%",
    flexDirection: "row",
  },
  inputPhone: {
    width: "80%",
  },
  btnAddReport: {
    margin: 20,
    backgroundColor: "#442484",
  },
  viewImages: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 30,
  },
  containerIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 70,
    width: 79,
    backgroundColor: "#e3e3e3",
  },
  miniatureStyle: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  viewPhoto: {
    alignItems: "center",
    height: 200,
    marginBottom: 20,
  },
  mapStyle: {
    width: "100%",
    height: 550,
  },
  viewMapBtn: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  viewMapBtnContainerCancel: {
    paddingLeft: 5,
  },
  viewMapBtnContainerSave: {
    paddingRight: 5,
  },
  viewMapBtnCancel: {
    backgroundColor: "#a65273",
  },
  viewMapBtnSave: {
    backgroundColor: "#442484",
  },
});
