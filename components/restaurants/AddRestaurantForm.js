import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import CountryPicker from 'react-native-country-picker-modal'


export default function AddRestaurantForm({toastRef, setLoading, navigation}) {
    const [formData, setFormData] = useState(defaultFormValues())
    //const [errorName, setErrorName] = useState(null)
    const [errorDescription, setErrorDescription] = useState(null)
    const [errorBarrio, setBarrio] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorAddress, setErrorAddress] = useState(null)
    const [errorPhone, setErrorPhone] = useState(null)

    const addRestaurant= () => {
        console.log(formData)
        console.log("YEAH")
    }
    

    return (
        <View style={styles.viewContainer}>
            <FormAdd
                formData={formData}
                setFormData={setFormData}
                //errorName={errorName}
                errorDescription={errorDescription}
                errorBarrio={errorBarrio}
                errorEmail={errorEmail}
                errorAddress={errorAddress}
                errorPhone={errorPhone}
            />
            <Button
                title="Crear Restaurante"
                onPress={addRestaurant}
                buttonStyle={styles.btnAddRestaurant}
            />
        </View>
    )
}
//errorName
function FormAdd({formData, setFormData, errorDescription, errorBarrio, errorEmail, errorAddress, errorPhone }) {
    const [country, setCountry] = useState("CO")
    const [callingCode, setCaliingCode] = useState("57")
    const [phone, setPhone] = useState("")

    const onChange = (e, type) => {
        setFormData({...formData, [type]: e.nativeEvent.text})
    }

    return(
        <View style={styles.viewForm}>
            {/* MODIFICAR POR UN NOMBRE NADA MAS 
            <Input
                placeholder="Nombre del restaurante..."
                defaultValue={formData.name}
                onChange={(e) => onChange(e, "name")}
                errorMessage={errorName}
            />*/}
            <Text>NOMBRE RESTAURANTE</Text>
            <Input
                placeholder="Dirección del restaurante..."
                defaultValue={formData.address}
                onChange={(e) => onChange(e, "address")}
                errorMessage={errorAddress}
            />
           <Input
                placeholder="Barrio del restaurante..."
                defaultValue={formData.barrio}
                onChange={(e) => onChange(e, "Barrio")}
                errorMessage={errorBarrio}
            />
            {/* cambiar por Barrio */}
            <Input
                keyboardType="email-address"
                placeholder="Email del restaurante..."
                defaultValue={formData.email}
                onChange={(e) => onChange(e, "email")}
                errorMessage={errorEmail}
            />
            {/* PARA MODIFICAR NO VA */}
            <View style={styles.phoneView}/>
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
                            "country": country.cca2, 
                            "callingCode":country.callingCode[0]
                            })
                        setCountry(country.cca2)
                        setCaliingCode(country.callingCode[0])
                    }}
                />
                {/* PARA MODIFICAR NO VA */}
                <Input
                    placeholder="WhatsApp restaurante..."
                    keyboardType="phone-pad"
                    containerStyle={styles.inputPhone}
                    defaultValue={formData.phone}
                    onChange={(e) => onChange(e, "phone")}
                    errorMessage={errorPhone}
                />
                <Input
                    placeholder="Descripción restaurante..."
                    multiline
                    containerStyle={styles.textArea}
                    defaultValue={formData.description}
                    onChange={(e) => onChange(e, "description")}
                    errorMessage={errorDescription}
                />
        </View>
    )
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
        callingCode: "57"
    }
}

const styles = StyleSheet.create({
    viewContainer: {
        height: "100%"
    },
    viewForm: {
        marginHorizontal: 10,
    },
    textArea: {
        height: 100,
        width: "100%"
    },
    phoneView: {
        width: "80%",
        flexDirection: "row"
    },
    inputPhone: {
        width: "80%"
    },
    btnAddRestaurant: {
        margin: 20,
        backgroundColor: "#442484"
    }
})
