import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AddReport from "../screens/reports/AddReport";
import Reports from "../screens/reports/Reports";
import Notes from "../screens/reports/Notes";
import CustomHeader from "../components/CustomHeader";
import { COLORS, SCREEN_HEIGHT, SCREEN_WIDTH, StackTheme } from "../theme";
import AnotherNotes from "../screens/reports/AnotherNotes";

const Stack = createStackNavigator();

export default function ReportsStack() {
  return (
    <Stack.Navigator screenOptions={StackTheme}>
      <Stack.Screen
        name="reports"
        component={Reports}
        options={{
          headerTitle: (props) => <CustomHeader title="Reportes" />,
        }}
      />
      <Stack.Screen
        name="add-report"
        component={AddReport}
        options={{
          headerTitle: (props) => <CustomHeader title="Crear Reporte" />,
        }}
      />
      <Stack.Screen
        name="notes"
        component={Notes}
        options={{
          headerTitle: (props) => <CustomHeader title="Instructivo" />,
        }}
      />
      <Stack.Screen
        name="another-notes"
        component={AnotherNotes}
        options={{
          headerTitle: (props) => <CustomHeader title="Instructivo" />,
        }}
      />
    </Stack.Navigator>
  );
}
