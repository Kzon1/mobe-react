import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AddHike from "../screens/addHike";
import Home from "../screens/home";
import SearchHike from "../screens/searchHike";
import UpdateHike from "../screens/updateHike";
import ObservationHome from '../screens/observationHome'
import AddObservation from '../screens/addObservation';
import EditObservation from '../screens/editObservation';

const Stack = createStackNavigator();

const optionStyle = {
  headerStyle: {
    backgroundColor: "#2a9fe8",
  },
  headerTitleStyle: { fontSize: 20, fontWeight: "bold" },
  headerTintColor: "white",
};

const AddStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={optionStyle}>
      <Stack.Screen
        options={{ headerTitleAlign: "center" }}
        name="Add new hike"
        component={AddHike}
      />
    </Stack.Navigator>
  );
};

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={optionStyle}>
      <Stack.Screen
        options={{ headerLeftContainerStyle: { marginLeft: 20 },
        headerTitleAlign: "center", }}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        options={{
          headerLeftContainerStyle: { marginLeft: 20 },
          headerTitleAlign: "center",
        }}
        name="Edit Hike"
        component={UpdateHike}
      />
       <Stack.Screen
        options={{
          headerLeftContainerStyle: { marginLeft: 20 },
          headerTitleAlign: "center",
        }}
        name="Observations"
        component={ObservationHome}
      />
       <Stack.Screen
        options={{
          headerLeftContainerStyle: { marginLeft: 20 },
          headerTitleAlign: "center",
        }}
        name="Add Observation"
        component={AddObservation}
      />
        <Stack.Screen
        options={{
          headerLeftContainerStyle: { marginLeft: 20 },
          headerTitleAlign: "center",
        }}
        name="Edit Observation"
        component={EditObservation}
      />
    </Stack.Navigator>
  );
};

const SearchStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={optionStyle}>
      <Stack.Screen
        options={{ headerTitleAlign: "center" }}
        name="Search Hikes"
        component={SearchHike}
      />
    </Stack.Navigator>
  );
};

export { AddStackNavigator, HomeStackNavigator, SearchStackNavigator };
