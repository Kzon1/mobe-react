
import React from "react";
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {AddStackNavigator, HomeStackNavigator,SearchStackNavigator} from './mainStacks';

const Tab = createBottomTabNavigator();
const AddIcon = ({ focused }) => (
  <Ionicons
    name="add-circle"
    size={26}
    color={focused ? "#eb1c1c" : "#ffffff"}
  />
);
const HomeIcon = ({ focused }) => (
  <Ionicons
    name="home"
    size={26}
    color={focused ? "#eb1c1c" : "#ffffff"}
  />
);
const SearchIcon = ({ focused }) => (
  <Ionicons
    name="search"
    size={26}
    color={focused ? "#eb1c1c" : "#ffffff"}
  />
);

const BottomTabNavigator = () => {
    return (
      <Tab.Navigator 
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: { backgroundColor: '#2a9fe8' },
        tabBarLabelStyle: { fontSize: 14, color: 'white', marginTop: 5 }
      }}
      >
        <Tab.Screen  name="Add Screen" component={AddStackNavigator} options={{ tabBarIcon: AddIcon }}/>
        <Tab.Screen name="Home Screen" component={HomeStackNavigator} options={{ tabBarIcon: HomeIcon }}/>
        <Tab.Screen name="Search Screen" component={SearchStackNavigator} options={{ tabBarIcon: SearchIcon }}/>
      </Tab.Navigator>
    );
  };
  
  export default BottomTabNavigator;