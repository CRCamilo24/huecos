import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AddReport from "../screens/reports/AddReport";
import Reports from "../screens/reports/Reports";
import Notes from "../screens/reports/Notes";

const Stack = createStackNavigator();

export default function ReportsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="reports"
        component={Reports}
        options={{ title: "Reportes" }}
      />
      <Stack.Screen
        name="add-report"
        component={AddReport}
        options={{ title: "Crear Reporte" }}
      />
      <Stack.Screen
        name="notes"
        component={Notes}
        options={{ title: "Notas" }}
      />
    </Stack.Navigator>
  );
}
