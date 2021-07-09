import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import TopReports from "../screens/TopReports";

const Stack = createStackNavigator();

export default function TopReportsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="top-reports"
        component={TopReports}
        options={{ title: "Historial" }}
      />
    </Stack.Navigator>
  );
}
