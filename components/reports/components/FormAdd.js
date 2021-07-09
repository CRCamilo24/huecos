import React, { useState } from "react";
import { Input } from "react-native-elements";
import CountryPicker from "react-native-country-picker-modal";
import { StyleSheet, Text, View } from "react-native";

function FormAdd({
  //errorName,
  formData,
  setFormData,
  errorDescription,
  errorBarrio,
  // errorEmail,
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
      {/* <Input
        keyboardType="email-address"
        placeholder="Email del usuario..."
        defaultValue={formData.email}
        onChange={(e) => onChange(e, "email")}
        errorMessage={errorEmail}
      /> */}
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

export default FormAdd;

const styles = StyleSheet.create({
  viewForm: {
    marginHorizontal: 10,
  },

  phoneView: {
    width: "80%",
    flexDirection: "row",
  },

  inputPhone: {
    width: "80%",
  },

  textArea: {
    height: 100,
    width: "100%",
  },
});
