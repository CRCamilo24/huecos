import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Account from "../screens/account/Account";
import UserGuest from "../screens/account/UserGuest";
import Login from "../screens/account/Login";
import Register from "../screens/account/Register";
import RecoverPasswordPage from "../screens/account/RecoverPassword";
import { StackTheme } from "../theme";

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="account"
        component={Account}
        options={{ title: "Cuenta" }}
      />
      <Stack.Screen
        name="login"
        component={Login}
        options={{ title: "Ingresar" }}
      />
      <Stack.Screen
        name="register"
        component={Register}
        options={{ title: "Registrar Usuario" }}
      />
      <Stack.Screen
        name="recover"
        component={RecoverPasswordPage}
        options={{ title: "Recuperar Contraseña" }}
      />
    </Stack.Navigator>
  );
}
