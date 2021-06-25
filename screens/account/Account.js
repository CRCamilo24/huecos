import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet } from "react-native";
import { getCurrentUser } from "../../utils/actions";
import { useFocusEffect } from "@react-navigation/native";
import Loading from "../../components/Loading";

import UserGuest from "../account/UserGuest";
import UserLogged from "../account/UserLogged";
import { useAuthContext } from "../../components/context/AuthContext";

export default function Account() {
  const [login, setLogin] = useState(null);

  // useFocusEffect(
  //   useCallback(() => {
  //     const user = getCurrentUser();
  //     console.log(user);
  //     user ? setLogin(true) : setLogin(false);
  //   }, [])
  // );
  const [{ authUser, loading }] = useAuthContext();

  if (loading == true) {
    return <Loading isVisible={true} text="Cargando..." />;
  }

  return authUser ? <UserLogged /> : <UserGuest />;
}

const styles = StyleSheet.create({});
