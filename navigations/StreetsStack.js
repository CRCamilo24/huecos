import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AddReport from "../screens/reports/AddReport";
import Reports from "../screens/reports/Reports";
import Notes from "../screens/reports/Notes";
import CustomHeader from "../components/CustomHeader";
import { COLORS, SCREEN_HEIGHT, SCREEN_WIDTH, StackTheme } from "../theme";
import AnotherNotes from "../screens/reports/AnotherNotes";
import NotesStreets from "../screens/reports/NotesStreets";
import AnotherNotesStreets from "../screens/reports/AnotherNotesStreets";
import AddStreet from "../screens/reports/AddStreet";

const Stack = createStackNavigator();

export default function StreetsStack() {
  return (
    <Stack.Navigator screenOptions={StackTheme}>
      <Stack.Screen
        name="notes-streets"
        component={NotesStreets}
        options={{
          headerTitle: (props) => <CustomHeader title="Instructivo" />,
        }}
      />
      <Stack.Screen
        name="another-notes-streets"
        component={AnotherNotesStreets}
        options={{
          headerTitle: (props) => <CustomHeader title="Instructivo" />,
        }}
      />
      <Stack.Screen
        name="add-street"
        component={AddStreet}
        options={{
          headerTitle: (props) => <CustomHeader title="Postular Vía" />,
        }}
      />
    </Stack.Navigator>
  );
}
