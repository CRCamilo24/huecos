import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Favorite from "../screens/Favorite";
import { StackTheme } from "../theme";
import CustomHeader from "../components/CustomHeader";

const Stack = createStackNavigator();

export default function FavoriteStack() {
  return (
    <Stack.Navigator screenOptions={StackTheme}>
      <Stack.Screen
        name="favorites"
        component={Favorite}
        options={{
          headerTitle: (props) => <CustomHeader title="Información APP" />,
        }}
      />
    </Stack.Navigator>
  );
}
