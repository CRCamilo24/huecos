import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getCurrentUser } from '../../utils/actions'
import { useFocusEffect } from '@react-navigation/native'
import Loading from '../../components/Loading'

import UserGuest from '../account/UserGuest'
import UserLogged from '../account/UserLogged'

export default function Account() {
    const [login, setLogin] = useState(null)

    useFocusEffect (
        useCallback(() => {
            const user = getCurrentUser()
            user ? setLogin(true) : setLogin(false)
        }, [])
    )

    if (login == null) {
        return <Loading isVisible={true} text="Cargando..."/>
    }

    return login ? <UserLogged/> : <UserGuest/>
}

const styles = StyleSheet.create({})
