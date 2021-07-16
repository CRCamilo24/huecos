import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Search from "../screens/Search";
import CustomHeader from "../components/CustomHeader";
import { COLORS, SCREEN_HEIGHT, SCREEN_WIDTH, StackTheme } from "../theme";

const Stack = createStackNavigator();

export default function SearchStack() {
  return (
    <Stack.Navigator screenOptions={StackTheme}>
      <Stack.Screen
        name="search"
        component={Search}
        options={{ headerTitle: (props) => <CustomHeader title="Noticias" /> }}
      />
    </Stack.Navigator>
  );
}
