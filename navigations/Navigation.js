import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import AccountStack from "./AccountStack";
import FavoriteStack from "./FavoriteStack";
import ReportsStack from "./ReportsStack";
import SearchStack from "./SearchStack";
import TopReportsStack from "./TopReportsStack";
import { COLORS, SCREEN_HEIGHT } from "../theme";
import { Image } from "react-native";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  const screenOptions = (route, color) => {
    let iconName;
    switch (route.name) {
      case "reports":
        iconName = `https://firebasestorage.googleapis.com/v0/b/valorizacionapp.appspot.com/o/Source%2FReportes.png?alt=media&token=162b461a-94d4-4018-86c6-b1bd63744a00`;
        break;
      case "info":
        iconName =
          "https://firebasestorage.googleapis.com/v0/b/valorizacionapp.appspot.com/o/Source%2FInformacion.png?alt=media&token=92bd3afc-cad9-47f7-8c1a-521bd610d9cc";
        break;
      case "historial":
        iconName =
          "https://firebasestorage.googleapis.com/v0/b/valorizacionapp.appspot.com/o/Source%2FHistorial.png?alt=media&token=57d528a7-82f5-43dc-8d42-da78fa076ac7";
        break;
      case "search":
        iconName =
          "https://firebasestorage.googleapis.com/v0/b/valorizacionapp.appspot.com/o/Source%2FNoticias.png?alt=media&token=cfe71106-e2fb-4de2-89ce-6e30639df6e4";
        break;
      case "account":
        iconName =
          "https://firebasestorage.googleapis.com/v0/b/valorizacionapp.appspot.com/o/Source%2FPerfil.png?alt=media&token=11443ffe-7fc9-4d74-ae92-bb83c8b85989";
        break;
    }

    return (
      <Image
        key={iconName}
        source={{ uri: iconName }}
        style={{ height: SCREEN_HEIGHT * 0.03, width: SCREEN_HEIGHT * 0.3 }}
        resizeMode="contain"
      />
    );
  };
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="reports"
        tabBarOptions={{
          inactiveTintColor: COLORS.secondaryDeg,
          activeTintColor: COLORS.secondary,
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenOptions(route, color),
        })}
      >
        <Tab.Screen
          name="search"
          component={SearchStack}
          options={{ title: "Noticias" }}
        />
        <Tab.Screen
          name="reports"
          component={ReportsStack}
          options={{ title: "Reportes" }}
        />
        <Tab.Screen
          name="info"
          component={FavoriteStack}
          options={{ title: "Info" }}
        />
        <Tab.Screen
          name="historial"
          component={TopReportsStack}
          options={{ title: "Historial" }}
        />
        <Tab.Screen
          name="account"
          component={AccountStack}
          options={{ title: "Cuenta" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
