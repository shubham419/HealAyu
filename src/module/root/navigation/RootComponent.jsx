import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from "../../../theme/colors";
import SearchScreen from "../screens/search/SearchScreen";
import DoctorDetailScreen from "../screens/search/DoctorDetailScreen";

const Tab = createMaterialBottomTabNavigator();



const RootComponent = () => {
  return (
    <Tab.Navigator
      backBehavior="firstRoute"
      screenOptions={{ headerShown: false }}
      activeColor={Colors.main}
      inactiveColor={Colors.subHeading}
      labeled={false}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen name="SOS" component={HomeScreen} 
      options={{tabBarIcon:(({color}) => (
        <MaterialCommunityIcons name="bike-fast" size={24} color={color} />
      ))}}
      />
      <Tab.Screen name="Search Doctor" component={SearchScreen} 
      options={{tabBarIcon: (({color}) => (
        <Ionicons name="search-outline" size={24} color={color} />
      ))}}
      />
      <Tab.Screen name="Profile" component={DoctorDetailScreen} 
      options={{tabBarIcon: ({color}) => (
        
        <Feather name="user" size={24} color={color} />
      )}} />
    </Tab.Navigator>
  );
};

export default RootComponent;

const styles = StyleSheet.create({

});
