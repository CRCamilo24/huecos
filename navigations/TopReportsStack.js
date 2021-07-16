import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import TopReports from "../screens/TopReports";
import { StackTheme } from "../theme";
import CustomHeader from "../components/CustomHeader";

const Stack = createStackNavigator();

export default function TopReportsStack() {
  return (
    <Stack.Navigator screenOptions={StackTheme}>
      <Stack.Screen
        name="top-reports"
        component={TopReports}
        options={{ headerTitle: (props) => <CustomHeader title="Historial" /> }}
      />
    </Stack.Navigator>
  );
}
